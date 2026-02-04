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
exports.id = "app/api/attendance/route";
exports.ids = ["app/api/attendance/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fattendance%2Froute&page=%2Fapi%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fattendance%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fattendance%2Froute&page=%2Fapi%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fattendance%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_attendance_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/attendance/route.js */ \"(rsc)/./src/app/api/attendance/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/attendance/route\",\n        pathname: \"/api/attendance\",\n        filename: \"route\",\n        bundlePath: \"app/api/attendance/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\S2_Motorz_CRM\\\\src\\\\app\\\\api\\\\attendance\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_attendance_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdHRlbmRhbmNlJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdHRlbmRhbmNlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXR0ZW5kYW5jZSUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q1MyX01vdG9yel9DUk0lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNEZXNrdG9wJTVDUzJfTW90b3J6X0NSTSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNEI7QUFDekc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxTMl9Nb3RvcnpfQ1JNXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF0dGVuZGFuY2VcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F0dGVuZGFuY2Uvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdHRlbmRhbmNlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdHRlbmRhbmNlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXFMyX01vdG9yel9DUk1cXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXR0ZW5kYW5jZVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fattendance%2Froute&page=%2Fapi%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fattendance%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/attendance/route.js":
/*!*****************************************!*\
  !*** ./src/app/api/attendance/route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./src/lib/mongodb.js\");\n/* harmony import */ var _models_Attendance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/models/Attendance */ \"(rsc)/./src/models/Attendance.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\nasync function GET(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        const { searchParams } = new URL(request.url);\n        const date = searchParams.get('date');\n        const staffId = searchParams.get('staffId');\n        let query = {};\n        if (date) query.date = date;\n        if (staffId) query.staffId = staffId;\n        const attendance = await _models_Attendance__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find(query);\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(attendance);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: 'Failed to fetch attendance'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        const body = await request.json();\n        const { staffId, date, status } = body;\n        const attendance = await _models_Attendance__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findOneAndUpdate({\n            staffId,\n            date\n        }, {\n            status\n        }, {\n            upsert: true,\n            new: true\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json(attendance);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: 'Failed to save attendance'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdHRlbmRhbmNlL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXNDO0FBQ087QUFDRjtBQUVwQyxlQUFlRyxJQUFJQyxPQUFPO0lBQzdCLElBQUk7UUFDQSxNQUFNSix3REFBU0E7UUFDZixNQUFNLEVBQUVLLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7UUFDNUMsTUFBTUMsT0FBT0gsYUFBYUksR0FBRyxDQUFDO1FBQzlCLE1BQU1DLFVBQVVMLGFBQWFJLEdBQUcsQ0FBQztRQUVqQyxJQUFJRSxRQUFRLENBQUM7UUFDYixJQUFJSCxNQUFNRyxNQUFNSCxJQUFJLEdBQUdBO1FBQ3ZCLElBQUlFLFNBQVNDLE1BQU1ELE9BQU8sR0FBR0E7UUFFN0IsTUFBTUUsYUFBYSxNQUFNWCwwREFBVUEsQ0FBQ1ksSUFBSSxDQUFDRjtRQUN6QyxPQUFPVCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDRjtJQUM3QixFQUFFLE9BQU9HLE9BQU87UUFDWixPQUFPYixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBNkIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEY7QUFDSjtBQUVPLGVBQWVDLEtBQUtiLE9BQU87SUFDOUIsSUFBSTtRQUNBLE1BQU1KLHdEQUFTQTtRQUNmLE1BQU1rQixPQUFPLE1BQU1kLFFBQVFVLElBQUk7UUFDL0IsTUFBTSxFQUFFSixPQUFPLEVBQUVGLElBQUksRUFBRVEsTUFBTSxFQUFFLEdBQUdFO1FBRWxDLE1BQU1OLGFBQWEsTUFBTVgsMERBQVVBLENBQUNrQixnQkFBZ0IsQ0FDaEQ7WUFBRVQ7WUFBU0Y7UUFBSyxHQUNoQjtZQUFFUTtRQUFPLEdBQ1Q7WUFBRUksUUFBUTtZQUFNQyxLQUFLO1FBQUs7UUFHOUIsT0FBT25CLHFEQUFZQSxDQUFDWSxJQUFJLENBQUNGO0lBQzdCLEVBQUUsT0FBT0csT0FBTztRQUNaLE9BQU9iLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUE0QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuRjtBQUNKIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHVzZXJcXERlc2t0b3BcXFMyX01vdG9yel9DUk1cXHNyY1xcYXBwXFxhcGlcXGF0dGVuZGFuY2VcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYkNvbm5lY3QgZnJvbSAnQC9saWIvbW9uZ29kYic7XHJcbmltcG9ydCBBdHRlbmRhbmNlIGZyb20gJ0AvbW9kZWxzL0F0dGVuZGFuY2UnO1xyXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZGJDb25uZWN0KCk7XHJcbiAgICAgICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBzZWFyY2hQYXJhbXMuZ2V0KCdkYXRlJyk7XHJcbiAgICAgICAgY29uc3Qgc3RhZmZJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YWZmSWQnKTtcclxuXHJcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge307XHJcbiAgICAgICAgaWYgKGRhdGUpIHF1ZXJ5LmRhdGUgPSBkYXRlO1xyXG4gICAgICAgIGlmIChzdGFmZklkKSBxdWVyeS5zdGFmZklkID0gc3RhZmZJZDtcclxuXHJcbiAgICAgICAgY29uc3QgYXR0ZW5kYW5jZSA9IGF3YWl0IEF0dGVuZGFuY2UuZmluZChxdWVyeSk7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGF0dGVuZGFuY2UpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBhdHRlbmRhbmNlJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgICAgICBjb25zdCB7IHN0YWZmSWQsIGRhdGUsIHN0YXR1cyB9ID0gYm9keTtcclxuXHJcbiAgICAgICAgY29uc3QgYXR0ZW5kYW5jZSA9IGF3YWl0IEF0dGVuZGFuY2UuZmluZE9uZUFuZFVwZGF0ZShcclxuICAgICAgICAgICAgeyBzdGFmZklkLCBkYXRlIH0sXHJcbiAgICAgICAgICAgIHsgc3RhdHVzIH0sXHJcbiAgICAgICAgICAgIHsgdXBzZXJ0OiB0cnVlLCBuZXc6IHRydWUgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhdHRlbmRhbmNlKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gc2F2ZSBhdHRlbmRhbmNlJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJkYkNvbm5lY3QiLCJBdHRlbmRhbmNlIiwiTmV4dFJlc3BvbnNlIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImRhdGUiLCJnZXQiLCJzdGFmZklkIiwicXVlcnkiLCJhdHRlbmRhbmNlIiwiZmluZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIlBPU1QiLCJib2R5IiwiZmluZE9uZUFuZFVwZGF0ZSIsInVwc2VydCIsIm5ldyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/attendance/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.js":
/*!****************************!*\
  !*** ./src/lib/mongodb.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nconsole.log('Connecting to MongoDB at:', MONGODB_URI);\nif (!MONGODB_URI) {\n    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');\n}\n/**\r\n * Global is used here to maintain a cached connection across hot reloads\r\n * in development. This prevents connections from growing exponentially\r\n * during API Route usage.\r\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUMzQ0csUUFBUUMsR0FBRyxDQUFDLDZCQUE2Qko7QUFFekMsSUFBSSxDQUFDQSxhQUFhO0lBQ2QsTUFBTSxJQUFJSyxNQUFNO0FBQ3BCO0FBRUE7Ozs7Q0FJQyxHQUNELElBQUlDLFNBQVNDLE9BQU9SLFFBQVE7QUFFNUIsSUFBSSxDQUFDTyxRQUFRO0lBQ1RBLFNBQVNDLE9BQU9SLFFBQVEsR0FBRztRQUFFUyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUMzRDtBQUVBLGVBQWVDO0lBQ1gsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2IsT0FBT0YsT0FBT0UsSUFBSTtJQUN0QjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ2pCLE1BQU1FLE9BQU87WUFDVEMsZ0JBQWdCO1FBQ3BCO1FBRUFOLE9BQU9HLE9BQU8sR0FBR1YsdURBQWdCLENBQUNDLGFBQWFXLE1BQU1HLElBQUksQ0FBQyxDQUFDZjtZQUN2RCxPQUFPQTtRQUNYO0lBQ0o7SUFFQSxJQUFJO1FBQ0FPLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ3RDLEVBQUUsT0FBT00sR0FBRztRQUNSVCxPQUFPRyxPQUFPLEdBQUc7UUFDakIsTUFBTU07SUFDVjtJQUVBLE9BQU9ULE9BQU9FLElBQUk7QUFDdEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxEZXNrdG9wXFxTMl9Nb3RvcnpfQ1JNXFxzcmNcXGxpYlxcbW9uZ29kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc29sZS5sb2coJ0Nvbm5lY3RpbmcgdG8gTW9uZ29EQiBhdDonLCBNT05HT0RCX1VSSSk7XHJcblxyXG5pZiAoIU1PTkdPREJfVVJJKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgaXMgdXNlZCBoZXJlIHRvIG1haW50YWluIGEgY2FjaGVkIGNvbm5lY3Rpb24gYWNyb3NzIGhvdCByZWxvYWRzXHJcbiAqIGluIGRldmVsb3BtZW50LiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGZyb20gZ3Jvd2luZyBleHBvbmVudGlhbGx5XHJcbiAqIGR1cmluZyBBUEkgUm91dGUgdXNhZ2UuXHJcbiAqL1xyXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xyXG5cclxuaWYgKCFjYWNoZWQpIHtcclxuICAgIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgICAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb25nb29zZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0Iiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.js\n");

/***/ }),

