"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var services_1 = require("../services");
var h5p_react_1 = require("@escolalms/h5p-react");
var page = function () {
    var uuid = (0, react_router_dom_1.useParams)().uuid;
    var _a = (0, react_1.useState)(), settings = _a[0], setSettings = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        if (uuid) {
            setLoading(true);
            (0, services_1.contentSettings)(uuid, localStorage.getItem("lang") || "en")
                .then(function (res) { return res.json(); })
                .then(function (data) {
                setSettings(data.data);
                setLoading(false);
            });
        }
    }, [uuid]);
    if (!settings) {
        return react_1.default.createElement("p", null, "loading...");
    }
    if (!uuid) {
        return react_1.default.createElement("p", null, "error: uuid is not set");
    }
    if (settings && uuid && uuid !== "") {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(h5p_react_1.ContextlessPlayer, { onXAPI: function (e) { return console.log("xAPI event", e); }, state: settings, loading: loading }),
            react_1.default.createElement("hr", null),
            react_1.default.createElement("p", null,
                react_1.default.createElement("pre", null, "Open Developer Tools Console to see xAPI events from this content"))));
    }
    return react_1.default.createElement("pre", null, "error");
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=player.js.map