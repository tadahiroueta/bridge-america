import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { user, titlelise } from "../utils";

import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import { CheckCircleIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline"

let commonTerms = [
  "weighted-gpa",
  "sat",
  "early-release",
  "unweighted-gpa",
  "ap-classes"
]

export default function Welcome() {
  const [isDirectoryOpen, setIsDirectoryOpen] = useState({})
  const [groups, setGroups] = useState({})

  useEffect(() => { (async () => {
    user.functions.findOne("titles", { collection: "groups" })
      .then(({ groups }) => {
        setGroups(groups)
        // randomly open two folders
        const isDirectoryOpen = Object.keys(groups).reduce((acc, group) => ({ ...acc, [group]: false }), {})
        const opened = Object.keys(groups).sort(() => 0.5 - Math.random()).slice(0, 2)
        opened.forEach(group => isDirectoryOpen[group] = true)
        setIsDirectoryOpen(isDirectoryOpen)
  // eslint-disable-next-line
  })})()}, [])

  return (
    <div className="flex flex-col items-center">
      {/* top screen */}
      <div className="relative flex flex-col items-center justify-between w-full h-[calc(100svh-3.5rem)] pt-10 md:pt-20 pb-6 md:pb-12 overflow-hidden bg-ashes-300">
        {/* main title */}
        <div className="z-10 px-8 text-4xl font-medium text-right uppercase text-ashes-500 font-title md:text-8xl md:w-1/2 md:ml-48">Welcome to America</div>
        {/* link to introductionary article */}
        <Link to="/welcome" className="rounded-full px-5 py-2.5 border-2 text-xl w-fit z-10 ml-24 font-medium border-ashes-700 text-ashes-700 md:ml-48">Learn how it works</Link>
        {/* golden gate */}
        <img src="golden-gate.png" alt="golden gate" className="absolute bottom-0 left-0 object-cover object-[25%_bottom] h-2/3 md:h-[115%] md:top-6" />
      </div>
      {/* about us */}
      <div className="z-10 md:flex md:space-x-24 md:py-36 bg-ashes-100 md:justify-center md:w-full">
        {/* about text */}
        <div className="flex flex-col items-center w-full px-10 py-24 space-y-8 md:w-[37.5rem]">
          {/* about header */}
          <div className="space-y-1.5 flex flex-col items-center">
            <div className="text-3xl uppercase text-ashes-700 text-title">About Us</div>
            <hr className="w-3/5 border-ashes-700" />
          </div>
          <div className="text-justify">
            Bridge America was created to help foreign students understand the overcomplicated, decentralised world of American High School Education. We provide short, concise articles to explain different concepts and terms used in the US. Our goal is to take a load of the shoulders of any student moving to the US, so they can focus on adapting to their new environment and jumpstarting their secondary education.
          </div>
        </div>
        {/* brooklyn bridge */}
        <img src="brooklyn-bridge.png" alt="brooklyn bridge" className="hidden w-[30rem] md:block" />
      </div>
      {/* articles/terms */}
      <div className="justify-center w-full md:flex md:space-x-24 md:pb-40">
        {/* common terms */}
        <div className="w-full px-5 py-10 space-y-5 text-ashes-100 bg-ashes-900 md:w-[28rem] md:px-7 md:space-y-10 h-min">
          {/* common terms header */}
          <div className="flex space-x-2.5 px-5">
            <CheckCircleIcon className="w-6 stroke-2" />
            <div className="text-xl font-medium font-title">Commonly searched terms</div>
          </div>
          {/* list of terms */}
          <div className="space-y-4">
            { commonTerms.map((term, index) => (
              // line
              <div key={ index } className="flex space-x-2.5 p-2.5 items-center">
                {/* number */}
                <div className="text-3xl font-light">0{ index + 1 }</div>
                {/* term */}
                <Link to={ term } className="text-xl font-semibold">{ titlelise(term) }</Link>
              </div>
            ))}
          </div>
          {/* search bar link (that doesn't work) */}
          <div className="flex px-5 pt-5 space-x-2.5 items-center">
            <div className="text-xl font-medium leading-tight text-right font-title">... or use the search engine to find what you need</div>
            <MagnifyingGlassIcon className="justify-center h-16 rotate-90 stroke-2" />
          </div>
        </div>
        {/* article directory */}
        <div className="px-10 pt-24 pb-32 space-y-7 md:w-[32rem] md:px-0 md:pt-10">
          {/* directory header */}
          <div className="flex w-full space-x-2.5 items-center justify-center">
            <div className="text-xl font-semibold">Search through all topics</div>
            <ArchiveBoxIcon className="h-6" />
          </div>
          {/* groups */}
          <div className="space-y-4 text-xl font-semibold">            
            { Object.keys(groups).map(name => (
              <div key={ name } className="space-y-2.5">
                {/* folder */}
                <div onClick={ () => setIsDirectoryOpen({ ...isDirectoryOpen, [name]: !isDirectoryOpen[name] }) } className="flex items-center justify-end cursor-pointer">
                  <ChevronDownIcon className={ "h-5" + (isDirectoryOpen[name] ? "" : " -rotate-90") } />
                  <div>{ name }</div>
                </div>
                {/* files */}
                <div className="justify-start space-y-1">
                  { isDirectoryOpen[name] && groups[name].map(term => (
                    <div key={ term } className="">
                      <Link to={ term }>{ titlelise(term) }</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
)}