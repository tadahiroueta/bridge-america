import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { app, credentials } from "../mongo"
import { getTitle, updateHeight } from "../utils"
import { ArticleStructure, Button, EditorButton, LeftWrite, Markdown, MarkdownEditor, Metadata, Minor, SingleStructure, WriteStructure } from "../components"

function Reviewed({ markdown, author, date, review }) {
  return (
    <SingleStructure>
      <ArticleStructure>
        <Markdown markdownText={ markdown } />
        
        <div className="space-y-6 text-lg">
          <Metadata author={ author } date={ date } />
          { review === "approved" ? 
            <Minor className="text-primary">Approved</Minor> : 
            <Minor className="text-red-500">Rejected</Minor> 
          }
        </div>
      </ArticleStructure>
    </SingleStructure>
)}


export default function Approve() {
  const { title } = useParams()
  const navigate = useNavigate()

  const [ markdown, setMarkdown ] = useState()
  const [ author, setAuthor ] = useState()
  const [ date, setDate ] = useState()
  const [ review, setReview ] = useState("reviewing")

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
        })
        .catch(() => navigate("/404"))
    }
    fetchContent("uploads", title)
  }, [ title, navigate ]);

  useEffect(() => updateHeight(markdownReference), [ markdown ])
  useEffect(() => updateHeight(authorReference), [ author ])
  useEffect(() => updateHeight(dateReference), [ date ])

  const deleteUpload = user => Promise.all([
    // delete private upload
    user.functions.deleteOne("uploads", { title }),
    // delete from list
    user.functions.findOne("titles", { collection: "uploads" })
      .then(({ titles }) => user.functions.updateOne(
        "titles", { collection: "uploads" }, { 
          $set: { titles: titles.filter(t => t !== title)
  }}))]);

  const handleReject = () => app.logIn(credentials)
    .then(deleteUpload)
    .then(() => setReview("rejected"));

  const handleApprove = () => {
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
      .then(deleteUpload)
      .then(() => setReview("approved"))
      .catch(() => alert("Fuck."))
  }

  return review !== "reviewing" ? <Reviewed markdown={ markdown } author={ author } date={ date } review={ review } /> : (
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
        <div className="flex justify-end space-x-7">
          <Button onClick={ handleReject } className="text-red-500">Reject</Button>
          <Button onClick={ handleApprove } className="text-primary">Approve</Button>
        </div>
      </EditorButton>

    </WriteStructure>
)}