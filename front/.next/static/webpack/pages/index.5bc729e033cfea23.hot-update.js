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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../redux/actions */ \"./redux/actions.js\");\n/* harmony import */ var _redux_states_users_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../redux/states/users/reducer */ \"./redux/states/users/reducer.tsx\");\n/* harmony import */ var _redux_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../redux/hooks */ \"./redux/hooks.ts\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/Home.module.css */ \"./styles/Home.module.css\");\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6__);\nvar _this = undefined;\n\n/* React */ \n\n\n\n/* Components */ \n/* CSS */ \nvar _s = $RefreshSig$();\nvar Home = function(props) {\n    _s();\n    /* useState */ var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''), username = ref[0], setUsername = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''), password = ref1[0], setPassword = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isLoggedIn = ref2[0], setIsLoggedIn = ref2[1];\n    /* Redux */ var dispatch = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch)();\n    //const user = useSelector(state => state.userState.user);\n    var user = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppSelector)(_redux_states_users_reducer__WEBPACK_IMPORTED_MODULE_3__.selectUser);\n    //const { user, setCurrentUser } = props\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        console.log('user: ', user);\n        if (isLoggedIn) {\n            console.log('logged in');\n        } else {\n            console.log('not logged in');\n        }\n    }, [\n        isLoggedIn\n    ]);\n    var handleSubmit = function(e) {\n        e.preventDefault();\n        setIsLoggedIn(true);\n        dispatch((0,_redux_actions__WEBPACK_IMPORTED_MODULE_2__.setCurrentUser)({\n            username: username\n        }));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Cemex Fix\"\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Cemex Fix web application - developed by DFuture\"\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 55,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 56,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().main),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().left),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().title),\n                            children: \"Cemex Fix\"\n                        }, void 0, false, {\n                            fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                            lineNumber: 62,\n                            columnNumber: 11\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 61,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().center)\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().right),\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().form__container),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().title),\n                                    children: \"Welcome to Cemex Fix\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                    lineNumber: 74,\n                                    columnNumber: 13\n                                }, _this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                    onSubmit: function(e) {\n                                        handleSubmit(e);\n                                    },\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().form),\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                type: \"text\",\n                                                id: \"username\",\n                                                placeholder: \"username\",\n                                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),\n                                                onChange: function(e) {\n                                                    setUsername(e.target.value);\n                                                }\n                                            }, void 0, false, {\n                                                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                                lineNumber: 77,\n                                                columnNumber: 17\n                                            }, _this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                type: \"password\",\n                                                id: \"password\",\n                                                placeholder: \"password\",\n                                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().input),\n                                                onChange: function(e) {\n                                                    setPassword(e.target.value);\n                                                }\n                                            }, void 0, false, {\n                                                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                                lineNumber: 78,\n                                                columnNumber: 17\n                                            }, _this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                                href: \"#forgot_password\",\n                                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().forgot__label),\n                                                children: \"Forgot password?\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                                lineNumber: 79,\n                                                columnNumber: 17\n                                            }, _this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                                className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_6___default().submit__btn),\n                                                type: \"submit\",\n                                                children: \"Login\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                                lineNumber: 80,\n                                                columnNumber: 17\n                                            }, _this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                        lineNumber: 76,\n                                        columnNumber: 15\n                                    }, _this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                                    lineNumber: 75,\n                                    columnNumber: 13\n                                }, _this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                            lineNumber: 73,\n                            columnNumber: 11\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n                lineNumber: 59,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/abrahamcepedaoseguera/Documents/ITC-Projects.nosync/Cemex/front/pages/index.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"WqJopJrbELyDWDqB+jFTdJOU9RE=\", false, function() {\n    return [\n        _redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch,\n        _redux_hooks__WEBPACK_IMPORTED_MODULE_4__.useAppSelector\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVO2dEQUFDQyxXQUFXLEVBQUMsQ0FBVTtnREFBQ3JCLFNBQVMsRUFBRWpCLHNFQUFZO2dEQUFFdUMsUUFBUSxFQUFFLFFBQVFuQyxDQUFQVSxDQUFDLEVBQUssQ0FBQ1Y7b0RBQUFBLFdBQVcsQ0FBQ1UsQ0FBQyxDQUFDMEIsTUFBTSxDQUFDQyxLQUFLO2dEQUFDLENBQUM7Ozs7Ozt3SEFDOUhOLENBQUs7Z0RBQUNDLElBQUksRUFBQyxDQUFVO2dEQUFDQyxFQUFFLEVBQUMsQ0FBVTtnREFBQ0MsV0FBVyxFQUFDLENBQVU7Z0RBQUNyQixTQUFTLEVBQUVqQixzRUFBWTtnREFBRXVDLFFBQVEsRUFBRSxRQUFRakMsQ0FBUFEsQ0FBQyxFQUFLLENBQUNSO29EQUFBQSxXQUFXLENBQUNRLENBQUMsQ0FBQzBCLE1BQU0sQ0FBQ0MsS0FBSztnREFBQyxDQUFDOzs7Ozs7d0hBQ2xJQyxDQUFDO2dEQUFDakIsSUFBSSxFQUFDLENBQWtCO2dEQUFDUixTQUFTLEVBQUVqQiw4RUFBb0I7MERBQUUsQ0FBZ0I7Ozs7Ozt3SEFDM0U0QyxDQUFNO2dEQUFDM0IsU0FBUyxFQUFFakIsNEVBQWtCO2dEQUFFb0MsSUFBSSxFQUFDLENBQVE7MERBQUMsQ0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVExRSxDQUFDO0dBcEVLbkMsSUFBSTs7UUFPU0gsd0RBQWM7UUFFbEJELHdEQUFjOzs7S0FUdkJJLElBQUk7QUFzRVYsK0RBQWVBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXgudHN4PzA3ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnXG5cbi8qIFJlYWN0ICovXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG4vKiBSZWR1eCAqL1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgeyBzZXRDdXJyZW50VXNlciB9IGZyb20gXCIuLi9yZWR1eC9hY3Rpb25zXCJcbmltcG9ydCB7IHNlbGVjdFVzZXIgfSBmcm9tIFwiLi4vcmVkdXgvc3RhdGVzL3VzZXJzL3JlZHVjZXJcIlxuaW1wb3J0IHsgdXNlQXBwU2VsZWN0b3IsIHVzZUFwcERpc3BhdGNoIH0gZnJvbSAnLi4vcmVkdXgvaG9va3MnXG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbi8qIENvbXBvbmVudHMgKi9cbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJ1xuaW1wb3J0IExvZ28gZnJvbSAnL2Zhdmljb24ucG5nJ1xuLyogQ1NTICovXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL3N0eWxlcy9Ib21lLm1vZHVsZS5jc3MnXG5cbmNvbnN0IEhvbWU6IE5leHRQYWdlID0gKHByb3BzKSA9PiB7XG4gIC8qIHVzZVN0YXRlICovXG4gIGNvbnN0IFt1c2VybmFtZSwgc2V0VXNlcm5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2lzTG9nZ2VkSW4sIHNldElzTG9nZ2VkSW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8qIFJlZHV4ICovXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlQXBwRGlzcGF0Y2goKVxuICAvL2NvbnN0IHVzZXIgPSB1c2VTZWxlY3RvcihzdGF0ZSA9PiBzdGF0ZS51c2VyU3RhdGUudXNlcik7XG4gIGNvbnN0IHVzZXIgPSB1c2VBcHBTZWxlY3RvcihzZWxlY3RVc2VyKVxuICAvL2NvbnN0IHsgdXNlciwgc2V0Q3VycmVudFVzZXIgfSA9IHByb3BzXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygndXNlcjogJywgdXNlcilcbiAgICBpZiAoaXNMb2dnZWRJbikge1xuICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnbm90IGxvZ2dlZCBpbicpO1xuICAgIH1cbiAgfSwgW2lzTG9nZ2VkSW5dKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50PEhUTUxGb3JtRWxlbWVudD4pID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0SXNMb2dnZWRJbih0cnVlKTtcbiAgICBkaXNwYXRjaChzZXRDdXJyZW50VXNlcih7IHVzZXJuYW1lIH0pKTtcbiAgfTtcblxuXG5cblxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5DZW1leCBGaXg8L3RpdGxlPlxuICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiQ2VtZXggRml4IHdlYiBhcHBsaWNhdGlvbiAtIGRldmVsb3BlZCBieSBERnV0dXJlXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8bWFpbiBjbGFzc05hbWU9e3N0eWxlcy5tYWlufT5cbiAgICAgICAgey8qIExlZnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubGVmdH0+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT5cbiAgICAgICAgICAgIENlbWV4IEZpeFxuICAgICAgICAgIDwvaDE+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDZW50ZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VudGVyfT48L2Rpdj4gXG5cbiAgICAgICAgey8qIFJpZ2h0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnJpZ2h0fT5cbiAgICAgICAgICB7LyogRm9ybSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvcm1fX2NvbnRhaW5lcn0+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPXtzdHlsZXMudGl0bGV9PldlbGNvbWUgdG8gQ2VtZXggRml4PC9oMj5cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXsoZSkgPT4ge2hhbmRsZVN1Ym1pdChlKX19PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmZvcm19PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidXNlcm5hbWVcIiBwbGFjZWhvbGRlcj0ndXNlcm5hbWUnIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fSBvbkNoYW5nZT17KGUpID0+IHtzZXRVc2VybmFtZShlLnRhcmdldC52YWx1ZSl9fS8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj0ncGFzc3dvcmQnIGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fSBvbkNoYW5nZT17KGUpID0+IHtzZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9fS8+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj0nI2ZvcmdvdF9wYXNzd29yZCcgY2xhc3NOYW1lPXtzdHlsZXMuZm9yZ290X19sYWJlbH0+Rm9yZ290IHBhc3N3b3JkPzwvYT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLnN1Ym1pdF9fYnRufSB0eXBlPSdzdWJtaXQnPkxvZ2luPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInNldEN1cnJlbnRVc2VyIiwic2VsZWN0VXNlciIsInVzZUFwcFNlbGVjdG9yIiwidXNlQXBwRGlzcGF0Y2giLCJIZWFkIiwic3R5bGVzIiwiSG9tZSIsInByb3BzIiwidXNlcm5hbWUiLCJzZXRVc2VybmFtZSIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJpc0xvZ2dlZEluIiwic2V0SXNMb2dnZWRJbiIsImRpc3BhdGNoIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJkaXYiLCJjbGFzc05hbWUiLCJjb250YWluZXIiLCJ0aXRsZSIsIm1ldGEiLCJuYW1lIiwiY29udGVudCIsImxpbmsiLCJyZWwiLCJocmVmIiwibWFpbiIsImxlZnQiLCJoMSIsImNlbnRlciIsInJpZ2h0IiwiZm9ybV9fY29udGFpbmVyIiwiaDIiLCJmb3JtIiwib25TdWJtaXQiLCJpbnB1dCIsInR5cGUiLCJpZCIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJ2YWx1ZSIsImEiLCJmb3Jnb3RfX2xhYmVsIiwiYnV0dG9uIiwic3VibWl0X19idG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ })

});