import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { app, credentials, updateHeight } from "../utils"

import Markdown from "./Markdown"
import Editor from "./Editor"

const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })

export default function Contribute() {
  const [groups, setGroups] = useState({})
  const [term, setTerm] = useState('')
  const [group, setGroup] = useState('')
  const [author, setAuthor] = useState('')
  const [markdown, setMarkdown] = useState("loading...")

  const markdownRef = useRef()

  const navigate = useNavigate()

  // initial fetch
  useEffect(() => { (async () => {
    const user = await app.logIn(credentials)
    // groups
    user.functions.findOne("titles", { collection: "groups" })
      .then(groups => setGroups(groups.groups))
    
    // markdown
    user.functions.findOne("articles", { title: "template" })
      .then(article => setMarkdown(article.markdown))
  })()}, [])

  // update markdown height
  useEffect(() => updateHeight(markdownRef), [ markdown ])

  const handleSubmit = () => {
    app.logIn(credentials)
      .then(user => Promise.all([
        // upload article privately
        user.functions.insertOne("articles", { title: term, markdown, author, date: today, approved: false, group }),
        // add to group
        user.functions.findOne("titles", { collection: "uploads" })
          .then(uploads => 
            user.functions.updateOne("titles", { collection: "uploads" }, { $set: { titles: [ ...uploads.titles, term ]}})
          )
      ]))
      // redirect
      .then(() => navigate(`/submitted/${term}`))
      .catch(console.log)
  }

  return (
    <div className="min-h-screen p-5 space-y-10 bg-ashes-300 md:space-x-16 md:flex md:space-y-0 md:pt-16 md:pb-24 md:justify-center">
      <Editor
        groups={ groups }
        term={ term }
        setTerm={ setTerm }
        group={ group }
        setGroup={ setGroup }
        author={ author }
        setAuthor={ setAuthor }
        markdown={ markdown }
        setMarkdown={ setMarkdown }
        markdownRef={ markdownRef }
      />
      <Markdown
        term={ term }
        author={ author }
        markdown={ markdown }
        date={ today }
        className="md:w-[33rem] h-fit md:pb-8"
      >
        <div className="pt-2.5 w-full justify-center flex">
          <div onClick={ handleSubmit } className="px-5 text-xl border-2 rounded-full py-2.5 w-fit border-ashes-700 text-ashes-700 cursor-pointer">
            Submit
          </div>
        </div>
      </Markdown>
    </div>
)}