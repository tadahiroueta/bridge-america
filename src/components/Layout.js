import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { app, credentials, titlelise } from "../utils";
import fuzzysort from "fuzzysort";

function Links({ className }) { return (
	<div className={ className }>
		<Link to="">Welcome</Link>
		<div className="text-slate-300">About</div>
		<Link to="write">Write</Link>
	</div>
)}

function Menu({ onClick }) { return (
	<div onClick={ onClick }  className="h-screen w-screen bg-primary 
		text-white">
		<div className="py-3 px-2">
			<XMarkIcon className="h-8" />
			<Links className="m-9 flex flex-col space-y-5 text-xl" />
		</div>
	</div>
)}

export default function Layout({ children }) { 
	const [ isMenuOpen, setIsMenuOpen ] = useState(false)
	const [ isSearching, setIsSearching ] = useState(false)
	const [ search, setSearch ] = useState("")
	const [ titles, setTitles ] = useState([])
	const [ results, setResults ] = useState([])

	const allReference = useRef(null)
	const searchReference = useRef(null)

	// fetch titles
	useEffect(() => {
		app.logIn(credentials)
			.then(user => user.functions.findOne("titles", { collection: "articles" }))
			.then(titles => setTitles(titles.titles))
	}, [])

	const clearSearch = () => {
		setSearch("")
		setIsSearching(false)
		setResults([])
	}

	// clear search when clicking outside
	useEffect(() => {
		if (!allReference.current || !searchReference.current) return;

		const handleClickOutside = event => {
			// outside only
			if (!searchReference.current || searchReference.current.contains(event.target)) return;
			clearSearch()
		}

		allReference.current.addEventListener("click", handleClickOutside)
		// eslint-disable-next-line
		return () => { allReference.current.removeEventListener("click", handleClickOutside) }
	}, [ allReference, searchReference ])

	const handleSearch = () => {
		const results = fuzzysort.go(search, titles, { limit: 4, threshold: -10000 }).map(result => result.target)
		if (!results.length) {
			setResults([ null ])
			return 
		}
		setResults(results);
	}

	return isMenuOpen ? <Menu onClick={ () => setIsMenuOpen(false) } /> : (
    <div ref={ allReference } className="min-h-screen flex flex-col bg-zinc-100">

			<div className="mb-4 h-14 bg-primary flex items-center md:mb-6 md:h-[4.5rem] 
				md:justify-center">
				<div className="mx-4 w-full text-white flex justify-between items-center md:w-2/3">

					<div className={ "flex space-x-2 md:mx-0 md:items-center md:space-x-16 md:flex " + (isSearching ? "hidden" : null) }>
						{/* menu */}
						<Bars3Icon onClick={ () => setIsMenuOpen(!isMenuOpen) } className="h-8 
							md:hidden" />
						{/* logo */}
						<Link className="md:!mx-0" to=""><img src="logo-white.png" alt="BA" className="h-8 md:h-12" /></Link>
						<Links className="hidden space-x-16 text-xl font-light md:flex" />
					</div>

					{/* search */}
					<div ref={ searchReference } className={ "h-8 flex items-center space-x-2 relative " + (isSearching ? "w-full md:w-1/3" : null) }>
						
						<MagnifyingGlassIcon onClick={ () => setIsSearching(true) } className="h-full" />
						
						<div className="flex-grow relative">

							{ isSearching && <input autoFocus value={ search } onChange={ e => setSearch(e.target.value) } onKeyUp={ ({ key }) => { if (key === "Enter") handleSearch() }} className="h-full w-full bg-transparent border-b border-white text-white outline-none" /> }
							
							{/* search results */}
							{ !results.length || (
								<div className="py-1 absolute w-full bg-primary divide-y divide-solid">
									{ results.map(result => <div key={ result } className="py-0.5 px-2"><a href={ result }>{ titlelise(result) || "No matching articles ):" }</a></div>) }
								</div>
							)}

						</div>
					
					</div>							

				</div>
			</div>

			{ children }

			{/* footer */}
			<div className="mt-24 mx-8 pb-10 flex-grow text-sm text-right flex flex-col 
				items-end space-y-2 space-x-16 md:pb-20 md:mt-32 md:text-center md:flex-row 
				md:justify-center">
				<div>Not affiliated with FISD</div>
				<div>tadahiroueta@gmail.com</div>
			</div>

    </div>
)}