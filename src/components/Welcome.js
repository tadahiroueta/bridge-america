import { useEffect, useState } from "react";

import { addLinks, app, credentials, titlelise } from "../utils";
import { ListArticles, SingleStructure } from "../elements";

export default function Welcome() {
  const [ markdown, setMarkdown ] = useState(" ");

  // write all content in page
  const write = links => setMarkdown(addLinks(
    "# Welcome to America\n\n### Here are some things you might want to know:\n\n" + 
    // list articles
    links.sort((a, b) => .5 - Math.random()) // shuffle
      .map(link => `* ${ titlelise(link) }`).join('\n')

  , links));

  // initial fetch
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