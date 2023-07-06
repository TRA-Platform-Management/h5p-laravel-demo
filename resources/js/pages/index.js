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
var page = function () {
    var _a = (0, react_1.useState)(1), page = _a[0], setPage = _a[1];
    var _b = (0, react_1.useState)(), data = _b[0], setData = _b[1];
    var fetchData = (0, react_1.useCallback)(function (page) {
        (0, services_1.listContent)(page)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.success) {
                setData(data);
            }
        });
    }, []);
    (0, react_1.useEffect)(function () {
        fetchData(page);
    }, [page]);
    var onDelete = (0, react_1.useCallback)(function (id) {
        if (confirm("Are you sure?")) {
            (0, services_1.deleteContent)(id)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                if (data.success) {
                    fetchData(page);
                }
            });
        }
    }, [page]);
    if (data) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("table", { className: "pure-table" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "#"),
                        react_1.default.createElement("th", null, "uuid"),
                        react_1.default.createElement("th", null, "Title"),
                        react_1.default.createElement("th", null, "Library"),
                        react_1.default.createElement("th", null, "Actions"))),
                react_1.default.createElement("tbody", null,
                    data.data.length === 0 && (react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { colSpan: 5 }, "empty"))),
                    data.data.map(function (h5p) { return (react_1.default.createElement("tr", { key: h5p.id },
                        react_1.default.createElement("td", null, h5p.id),
                        react_1.default.createElement("td", null, h5p.uuid),
                        react_1.default.createElement("td", null, h5p.title),
                        react_1.default.createElement("td", null, h5p.library.title),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement(react_router_dom_1.Link, { className: "pure-button", to: "/editor/".concat(h5p.id) }, "edit"),
                            " ",
                            react_1.default.createElement(react_router_dom_1.Link, { className: "pure-button", to: "/player/".concat(h5p.uuid) }, "preview"),
                            " ",
                            react_1.default.createElement("button", { className: "pure-button", onClick: function () { return onDelete(h5p.id); } }, "delete")))); }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("hr", null),
                react_1.default.createElement("form", { className: "pure-form" },
                    react_1.default.createElement("label", null, "page:"),
                    react_1.default.createElement("select", { onChange: function (e) { return setPage(Number(e.target.value)); } }, Array.from({ length: data.meta.last_page }).map(function (el, i) { return (react_1.default.createElement("option", { key: i, value: i + 1 }, i + 1)); }))))));
    }
    return react_1.default.createElement("p", null, "loading");
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=index.js.map