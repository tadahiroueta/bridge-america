import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "./Markdown";
import { user } from "../utils";

export default function Submitted() {
  const { term } = useParams()

  const [content, setContent] = useState({ markdown: "loading..."})

  const navigate = useNavigate()

  // initial fetch
  useEffect(() => { (async () => {
    
    // groups
    user.functions.findOne("articles", { title: term })
      .then(article => setContent(article))
    // check if submitted and pending
    user.functions.findOne("titles", { collection: "uploads" })
      .then(uploads => {
        if (!uploads.titles || !uploads.titles.includes(term)) navigate("/404")
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })()}, [])

  return (
    <div className="flex justify-center min-h-screen bg-ashes-300">
      <div className="p-5 pb-20 md:w-3/5 md:pr-44 md:pt-7">
        <Markdown
          term={ content.title + " (SUBMITTED)" }
          author={ content.author }
          date={ content.date }
          markdown={ content.markdown }
        />
      </div>
    </div>
)}