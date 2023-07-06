"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
//import App from "./App";
var react_router_dom_1 = require("react-router-dom");
var index_1 = __importDefault(require("./pages/index"));
var login_1 = __importDefault(require("./pages/login"));
var editor_1 = __importDefault(require("./pages/editor"));
var player_1 = __importDefault(require("./pages/player"));
var home_1 = __importDefault(require("./pages/home"));
var libraries_1 = __importDefault(require("./pages/libraries"));
var config_1 = __importDefault(require("./pages/config"));
var upload_1 = __importDefault(require("./pages/upload"));
var navigation_1 = __importDefault(require("./components/navigation"));
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement("div", { className: "pure-u" },
        react_1.default.createElement(navigation_1.default, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(home_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/index", element: react_1.default.createElement(index_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(login_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/editor/:id", element: react_1.default.createElement(editor_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/player/:uuid", element: react_1.default.createElement(player_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/libraries", element: react_1.default.createElement(libraries_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/config", element: react_1.default.createElement(config_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/upload", element: react_1.default.createElement(upload_1.default, null) })))));
//# sourceMappingURL=index.js.map