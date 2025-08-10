import { Link } from "react-router-dom";
import TitleLogo from "../TitleLogo";

function Footer() {
  return (
    <footer className="px-5 sm:px-10 py-10  bg-orange-500 rounded-t-[10px] max-h-full max-w[1200px]">
      <div className="mx-auto my-auto max-w-[1200px] ">
        <div className="justify-between  flex  ">
          <div className="w-[20px] h-[20px] max-w-[20px]  mt-[-50px] sm:mt-0">
            <TitleLogo />
          </div>
          <div className="flex flex-col sm:flex-row gap-[5px]    sm:p-4  mt-[10px] sm:mt-0   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:max-w-[500px] text-white ">
           
            
          <div className="flex flex-col  gap-[10px]  sm:w-1/2  p-4   ">

            <Link className="hover:text-[#43D262] hover:underline " to={"/AboutUs"}>Haqqımızda</Link>
            <Link className="hover:text-[#43D262] hover:underline " to={"/ContactUs"}>Əlaqə</Link>
            <Link className="hover:text-[#43D262] hover:underline " to={"/Blog"}>Blog</Link>

          </div>
          <div className="flex flex-col gap-[10px] w-full sm:w-1/2  p-4 ">
            <Link className="hover:text-[#43D262] hover:underline" to={"/Yardım"}>Yardım</Link>
            <Link className="hover:text-[#43D262] hover:underline"to={"/Xidmətlər"}>Xidmətlər</Link>
            <Link className="hover:text-[#43D262] hover:underline" to={"/Qaydalar"}>Qaydalar</Link>
          </div>

          <div className="flex flex-col gap-[10px] w-full sm:w-1/2  p-4 ">
            <Link className="hover:text-[#43D262] hover:underline" to={"/istfadeciler"}>İstfadəçi razılaşmaları</Link>
            <Link className="hover:text-[#43D262] hover:underline" to={"/mexfilik-ve-siyasset"}>Məxfilik siyassəti</Link>
          </div>
</div>

           
          <div className="flex max-w-[300px]  flex-col gap-[20px] mt-[350px] sm:mt-[100px]    ">
            <div className="flex  gap-[15px] items-center justify-center">
              <Link to={"https://github.com/omur56"}>
               
                <img
                  className="w-[30px] h-[30px]"
                  src="/assets/SocialMediaIcon/github_3291695-removebg-preview.png"
                  alt="Github"
                />
              </Link>
              <Link to={"https://mail.google.com/mail/?view=cm&fs=1&to=omur199624@gmail.com"}>
                
                <img
                  className="w-[30px] h-[30px]"
                  src="/assets/SocialMediaIcon/icons8-gmail-48.png"
                  alt="Instagram"
                />
              </Link>
              <Link
                to={
                  "https://www.linkedin.com/in/%C3%B6m%C3%BCrxan-abdullayev-b2052a318"
                }
              >
                {" "}
                <img
                  className="w-[30px] h-[30px]"
                  src="/assets/SocialMediaIcon/linkedin_3992606-removebg-preview.png"
                  alt="Linkedin"
                />
              </Link>
              <Link to={"https://t.me/omurxan1"}>
                {" "}
                <img
                  className="w-[30px] h-[30px]"
                  src="/assets/SocialMediaIcon/telegram-svgrepo-com.svg"
                  alt="Telegram"
                />
              </Link>
            </div>
            <a
              className="text-white  text-sm sm:text-base items-center hover:underline hover:text-sky-400 flex gap-[10px] "
              href="tel:+994559138099"
            >
              <img
                className="w-[24px] h-[24px] "
                src="/assets/SocialMediaIcon/telephoneicon.png"
                alt="Phone"
              />
              +994 55 913 80 99
            </a>
          </div>


        </div>
        <div className="flex bg-slate-100 w-full h-[1px] mt-[10px]"></div>
        <div className="flex justify-center items-center mt-[50px] m-auto">
          <p className="text-white">© 2025 AxtarTap.az Bütün Hüquqalar Qorunur.</p>


        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
