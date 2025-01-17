// @ts-ignore
import React, { useState, useEffect } from "react";
import { Editor, Player, EditorContextProvider } from "@escolalms/h5p-react";

function App() {
    console.log('[mg]___:)___ start resources/js/app.tsx: ');
    const [state, setState] = useState<{
        state: string;
        id?: number;
        lang?: string;
    }>({
        state: "init",
        lang: "de",
    });

    useEffect(() => {
        const onHashChange = () => {
            const newState = {
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
        return () => {
            window.removeEventListener("hashchange", onHashChange);
        };
    }, []);

    return (
        <div className="App">
            <EditorContextProvider
                url="http://api.wellms.localhost/api/admin/hh5p"
                defaultLang="de"
            >
                {state.state === "editor" ? (
                    <Editor
                        id={state.id}
                        onSubmit={(response) => {
                            setState((prevState) => ({
                                ...prevState,
                                id:
                                    typeof response.id === "string"
                                        ? parseInt(response.id)
                                        : response.id,
                            }));
                        }}
                    />
                ) : (
                    <React.Fragment />
                )}

                {state.state === "player" && state.id ? (
                    <Player
                        id={state.id}
                        onXAPI={(data) => console.log(data)}
                    />
                ) : (
                    <React.Fragment />
                )}
            </EditorContextProvider>
        </div>
    );
}

export default App;
