import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { go as sort } from "fuzzysort"

import { user, titlelise } from "../utils"

import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid"


function NavigationLinks({ className }) { return (
  <div className={ className }>
    <div>
      <Link to="">Welcome</Link>    
    </div>
    <div>
      <Link to="about">About Us</Link>  
    </div>
    <div>
      <Link to="contribute">Contribute</Link>    
    </div>
  </div>
)}


function Menu({ onClick }) { return (
  <div onClick={ onClick } className="sticky w-full h-screen text-white bg-ashes-700 z-2 space-y-2.5 pl-14 pr-10 pt-10 pb-14">
    <div className="inline-flex justify-end w-full">
      <XMarkIcon className="h-9" />
    </div>
    <NavigationLinks className="space-y-3 text-2xl" />
  </div>
) }


function Header({ 
  setIsMenuOpen, 
  isSearching, 
  setIsSearching, 
  search, 
  setSearch,
  handleSearch,
  results
}) {   
  return (
    <div className="fixed z-50 flex items-center justify-center w-full px-4 text-white bg-ashes-700 h-14">
      {/* center */}
      <div className="flex items-center justify-between w-full md:w-3/5">      
        {/* left side */}
        <div className={ "items-center justify-center gap-1.5 md:gap-12 " + (isSearching ? "hidden md:flex" : "flex") }>
          {/* menu */}
          <Bars3Icon onClick={ setIsMenuOpen } className="h-10 md:hidden" />
          {/* logo */}
          <Link to="">
            <img src="logo-white.png" alt="BA" className="h-14" />
          </Link>
          <NavigationLinks className="items-center hidden text-lg md:flex gap-7" />
        </div>
        {/* search */}
        <div className="flex items-center justify-right md:max-w-72">
          <MagnifyingGlassIcon onClick={ isSearching ? () => {} : () => setIsSearching(true) } className="h-10 md:h-6" />
          { isSearching && (
            // search bar and results
            <div className="relative grow">
              {/* search bar */}
              <input 
                autoFocus 
                value={ search } 
                onChange={ e => setSearch(e.target.value) } 
                onKeyUp={ ({ key }) => { if (key === "Enter") handleSearch() }}
                className="w-full h-8 text-white bg-transparent border-b-2 border-white outline-none" 
              />
              {/* search results */}
              { !results.length || (
                <div className="absolute w-full py-1 divide-y bg-ashes-700 divide-solid">
                  { results.map(result => (
                    <div key={ result } className="py-0.5 px-2">
                      <a href={ result }>{ titlelise(result) || "No matching articles" }</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
)}

function Footer({ onClick }) { return (
  <div onClick={ onClick } className="w-full p-10 space-y-5 text-xl text-white bg-ashes-500 md:px-40 md:py-20 md:text-lg">
    {/* left side */}
    <NavigationLinks className="space-y-2.5" />
    {/* right side */}
    <div className="w-full space-y-2.5 text-right">
      <div>Contact us at tadahiroueta@gmail.com</div>
      <div>Not affiliated with Frisco ISD</div>
    </div>
  </div>
)}

// largely structured according to the search function
export default function Layout({ children }) {
  const [titles, setTitles] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])

  // fetch titles
	useEffect(() => {
    user.functions.findOne("titles", { collection: "articles" })
			.then(titles => setTitles(titles.titles))
	}, [])

  const handleSearch = () => {
    console.log(titles)
    const results = sort(search, titles, { limit: 4, threshold: -10000 }).map(result => result.target)
		if (!results.length) {
			setResults([ null ])
			return 
		}
		setResults(results);
  }

  return (
    <div>
      { isMenuOpen && <Menu onClick={ () => setIsMenuOpen(false) } /> }
      <Header 
        setIsMenuOpen={ setIsMenuOpen } 
        isSearching={ isSearching } 
        setIsSearching={ setIsSearching }
        search={ search }
        setSearch={ setSearch }
        handleSearch={ handleSearch }
        results={ results }
      />
      <div onClick={ () => setIsSearching(false) }>
        <div className="min-h-screen">
          {/* space for header */}
          <div className="h-14" />
          { children }        
        </div>
        <Footer />
      </div>
    </div>
  )
}