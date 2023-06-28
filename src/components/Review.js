import { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { app, credentials, getTitle, updateHeight } from "../utils"
import { ArticleStructure, CardButton, RightWriteStructure, LeftWrite, Markdown, MarkdownEditor, Metadata, Minor, SingleStructure, WriteStructure } from "../elements"

/** page after reviewing submission */
function Reviewed({ markdown, author, date, review }) {
  return (
    <SingleStructure>
      <ArticleStructure>

        {/* left side */}
        <Markdown markdownText={ markdown } />
        
        {/* right side */}
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


/** edit, approve, or reject article submission */
export default function Review() {
  const { title } = useParams()
  const navigate = useNavigate()

  const [ markdown, setMarkdown ] = useState()
  const [ author, setAuthor ] = useState()
  const [ date, setDate ] = useState()
  const [ review, setReview ] = useState("reviewing")

  const markdownReference = useRef()
  const authorReference = useRef()
  const dateReference = useRef()
  
  // initial fetch
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
    fetchContent("articles", title)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => updateHeight(markdownReference), [ markdown ])
  useEffect(() => updateHeight(authorReference), [ author ])
  useEffect(() => updateHeight(dateReference), [ date ])

  const deleteUpload = user => Promise.all([
    // delete private upload
    user.functions.deleteOne("articles", { title }),
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
          user.functions.insertOne("articles", { title, markdown, author, date, comments: [], approved: true }),
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

  return review !== "reviewing" ? // after reviewing
    <Reviewed markdown={ markdown } author={ author } date={ date } review={ review } /> : (
    
    <WriteStructure>

      <LeftWrite markdown={ markdown } author={ author } authorReference={ authorReference }
        authorOnChange={ e => setAuthor(e.target.value) } date={ date }
        dateReference={ dateReference } dateOnChange={ e => setDate(e.target.value) } />

      <RightWriteStructure>

        <MarkdownEditor markdown={ markdown } markdownReference={ markdownReference }
          markdownOnChange={ e => setMarkdown(e.target.value) } />

        <div className="flex justify-end space-x-7">
          <CardButton onClick={ handleReject } className="text-red-500">Reject</CardButton>
          <CardButton onClick={ handleApprove } className="text-primary">Approve</CardButton>
        </div>

      </RightWriteStructure>

    </WriteStructure>
)}