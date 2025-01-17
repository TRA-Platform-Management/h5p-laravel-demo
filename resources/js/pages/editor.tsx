import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editorSettings, updateContent } from "../services";
import {
    EditorSettings,
    H5PEditorContent,
    ContextlessEditor as Editor,
} from "@escolalms/h5p-react";

export const page = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [settings, setEditorSettings] = useState<EditorSettings>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        console.log('[mg]___:)___ resources/js/pages/editor.tsx export const page useEffect localStorage.getItem("lang"): ');
        console.log(localStorage.getItem("lang"));

        if (id) {
            setLoading(true);
            editorSettings(
                id === "new" ? undefined : id,
                localStorage.getItem("lang") || "de"
            )
                .then((res) => res.json())
                .then((data) => {
                    setEditorSettings(data.data);
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = useCallback((data: H5PEditorContent) => {
        setLoading(true);
        updateContent(data, id === "new" ? undefined : id)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    setLoading(false);
                    navigate(`/editor/${data.data.id}`);
                }
            });
    }, []);

    if (!settings) {
        return <p>loading...</p>;
    }

    console.log('' +
        '[mg]___:)___ resources/js/pages/editor.tsx settings: ');console.log(settings);


    return (
        settings && (
            <Editor
                onError={(err) => console.error(err)}
                state={settings}
                allowSameOrigin
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    );
};

export default page;
