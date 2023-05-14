import { useEffect, useState } from "react";

import { app, credentials } from "../mongo";
import { addLinks } from "../utils";
import { ListArticles } from "../components";

export default function Admin() {
    const [ markdown, setMarkdown ] = useState(" ");

    const write = links => setMarkdown(addLinks(
        "### To approve:\n\n" + 
        links.sort((a, b) => .5 - Math.random()) // shuffle
            .map(link => `* ${ link.replace(/-/i, ' ').toUpperCase() }`).join('\n'),
        
        links, null, true
    ))

    useEffect(() => { (async () => {
        const user = await app.logIn(credentials);
        user.functions.findOne("titles", { collection: "uploads" })
            .then(titles => write(titles.titles))
    })()}, [])

    return <ListArticles markdown={ markdown } />
}