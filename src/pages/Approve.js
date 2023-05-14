import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { app, credentials } from "../mongo"
import { getTitle, updateHeight } from "../utils"
import { ArticleStructure, Button, EditorButton, LeftWrite, Markdown, MarkdownEditor, Metadata, Minor, WriteStructure } from "../components"

function Approved({ markdown, author, date }) {
  return (
    <ArticleStructure>
      <Markdown markdownText={ markdown } />
      
      <div className="space-y-6 text-lg">
        <Metadata author={ author } date={ date } />
        <Minor>Approved</Minor>
      </div>
    </ArticleStructure>
)}


export default function Approve() {
  const { title } = useParams()
  const navigate = useNavigate()

  const [ markdown, setMarkdown ] = useState()
  const [ author, setAuthor ] = useState()
  const [ date, setDate ] = useState()
  const [ isApproved, setIsApproved ] = useState(false)

  const markdownReference = useRef()
  const authorReference = useRef()
  const dateReference = useRef()
  
  useEffect(() => {
    const fetchContent = async (collection, title) => {
      const user = await app.logIn(credentials);
      user.functions.findOne(collection, { title })
        .then(article => {
          if (!article) throw new Error("404")

          setMarkdown(article.markdown)
          setAuthor(article.author)
          setDate(article.date)
          
          updateHeight(markdownReference)
          updateHeight(authorReference, "1.25rem")
          updateHeight(dateReference)
        })
        .catch(() => navigate("/404"))
    }
    fetchContent("uploads", title)
  }, [ title ]);

  const handleClick = () => {
    const title = getTitle(markdown);

    app.logIn(credentials)
      // add
      .then(user => {
        Promise.all([
          // upload article publically
          user.functions.insertOne("articles", { title, markdown, author, date }),
          // add to list
          user.functions.findOne("titles", { collection: "articles" })
            .then(({ titles }) => user.functions.updateOne(
              "titles", { collection: "articles" }, { 
                $set: { titles: [ ...titles, title ]}
        }))])
        return user // use again
      })
      // delete
      .then(user => Promise.all([
        // delete private upload
        user.functions.deleteOne("uploads", { title }),
        // delete from list
        user.functions.findOne("titles", { collection: "uploads" })
          .then(({ titles }) => user.functions.updateOne(
            "titles", { collection: "uploads" }, { 
              $set: { titles: titles.filter(t => t !== title)
      }}))]))
      .then(() => setIsApproved(true))
      .catch(() => alert("Fuck."))
  }

  return isApproved ? <Approved markdown={ markdown } author={ author } date={ date } /> : (
    <WriteStructure>

      <LeftWrite
        markdown={ markdown }
        author={ author }
        authorReference={ authorReference }
        authorOnChange={ e => { setAuthor(e.target.value); updateHeight(authorReference); }}
        date={ date }
        dateReference={ dateReference }
        dateOnChange={ e => { setDate(e.target.value); updateHeight(dateReference); }}
      />

      <EditorButton>
        <MarkdownEditor
          markdown={ markdown }
          markdownReference={ markdownReference }
          markdownOnChange={ e => { setMarkdown(e.target.value); updateHeight(markdownReference); }}
        />
        <Button onClick={ handleClick }>Approve</Button>
      </EditorButton>

    </WriteStructure>
)}