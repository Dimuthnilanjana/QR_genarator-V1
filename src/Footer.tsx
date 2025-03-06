import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { IoHeart } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 md:p-6 text-center flex flex-col md:flex-row justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold flex items-center gap-1"><a href="https://github.com/Dimuthnilanjana" className="text-blue-400 hover:underline flex items-center gap-1"><FaGithub /> Dimuth Nilanjana</a></p>
        <p className="text-sm flex items-center gap-1 animate-pulse"> <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span></p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm">© {new Date().getFullYear()} <a href="https://dimuthnilanjana.com" className="text-blue-400 hover:underline">Dimuth Nilanjana</a>. All rights reserved.</p>
      </div>
    </footer>
  );
}