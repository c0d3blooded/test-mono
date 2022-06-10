import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import {
  getSunPreferences,
  getSunPreference,
} from "../../controllers/sun_preferences.ts";

const router = new Router();
/**
 * @api [get] /sun-preferences
 * summary: Get sun preferences
 * description: Returns a list of all available sun preferences
 * tags:
 *  - sun_preference
 * operationId: getSunPreferencea
 * security:
 *   - ApiKeyAuthorization: []
 * responses:
 *   '200':
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/sun_preference'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/sun-preferences", getSunPreferences);
/**
 * @api [get] /sun-preferences/{id}
 * summary: Get sun preference by id
 * description: Returns one sun preference by its id
 * tags:
 *  - sun_preference
 * operationId: getSunPreference
 * security:
 *   - ApiKeyAuthorization: []
 * parameters:
 *   - $ref: '#/components/parameters/id'
 * responses:
 *   '200':
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/sun_preference'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/sun-preferences/:id", getSunPreference);

export default router;
