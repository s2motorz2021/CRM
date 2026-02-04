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
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
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

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/login/route.js */ \"(rsc)/./src/app/api/auth/login/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\S2_Motorz_CRM\\\\src\\\\app\\\\api\\\\auth\\\\login\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_S2_Motorz_CRM_src_app_api_auth_login_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q1MyX01vdG9yel9DUk0lNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNEZXNrdG9wJTVDUzJfTW90b3J6X0NSTSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNkI7QUFDMUc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxTMl9Nb3RvcnpfQ1JNXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcbG9naW5cXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvbG9naW4vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL2xvZ2luXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXFMyX01vdG9yel9DUk1cXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/auth/login/route.js":
/*!*****************************************!*\
  !*** ./src/app/api/auth/login/route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./src/lib/mongodb.js\");\n/* harmony import */ var _models_Staff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/Staff */ \"(rsc)/./src/models/Staff.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';\nasync function POST(request) {\n    try {\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const { phone, password } = await request.json();\n        if (!phone || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Phone and password are required'\n            }, {\n                status: 400\n            });\n        }\n        const user = await _models_Staff__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n            phone\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid credentials'\n            }, {\n                status: 401\n            });\n        }\n        const isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(password, user.password);\n        if (!isMatch) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid credentials'\n            }, {\n                status: 401\n            });\n        }\n        // Create Token\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().sign({\n            id: user._id,\n            role: user.role,\n            name: user.name\n        }, JWT_SECRET, {\n            expiresIn: '1d'\n        });\n        const userData = {\n            _id: user._id,\n            name: user.name,\n            phone: user.phone,\n            role: user.role,\n            photo: user.photo,\n            branch: user.branch\n        };\n        const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Login successful',\n            user: userData,\n            token\n        });\n        // Set cookie (optional, but good for security)\n        response.cookies.set('s2_token', token, {\n            httpOnly: true,\n            secure: \"development\" === 'production',\n            sameSite: 'strict',\n            maxAge: 60 * 60 * 24 // 1 day\n        });\n        return response;\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ0w7QUFDSDtBQUNMO0FBQ0M7QUFFL0IsTUFBTUssYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVLElBQUk7QUFFdEMsZUFBZUcsS0FBS0MsT0FBTztJQUM5QixJQUFJO1FBQ0EsTUFBTVIsd0RBQVNBO1FBQ2YsTUFBTSxFQUFFUyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1GLFFBQVFHLElBQUk7UUFFOUMsSUFBSSxDQUFDRixTQUFTLENBQUNDLFVBQVU7WUFDckIsT0FBT1gscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFrQyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDekY7UUFFQSxNQUFNQyxPQUFPLE1BQU1iLHFEQUFLQSxDQUFDYyxPQUFPLENBQUM7WUFBRU47UUFBTTtRQUN6QyxJQUFJLENBQUNLLE1BQU07WUFDUCxPQUFPZixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXNCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUM3RTtRQUVBLE1BQU1HLFVBQVUsTUFBTWQsdURBQWMsQ0FBQ1EsVUFBVUksS0FBS0osUUFBUTtRQUM1RCxJQUFJLENBQUNNLFNBQVM7WUFDVixPQUFPakIscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFzQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDN0U7UUFFQSxlQUFlO1FBQ2YsTUFBTUssUUFBUWYsd0RBQVEsQ0FDbEI7WUFBRWlCLElBQUlOLEtBQUtPLEdBQUc7WUFBRUMsTUFBTVIsS0FBS1EsSUFBSTtZQUFFQyxNQUFNVCxLQUFLUyxJQUFJO1FBQUMsR0FDakRuQixZQUNBO1lBQUVvQixXQUFXO1FBQUs7UUFHdEIsTUFBTUMsV0FBVztZQUNiSixLQUFLUCxLQUFLTyxHQUFHO1lBQ2JFLE1BQU1ULEtBQUtTLElBQUk7WUFDZmQsT0FBT0ssS0FBS0wsS0FBSztZQUNqQmEsTUFBTVIsS0FBS1EsSUFBSTtZQUNmSSxPQUFPWixLQUFLWSxLQUFLO1lBQ2pCQyxRQUFRYixLQUFLYSxNQUFNO1FBQ3ZCO1FBRUEsTUFBTUMsV0FBVzdCLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFDL0JrQixTQUFTO1lBQ1RmLE1BQU1XO1lBQ05QO1FBQ0o7UUFFQSwrQ0FBK0M7UUFDL0NVLFNBQVNFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFlBQVliLE9BQU87WUFDcENjLFVBQVU7WUFDVkMsUUFBUTVCLGtCQUF5QjtZQUNqQzZCLFVBQVU7WUFDVkMsUUFBUSxLQUFLLEtBQUssR0FBRyxRQUFRO1FBQ2pDO1FBRUEsT0FBT1A7SUFDWCxFQUFFLE9BQU9oQixPQUFPO1FBQ1osT0FBT2IscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNaUIsT0FBTztRQUFDLEdBQUc7WUFBRWhCLFFBQVE7UUFBSTtJQUNyRTtBQUNKIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHVzZXJcXERlc2t0b3BcXFMyX01vdG9yel9DUk1cXHNyY1xcYXBwXFxhcGlcXGF1dGhcXGxvZ2luXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSAnQC9saWIvbW9uZ29kYic7XHJcbmltcG9ydCBTdGFmZiBmcm9tICdAL21vZGVscy9TdGFmZic7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAneW91ci1zZWNyZXQta2V5LTEyMyc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGRiQ29ubmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHsgcGhvbmUsIHBhc3N3b3JkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKCFwaG9uZSB8fCAhcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdQaG9uZSBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFN0YWZmLmZpbmRPbmUoeyBwaG9uZSB9KTtcclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNNYXRjaCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIFRva2VuXHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihcclxuICAgICAgICAgICAgeyBpZDogdXNlci5faWQsIHJvbGU6IHVzZXIucm9sZSwgbmFtZTogdXNlci5uYW1lIH0sXHJcbiAgICAgICAgICAgIEpXVF9TRUNSRVQsXHJcbiAgICAgICAgICAgIHsgZXhwaXJlc0luOiAnMWQnIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcclxuICAgICAgICAgICAgX2lkOiB1c2VyLl9pZCxcclxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgICBwaG9uZTogdXNlci5waG9uZSxcclxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxyXG4gICAgICAgICAgICBwaG90bzogdXNlci5waG90byxcclxuICAgICAgICAgICAgYnJhbmNoOiB1c2VyLmJyYW5jaFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcsXHJcbiAgICAgICAgICAgIHVzZXI6IHVzZXJEYXRhLFxyXG4gICAgICAgICAgICB0b2tlblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTZXQgY29va2llIChvcHRpb25hbCwgYnV0IGdvb2QgZm9yIHNlY3VyaXR5KVxyXG4gICAgICAgIHJlc3BvbnNlLmNvb2tpZXMuc2V0KCdzMl90b2tlbicsIHRva2VuLCB7XHJcbiAgICAgICAgICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXHJcbiAgICAgICAgICAgIHNhbWVTaXRlOiAnc3RyaWN0JyxcclxuICAgICAgICAgICAgbWF4QWdlOiA2MCAqIDYwICogMjQgLy8gMSBkYXlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYkNvbm5lY3QiLCJTdGFmZiIsImJjcnlwdCIsImp3dCIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiUE9TVCIsInJlcXVlc3QiLCJwaG9uZSIsInBhc3N3b3JkIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlciIsImZpbmRPbmUiLCJpc01hdGNoIiwiY29tcGFyZSIsInRva2VuIiwic2lnbiIsImlkIiwiX2lkIiwicm9sZSIsIm5hbWUiLCJleHBpcmVzSW4iLCJ1c2VyRGF0YSIsInBob3RvIiwiYnJhbmNoIiwicmVzcG9uc2UiLCJtZXNzYWdlIiwiY29va2llcyIsInNldCIsImh0dHBPbmx5Iiwic2VjdXJlIiwic2FtZVNpdGUiLCJtYXhBZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/login/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/mongodb.js":
