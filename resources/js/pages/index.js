"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var react_1 = require("react");
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
        return (<div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>uuid</th>
                            <th>Title</th>
                            <th>Library</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 && (<tr>
                                <td colSpan={5}>empty</td>
                            </tr>)}
                        {data.data.map(function (h5p) { return (<tr key={h5p.id}>
                                <td>{h5p.id}</td>
                                <td>{h5p.uuid}</td>
                                <td>{h5p.title}</td>
                                <td>{h5p.library.title}</td>
                                <td>
                                    <react_router_dom_1.Link className="pure-button" to={"/editor/".concat(h5p.id)}>
                                        edit
                                    </react_router_dom_1.Link>{" "}
                                    <react_router_dom_1.Link className="pure-button" to={"/player/".concat(h5p.uuid)}>
                                        preview
                                    </react_router_dom_1.Link>{" "}
                                    <button className="pure-button" onClick={function () { return onDelete(h5p.id); }}>
                                        delete
                                    </button>
                                </td>
                            </tr>); })}
                    </tbody>
                </table>
                <div>
                    <hr />
                    <form className="pure-form">
                        <label>page:</label>
                        <select onChange={function (e) { return setPage(Number(e.target.value)); }}>
                            {Array.from({ length: data.meta.last_page }).map(function (el, i) { return (<option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>); })}
                        </select>
                    </form>
                </div>
            </div>);
    }
    return <p>loading</p>;
};
exports.page = page;
exports.default = exports.page;
//# sourceMappingURL=index.js.map