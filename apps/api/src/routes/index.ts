import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
// public routes
import climateRoutes from "./v1/climate.ts";
import edibilityRoutes from "./v1/edibility.ts";
import functionalityRoutes from "./v1/functionality.ts";
import layerRoutes from "./v1/layer.ts";
import plantRoutes from "./v1/plant.ts";
import soilRoutes from "./v1/soil.ts";
import sunPreferencesRoutes from "./v1/sun_preferences.ts";
import zoneRoutes from "./v1/zone.ts";
import revisionRoutes from "./v1/revisions.ts";

// private routes
import pageRoutesInternal from "./internal/page.ts";
import revisionRoutesInternal from "./internal/revisions.ts";
import commentRoutesInternal from "./internal/comments.ts";

const routerPublic = new Router({
  prefix: "/v1",
});
// v1 routes
routerPublic.use(climateRoutes.routes(), climateRoutes.allowedMethods());
routerPublic.use(edibilityRoutes.routes(), edibilityRoutes.allowedMethods());
routerPublic.use(
  functionalityRoutes.routes(),
  functionalityRoutes.allowedMethods()
);
routerPublic.use(layerRoutes.routes(), layerRoutes.allowedMethods());
routerPublic.use(plantRoutes.routes(), plantRoutes.allowedMethods());
routerPublic.use(soilRoutes.routes(), soilRoutes.allowedMethods());
routerPublic.use(
  sunPreferencesRoutes.routes(),
  sunPreferencesRoutes.allowedMethods()
);
routerPublic.use(zoneRoutes.routes(), zoneRoutes.allowedMethods());
routerPublic.use(revisionRoutes.routes(), revisionRoutes.allowedMethods());

// for private routes
const routerInternal = new Router({
  prefix: "/internal",
});
routerInternal.use(
  pageRoutesInternal.routes(),
  pageRoutesInternal.allowedMethods()
);
routerInternal.use(
  revisionRoutesInternal.routes(),
  revisionRoutesInternal.allowedMethods()
);
routerInternal.use(
  commentRoutesInternal.routes(),
  commentRoutesInternal.allowedMethods()
);

const router = new Router();

router.use(routerPublic.routes(), routerPublic.allowedMethods());
router.use(routerInternal.routes(), routerInternal.allowedMethods());
export default router;
