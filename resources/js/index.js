"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
//import App from "./App";
var react_router_dom_1 = require("react-router-dom");
var index_1 = require("./pages/index");
var login_1 = require("./pages/login");
var editor_1 = require("./pages/editor");
var player_1 = require("./pages/player");
var home_1 = require("./pages/home");
var libraries_1 = require("./pages/libraries");
var config_1 = require("./pages/config");
var upload_1 = require("./pages/upload");
var navigation_1 = require("./components/navigation");
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_router_dom_1.BrowserRouter>
        <div className="pure-u">
            <navigation_1.default />
            <react_router_dom_1.Routes>
                <react_router_dom_1.Route path="/" element={<home_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/index" element={<index_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/login" element={<login_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/editor/:id" element={<editor_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/player/:uuid" element={<player_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/libraries" element={<libraries_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/config" element={<config_1.default />}></react_router_dom_1.Route>
                <react_router_dom_1.Route path="/upload" element={<upload_1.default />}></react_router_dom_1.Route>
            </react_router_dom_1.Routes>
        </div>
    </react_router_dom_1.BrowserRouter>);
//# sourceMappingURL=index.js.map