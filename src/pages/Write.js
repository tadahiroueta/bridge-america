import { useEffect, useRef, useState } from "react";

import { app, credentials } from "../mongo";
import { getTitle, updateHeight } from "../utils";
import { ArticleStructure, Button, Card, EditorButton, LeftWrite, Markdown, MarkdownEditor, Metadata, SingleStructure, WriteStructure } from "../components";

const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

function Submitted({ markdown, author }) { return (
  <SingleStructure>
    <ArticleStructure>
      <Markdown markdownText={ markdown } />
      
      <div className="space-y-6 text-lg">
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
export default function Write() {
  const [ markdown, setMarkdown ] = useState("");
  const [ author, setAuthor ] = useState("Name");
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  
  const markdownReference = useRef();
  const authorReference = useRef();
  const dateReference = useRef();

  useEffect(() => {
    updateHeight(authorReference)

    const fetchContent = async () => {
      const user = await app.logIn(credentials);
      user.functions.findOne("articles", { title: "write" })
        .then(article => setMarkdown(article.markdown))
    }
    fetchContent()
  }, []);

  useEffect(() => updateHeight(markdownReference), [ markdown ])
  useEffect(() => updateHeight(authorReference), [ author ])

  const handleClick = () => {
    const title = getTitle(markdown);

    app.logIn(credentials)
      // run in parallel
      .then(user => Promise.all([
        // upload article privately
        user.functions.insertOne("uploads", { title, markdown, author, date: today }),
        // add to list
        user.functions.findOne("titles", { collection: "uploads" })
          .then(({ titles }) => user.functions.updateOne(
            "titles", { collection: "uploads" }, { 
              $set: { titles: [ ...titles, title ]}
      }))]))
      .then(() => setIsSubmitted(true))
      .catch((e) => console.log(e));
  }

  return isSubmitted ? <Submitted markdown={ markdown } author={ author } /> : (
    <WriteStructure>

      <LeftWrite
        markdown={ markdown }
        author={ author }
        authorReference={ authorReference }
        authorOnChange={ e => setAuthor(e.target.value) }
        date={ today }
        dateReference={ dateReference }
      />

      <EditorButton>
        <MarkdownEditor
          markdown={ markdown }
          markdownReference={ markdownReference }
          markdownOnChange={ e => setMarkdown(e.target.value) }
        />
        <Button onClick={ handleClick } className="text-primary">Submit</Button>
      </EditorButton>

    </WriteStructure>
)}