"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page = void 0;
var react_1 = require("react");
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
    return (<span style={{ position: "relative" }} onMouseEnter={function () { return setShowTooltip(true); }} onMouseLeave={function () { return setShowTooltip(false); }}>
            {showTooltip && !canDelete && (<span style={{
                position: "absolute",
                left: "110%",
                fontSize: "10px",
                minWidth: "100px",
            }}>
                    {deleteReason}
                </span>)}
            <button onClick={onClick} disabled={!canDelete} className="pure-button" title={deleteReason}>
                delete
            </button>
        </span>);
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
        return (<div>
                <form className="pure-form">
                    <fieldset>
                        <legend>Filter</legend>
                        <label>
                            <input type="checkbox" onChange={function (e) {
                return onFilter(e.target.checked ? "runnable" : "all");
            }}/>{" "}
                            Show only `runnable` Libraries
                        </label>
                    </fieldset>
                </form>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>title</th>
                            <th>runnable</th>
                            <th>major_version</th>
                            <th>minor_version</th>
                            <th># dependencies</th>
                            <th># of content</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (<tr>
                                <td colSpan={8}>empty</td>
                            </tr>)}
                        {data
                .filter(function (lib) {
                if (filter === "runnable") {
                    return lib.runnable;
                }
                return true;
            })
                .map(function (h5p) {
                return (<tr key={h5p.id}>
                                        <td>{h5p.name}</td>
                                        <td>{h5p.title}</td>
                                        <td>
                                            {h5p.runnable ? "TRUE" : "FALSE"}
                                        </td>
                                        <td>{h5p.major_version}</td>
                                        <td>{h5p.minor_version}</td>
                                        <td>{h5p.requiredLibrariesCount}</td>
                                        <td>{h5p.contentsCount}</td>

                                        <td>
                                            <DeleteButton lib={h5p} onClick={function () { return onDelete(h5p.id); }}/>
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
//# sourceMappingURL=libraries.js.map