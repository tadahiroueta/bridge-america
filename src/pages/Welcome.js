import { useEffect, useState } from "react";

import { app, credentials } from "../mongo";
import { addLinks } from "../utils";
import { ListArticles } from "../components";

export default function Welcome() {
  const [ markdown, setMarkdown ] = useState(" ");

  const write = links => setMarkdown(addLinks(
    "# Welcome to America\n\n### Here are some things you might want to know:\n\n" + 
    links.sort((a, b) => .5 - Math.random()) // shuffle
      .map(link => `* ${ link.replace(/-/g, ' ').toUpperCase() }`).join('\n')
  , links))

  useEffect(() => { (async () => { 
    const user = await app.logIn(credentials);
    user.functions.findOne("titles", { collection: "articles" })
      .then(titles => write(titles.titles))
  })()}, [])
  
  return <ListArticles markdown={ markdown } />;
}