"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../redux/actions */ \"./redux/actions.js\");\n/* harmony import */ var _redux_states_users_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../redux/states/users/reducer */ \"./redux/states/users/reducer.tsx\");\n/* harmony import */ var _redux_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../redux/hooks */ \"./redux/hooks.ts\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/Home.module.css */ \"./styles/Home.module.css\");\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6__);\nvar _this = undefined;\n\n/* React */ \n/* Redux */ \n\n\n/* Components */ \n/* CSS */ \nvar _s = $RefreshSig$();\nvar Home = function(props) {\n    _s();\n    /* useState */ var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''), username = ref[0], setUsername = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''), password = ref1[0], setPassword = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isLoggedIn = ref2[0], setIsLoggedIn = ref2[1];\n    /* Redux */ var dispatch = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch)();\n    //const user = useSelector(state => state.userState.user);\n    var user = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppSelector)(_redux_states_users_reducer__WEBPACK_IMPORTED_MODULE_3__.selectUser);\n    //const { user, setCurrentUser } = props\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        console.log('user: ', user);\n        if (isLoggedIn) {\n            console.log('logged in');\n        } else {\n            console.log('not logged in');\n        }\n    }, [\n        isLoggedIn\n    ]);\n    var handleSubmit = function(e) {\n        e.preventDefault();\n        setIsLoggedIn(true);\n        dispatch((0,_redux_actions__WEBPACK_IMPORTED_MODULE_2__.setCurrentUser)({\n            username: username\n        }));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Cemex Fix\"\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Cemex Fix web application - developed by DFuture\"\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().main),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().form__container),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().title),\n                            children: \"Welcome to Cemex Fix\"\n                        }, void 0, false, {\n                            fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                            lineNumber: 58,\n                            columnNumber: 13\n                        }, _this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                            onSubmit: function(e) {\n                                handleSubmit(e);\n                            },\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().form),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                        type: \"text\",\n                                        id: \"username\",\n                                        placeholder: \"username\",\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),\n                                        onChange: function(e) {\n                                            setUsername(e.target.value);\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                        lineNumber: 61,\n                                        columnNumber: 17\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                        type: \"password\",\n                                        id: \"password\",\n                                        placeholder: \"password\",\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),\n                                        onChange: function(e) {\n                                            setPassword(e.target.value);\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                        lineNumber: 62,\n                                        columnNumber: 17\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                        href: \"#forgot_password\",\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().forgot__label),\n                                        children: \"Forgot password?\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                        lineNumber: 63,\n                                        columnNumber: 17\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().submit__btn),\n                                        type: \"submit\",\n                                        children: \"Login\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                        lineNumber: 64,\n                                        columnNumber: 17\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 15\n                            }, _this)\n                        }, void 0, false, {\n                            fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                            lineNumber: 59,\n                            columnNumber: 13\n                        }, _this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                    lineNumber: 57,\n                    columnNumber: 11\n                }, _this)\n            }, void 0, false, {\n                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                lineNumber: 55,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"WqJopJrbELyDWDqB+jFTdJOU9RE=\", false, function() {\n    return [\n        _redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch,\n        _redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppSelector\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUs7d0NBQUNDLElBQUksRUFBQyxDQUFVO3dDQUFDQyxFQUFFLEVBQUMsQ0FBVTt3Q0FBQ0MsV0FBVyxFQUFDLENBQVU7d0NBQUNqQixTQUFTLEVBQUVqQixzRUFBWTt3Q0FBRW1DLFFBQVEsRUFBRSxRQUFRN0IsQ0FBUFEsQ0FBQyxFQUFLLENBQUNSOzRDQUFBQSxXQUFXLENBQUNRLENBQUMsQ0FBQ3NCLE1BQU0sQ0FBQ0MsS0FBSzt3Q0FBQyxDQUFDOzs7Ozs7Z0hBQ2xJQyxDQUFDO3dDQUFDYixJQUFJLEVBQUMsQ0FBa0I7d0NBQUNSLFNBQVMsRUFBRWpCLDhFQUFvQjtrREFBRSxDQUFnQjs7Ozs7O2dIQUMzRXdDLENBQU07d0NBQUN2QixTQUFTLEVBQUVqQiw0RUFBa0I7d0NBQUVnQyxJQUFJLEVBQUMsQ0FBUTtrREFBQyxDQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTzFFLENBQUM7R0FwREsvQixJQUFJOztRQU9TSCx3REFBYztRQUVsQkQsd0RBQWM7OztLQVR2QkksSUFBSTtBQXNEViwrREFBZUEsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC50c3g/MDdmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRQYWdlIH0gZnJvbSAnbmV4dCdcblxuLyogUmVhY3QgKi9cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbi8qIFJlZHV4ICovXG5pbXBvcnQgeyBzZXRDdXJyZW50VXNlciB9IGZyb20gXCIuLi9yZWR1eC9hY3Rpb25zXCJcbmltcG9ydCB7IHNlbGVjdFVzZXIgfSBmcm9tIFwiLi4vcmVkdXgvc3RhdGVzL3VzZXJzL3JlZHVjZXJcIlxuaW1wb3J0IHsgdXNlQXBwU2VsZWN0b3IsIHVzZUFwcERpc3BhdGNoIH0gZnJvbSAnLi4vcmVkdXgvaG9va3MnXG5cbi8qIENvbXBvbmVudHMgKi9cbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi4vcHVibGljL2xvZ28ucG5nJ1xuXG4vKiBDU1MgKi9cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcydcblxuY29uc3QgSG9tZTogTmV4dFBhZ2UgPSAocHJvcHMpID0+IHtcbiAgLyogdXNlU3RhdGUgKi9cbiAgY29uc3QgW3VzZXJuYW1lLCBzZXRVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNMb2dnZWRJbiwgc2V0SXNMb2dnZWRJbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLyogUmVkdXggKi9cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VBcHBEaXNwYXRjaCgpXG4gIC8vY29uc3QgdXNlciA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IHN0YXRlLnVzZXJTdGF0ZS51c2VyKTtcbiAgY29uc3QgdXNlciA9IHVzZUFwcFNlbGVjdG9yKHNlbGVjdFVzZXIpXG4gIC8vY29uc3QgeyB1c2VyLCBzZXRDdXJyZW50VXNlciB9ID0gcHJvcHNcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCd1c2VyOiAnLCB1c2VyKVxuICAgIGlmIChpc0xvZ2dlZEluKSB7XG4gICAgICBjb25zb2xlLmxvZygnbG9nZ2VkIGluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdub3QgbG9nZ2VkIGluJyk7XG4gICAgfVxuICB9LCBbaXNMb2dnZWRJbl0pO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTEZvcm1FbGVtZW50PikgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRJc0xvZ2dlZEluKHRydWUpO1xuICAgIGRpc3BhdGNoKHNldEN1cnJlbnRVc2VyKHsgdXNlcm5hbWUgfSkpO1xuICB9O1xuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPkNlbWV4IEZpeDwvdGl0bGU+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJDZW1leCBGaXggd2ViIGFwcGxpY2F0aW9uIC0gZGV2ZWxvcGVkIGJ5IERGdXR1cmVcIiAvPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxuICAgICAgICAgIHsvKiBGb3JtICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9ybV9fY29udGFpbmVyfT5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+V2VsY29tZSB0byBDZW1leCBGaXg8L2gyPlxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9eyhlKSA9PiB7aGFuZGxlU3VibWl0KGUpfX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZm9ybX0+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ1c2VybmFtZVwiIHBsYWNlaG9sZGVyPSd1c2VybmFtZScgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9IG9uQ2hhbmdlPXsoZSkgPT4ge3NldFVzZXJuYW1lKGUudGFyZ2V0LnZhbHVlKX19Lz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPSdwYXNzd29yZCcgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9IG9uQ2hhbmdlPXsoZSkgPT4ge3NldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX19Lz5cbiAgICAgICAgICAgICAgICA8YSBocmVmPScjZm9yZ290X3Bhc3N3b3JkJyBjbGFzc05hbWU9e3N0eWxlcy5mb3Jnb3RfX2xhYmVsfT5Gb3Jnb3QgcGFzc3dvcmQ/PC9hPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuc3VibWl0X19idG59IHR5cGU9J3N1Ym1pdCc+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L21haW4+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzZXRDdXJyZW50VXNlciIsInNlbGVjdFVzZXIiLCJ1c2VBcHBTZWxlY3RvciIsInVzZUFwcERpc3BhdGNoIiwiSGVhZCIsInN0eWxlcyIsIkhvbWUiLCJwcm9wcyIsInVzZXJuYW1lIiwic2V0VXNlcm5hbWUiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwiaXNMb2dnZWRJbiIsInNldElzTG9nZ2VkSW4iLCJkaXNwYXRjaCIsInVzZXIiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwidGl0bGUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJsaW5rIiwicmVsIiwiaHJlZiIsIm1haW4iLCJmb3JtX19jb250YWluZXIiLCJoMiIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0IiwidHlwZSIsImlkIiwicGxhY2Vob2xkZXIiLCJvbkNoYW5nZSIsInRhcmdldCIsInZhbHVlIiwiYSIsImZvcmdvdF9fbGFiZWwiLCJidXR0b24iLCJzdWJtaXRfX2J0biJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ })

});