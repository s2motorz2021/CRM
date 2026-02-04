/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/leads/route";
exports.ids = ["app/api/leads/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_leads_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/leads/route.js */ \"(rsc)/./src/app/api/leads/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/leads/route\",\n        pathname: \"/api/leads\",\n        filename: \"route\",\n        bundlePath: \"app/api/leads/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\S2_Motorz_CRM\\\\src\\\\app\\\\api\\\\leads\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_leads_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsZWFkcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbGVhZHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsZWFkcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q1MyX01vdG9yel9DUk0lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNEZXNrdG9wJTVDUzJfTW90b3J6X0NSTSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDdUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxTMl9Nb3RvcnpfQ1JNXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGxlYWRzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9sZWFkcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xlYWRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9sZWFkcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxTMl9Nb3RvcnpfQ1JNXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGxlYWRzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/leads/route.js":
/*!************************************!*\
  !*** ./src/app/api/leads/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./src/lib/mongodb.js\");\n/* harmony import */ var _models_Lead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/Lead */ \"(rsc)/./src/models/Lead.js\");\n/* harmony import */ var _models_Lead__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_models_Lead__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const leads = await _models_Lead__WEBPACK_IMPORTED_MODULE_2___default().find({}).sort({\n            createdAt: -1\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(leads);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const data = await request.json();\n        let lead;\n        if (data._id) {\n            lead = await _models_Lead__WEBPACK_IMPORTED_MODULE_2___default().findByIdAndUpdate(data._id, data, {\n                new: true\n            });\n        } else {\n            lead = await _models_Lead__WEBPACK_IMPORTED_MODULE_2___default().create(data);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(lead);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const { id } = await request.json();\n        await _models_Lead__WEBPACK_IMPORTED_MODULE_2___default().findByIdAndDelete(id);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Lead deleted successfully'\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9sZWFkcy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTJDO0FBQ0w7QUFDTDtBQUUxQixlQUFlRztJQUNsQixJQUFJO1FBQ0EsTUFBTUYsd0RBQVNBO1FBQ2YsTUFBTUcsUUFBUSxNQUFNRix3REFBUyxDQUFDLENBQUMsR0FBR0ksSUFBSSxDQUFDO1lBQUVDLFdBQVcsQ0FBQztRQUFFO1FBQ3ZELE9BQU9QLHFEQUFZQSxDQUFDUSxJQUFJLENBQUNKO0lBQzdCLEVBQUUsT0FBT0ssT0FBTztRQUNaLE9BQU9ULHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsT0FBT0EsTUFBTUMsT0FBTztRQUFDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0FBQ0o7QUFFTyxlQUFlQyxLQUFLQyxPQUFPO0lBQzlCLElBQUk7UUFDQSxNQUFNWix3REFBU0E7UUFDZixNQUFNYSxPQUFPLE1BQU1ELFFBQVFMLElBQUk7UUFDL0IsSUFBSU87UUFFSixJQUFJRCxLQUFLRSxHQUFHLEVBQUU7WUFDVkQsT0FBTyxNQUFNYixxRUFBc0IsQ0FBQ1ksS0FBS0UsR0FBRyxFQUFFRixNQUFNO2dCQUFFSSxLQUFLO1lBQUs7UUFDcEUsT0FBTztZQUNISCxPQUFPLE1BQU1iLDBEQUFXLENBQUNZO1FBQzdCO1FBQ0EsT0FBT2QscURBQVlBLENBQUNRLElBQUksQ0FBQ087SUFDN0IsRUFBRSxPQUFPTixPQUFPO1FBQ1osT0FBT1QscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNQyxPQUFPO1FBQUMsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDckU7QUFDSjtBQUVPLGVBQWVTLE9BQU9QLE9BQU87SUFDaEMsSUFBSTtRQUNBLE1BQU1aLHdEQUFTQTtRQUNmLE1BQU0sRUFBRW9CLEVBQUUsRUFBRSxHQUFHLE1BQU1SLFFBQVFMLElBQUk7UUFDakMsTUFBTU4scUVBQXNCLENBQUNtQjtRQUM3QixPQUFPckIscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFRSxTQUFTO1FBQTRCO0lBQ3BFLEVBQUUsT0FBT0QsT0FBTztRQUNaLE9BQU9ULHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsT0FBT0EsTUFBTUMsT0FBTztRQUFDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0FBQ0oiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdXNlclxcRGVza3RvcFxcUzJfTW90b3J6X0NSTVxcc3JjXFxhcHBcXGFwaVxcbGVhZHNcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJztcclxuaW1wb3J0IExlYWQgZnJvbSAnQC9tb2RlbHMvTGVhZCc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKTtcclxuICAgICAgICBjb25zdCBsZWFkcyA9IGF3YWl0IExlYWQuZmluZCh7fSkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGxlYWRzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICAgICAgbGV0IGxlYWQ7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICBsZWFkID0gYXdhaXQgTGVhZC5maW5kQnlJZEFuZFVwZGF0ZShkYXRhLl9pZCwgZGF0YSwgeyBuZXc6IHRydWUgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGVhZCA9IGF3YWl0IExlYWQuY3JlYXRlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obGVhZCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUocmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKTtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgICAgICBhd2FpdCBMZWFkLmZpbmRCeUlkQW5kRGVsZXRlKGlkKTtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnTGVhZCBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImRiQ29ubmVjdCIsIkxlYWQiLCJHRVQiLCJsZWFkcyIsImZpbmQiLCJzb3J0IiwiY3JlYXRlZEF0IiwianNvbiIsImVycm9yIiwibWVzc2FnZSIsInN0YXR1cyIsIlBPU1QiLCJyZXF1ZXN0IiwiZGF0YSIsImxlYWQiLCJfaWQiLCJmaW5kQnlJZEFuZFVwZGF0ZSIsIm5ldyIsImNyZWF0ZSIsIkRFTEVURSIsImlkIiwiZmluZEJ5SWRBbmREZWxldGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/leads/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.js":
/*!****************************!*\
  !*** ./src/lib/mongodb.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nconsole.log('Connecting to MongoDB at:', MONGODB_URI);\nif (!MONGODB_URI) {\n    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');\n}\n/**\r\n * Global is used here to maintain a cached connection across hot reloads\r\n * in development. This prevents connections from growing exponentially\r\n * during API Route usage.\r\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUMzQ0csUUFBUUMsR0FBRyxDQUFDLDZCQUE2Qko7QUFFekMsSUFBSSxDQUFDQSxhQUFhO0lBQ2QsTUFBTSxJQUFJSyxNQUFNO0FBQ3BCO0FBRUE7Ozs7Q0FJQyxHQUNELElBQUlDLFNBQVNDLE9BQU9SLFFBQVE7QUFFNUIsSUFBSSxDQUFDTyxRQUFRO0lBQ1RBLFNBQVNDLE9BQU9SLFFBQVEsR0FBRztRQUFFUyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUMzRDtBQUVBLGVBQWVDO0lBQ1gsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2IsT0FBT0YsT0FBT0UsSUFBSTtJQUN0QjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ2pCLE1BQU1FLE9BQU87WUFDVEMsZ0JBQWdCO1FBQ3BCO1FBRUFOLE9BQU9HLE9BQU8sR0FBR1YsdURBQWdCLENBQUNDLGFBQWFXLE1BQU1HLElBQUksQ0FBQyxDQUFDZjtZQUN2RCxPQUFPQTtRQUNYO0lBQ0o7SUFFQSxJQUFJO1FBQ0FPLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ3RDLEVBQUUsT0FBT00sR0FBRztRQUNSVCxPQUFPRyxPQUFPLEdBQUc7UUFDakIsTUFBTU07SUFDVjtJQUVBLE9BQU9ULE9BQU9FLElBQUk7QUFDdEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxEZXNrdG9wXFxTMl9Nb3RvcnpfQ1JNXFxzcmNcXGxpYlxcbW9uZ29kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc29sZS5sb2coJ0Nvbm5lY3RpbmcgdG8gTW9uZ29EQiBhdDonLCBNT05HT0RCX1VSSSk7XHJcblxyXG5pZiAoIU1PTkdPREJfVVJJKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgaXMgdXNlZCBoZXJlIHRvIG1haW50YWluIGEgY2FjaGVkIGNvbm5lY3Rpb24gYWNyb3NzIGhvdCByZWxvYWRzXHJcbiAqIGluIGRldmVsb3BtZW50LiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGZyb20gZ3Jvd2luZyBleHBvbmVudGlhbGx5XHJcbiAqIGR1cmluZyBBUEkgUm91dGUgdXNhZ2UuXHJcbiAqL1xyXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xyXG5cclxuaWYgKCFjYWNoZWQpIHtcclxuICAgIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgICAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb25nb29zZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0Iiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.js\n");

/***/ }),