/*!****************************!*\
  !*** ./src/lib/mongodb.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nconsole.log('Connecting to MongoDB at:', MONGODB_URI);\nif (!MONGODB_URI) {\n    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');\n}\n/**\r\n * Global is used here to maintain a cached connection across hot reloads\r\n * in development. This prevents connections from growing exponentially\r\n * during API Route usage.\r\n */ let cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL21vbmdvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUMzQ0csUUFBUUMsR0FBRyxDQUFDLDZCQUE2Qko7QUFFekMsSUFBSSxDQUFDQSxhQUFhO0lBQ2QsTUFBTSxJQUFJSyxNQUFNO0FBQ3BCO0FBRUE7Ozs7Q0FJQyxHQUNELElBQUlDLFNBQVNDLE9BQU9SLFFBQVE7QUFFNUIsSUFBSSxDQUFDTyxRQUFRO0lBQ1RBLFNBQVNDLE9BQU9SLFFBQVEsR0FBRztRQUFFUyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUMzRDtBQUVBLGVBQWVDO0lBQ1gsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2IsT0FBT0YsT0FBT0UsSUFBSTtJQUN0QjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ2pCLE1BQU1FLE9BQU87WUFDVEMsZ0JBQWdCO1FBQ3BCO1FBRUFOLE9BQU9HLE9BQU8sR0FBR1YsdURBQWdCLENBQUNDLGFBQWFXLE1BQU1HLElBQUksQ0FBQyxDQUFDZjtZQUN2RCxPQUFPQTtRQUNYO0lBQ0o7SUFFQSxJQUFJO1FBQ0FPLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO0lBQ3RDLEVBQUUsT0FBT00sR0FBRztRQUNSVCxPQUFPRyxPQUFPLEdBQUc7UUFDakIsTUFBTU07SUFDVjtJQUVBLE9BQU9ULE9BQU9FLElBQUk7QUFDdEI7QUFFQSxpRUFBZUUsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFx1c2VyXFxEZXNrdG9wXFxTMl9Nb3RvcnpfQ1JNXFxzcmNcXGxpYlxcbW9uZ29kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgTU9OR09EQl9VUkkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuY29uc29sZS5sb2coJ0Nvbm5lY3RpbmcgdG8gTW9uZ29EQiBhdDonLCBNT05HT0RCX1VSSSk7XHJcblxyXG5pZiAoIU1PTkdPREJfVVJJKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgaXMgdXNlZCBoZXJlIHRvIG1haW50YWluIGEgY2FjaGVkIGNvbm5lY3Rpb24gYWNyb3NzIGhvdCByZWxvYWRzXHJcbiAqIGluIGRldmVsb3BtZW50LiBUaGlzIHByZXZlbnRzIGNvbm5lY3Rpb25zIGZyb20gZ3Jvd2luZyBleHBvbmVudGlhbGx5XHJcbiAqIGR1cmluZyBBUEkgUm91dGUgdXNhZ2UuXHJcbiAqL1xyXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xyXG5cclxuaWYgKCFjYWNoZWQpIHtcclxuICAgIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgICBpZiAoY2FjaGVkLmNvbm4pIHtcclxuICAgICAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYWNoZWQucHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYWNoZWQucHJvbWlzZSA9IG1vbmdvb3NlLmNvbm5lY3QoTU9OR09EQl9VUkksIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb25nb29zZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsImNvbm4iLCJwcm9taXNlIiwiZGJDb25uZWN0Iiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/mongodb.js\n");

