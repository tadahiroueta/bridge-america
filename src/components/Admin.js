import { useEffect, useState } from "react"

import { user, titlelise } from "../utils"

import { CheckBadgeIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export default function Admin() {
  const [uploads, setUploads] = useState(["loading..."])

  // initial fetch
  useEffect(() => { (async () => {
    user.functions.findOne("titles", { collection: "uploads" })
      .then(uploads => setUploads(uploads.titles))
  })()}, [])

  return (
    <div className="flex justify-center">
      {/* center content */}
      <div className="justify-center w-full px-10 pt-24 space-y-8 text-xl font-semibold pb-36 md:w-[26rem]">
        {/* header */}
        <div className="flex space-x-2.5 items-center justify-center">
          <div className="">Review uploads</div>
          <CheckBadgeIcon className="w-6" />
        </div>
        {/* uploads */}
        <div className="space-y-2.5">
          { !uploads.length && <div>No uploads</div>}
          { uploads.map(upload => (
            <div key={ upload }>
              <Link to={ "/review/" + upload }>{ titlelise(upload) }</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}