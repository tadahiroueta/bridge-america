import { Link } from "react-router-dom";

function Navbar() { return (
    <div className="mb-6 h-18 bg-primary flex justify-center items-center">
		<div className="w-2/3 flex justify-between items-center text-white">

			<div className="flex items-center space-x-16">
				{/* logo */}
				<Link to="">
					<img src="logo-white.png" alt="BA" className="h-12" />
				</Link>

				{/* links */}
				<div className="flex text-xl font-light space-x-16">
					<Link to="">Welcome</Link>
					<Link to="/about" className="text-slate-300 pointer-events-none">About</Link>
				</div>

			</div>

			{/* search */}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.25} stroke="currentColor" className="mr-4 h-8">
				<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
			</svg>

		</div>
	</div>
)}

export default function Layout({ children }) { return (
    <div className="bg-zinc-100">
        <Navbar />
		{ children }
        <div className="pb-20 flex justify-center text-sm">Not affiliated with FISD&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;tadahiroueta@gmail.com</div>
    </div>
)}