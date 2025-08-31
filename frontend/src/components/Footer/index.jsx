import { Link } from "react-router-dom";
import TitleLogo from "../TitleLogo";

function Footer() {
  return (
    <footer className="px-5 sm:px-5 py-5  bg-gradient-to-r from-blue-600 to-slate-900 rounded-t-[10px]">
      <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row justify-between gap-2">
        
        <div className="flex justify-start max-h-[20px] md:justify-start">
          <div className="w-20 h-20">
            <TitleLogo />
          </div>
        </div>

      
        <div className="grid grid-cols-1 mt-[40px] gap-6 items-center text-white justify-center">
          <div className="flex flex-col sm:flex-row sm:gap-6 lg:gap-10 items-center">
            <Link className="hover:text-[#43D262] hover:underline" to={"/about"}>
              Haqqımızda
            </Link>
            <Link className="hover:text-[#43D262] hover:underline" to={"/contact"}>
              Əlaqə
            </Link>
         

          
            <Link className="hover:text-[#43D262] hover:underline" to={"/yardim"}>
              Yardım
            </Link>
            <Link className="hover:text-[#43D262] hover:underline" to={"/Xidmetler"}>
              Xidmətlər
            </Link>
            <Link className="hover:text-[#43D262] hover:underline" to={"/Qaydalar"}>
              Qaydalar
            </Link>
       </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4">
            <Link to={"https://github.com/omur56"}>
              <img
                className="w-8 h-8 sm:w-8 sm:h-8"
                src="/assets/SocialMediaIcon/github_3291695-removebg-preview.png"
                alt="Github"
              />
            </Link>
            <Link to={"https://mail.google.com/mail/?view=cm&fs=1&to=omur199624@gmail.com"}>
              <img
                className="w-8 h-8 sm:w-8 sm:h-8"
                src="/assets/SocialMediaIcon/icons8-gmail-48.png"
                alt="Gmail"
              />
            </Link>
            <Link to={"https://www.linkedin.com/in/%C3%B6m%C3%BCrxan-abdullayev-b2052a318"}>
              <img
                className="w-8 h-8 sm:w-8 sm:h-8"
                src="/assets/SocialMediaIcon/linkedin_3992606-removebg-preview.png"
                alt="Linkedin"
              />
            </Link>
            <Link to={"https://t.me/omurxan1"}>
              <img
                className="w-8 h-8 sm:w-8 sm:h-8"
                src="/assets/SocialMediaIcon/telegram-svgrepo-com.svg"
                alt="Telegram"
              />
            </Link>
          </div>

          <a
            className="text-white text-sm sm:text-base flex items-center gap-2 hover:underline hover:text-sky-400"
            href="tel:+994559138099"
          >
            <img
              className="w-6 h-6 sm:w-6 sm:h-6"
              src="/assets/SocialMediaIcon/telephoneicon.png"
              alt="Phone"
            />
            +994 55 913 80 99
          </a>
        </div>
      </div>

      <div className="border-t border-slate-300 mt-8"></div>

      <div className="flex justify-center mt-6">
        <p className="text-white text-center">© 2025 AxtarTap.az Bütün Hüquqlar Qorunur.</p>
      </div>
    </footer>
  );
}

export default Footer;
