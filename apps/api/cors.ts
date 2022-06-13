import { CorsOptions } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

export const corsOptions: CorsOptions = {
  origin: async () => {
    const urlExceptions = Deno.env.get('IGNORE_KEY_CHECK')?.split(',');
    return urlExceptions; //  Reflect (enable) the requested origin in the CORS response for this origins
  }
};
