"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var react_1 = require("react");
var services_1 = require("../services");
var react_router_dom_1 = require("react-router-dom");
var page = function () {
    var _a = (0, react_1.useState)({
        email: "admin@escolalms.com",
        password: "secret",
        loading: false,
    }), state = _a[0], setState = _a[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onSubmit = (0, react_1.useCallback)(function (e) {
        e.preventDefault();
        (0, services_1.login)(state.email, state.password)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.success) {
                localStorage.setItem("token", data.data.token);
                window.dispatchEvent(new Event("storageLocal"));
                navigate("/index");
            }
        })
            .catch(function (er) { return console.error(er); });
    }, [state]);
    return (<div>
            <form onSubmit={onSubmit} className="pure-form">
                <fieldset>
                    <legend>Login form</legend>

                    <input placeholder="email" title="email" type="text" name="email" value={state.email} onChange={function (e) {
            return setState(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
            });
        }}/>
                    <input placeholder="password" title="password" type="text" name="password" value={state.password} onChange={function (e) {
            return setState(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[e.target.name] = e.target.value, _a)));
            });
        }}/>
                    <button type="submit" className="pure-button pure-button-primary">
                        submit
                    </button>
                </fieldset>
            </form>
        </div>);
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=login.js.map