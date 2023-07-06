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
exports.Navigation = void 0;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var services_1 = require("../services");
var LANGS = {
    en: {
        logout: "Logout",
        welcome: "h5p-laravel Autorentool",
        login: "Login",
        contentList: "Content List",
        createNewElement: "Create New Element",
        libraries: "Libraries",
        config: "Config",
        uploadNew: "Upload New",
    },
    pl: {
        login: "Zaloguj",
        contentList: "Lista zawartości",
        createNewElement: "Utwórz nowy element",
        libraries: "Biblioteki",
        config: "Konfiguracja",
        uploadNew: "Wgraj nowy",
    },
    de: {
        logout: "Abmelden",
        login: "Anmelden",
        contentList: "Content Liste",
        createNewElement: "Neuen Content erstellen",
        libraries: "Bibliotheken",
        config: "Konfiguration",
        uploadNew: "Importieren",
    },
};
var getLangItem = function (key) {
    var lang = localStorage.getItem("lang") || "en";
    return LANGS[lang][key] || LANGS["en"][key];
};
var navlinkStyle = function (_a) {
    var isActive = _a.isActive;
    return isActive ? { textDecoration: "underline" } : {};
};
var Navigation = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(window.localStorage.getItem("token") !== null), loggedIn = _b[0], setLoggedIn = _b[1];
    var _c = (0, react_1.useState)(window.localStorage.getItem("lang") || "en"), lang = _c[0], setLang = _c[1];
    var logout = function () {
        window.localStorage.removeItem("token");
        window.dispatchEvent(new Event("storageLocal"));
        navigate("/", { replace: true });
    };
    var changeLang = (0, react_1.useCallback)(function (lang) {
        setLang(lang);
        window.localStorage.setItem("lang", lang);
        window.location.reload();
    }, []);
    (0, react_1.useEffect)(function () {
        var onStorage = function () {
            if (window.localStorage.getItem("token") !== null) {
                setLoading(true);
                (0, services_1.userMe)()
                    .then(function (response) {
                    if (response.ok) {
                        setLoggedIn(true);
                    }
                    else {
                        logout();
                    }
                })
                    .catch(function (error) {
                    logout();
                })
                    .finally(function () {
                    setLoading(false);
                });
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        };
        window.addEventListener("storage", onStorage);
        window.addEventListener("storageLocal", onStorage);
        onStorage();
        return function () {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("storageLocal", onStorage);
        };
    }, []);
    return (react_1.default.createElement("header", { className: "pure-u-1-1" },
        react_1.default.createElement("h1", null, getLangItem("welcome")),
        loading && react_1.default.createElement("p", null, "loading..."),
        loggedIn ? (react_1.default.createElement("nav", { className: "pure-menu pure-menu-horizontal", style: { display: "flex", justifyContent: "space-between" } },
            react_1.default.createElement("ul", { className: "pure-menu-list" },
                react_1.default.createElement("li", { className: "pure-menu-item" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { style: navlinkStyle, className: "pure-menu-link", to: "index" }, getLangItem("contentList"))),
                react_1.default.createElement("li", { className: "pure-menu-item" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { style: navlinkStyle, className: "pure-menu-link", to: "editor/new" }, getLangItem("createNewElement"))),
                react_1.default.createElement("li", { className: "pure-menu-item" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { style: navlinkStyle, className: "pure-menu-link", to: "libraries" }, getLangItem("libraries"))),
                react_1.default.createElement("li", { className: "pure-menu-item" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { style: navlinkStyle, className: "pure-menu-link", to: "config" }, getLangItem("config"))),
                react_1.default.createElement("li", { className: "pure-menu-item" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { style: navlinkStyle, className: "pure-menu-link", to: "upload" }, getLangItem("uploadNew"))),
                react_1.default.createElement("li", { className: "pure-menu-item" },
                    react_1.default.createElement(react_router_dom_1.NavLink, { style: navlinkStyle, className: "pure-menu-link", to: "/", onClick: logout }, getLangItem("logout")))),
            react_1.default.createElement("form", { className: "pure-form" },
                react_1.default.createElement("label", null, "Lang: "),
                react_1.default.createElement("select", { value: lang, onChange: function (e) { return changeLang(e.target.value); } },
                    react_1.default.createElement("option", { value: "en" }, "en"),
                    react_1.default.createElement("option", { value: "pl" }, "pl"),
                    react_1.default.createElement("option", { value: "de" }, "de"))))) : (react_1.default.createElement("nav", { className: "pure-menu pure-menu-horizontal" },
            react_1.default.createElement("li", { className: "pure-menu-item" },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: "pure-menu-link", style: navlinkStyle, to: "login" }, getLangItem("login"))))),
        react_1.default.createElement("hr", null)));
};
exports.Navigation = Navigation;
exports.default = exports.Navigation;
//# sourceMappingURL=navigation.js.map