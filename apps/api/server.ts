import {
  Application,
  Context,
  Router,
  Status,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.3";
import { readableStreamFromReader } from "https://deno.land/std@0.141.0/streams/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import errors from "./constants/errors.ts";
import routes from "./routes/index.ts";
import { APIKey } from "./models/api-key.ts";
const port = 8000;

/**
 * Checks for an API key and logs the usage
 * @param context
 * @param next
 */
const checkAPIKey = async (context: Context, next: () => Promise<unknown>) => {
  const { headers, url } = context.request;
  // not retrieving the Open API spec or public files
  if (!["/spec.yaml", "/assets/logo.png"].includes(url.pathname)) {
    const urlExceptions = Deno.env.get("IGNORE_KEY_CHECK")?.split(",");
    // if the url is not an exception
    if (!urlExceptions?.includes(headers.get("origin") ?? "")) {
      const key = headers.get("x-api-key");
      if (!key) {
        context.response.status = Status.Unauthorized;
        context.response.body = errors.Unauthorized;
        return;
      }
      const { error } = await createClient(
        Deno.env.get("PUBLIC_SUPABASE_URL") ?? "",
        Deno.env.get("PUBLIC_SUPABASE_API_KEY") ?? ""
      )
        .from<APIKey>("api_keys")
        .select("*")
        .eq("key", key)
        .single();
      // key not found
      if (error) {
        context.response.status = Status.InternalServerError;
        context.response.body = errors.InternalServerError;
        console.error(error);
        return;
      }
    }
  }
  return next();
};

const app = new Application();

const router = new Router();

// returns the OpenAPI Spec
router.get("/spec.yaml", async (context: Context) => {
  const file = await Deno.open("./spec.yaml", { read: true });
  const readableStream = readableStreamFromReader(file);
  context.response.body = readableStream;
});
// returns the logo
router.get("/assets/logo.png", async (context: Context) => {
  const file = await Deno.open("./assets/logo.png", { read: true });
  const readableStream = readableStreamFromReader(file);
  context.response.body = readableStream;
});
// API routes
router.use(routes.routes(), routes.allowedMethods());

// check for API keys
if (Deno.env.get("ENABLE_KEY_CHECK") == "true") app.use(checkAPIKey);

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes(), router.allowedMethods());

console.log(`Server running on port ${port}`);
await app.listen({ port });