/***/ "(rsc)/./src/models/Lead.js":
/*!****************************!*\
  !*** ./src/models/Lead.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst LeadSchema = new mongoose.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    phone: {\n        type: String,\n        required: true\n    },\n    vehicle: {\n        type: String\n    },\n    source: {\n        type: String,\n        enum: [\n            'whatsapp',\n            'walkin',\n            'referral',\n            'oldcustomer',\n            'campaign',\n            'servicedue'\n        ],\n        default: 'walkin'\n    },\n    status: {\n        type: String,\n        enum: [\n            'new',\n            'followup',\n            'converted',\n            'lost'\n        ],\n        default: 'new'\n    },\n    notes: {\n        type: String\n    },\n    assignedTo: {\n        type: mongoose.Schema.Types.ObjectId,\n        ref: 'Staff'\n    }\n}, {\n    timestamps: true\n});\nmodule.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL0xlYWQuanMiLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU1BLFdBQVdDLG1CQUFPQSxDQUFDLDBCQUFVO0FBRW5DLE1BQU1DLGFBQWEsSUFBSUYsU0FBU0csTUFBTSxDQUFDO0lBQ25DQyxNQUFNO1FBQUVDLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUNyQ0MsT0FBTztRQUFFSCxNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDdENFLFNBQVM7UUFBRUosTUFBTUM7SUFBTztJQUN4QkksUUFBUTtRQUNKTCxNQUFNQztRQUNOSyxNQUFNO1lBQUM7WUFBWTtZQUFVO1lBQVk7WUFBZTtZQUFZO1NBQWE7UUFDakZDLFNBQVM7SUFDYjtJQUNBQyxRQUFRO1FBQ0pSLE1BQU1DO1FBQ05LLE1BQU07WUFBQztZQUFPO1lBQVk7WUFBYTtTQUFPO1FBQzlDQyxTQUFTO0lBQ2I7SUFDQUUsT0FBTztRQUFFVCxNQUFNQztJQUFPO0lBQ3RCUyxZQUFZO1FBQUVWLE1BQU1MLFNBQVNHLE1BQU0sQ0FBQ2EsS0FBSyxDQUFDQyxRQUFRO1FBQUVDLEtBQUs7SUFBUTtBQUNyRSxHQUFHO0lBQUVDLFlBQVk7QUFBSztBQUV0QkMsT0FBT0MsT0FBTyxHQUFHckIsU0FBU3NCLE1BQU0sQ0FBQ0MsSUFBSSxJQUFJdkIsU0FBU3dCLEtBQUssQ0FBQyxRQUFRdEIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdXNlclxcRGVza3RvcFxcUzJfTW90b3J6X0NSTVxcc3JjXFxtb2RlbHNcXExlYWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5cclxuY29uc3QgTGVhZFNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBwaG9uZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICB2ZWhpY2xlOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgc291cmNlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGVudW06IFsnd2hhdHNhcHAnLCAnd2Fsa2luJywgJ3JlZmVycmFsJywgJ29sZGN1c3RvbWVyJywgJ2NhbXBhaWduJywgJ3NlcnZpY2VkdWUnXSxcclxuICAgICAgICBkZWZhdWx0OiAnd2Fsa2luJ1xyXG4gICAgfSxcclxuICAgIHN0YXR1czoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBlbnVtOiBbJ25ldycsICdmb2xsb3d1cCcsICdjb252ZXJ0ZWQnLCAnbG9zdCddLFxyXG4gICAgICAgIGRlZmF1bHQ6ICduZXcnXHJcbiAgICB9LFxyXG4gICAgbm90ZXM6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICBhc3NpZ25lZFRvOiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnU3RhZmYnIH0sXHJcbn0sIHsgdGltZXN0YW1wczogdHJ1ZSB9KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWxzLkxlYWQgfHwgbW9uZ29vc2UubW9kZWwoJ0xlYWQnLCBMZWFkU2NoZW1hKTtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsIkxlYWRTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwicGhvbmUiLCJ2ZWhpY2xlIiwic291cmNlIiwiZW51bSIsImRlZmF1bHQiLCJzdGF0dXMiLCJub3RlcyIsImFzc2lnbmVkVG8iLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwidGltZXN0YW1wcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb2RlbHMiLCJMZWFkIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/models/Lead.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fleads%2Froute&page=%2Fapi%2Fleads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fleads%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();