/***/ "(rsc)/./src/models/Attendance.js":
/*!**********************************!*\
  !*** ./src/models/Attendance.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst AttendanceSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    staffId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: 'Staff',\n        required: true\n    },\n    date: {\n        type: String,\n        required: true\n    },\n    status: {\n        type: String,\n        enum: [\n            'present',\n            'absent',\n            'halfday'\n        ],\n        required: true\n    }\n}, {\n    timestamps: true\n});\n// Compound index to prevent duplicate attendance for same staff on same day\nAttendanceSchema.index({\n    staffId: 1,\n    date: 1\n}, {\n    unique: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Attendance || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Attendance', AttendanceSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL0F0dGVuZGFuY2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLG1CQUFtQixJQUFJRCx3REFBZSxDQUFDO0lBQ3pDRyxTQUFTO1FBQUVDLE1BQU1KLHdEQUFlLENBQUNLLEtBQUssQ0FBQ0MsUUFBUTtRQUFFQyxLQUFLO1FBQVNDLFVBQVU7SUFBSztJQUM5RUMsTUFBTTtRQUFFTCxNQUFNTTtRQUFRRixVQUFVO0lBQUs7SUFDckNHLFFBQVE7UUFBRVAsTUFBTU07UUFBUUUsTUFBTTtZQUFDO1lBQVc7WUFBVTtTQUFVO1FBQUVKLFVBQVU7SUFBSztBQUNuRixHQUFHO0lBQ0NLLFlBQVk7QUFDaEI7QUFFQSw0RUFBNEU7QUFDNUVaLGlCQUFpQmEsS0FBSyxDQUFDO0lBQUVYLFNBQVM7SUFBR00sTUFBTTtBQUFFLEdBQUc7SUFBRU0sUUFBUTtBQUFLO0FBRS9ELGlFQUFlZix3REFBZSxDQUFDaUIsVUFBVSxJQUFJakIscURBQWMsQ0FBQyxjQUFjQyxpQkFBaUJBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdXNlclxcRGVza3RvcFxcUzJfTW90b3J6X0NSTVxcc3JjXFxtb2RlbHNcXEF0dGVuZGFuY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmNvbnN0IEF0dGVuZGFuY2VTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIHN0YWZmSWQ6IHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdTdGFmZicsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBkYXRlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIHN0YXR1czogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsncHJlc2VudCcsICdhYnNlbnQnLCAnaGFsZmRheSddLCByZXF1aXJlZDogdHJ1ZSB9XHJcbn0sIHtcclxuICAgIHRpbWVzdGFtcHM6IHRydWUsXHJcbn0pO1xyXG5cclxuLy8gQ29tcG91bmQgaW5kZXggdG8gcHJldmVudCBkdXBsaWNhdGUgYXR0ZW5kYW5jZSBmb3Igc2FtZSBzdGFmZiBvbiBzYW1lIGRheVxyXG5BdHRlbmRhbmNlU2NoZW1hLmluZGV4KHsgc3RhZmZJZDogMSwgZGF0ZTogMSB9LCB7IHVuaXF1ZTogdHJ1ZSB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5BdHRlbmRhbmNlIHx8IG1vbmdvb3NlLm1vZGVsKCdBdHRlbmRhbmNlJywgQXR0ZW5kYW5jZVNjaGVtYSk7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIkF0dGVuZGFuY2VTY2hlbWEiLCJTY2hlbWEiLCJzdGFmZklkIiwidHlwZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJyZXF1aXJlZCIsImRhdGUiLCJTdHJpbmciLCJzdGF0dXMiLCJlbnVtIiwidGltZXN0YW1wcyIsImluZGV4IiwidW5pcXVlIiwibW9kZWxzIiwiQXR0ZW5kYW5jZSIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/models/Attendance.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fattendance%2Froute&page=%2Fapi%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fattendance%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();