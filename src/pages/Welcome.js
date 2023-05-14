import { useEffect, useState } from "react";

import { app, credentials } from "../mongo";
import { addLinks } from "../utils";
import { ArticleStructure, Markdown } from "../components";

export default function Welcome() {
    const [ markdown, setMarkdown ] = useState(" ");

    const write = links => setMarkdown(addLinks(
        "# Welcome to America\n\n### Here are some things you might want to know:\n\n" + links.sort((a, b) => .5 - Math.random()) // shuffle
            .map(link => `* ${ link.replace(/-/i, ' ').toUpperCase() }`).join('\n')
    , links))

    useEffect(() => { (async () => { 
        const user = await app.logIn(credentials);
        user.functions.getTerms()
            .then(terms => write(terms.terms))
    })()}, [])
    
    return (
        <ArticleStructure>
            <Markdown markdownText={ markdown } />
        </ArticleStructure>
    );
}