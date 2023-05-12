import { Link } from "react-router-dom";

function Navbar() { return (
    <div className="mb-6 h-[4.5rem] bg-primary flex justify-center items-center">
		<div className="flex items-center justify-between w-2/3 text-white">

			<div className="flex items-center space-x-16">
				{/* logo */}
				<Link to="">
					<img src="logo-white.png" alt="BA" className="h-12" />
				</Link>

				{/* links */}
				<div className="flex space-x-16 text-xl font-light">
					<Link to="">Welcome</Link>
					<Link to="/about" className="pointer-events-none text-slate-300">About</Link>
				</div>

			</div>

			{/* search */}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" className="h-8 mr-4 text-slate-300">
				<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
			</svg>

		</div>
	</div>
)}

export default function Layout({ children }) { return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
        <Navbar />
		{ children }
        <div className="flex items-end justify-center flex-grow pb-20 mt-32 text-sm">Not affiliated with FISD&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;tadahiroueta@gmail.com</div>
    </div>
)}