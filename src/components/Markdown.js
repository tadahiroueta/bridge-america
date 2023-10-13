import { useEffect, useState } from "react";
import { addLinks, app, credentials, titlelise } from "../utils";

import ReactMarkdown from "react-markdown";

export default function Markdown({ term, author, date, markdown, children, className }) {
  const [terms, setTerms] = useState([])

  useEffect(() => {(async () => {
    const user = await app.logIn(credentials)
    user.functions.findOne("titles", { collection: "articles" })
      .then(titles => setTerms(titles.titles))
  })()}, [])

  return (
    <div className={ "w-full p-5 pb-8 space-y-5 bg-ashes-100 md:py-6 md:px-7 " + className }>
      {/* header */}
      { markdown && (
        <div className="space-y-1.5">
          {/* term */}
          <div className="text-3xl font-bold text-ashes-700 font-title">{ titlelise(term) }</div>
          {/* metadata */}
          <div className="">
            {/* author */}
            <div className="flex items-baseline space-x-1">
              <div className="text-sm">by</div>
              <div className="font-semibold text-ashes-700">{ author }</div>
            </div>
            {/* date */}
            <div className="text-sm">{ date }</div>
          </div>
        </div>
      )}
      {/* content */}
      <ReactMarkdown className="w-full font-medium leading-snug prose prose-h3:font-bold prose-h3:mt-0 prose-a:no-underline prose-a:text-ashes-700 prose-a:font-semibold prose-img:mt-0 max-w-none">{ addLinks(markdown, terms, term) || "loading..." }</ReactMarkdown>
      {/* possible button */}
      { children }
    </div>
)}