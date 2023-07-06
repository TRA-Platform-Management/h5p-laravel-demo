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
var DeleteButton = function (_a) {
    var lib = _a.lib, onClick = _a.onClick;
    var _b = (0, react_1.useState)(false), showTooltip = _b[0], setShowTooltip = _b[1];
    var canDelete = lib.runnable && lib.contentsCount === 0;
    var deleteReason = "Click to delete library";
    if (!lib.runnable) {
        deleteReason = "This library cannot be deleted, because it is used in ".concat(lib.requiredLibrariesCount, " other library");
    }
    if (lib.contentsCount > 0) {
        deleteReason = "This library cannot be deleted, because it is used in ".concat(lib.contentsCount, " content");
    }
    return (react_1.default.createElement("span", { style: { position: "relative" }, onMouseEnter: function () { return setShowTooltip(true); }, onMouseLeave: function () { return setShowTooltip(false); } },
        showTooltip && !canDelete && (react_1.default.createElement("span", { style: {
                position: "absolute",
                left: "110%",
                fontSize: "10px",
                minWidth: "100px",
            } }, deleteReason)),
        react_1.default.createElement("button", { onClick: onClick, disabled: !canDelete, className: "pure-button", title: deleteReason }, "delete")));
};
var page = function () {
    var _a = (0, react_1.useState)(), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)("all"), filter = _b[0], setFilter = _b[1];
    var fetchData = (0, react_1.useCallback)(function () {
        (0, services_1.libraries)()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.success) {
                setData(data.data);
            }
        });
    }, []);
    var onFilter = (0, react_1.useCallback)(function (filter) {
        setFilter(filter);
    }, []);
    var onDelete = (0, react_1.useCallback)(function (id) {
        if (confirm("Are you sure?")) {
            (0, services_1.deleteLibrary)(id)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                if (data.success) {
                    fetchData();
                }
            });
        }
    }, []);
    (0, react_1.useEffect)(function () { return fetchData(); }, []);
    if (data) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("form", { className: "pure-form" },
                react_1.default.createElement("fieldset", null,
                    react_1.default.createElement("legend", null, "Filter"),
                    react_1.default.createElement("label", null,
                        react_1.default.createElement("input", { type: "checkbox", onChange: function (e) {
                                return onFilter(e.target.checked ? "runnable" : "all");
                            } }),
                        " ",
                        "Show only `runnable` Libraries"))),
            react_1.default.createElement("table", { className: "pure-table" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "name"),
                        react_1.default.createElement("th", null, "title"),
                        react_1.default.createElement("th", null, "runnable"),
                        react_1.default.createElement("th", null, "major_version"),
                        react_1.default.createElement("th", null, "minor_version"),
                        react_1.default.createElement("th", null, "# dependencies"),
                        react_1.default.createElement("th", null, "# of content"),
                        react_1.default.createElement("th", null, "actions"))),
                react_1.default.createElement("tbody", null,
                    data.length === 0 && (react_1.default.createElement("tr", null,
                        react_1.default.createElement("td", { colSpan: 8 }, "empty"))),
                    data
                        .filter(function (lib) {
                        if (filter === "runnable") {
                            return lib.runnable;
                        }
                        return true;
                    })
                        .map(function (h5p) {
                        return (react_1.default.createElement("tr", { key: h5p.id },
                            react_1.default.createElement("td", null, h5p.name),
                            react_1.default.createElement("td", null, h5p.title),
                            react_1.default.createElement("td", null, h5p.runnable ? "TRUE" : "FALSE"),
                            react_1.default.createElement("td", null, h5p.major_version),
                            react_1.default.createElement("td", null, h5p.minor_version),
                            react_1.default.createElement("td", null, h5p.requiredLibrariesCount),
                            react_1.default.createElement("td", null, h5p.contentsCount),
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(DeleteButton, { lib: h5p, onClick: function () { return onDelete(h5p.id); } }))));
                    })))));
    }
    return react_1.default.createElement("p", null, "loading");
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=libraries.js.map