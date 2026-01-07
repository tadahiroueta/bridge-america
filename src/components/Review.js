import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { user, updateHeight } from "../utils";

import Editor from "./Editor";
import Markdown from "./Markdown";

const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })

export default function Review() {
  const { term } = useParams()

  const [groups, setGroups] = useState({})
  const [group, setGroup] = useState('')
  const [author, setAuthor] = useState('')
  const [markdown, setMarkdown] = useState("loading...")

  const markdownRef = useRef()

  const navigate = useNavigate()

  // initial fetch
  useEffect(() => { (async () => {
    
    // check if article is uploaded and pending approval
    user.functions.findOne("titles", { collection: "uploads" })
      .then(uploads => uploads.titles.includes(term) || navigate("/admin"))
    
    // article
    user.functions.findOne("articles", { title: term })
      .then(content => {
        if (!content) return navigate("/admin")
        setGroup(content.group)
        setAuthor(content.author)
        setMarkdown(content.markdown)
      })
    
    // groups
    user.functions.findOne("titles", { collection: "groups" })
      .then(groups => setGroups(groups.groups))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })()}, [])

  // update markdown height
  useEffect(() => updateHeight(markdownRef), [ markdown ])

  const removeUpload = user => 
    user.functions.findOne("titles", { collection: "uploads" })
      .then(uploads => 
        user.functions.updateOne("titles", { collection: "uploads" }, { $set: { titles: uploads.titles.filter(t => t !== term) }})
      )

  const handleDelete = () => 
    Promise.all([
      user.functions.deleteOne("articles", { title: term }),
      removeUpload(user)
    ])
      .then(() => navigate("/admin"))
      .catch(console.error)

  const handleApprove = () =>
    Promise.all([
      removeUpload(user),
      user.functions.updateOne("articles", { title: term }, { $set: { approved: true, group, author, markdown }}),
      user.functions.findOne("titles", { collection: "groups" })
        .then(groups =>
          user.functions.updateOne("titles", { collection: "groups" }, { $set: { groups: { ...groups.groups, [group]: [ ...groups.groups[group], term ]}}})
    )])
      .then(() => navigate("/" + term))
      .catch(console.error)

  return (
    <div className="min-h-screen p-5 space-y-10 bg-ashes-300 md:space-x-16 md:flex md:space-y-0 md:pt-16 md:pb-24 md:justify-center">
    <Editor
      groups={ groups }
      term={ term }
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
      <div className="pt-2.5 w-full justify-center flex space-x-5">
        <div onClick={ handleDelete } className="px-5 text-xl border-2 rounded-full py-2.5 w-fit border-red-500 text-red-500 cursor-pointer">
          Delete
        </div>
        <div onClick={ handleApprove } className="px-5 text-xl border-2 rounded-full py-2.5 w-fit border-ashes-700 text-ashes-700 cursor-pointer">
          Approve
        </div>
      </div>
    </Markdown>
  </div>
)}