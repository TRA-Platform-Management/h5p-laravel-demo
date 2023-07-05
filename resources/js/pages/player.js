"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var react_1 = require("react");
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
        return <p>loading...</p>;
    }
    if (!uuid) {
        return <p>error: uuid is not set</p>;
    }
    if (settings && uuid && uuid !== "") {
        return (<div>
                <h5p_react_1.ContextlessPlayer onXAPI={function (e) { return console.log("xAPI event", e); }} state={settings} loading={loading}/>
                <hr />
                <p>
                    <pre>
                        Open Developer Tools Console to see xAPI events from
                        this content
                    </pre>
                </p>
            </div>);
    }
    return <pre>error</pre>;
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=player.js.map