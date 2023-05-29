import { useEffect, useState } from "react";

import { app, credentials } from "../mongo";
import { addLinks } from "../utils";
import { ListArticles, SingleStructure } from "../components";

export default function Welcome() {
  const [ markdown, setMarkdown ] = useState(" ");

  const write = links => {
    const content = addLinks(
      "# Welcome to America\n\n### Here are some things you might want to know:\n\n" + 
      links.sort((a, b) => .5 - Math.random()) // shuffle
        .map(link => `* ${ link.replace(/-/g, ' ').toUpperCase() }`).join('\n')
    , links);

    setMarkdown(content)
  }

  useEffect(() => { (async () => { 
    const user = await app.logIn(credentials);
    user.functions.findOne("titles", { collection: "articles" })
      .then(titles => write(titles.titles))
  })()}, [])
  
  return (
    <SingleStructure>
      <ListArticles markdown={ markdown } />
    </SingleStructure>
)}