/***/ }),

/***/ "(rsc)/./src/models/Staff.js":
/*!*****************************!*\
  !*** ./src/models/Staff.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst StaffSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: true\n    },\n    photo: {\n        type: String,\n        default: '👨‍🔧'\n    },\n    gender: {\n        type: String,\n        enum: [\n            'Male',\n            'Female',\n            'Other'\n        ]\n    },\n    dob: String,\n    doj: String,\n    experience: String,\n    role: {\n        type: String,\n        required: true\n    },\n    branch: {\n        type: String,\n        required: true\n    },\n    phone: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    email: String,\n    bankAccount: String,\n    ifsc: String,\n    aadhaar: String,\n    pan: String,\n    status: {\n        type: String,\n        enum: [\n            'active',\n            'inactive',\n            'on leave'\n        ],\n        default: 'active'\n    },\n    basicSalary: {\n        type: Number,\n        required: true\n    },\n    attendance: [\n        {\n            date: String,\n            status: {\n                type: String,\n                enum: [\n                    'present',\n                    'absent',\n                    'halfday'\n                ]\n            }\n        }\n    ],\n    advances: [\n        {\n            type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n            ref: 'Advance'\n        }\n    ]\n}, {\n    timestamps: true\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Staff || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Staff', StaffSchema));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL1N0YWZmLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxjQUFjLElBQUlELHdEQUFlLENBQUM7SUFDcENHLE1BQU07UUFBRUMsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3JDQyxPQUFPO1FBQUVILE1BQU1DO1FBQVFHLFNBQVM7SUFBUTtJQUN4Q0MsUUFBUTtRQUFFTCxNQUFNQztRQUFRSyxNQUFNO1lBQUM7WUFBUTtZQUFVO1NBQVE7SUFBQztJQUMxREMsS0FBS047SUFDTE8sS0FBS1A7SUFDTFEsWUFBWVI7SUFDWlMsTUFBTTtRQUFFVixNQUFNQztRQUFRQyxVQUFVO0lBQUs7SUFDckNTLFFBQVE7UUFBRVgsTUFBTUM7UUFBUUMsVUFBVTtJQUFLO0lBQ3ZDVSxPQUFPO1FBQUVaLE1BQU1DO1FBQVFDLFVBQVU7UUFBTVcsUUFBUTtJQUFLO0lBQ3BEQyxVQUFVO1FBQUVkLE1BQU1DO1FBQVFDLFVBQVU7SUFBSztJQUN6Q2EsT0FBT2Q7SUFDUGUsYUFBYWY7SUFDYmdCLE1BQU1oQjtJQUNOaUIsU0FBU2pCO0lBQ1RrQixLQUFLbEI7SUFDTG1CLFFBQVE7UUFBRXBCLE1BQU1DO1FBQVFLLE1BQU07WUFBQztZQUFVO1lBQVk7U0FBVztRQUFFRixTQUFTO0lBQVM7SUFDcEZpQixhQUFhO1FBQUVyQixNQUFNc0I7UUFBUXBCLFVBQVU7SUFBSztJQUM1Q3FCLFlBQVk7UUFBQztZQUNUQyxNQUFNdkI7WUFDTm1CLFFBQVE7Z0JBQUVwQixNQUFNQztnQkFBUUssTUFBTTtvQkFBQztvQkFBVztvQkFBVTtpQkFBVTtZQUFDO1FBQ25FO0tBQUU7SUFDRm1CLFVBQVU7UUFBQztZQUNQekIsTUFBTUosd0RBQWUsQ0FBQzhCLEtBQUssQ0FBQ0MsUUFBUTtZQUNwQ0MsS0FBSztRQUNUO0tBQUU7QUFDTixHQUFHO0lBQ0NDLFlBQVk7QUFDaEI7QUFFQSxpRUFBZWpDLHdEQUFlLENBQUNtQyxLQUFLLElBQUluQyxxREFBYyxDQUFDLFNBQVNDLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdXNlclxcRGVza3RvcFxcUzJfTW90b3J6X0NSTVxcc3JjXFxtb2RlbHNcXFN0YWZmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBTdGFmZlNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBwaG90bzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICfwn5Go4oCN8J+UpycgfSxcclxuICAgIGdlbmRlcjogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsnTWFsZScsICdGZW1hbGUnLCAnT3RoZXInXSB9LFxyXG4gICAgZG9iOiBTdHJpbmcsXHJcbiAgICBkb2o6IFN0cmluZyxcclxuICAgIGV4cGVyaWVuY2U6IFN0cmluZyxcclxuICAgIHJvbGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgYnJhbmNoOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgIHBob25lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxyXG4gICAgcGFzc3dvcmQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgZW1haWw6IFN0cmluZyxcclxuICAgIGJhbmtBY2NvdW50OiBTdHJpbmcsXHJcbiAgICBpZnNjOiBTdHJpbmcsXHJcbiAgICBhYWRoYWFyOiBTdHJpbmcsXHJcbiAgICBwYW46IFN0cmluZyxcclxuICAgIHN0YXR1czogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsnYWN0aXZlJywgJ2luYWN0aXZlJywgJ29uIGxlYXZlJ10sIGRlZmF1bHQ6ICdhY3RpdmUnIH0sXHJcbiAgICBiYXNpY1NhbGFyeTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICBhdHRlbmRhbmNlOiBbe1xyXG4gICAgICAgIGRhdGU6IFN0cmluZyxcclxuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ3ByZXNlbnQnLCAnYWJzZW50JywgJ2hhbGZkYXknXSB9XHJcbiAgICB9XSxcclxuICAgIGFkdmFuY2VzOiBbe1xyXG4gICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgICByZWY6ICdBZHZhbmNlJ1xyXG4gICAgfV1cclxufSwge1xyXG4gICAgdGltZXN0YW1wczogdHJ1ZSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuU3RhZmYgfHwgbW9uZ29vc2UubW9kZWwoJ1N0YWZmJywgU3RhZmZTY2hlbWEpO1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJTdGFmZlNjaGVtYSIsIlNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJwaG90byIsImRlZmF1bHQiLCJnZW5kZXIiLCJlbnVtIiwiZG9iIiwiZG9qIiwiZXhwZXJpZW5jZSIsInJvbGUiLCJicmFuY2giLCJwaG9uZSIsInVuaXF1ZSIsInBhc3N3b3JkIiwiZW1haWwiLCJiYW5rQWNjb3VudCIsImlmc2MiLCJhYWRoYWFyIiwicGFuIiwic3RhdHVzIiwiYmFzaWNTYWxhcnkiLCJOdW1iZXIiLCJhdHRlbmRhbmNlIiwiZGF0ZSIsImFkdmFuY2VzIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInRpbWVzdGFtcHMiLCJtb2RlbHMiLCJTdGFmZiIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/models/Staff.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/bcryptjs","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.js&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5CS2_Motorz_CRM&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();