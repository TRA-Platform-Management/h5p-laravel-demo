"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var react_1 = require("react");
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
    return (<form className="pure-form">
            {loading && <p>Uploading...</p>}
            <input disabled={loading} onChange={onChange} accept=".h5p" type="file" placeholder="upload new h5p file"/>
        </form>);
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=upload.js.map