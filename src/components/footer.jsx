import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">KV Audio</h2>
          <p className="text-gray-400 text-sm">
            Rent pro-grade audio gear. Fast, affordable, reliable.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Main Pages</h3>
          <ul className="text-gray-300 space-y-1">
            <li className="hover:text-yellow-300">Home</li>
            <li className="hover:text-yellow-300">Shop</li>
            <li className="hover:text-yellow-300">Reviews</li>
            <li className="hover:text-yellow-300">Contact</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-300 text-sm">Email: support@kvaudio.com</p>
          <p className="text-gray-300 text-sm mb-3">Phone: +94 71 234 5678</p>

          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            <a href="#" className="hover:text-yellow-400"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} KV Audio. All rights reserved.
      </div>
    </footer>
  );
}
