"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
var react_1 = require("react");
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
    return (<header className="pure-u-1-1">
            <h1>{getLangItem("welcome")}</h1>

            {loading && <p>loading...</p>}
            {loggedIn ? (<nav className="pure-menu pure-menu-horizontal" style={{ display: "flex", justifyContent: "space-between" }}>
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <react_router_dom_1.NavLink style={navlinkStyle} className="pure-menu-link" to="index">
                                {getLangItem("contentList")}
                            </react_router_dom_1.NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <react_router_dom_1.NavLink style={navlinkStyle} className="pure-menu-link" to="editor/new">
                                {getLangItem("createNewElement")}
                            </react_router_dom_1.NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <react_router_dom_1.NavLink style={navlinkStyle} className="pure-menu-link" to="libraries">
                                {getLangItem("libraries")}
                            </react_router_dom_1.NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <react_router_dom_1.NavLink style={navlinkStyle} className="pure-menu-link" to="config">
                                {getLangItem("config")}
                            </react_router_dom_1.NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <react_router_dom_1.NavLink style={navlinkStyle} className="pure-menu-link" to="upload">
                                {getLangItem("uploadNew")}
                            </react_router_dom_1.NavLink>
                        </li>
                        <li className="pure-menu-item">
                            <react_router_dom_1.NavLink style={navlinkStyle} className="pure-menu-link" to="/" onClick={logout}>
                                {getLangItem("logout")}
                            </react_router_dom_1.NavLink>
                        </li>
                    </ul>
                    <form className="pure-form">
                        <label>Lang: </label>

                        <select value={lang} onChange={function (e) { return changeLang(e.target.value); }}>
                            <option value="en">en</option>
                            <option value="pl">pl</option>
                        </select>
                    </form>
                </nav>) : (<nav className="pure-menu pure-menu-horizontal">
                    <li className="pure-menu-item">
                        <react_router_dom_1.NavLink className="pure-menu-link" style={navlinkStyle} to="login">
                            {getLangItem("login")}
                        </react_router_dom_1.NavLink>
                    </li>
                </nav>)}
            <hr />
        </header>);
};
exports.Navigation = Navigation;
exports.default = exports.Navigation;
//# sourceMappingURL=navigation.js.map
