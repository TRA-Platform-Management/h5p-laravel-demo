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
var react_1 = require("react");
var h5p_react_1 = require("@escolalms/h5p-react");
function App() {
    console.log("hi");
    var _a = (0, react_1.useState)({
        state: "init",
        lang: "pl",
    }), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        var onHashChange = function () {
            var newState = {
                state: window.location.hash.includes("player")
                    ? "player"
                    : window.location.hash.includes("editor")
                        ? "editor"
                        : "init",
                id: window.location.hash.includes("id=")
                    ? parseInt(window.location.hash.split("id=")[1])
                    : undefined,
            };
            setState(newState);
        };
        window.addEventListener("hashchange", onHashChange);
        onHashChange();
        return function () {
            window.removeEventListener("hashchange", onHashChange);
        };
    }, []);
    return (<div className="App">
            <h5p_react_1.EditorContextProvider url="http://api.wellms.localhost/api/admin/hh5p" defaultLang="pl">
                {state.state === "editor" ? (<h5p_react_1.Editor id={state.id} onSubmit={function (response) {
                setState(function (prevState) { return (__assign(__assign({}, prevState), { id: typeof response.id === "string"
                        ? parseInt(response.id)
                        : response.id })); });
            }}/>) : (<react_1.default.Fragment />)}

                {state.state === "player" && state.id ? (<h5p_react_1.Player id={state.id} onXAPI={function (data) { return console.log(data); }}/>) : (<react_1.default.Fragment />)}
            </h5p_react_1.EditorContextProvider>
        </div>);
}
exports.default = App;
//# sourceMappingURL=app.js.map