"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadH5P = exports.updateConfig = exports.fetchConfig = exports.deleteLibrary = exports.deleteContent = exports.libraries = exports.userMe = exports.listContent = exports.updateContent = exports.contentSettings = exports.editorSettings = exports.login = void 0;
var API_URL = "/api";
var login = function (email, password) {
    return fetch("".concat(API_URL, "/auth/login"), {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: email, password: password, remember_me: 1 }),
    });
};
exports.login = login;
var editorSettings = function (id, lang) {
    if (lang === void 0) { lang = "en"; }
    var url = id
        ? "".concat(API_URL, "/admin/hh5p/editor/").concat(id)
        : "".concat(API_URL, "/admin/hh5p/editor");
    url = lang ? "".concat(url, "?lang=").concat(lang) : url;
    return fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "GET",
    });
};
exports.editorSettings = editorSettings;
var contentSettings = function (uuid, lang) {
    if (lang === void 0) { lang = "en"; }
    var url = "".concat(API_URL, "/hh5p/content/").concat(uuid);
    url = lang ? "".concat(url, "?lang=").concat(lang) : url;
    return fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "GET",
    });
};
exports.contentSettings = contentSettings;
var updateContent = function (data, id) {
    return fetch(id
        ? "".concat(API_URL, "/admin/hh5p/content/").concat(id)
        : "".concat(API_URL, "/admin/hh5p/content"), {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
    });
};
exports.updateContent = updateContent;
var listContent = function (page) {
    if (page === void 0) { page = 1; }
    return fetch(page
        ? "".concat(API_URL, "/admin/hh5p/content?page=").concat(page)
        : "".concat(API_URL, "/admin/hh5p/content"), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
    });
};
exports.listContent = listContent;
var userMe = function () {
    return fetch("".concat(API_URL, "/profile/me"), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "GET",
    });
};
exports.userMe = userMe;
var libraries = function () {
    return fetch("".concat(API_URL, "/admin/hh5p/library"), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "GET",
    });
};
exports.libraries = libraries;
var deleteContent = function (id) {
    return fetch("".concat(API_URL, "/admin/hh5p/content/").concat(id), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "DELETE",
    });
};
exports.deleteContent = deleteContent;
var deleteLibrary = function (id) {
    return fetch("".concat(API_URL, "/admin/hh5p/library/").concat(id), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "DELETE",
    });
};
exports.deleteLibrary = deleteLibrary;
var fetchConfig = function () {
    return fetch("".concat(API_URL, "/admin/config"), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "GET",
    });
};
exports.fetchConfig = fetchConfig;
var updateConfig = function (_a) {
    var key = _a.key, value = _a.value;
    return fetch("".concat(API_URL, "/admin/config"), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "POST",
        body: JSON.stringify({
            config: [
                {
                    key: key,
                    value: value,
                },
            ],
        }),
    });
};
exports.updateConfig = updateConfig;
var uploadH5P = function (file) {
    var formData = new FormData();
    formData.append("h5p_file", file);
    return fetch("".concat(API_URL, "/admin/hh5p/content/upload"), {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer ".concat(localStorage.getItem("token")),
        },
        method: "POST",
        body: formData,
    });
};
exports.uploadH5P = uploadH5P;
//# sourceMappingURL=index.js.map