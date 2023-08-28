import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    listContent,
    PaginatedMetaList,
    H5PContent,
    deleteContent,
} from "../services";

const LANGS = {
    de: {
        actions: "Aktionen",
        delete: "Löschen",
        edit: "Bearbeiten",
        library: "Bibliothek",
        page: "Seite",
        preview: "Vorschau",
        title: "Titel",
    },
    en: {
        actions: "Actions",
        delete: "Delete",
        edit: "Edit",
        library: "Library",
        page: "Page",
        preview: "Preview",
        title: "Title-UEBERSETZUNG",
    },
};

const getLangItem = (key: string) => {
    const lang = localStorage.getItem("lang") || "en";
    return LANGS[lang][key] || LANGS["en"][key];
};

export const page = () => {
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<PaginatedMetaList<H5PContent>>();

    const fetchData = useCallback((page: number) => {
        listContent(page)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setData(data);
                }
            });
    }, []);

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const onDelete = useCallback(
        (id: number) => {
            if (confirm("Are you sure?")) {
                deleteContent(id)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            fetchData(page);
                        }
                    });
            }
        },
        [page]
    );

    if (data) {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>uuid</th>
                            <th>
                                {getLangItem("title")}
                            </th>
                            <th>
                                {getLangItem("libraries")}
                            </th>
                            <th>
                                {getLangItem("actions")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length === 0 && (
                            <tr>
                                <td colSpan={5}>empty</td>
                            </tr>
                        )}
                        {data.data.map((h5p) => (
                            <tr key={h5p.id}>
                                <td>{h5p.id}</td>
                                <td>{h5p.uuid}</td>
                                <td>{h5p.title}</td>
                                <td>{h5p.library.title}</td>
                                <td>
                                    <Link
                                        className="pure-button"
                                        to={`/editor/${h5p.id}`}
                                    >
                                        {getLangItem("edit")}
                                    </Link>{" "}
                                    <Link
                                        className="pure-button"
                                        to={`/player/${h5p.uuid}`}
                                    >
                                        {getLangItem("preview")}
                                    </Link>{" "}
                                    <button
                                        className="pure-button"
                                        onClick={() => onDelete(h5p.id)}
                                    >
                                        {getLangItem("delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <hr />
                    <form className="pure-form">
                        <label>{getLangItem("page")}</label>
                        <select
                            onChange={(e) => setPage(Number(e.target.value))}
                        >
                            {Array.from({ length: data.meta.last_page }).map(
                                (el, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                )
                            )}
                        </select>
                    </form>
                </div>
            </div>
        );
    }

    return <p>loading</p>;
};

export default page;
