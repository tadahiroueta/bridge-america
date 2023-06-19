import { useEffect, useState } from "react";

import { addLinks, app, credentials } from "../utils";
import { ListArticles, SingleStructure } from "../elements";

/** access to article submissions */
export default function Admin() {
  const [ markdown, setMarkdown ] = useState(" ");

  // add markdown to page
  const write = links => setMarkdown(addLinks(
    "### To approve:\n\n" + (

      links.sort((a, b) => .5 - Math.random()) // shuffle
        .map(link => `* ${ link.replace(/-/g, ' ').toUpperCase() }`).join('\n')      

      || "&emsp;Nothing for now." // in case of no submission
    ),
    links, null, true
  ))

  // initial fetch
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