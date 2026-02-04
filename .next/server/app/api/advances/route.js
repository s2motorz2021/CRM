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
exports.id = "app/api/advances/route";
exports.ids = ["app/api/advances/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadvances%2Froute&page=%2Fapi%2Fadvances%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadvances%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadvances%2Froute&page=%2Fapi%2Fadvances%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadvances%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_advances_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/advances/route.js */ \"(rsc)/./src/app/api/advances/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/advances/route\",\n        pathname: \"/api/advances\",\n        filename: \"route\",\n        bundlePath: \"app/api/advances/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\S2_Motorz_CRM\\\\src\\\\app\\\\api\\\\advances\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_advances_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZHZhbmNlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWR2YW5jZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZHZhbmNlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q1MyX01vdG9yel9DUk0lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNEZXNrdG9wJTVDUzJfTW90b3J6X0NSTSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEI7QUFDdkc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxTMl9Nb3RvcnpfQ1JNXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFkdmFuY2VzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZHZhbmNlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkdmFuY2VzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZHZhbmNlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxTMl9Nb3RvcnpfQ1JNXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFkdmFuY2VzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadvances%2Froute&page=%2Fapi%2Fadvances%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadvances%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/advances/route.js":
/*!***************************************!*\
  !*** ./src/app/api/advances/route.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./src/lib/mongodb.js\");\n/* harmony import */ var _models_Advance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/Advance */ \"(rsc)/./src/models/Advance.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\nasync function GET() {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        const advances = await _models_Advance__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find({}).sort({\n            createdAt: -1\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(advances);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: 'Failed to fetch advances'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        const body = await request.json();\n        if (body._id) {\n            const updatedAdvance = await _models_Advance__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findByIdAndUpdate(body._id, body, {\n                new: true\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(updatedAdvance);\n        } else {\n            const newAdvance = await _models_Advance__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create(body);\n            return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(newAdvance, {\n                status: 201\n            });\n        }\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: 'Failed to save advance'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZHZhbmNlcy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzQztBQUNDO0FBQ0k7QUFFcEMsZUFBZUc7SUFDbEIsSUFBSTtRQUNBLE1BQU1ILHdEQUFTQTtRQUNmLE1BQU1JLFdBQVcsTUFBTUgsdURBQU9BLENBQUNJLElBQUksQ0FBQyxDQUFDLEdBQUdDLElBQUksQ0FBQztZQUFFQyxXQUFXLENBQUM7UUFBRTtRQUM3RCxPQUFPTCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDSjtJQUM3QixFQUFFLE9BQU9LLE9BQU87UUFDWixPQUFPUCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMkIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDbEY7QUFDSjtBQUVPLGVBQWVDLEtBQUtDLE9BQU87SUFDOUIsSUFBSTtRQUNBLE1BQU1aLHdEQUFTQTtRQUNmLE1BQU1hLE9BQU8sTUFBTUQsUUFBUUosSUFBSTtRQUUvQixJQUFJSyxLQUFLQyxHQUFHLEVBQUU7WUFDVixNQUFNQyxpQkFBaUIsTUFBTWQsdURBQU9BLENBQUNlLGlCQUFpQixDQUFDSCxLQUFLQyxHQUFHLEVBQUVELE1BQU07Z0JBQUVJLEtBQUs7WUFBSztZQUNuRixPQUFPZixxREFBWUEsQ0FBQ00sSUFBSSxDQUFDTztRQUM3QixPQUFPO1lBQ0gsTUFBTUcsYUFBYSxNQUFNakIsdURBQU9BLENBQUNrQixNQUFNLENBQUNOO1lBQ3hDLE9BQU9YLHFEQUFZQSxDQUFDTSxJQUFJLENBQUNVLFlBQVk7Z0JBQUVSLFFBQVE7WUFBSTtRQUN2RDtJQUNKLEVBQUUsT0FBT0QsT0FBTztRQUNaLE9BQU9QLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF5QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNoRjtBQUNKIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHVzZXJcXERlc2t0b3BcXFMyX01vdG9yel9DUk1cXHNyY1xcYXBwXFxhcGlcXGFkdmFuY2VzXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGJDb25uZWN0IGZyb20gJ0AvbGliL21vbmdvZGInO1xyXG5pbXBvcnQgQWR2YW5jZSBmcm9tICdAL21vZGVscy9BZHZhbmNlJztcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZGJDb25uZWN0KCk7XHJcbiAgICAgICAgY29uc3QgYWR2YW5jZXMgPSBhd2FpdCBBZHZhbmNlLmZpbmQoe30pLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhZHZhbmNlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIGFkdmFuY2VzJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKGJvZHkuX2lkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRBZHZhbmNlID0gYXdhaXQgQWR2YW5jZS5maW5kQnlJZEFuZFVwZGF0ZShib2R5Ll9pZCwgYm9keSwgeyBuZXc6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih1cGRhdGVkQWR2YW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3QWR2YW5jZSA9IGF3YWl0IEFkdmFuY2UuY3JlYXRlKGJvZHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obmV3QWR2YW5jZSwgeyBzdGF0dXM6IDIwMSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIHNhdmUgYWR2YW5jZScgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiZGJDb25uZWN0IiwiQWR2YW5jZSIsIk5leHRSZXNwb25zZSIsIkdFVCIsImFkdmFuY2VzIiwiZmluZCIsInNvcnQiLCJjcmVhdGVkQXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJfaWQiLCJ1cGRhdGVkQWR2YW5jZSIsImZpbmRCeUlkQW5kVXBkYXRlIiwibmV3IiwibmV3QWR2YW5jZSIsImNyZWF0ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/advances/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.js":
/*!****************************!*\
  !*** ./src/lib/mongodb.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nconsole.log('Connecting to MongoDB at:', MONGODB_URI);\nif (!MONGODB_URI) {\n    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');\n}\n/**\r\n * Global is used here to maintain a cached connection across hot reloads\r\n * in development. This prevents connections from growing exponentially\r\n * during API Route usage.\r\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUMzQ0csUUFBUUMsR0FBRyxDQUFDLDZCQUE2Qko7QUFFekMsSUFBSSxDQUFDQSxhQUFhO0lBQ2QsTUFBTSxJQUFJSyxNQUFNO0FBQ3BCO0FBRUE7Ozs7Q0FJQyxHQUNELElBQUlDLFNBQVNDLE9BQU9SLFFBQVE7QUFFNUIsSUFBSSxDQUFDTyxRQUFRO0lBQ1RBLFNBQVNDLE9BQU9SLFFBQVEsR0FBRztRQUFFUyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUMzRDtBQUVBLGVBQWVDO0lBQ1gsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2IsT0FBT0YsT0FBT0UsSUFBSTtJQUN0QjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ2pCLE1BQU1FLE9BQU87WUFDVEMsZ0JBQWdCO1FBQ3BCO1FBRUFOLE9BQU9HLE9BQU8sR0FBR1YsdURBQWdCLENBQUNDLGFBQWFXLE1BQU1HLElBQUksQ0FBQyxDQUFDZjtZQUN2RCxPQUFPQTtRQUNYO0lBQ0o7SUFFQSxJQUFJO1FBQ0FPLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ3RDLEVBQUUsT0FBT00sR0FBRztRQUNSVCxPQUFPRyxPQUFPLEdBQUc7UUFDakIsTUFBTU07SUFDVjtJQUVBLE9BQU9ULE9BQU9FLElBQUk7QUFDdEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxEZXNrdG9wXFxTMl9Nb3RvcnpfQ1JNXFxzcmNcXGxpYlxcbW9uZ29kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc29sZS5sb2coJ0Nvbm5lY3RpbmcgdG8gTW9uZ29EQiBhdDonLCBNT05HT0RCX1VSSSk7XHJcblxyXG5pZiAoIU1PTkdPREJfVVJJKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgaXMgdXNlZCBoZXJlIHRvIG1haW50YWluIGEgY2FjaGVkIGNvbm5lY3Rpb24gYWNyb3NzIGhvdCByZWxvYWRzXHJcbiAqIGluIGRldmVsb3BtZW50LiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGZyb20gZ3Jvd2luZyBleHBvbmVudGlhbGx5XHJcbiAqIGR1cmluZyBBUEkgUm91dGUgdXNhZ2UuXHJcbiAqL1xyXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xyXG5cclxuaWYgKCFjYWNoZWQpIHtcclxuICAgIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgICAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb25nb29zZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0Iiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.js\n");

/***/ }),

