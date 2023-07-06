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
var services_1 = require("../services");
var react_router_dom_1 = require("react-router-dom");
var page = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var onChange = (0, react_1.useCallback)(function (e) {
        setLoading(true);
        e.target.files &&
            e.target.files[0] &&
            (0, services_1.uploadH5P)(e.target.files[0])
                .then(function (res) { return res.json(); })
                .then(function (data) {
                if (data.success) {
                    navigate("/player/".concat(data.data.uuid), {
                        replace: true,
                    });
                }
            })
                .finally(function () {
                setLoading(false);
            });
    }, []);
    return (react_1.default.createElement("form", { className: "pure-form" },
        loading && react_1.default.createElement("p", null, "Uploading..."),
        react_1.default.createElement("input", { disabled: loading, onChange: onChange, accept: ".h5p", type: "file", placeholder: "upload new h5p file" })));
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=upload.js.map