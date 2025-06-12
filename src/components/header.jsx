import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
	const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token")
	return (
		<header className="w-full  h-[70px] shadow-xl flex justify-center items-center relative bg-black text-white">
			<img
				src="/logo.png"
				alt="logo"
				className="w-[60px] h-[60px] object-cover border-[3px] absolute left-1 rounded-full"
			/>
			<div className="hidden w-[450px]  md:flex justify-evenly items-center">
				<Link to="/" className="hidden md:block text-[22px]  m-1 hover:text-yellow-300">
					Home
				</Link>
				<Link to="/contact" className="hidden md:block text-[22px]  m-1 hover:text-yellow-300">
					contact
				</Link>
				<Link to="/gallery" className="hidden md:block text-[22px]  m-1 hover:text-yellow-300">
					gallery
				</Link>
				{/* items */}
				<Link to="/items" className="hidden md:block text-[22px]  m-1 hover:text-yellow-300">
					Items
				</Link>
				<Link to="/about"className="hidden md:block text-[22px]  m-1 hover:text-yellow-300">
					About Us
				</Link>
				<Link
					to="/booking"
					className="hidden md:block text-[22px] font-bold m-1 absolute right-5 hover:text-yellow-300"
				>
					<FaCartShopping />
				</Link>
			</div>
			<GiHamburgerMenu
				className="absolute right-5 text-[24px] md:hidden"
				onClick={() => {
					setNavPanelOpen(true);
				}}
			/>
      {token!=null&&<button className="hidden md:block absolute right-20 text-[24px] border-[2px] border-white p-1 rounded-lg w-15 h-10 hover:text-red-600 hover:border-red-600" onClick={()=>{
        localStorage.removeItem("token")
        window.location.href = "/login"
      }}>
        Log out
      </button>}

	  {token==null&&<button className="hidden md:block absolute right-20 text-[20px] hover:text-yellow-300 hover:border-yellow-300 border-[2px] border-white p-1 rounded-lg w-15 h-10" onClick={()=>{
        window.location.href = "/register"
      }}>
        Register
      </button>}

	  {token==null&&<button className="hidden md:block absolute right-44 text-[20px]  hover:text-yellow-300 hover:border-yellow-300 border-[2px] border-white p-1 rounded-lg w-15 h-10" onClick={()=>{
        window.location.href = "/login"
      }}>
        Login
      </button>}

			<MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
		</header>
	);
}