/***/ "(rsc)/./src/models/Advance.js":
/*!*******************************!*\
  !*** ./src/models/Advance.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst AdvanceSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    staffId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: 'Staff',\n        required: true\n    },\n    staffName: String,\n    branch: String,\n    amount: {\n        type: Number,\n        required: true\n    },\n    reason: String,\n    requestedDate: {\n        type: String,\n        default: ()=>new Date().toISOString().split('T')[0]\n    },\n    requestedBy: String,\n    status: {\n        type: String,\n        enum: [\n            'requested',\n            'approved',\n            'rejected',\n            'closed'\n        ],\n        default: 'requested'\n    },\n    approvedBy: String,\n    approvedDate: String,\n    disbursementMode: String,\n    disbursementDate: String,\n    repaymentType: {\n        type: String,\n        enum: [\n            'emi',\n            'onetime'\n        ],\n        default: 'onetime'\n    },\n    emiAmount: {\n        type: Number,\n        default: 0\n    },\n    totalRepaid: {\n        type: Number,\n        default: 0\n    },\n    outstanding: {\n        type: Number,\n        required: true\n    },\n    repayments: [\n        {\n            amount: Number,\n            date: String,\n            method: String\n        }\n    ]\n}, {\n    timestamps: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Advance || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Advance', AdvanceSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL0FkdmFuY2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGdCQUFnQixJQUFJRCx3REFBZSxDQUFDO0lBQ3RDRyxTQUFTO1FBQUVDLE1BQU1KLHdEQUFlLENBQUNLLEtBQUssQ0FBQ0MsUUFBUTtRQUFFQyxLQUFLO1FBQVNDLFVBQVU7SUFBSztJQUM5RUMsV0FBV0M7SUFDWEMsUUFBUUQ7SUFDUkUsUUFBUTtRQUFFUixNQUFNUztRQUFRTCxVQUFVO0lBQUs7SUFDdkNNLFFBQVFKO0lBQ1JLLGVBQWU7UUFBRVgsTUFBTU07UUFBUU0sU0FBUyxJQUFNLElBQUlDLE9BQU9DLFdBQVcsR0FBR0MsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQUM7SUFDckZDLGFBQWFWO0lBQ2JXLFFBQVE7UUFBRWpCLE1BQU1NO1FBQVFZLE1BQU07WUFBQztZQUFhO1lBQVk7WUFBWTtTQUFTO1FBQUVOLFNBQVM7SUFBWTtJQUNwR08sWUFBWWI7SUFDWmMsY0FBY2Q7SUFDZGUsa0JBQWtCZjtJQUNsQmdCLGtCQUFrQmhCO0lBQ2xCaUIsZUFBZTtRQUFFdkIsTUFBTU07UUFBUVksTUFBTTtZQUFDO1lBQU87U0FBVTtRQUFFTixTQUFTO0lBQVU7SUFDNUVZLFdBQVc7UUFBRXhCLE1BQU1TO1FBQVFHLFNBQVM7SUFBRTtJQUN0Q2EsYUFBYTtRQUFFekIsTUFBTVM7UUFBUUcsU0FBUztJQUFFO0lBQ3hDYyxhQUFhO1FBQUUxQixNQUFNUztRQUFRTCxVQUFVO0lBQUs7SUFDNUN1QixZQUFZO1FBQUM7WUFDVG5CLFFBQVFDO1lBQ1JtQixNQUFNdEI7WUFDTnVCLFFBQVF2QjtRQUNaO0tBQUU7QUFDTixHQUFHO0lBQ0N3QixZQUFZO0FBQ2hCO0FBRUEsaUVBQWVsQyx3REFBZSxDQUFDb0MsT0FBTyxJQUFJcEMscURBQWMsQ0FBQyxXQUFXQyxjQUFjQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHVzZXJcXERlc2t0b3BcXFMyX01vdG9yel9DUk1cXHNyY1xcbW9kZWxzXFxBZHZhbmNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBBZHZhbmNlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICBzdGFmZklkOiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnU3RhZmYnLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgc3RhZmZOYW1lOiBTdHJpbmcsXHJcbiAgICBicmFuY2g6IFN0cmluZyxcclxuICAgIGFtb3VudDogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICByZWFzb246IFN0cmluZyxcclxuICAgIHJlcXVlc3RlZERhdGU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAoKSA9PiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSB9LFxyXG4gICAgcmVxdWVzdGVkQnk6IFN0cmluZyxcclxuICAgIHN0YXR1czogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsncmVxdWVzdGVkJywgJ2FwcHJvdmVkJywgJ3JlamVjdGVkJywgJ2Nsb3NlZCddLCBkZWZhdWx0OiAncmVxdWVzdGVkJyB9LFxyXG4gICAgYXBwcm92ZWRCeTogU3RyaW5nLFxyXG4gICAgYXBwcm92ZWREYXRlOiBTdHJpbmcsXHJcbiAgICBkaXNidXJzZW1lbnRNb2RlOiBTdHJpbmcsXHJcbiAgICBkaXNidXJzZW1lbnREYXRlOiBTdHJpbmcsXHJcbiAgICByZXBheW1lbnRUeXBlOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydlbWknLCAnb25ldGltZSddLCBkZWZhdWx0OiAnb25ldGltZScgfSxcclxuICAgIGVtaUFtb3VudDogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAgfSxcclxuICAgIHRvdGFsUmVwYWlkOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9LFxyXG4gICAgb3V0c3RhbmRpbmc6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgcmVwYXltZW50czogW3tcclxuICAgICAgICBhbW91bnQ6IE51bWJlcixcclxuICAgICAgICBkYXRlOiBTdHJpbmcsXHJcbiAgICAgICAgbWV0aG9kOiBTdHJpbmdcclxuICAgIH1dXHJcbn0sIHtcclxuICAgIHRpbWVzdGFtcHM6IHRydWUsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLkFkdmFuY2UgfHwgbW9uZ29vc2UubW9kZWwoJ0FkdmFuY2UnLCBBZHZhbmNlU2NoZW1hKTtcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiQWR2YW5jZVNjaGVtYSIsIlNjaGVtYSIsInN0YWZmSWQiLCJ0eXBlIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInJlcXVpcmVkIiwic3RhZmZOYW1lIiwiU3RyaW5nIiwiYnJhbmNoIiwiYW1vdW50IiwiTnVtYmVyIiwicmVhc29uIiwicmVxdWVzdGVkRGF0ZSIsImRlZmF1bHQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsInJlcXVlc3RlZEJ5Iiwic3RhdHVzIiwiZW51bSIsImFwcHJvdmVkQnkiLCJhcHByb3ZlZERhdGUiLCJkaXNidXJzZW1lbnRNb2RlIiwiZGlzYnVyc2VtZW50RGF0ZSIsInJlcGF5bWVudFR5cGUiLCJlbWlBbW91bnQiLCJ0b3RhbFJlcGFpZCIsIm91dHN0YW5kaW5nIiwicmVwYXltZW50cyIsImRhdGUiLCJtZXRob2QiLCJ0aW1lc3RhbXBzIiwibW9kZWxzIiwiQWR2YW5jZSIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/models/Advance.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadvances%2Froute&page=%2Fapi%2Fadvances%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadvances%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();