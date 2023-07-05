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
exports.page = exports.UpdateEntry = void 0;
var react_1 = require("react");
var services_1 = require("../services");
var UpdateEntry = function (_a) {
    var value = _a.value, onUpdate = _a.onUpdate, _b = _a.loading, loading = _b === void 0 ? false : _b;
    switch (typeof value.value) {
        case "string":
            return (<input disabled={loading} type="text" value={value.value} onChange={function (e) { return onUpdate(e.target.value); }}/>);
        case "number":
            return (<input disabled={loading} type="number" value={value.value} onChange={function (e) { return onUpdate(Number(e.target.value)); }}/>);
        case "boolean":
            return (<input disabled={loading} type="checkbox" checked={value.value} onChange={function (e) { return onUpdate(e.target.checked); }}/>);
        default:
            return <react_1.default.Fragment />;
    }
    return <react_1.default.Fragment />;
};
exports.UpdateEntry = UpdateEntry;
var page = function () {
    var _a = (0, react_1.useState)(), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var fetchData = (0, react_1.useCallback)(function () {
        setLoading(true);
        (0, services_1.fetchConfig)()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.success) {
                setData(data.data);
            }
        })
            .finally(function () { return setLoading(false); });
    }, []);
    var onUpdate = (0, react_1.useCallback)(function (key, value) {
        setData(function (prevData) {
            var _a;
            if (prevData) {
                return __assign(__assign({}, prevData), { hh5p: __assign(__assign({}, prevData.hh5p), (_a = {}, _a[key] = __assign(__assign({}, prevData.hh5p[key]), { value: value }), _a)) });
            }
        });
        if (data) {
            var full_key = data.hh5p[key].full_key;
            setLoading(true);
            (0, services_1.updateConfig)({ key: full_key, value: value }).finally(function () {
                return setLoading(false);
            });
        }
    }, [data]);
    (0, react_1.useEffect)(function () {
        fetchData();
    }, []);
    if (data) {
        return (<div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>key</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.hh5p &&
                Object.entries(data.hh5p).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (<tr key={key}>
                                    <td>{key}</td>
                                    <td>
                                        <exports.UpdateEntry loading={loading} value={value} onUpdate={function (newValue) {
                            onUpdate(key, newValue);
                        }}/>
                                    </td>
                                </tr>);
                })}
                    </tbody>
                </table>
            </div>);
    }
    return <p>loading</p>;
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=config.js.map