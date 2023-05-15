import { useEffect, useRef, useState } from "react";

import { app, credentials } from "../mongo";
import { getTitle, updateHeight } from "../utils";
import { ArticleStructure, Button, Card, EditorButton, LeftWrite, Markdown, MarkdownEditor, Metadata, WriteStructure } from "../components";

function Submitted({ markdown, author, date }) { return (
  <ArticleStructure>
    <Markdown markdownText={ markdown } />
    
    <div className="space-y-6 text-lg">
      <Metadata author={ author } date={ date } />
      <Card className="py-3">
        <div>submitted emailed to</div>
        <div className="text-base text-right text-primary">tadahiroueta@gmail.com</div>
      </Card>
      <Card className="text-3xl font-semibold text-center text-primary">THANK YOU!</Card>
    </div>
  </ArticleStructure>
)}

/** where people can submit articles */
export default function Write() {
  const [ markdown, setMarkdown ] = useState("");
  const [ author, setAuthor ] = useState("Name");
  const [ date, setDate ] = useState("mm/dd/yyyy");
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  
  const markdownReference = useRef();
  const authorReference = useRef();
  const dateReference = useRef();

  useEffect(() => {
    updateHeight(authorReference, "1.25rem")

    const fetchContent = async () => {
      const user = await app.logIn(credentials);
      user.functions.findOne("articles", { title: "write" })
        .then(article => setMarkdown(article.markdown))
    }
    fetchContent()
  }, []);

  useEffect(() => updateHeight(markdownReference), [ markdown ])
  useEffect(() => updateHeight(authorReference, "1.25rem"), [ author ])
  useEffect(() => updateHeight(dateReference), [ date ])

  const handleClick = () => {
    const title = getTitle(markdown);

    app.logIn(credentials)
      // run in parallel
      .then(user => Promise.all([
        // upload article privately
        user.functions.insertOne("uploads", { title, markdown, author, date }),
        // add to list
        user.functions.findOne("titles", { collection: "uploads" })
          .then(({ titles }) => user.functions.updateOne(
            "titles", { collection: "uploads" }, { 
              $set: { titles: [ ...titles, title ]}
      }))]))
      .then(() => setIsSubmitted(true))
      .catch((e) => console.log(e));
  }

  return isSubmitted ? <Submitted markdown={ markdown } author={ author } date={ date } /> : (
    <WriteStructure>

      <LeftWrite
        markdown={ markdown }
        author={ author }
        authorReference={ authorReference }
        authorOnChange={ e => setAuthor(e.target.value) }
        date={ date }
        dateReference={ dateReference }
        dateOnChange={ e => setDate(e.target.value) }
      />

      <EditorButton>
        <MarkdownEditor
          markdown={ markdown }
          markdownReference={ markdownReference }
          markdownOnChange={ e => setMarkdown(e.target.value) }
        />
        <Button onClick={ handleClick }>Submit</Button>
      </EditorButton>

    </WriteStructure>
)}