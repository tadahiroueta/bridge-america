import { useState } from "react";
import { Link } from "react-router-dom";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

function Links({ className }) { return (
	<div className={ className }>
		<Link to="">Welcome</Link>
		<div className="text-slate-300">About</div>
		<Link to="write">Write</Link>
	</div>
)}

/** navigation bar */
function Navbar({ isMenuOpen, setIsMenuOpen }) { return (
	<div className="mb-4 h-14 bg-primary flex items-center md:mb-6 md:h-[4.5rem] 
		md:justify-center">
		<div className="text-white flex md:w-2/3 md:flex md:items-center md:justify-between">

			<div className="mx-2 flex space-x-2 md:mx-0 md:items-center md:space-x-16">
				{/* menu */}
				<Bars3Icon onClick={ () => setIsMenuOpen(!isMenuOpen) } className="h-8 
					md:hidden" />
				{/* logo */}
				<Link className="md:!mx-0" to=""><img src="logo-white.png" alt="BA" className="h-8 md:h-12" /></Link>
				<Links className="hidden space-x-16 text-xl font-light md:flex" />
			</div>

			{/* TODO search */}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" className="hidden h-8 mr-4 text-slate-300 md:block">
				<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
			</svg>

		</div>
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
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return isMenuOpen ? <Menu onClick={ () => setIsMenuOpen(false) } /> : (
    <div className="min-h-screen flex flex-col bg-zinc-100">

			<Navbar isMenuOpen={ isMenuOpen } setIsMenuOpen={ setIsMenuOpen }/>

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