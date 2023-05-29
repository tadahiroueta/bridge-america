import { useEffect, useState } from "react";

import { app, credentials } from "../mongo";
import { addLinks } from "../utils";
import { ListArticles, SingleStructure } from "../components";

export default function Admin() {
    const [ markdown, setMarkdown ] = useState(" ");

    const write = links => setMarkdown(addLinks(
        "### To approve:\n\n" + (
            links.sort((a, b) => .5 - Math.random()) // shuffle
                .map(link => `* ${ link.replace(/-/g, ' ').toUpperCase() }`).join('\n')
            || "&emsp;Nothing for now."
        ),
        links, null, true
    ))

    useEffect(() => { (async () => {
        const user = await app.logIn(credentials);
        user.functions.findOne("titles", { collection: "uploads" })
            .then(titles => write(titles.titles))
    })()}, [])

    return (
        <SingleStructure>
            <ListArticles markdown={ markdown } />
        </SingleStructure>
)}