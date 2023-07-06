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
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(), settings = _a[0], setEditorSettings = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            setLoading(true);
            (0, services_1.editorSettings)(id === "new" ? undefined : id, localStorage.getItem("lang") || "en")
                .then(function (res) { return res.json(); })
                .then(function (data) {
                setEditorSettings(data.data);
                setLoading(false);
            });
        }
    }, [id]);
    var onSubmit = (0, react_1.useCallback)(function (data) {
        setLoading(true);
        (0, services_1.updateContent)(data, id === "new" ? undefined : id)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
            if (data.success) {
                setLoading(false);
                navigate("/editor/".concat(data.data.id));
            }
        });
    }, []);
    if (!settings) {
        return react_1.default.createElement("p", null, "loading...");
    }
    return (settings && (react_1.default.createElement(h5p_react_1.ContextlessEditor, { onError: function (err) { return console.error(err); }, state: settings, allowSameOrigin: true, onSubmit: onSubmit, loading: loading })));
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=editor.js.map