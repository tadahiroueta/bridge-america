import { useEffect, useRef, useState } from "react";

import { app, credentials, getTitle, titlelise, updateHeight } from "../utils";
import { ArticleStructure, CardButton, Card, RightWriteStructure, LeftWrite, Markdown, MarkdownEditor, Metadata, SingleStructure, WriteStructure } from "../elements";

const today = new Date().toLocaleDateString("en-US",
  { month: "2-digit", day: "2-digit", year: "numeric" });

/** thank you message for writers */
function Written({ markdown, author }) { return (
  <SingleStructure>
    <ArticleStructure>

      {/* left side */}
      <Markdown markdownText={ markdown } />
      
      {/* right side */}
      <div className="w-min space-y-6 text-lg">

        <Metadata author={ author } date={ today } />

        <Card className="py-3">
          <div>submitted emailed to</div>
          <div className="text-base text-right text-primary">tadahiroueta@gmail.com</div>
        </Card>

        <Card className="text-3xl font-semibold text-center text-primary">THANK YOU!</Card>

      </div>

    </ArticleStructure>
  </SingleStructure>
)}

/** where people can submit articles */
function Writing({ template }) {
  const [ markdown, setMarkdown ] = useState(template);
  const [ author, setAuthor ] = useState("Name");
  const [ written, setWritten ] = useState(false);
  
  const markdownReference = useRef();
  const authorReference = useRef();
  const dateReference = useRef();

  useEffect(() => updateHeight(markdownReference), [ markdown ])
  useEffect(() => updateHeight(authorReference), [ author ])

  const handleSubmit = () => {
    const title = getTitle(markdown);

    app.logIn(credentials)
      // run in parallel
      .then(user => Promise.all([
        // upload article privately
        user.functions.insertOne("articles", 
          { title, markdown, author, date: today, approved: false }),
        // add to list
        user.functions.findOne("titles", { collection: "uploads" })
          .then(({ titles }) => user.functions.updateOne(
            "titles", { collection: "uploads" }, { 
              $set: { titles: [ ...titles, title ]}
        })),
        user.functions.findOne("titles", { collection: "todos" })
          .then(({ titles }) => user.functions.updateOne(
            "titles", { collection: "todos" }, {
              $set: { titles: [ ...titles.filter(t => t !== title) ]}
      }))]))
      .then(() => setWritten(true))
      .catch((e) => console.log(e));
  }

  // show thank you message
  return written ? <Written markdown={ markdown } author={ author } /> : (
    <WriteStructure>

      <LeftWrite markdown={ markdown } author={ author } authorReference={ authorReference }
        authorOnChange={ e => setAuthor(e.target.value) } date={ today }
        dateReference={ dateReference } />

      <RightWriteStructure>
        <MarkdownEditor markdown={ markdown } markdownReference={ markdownReference }
          markdownOnChange={ e => setMarkdown(e.target.value) } />
        <CardButton onClick={ handleSubmit } className="text-primary">Submit</CardButton>
      </RightWriteStructure>

    </WriteStructure>
)}

export default function Write() {
  const [ todos, setTodos ] = useState([]);
  const [ template, setTemplate ] = useState("");
  const [ writing, setWriting ] = useState(false);

  // initial fetch
  useEffect(() => { (async () => {
    const user = await app.logIn(credentials);
    Promise.all([
      user.functions.findOne("articles", { title: "write" }),
      user.functions.findOne("titles", { collection: "todos" })
    ])
      .then(([ article, titles ]) => {
        setTemplate(article.markdown);
        setTodos(titles.titles);
  })})()}, [])

  const handleClick = todo => {
    setTemplate("# " + titlelise(todo) + " " + template)
    setWriting(true)
  }

  return writing ? <Writing template={ template } /> : (
    <SingleStructure>
      <ArticleStructure>
        <div className="p-5 w-full bg-white prose prose-h1:text-primary prose-h1:mb-6 prose-h3:font-bold prose-h3:mt-0 prose-a:no-underline prose-a:text-primary prose-a:font-semibold prose-img:mt-0 md:px-7 md:py-6 md:w-[40rem]">
          <h3>Writing topic suggestions:</h3>
          <ul>
            { !todos ? null : todos.map(todo => (
              <li key={ todo } className="cursor-pointer">
                {/* eslint-disable-next-line */}
                <a onClick={ () => handleClick(todo) }>{ titlelise(todo) }</a>
              </li>
            ))}
          </ul>
        </div>
      </ArticleStructure>
    </SingleStructure>
  )
}