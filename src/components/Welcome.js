import { useState, useEffect } from "react";
import Article from "./Article"

const serverURL = "https://bridge-america-server.onrender.com/"

export default function Welcome() {
    const [markdown, setMarkdown] = useState(" ")

    const write = terms => setMarkdown(
        "# Welcome to America\n\n### Here are somethings you might want to know\n\n"
        + terms.map(term => `* ${term.replace(/-/i, ' ').toUpperCase()}`).join('\n')
    )

    useEffect(() => {
        fetch(serverURL + "terms")
            .then(response => response.json())
            .then(write)
    }, [])

    return (
        <div className="Welcome">
            <Article markdown={markdown} />
        </div>
    );
}