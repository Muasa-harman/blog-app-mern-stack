import React from 'react'
import { Link } from 'react-router-dom'
import { BsDribbble, BsFacebook,BsWhatsapp, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className='border border-t-8 border-teal-600'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
          <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-gray-200 via-slate-500 to-gray-400 rounded-lg text-white">
              Harman Muasa
            </span>
            Blog
          </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              {/* <h3 className="">About</h3> */}
              <div className="flex flex-col">
              {/* <Link hrefLang="https://www.linkedin.com/in/harman-muasa-fullstackdev/" target='_blank' rel='noopenernoreferrer'>
              <span className="">portfolio</span>
              </Link> */}
              <Link hrefLang="https://myportfolioblogapp.onrender.com/about" target='_blank' rel='noopenernoreferrer'>
              <span className="">About</span>
              </Link>
              <Link hrefLang="https://myportfolioblogapp.onrender.com/" target='_blank' rel='noopenernoreferrer'>
              <span className="">portfolio</span>
              </Link>
              </div>
            </div>

            <div className="">
              <h3 className="">Follow us</h3>
              <div className="flex flex-col">
              <Link hrefLang="https://www.linkedin.com/in/harman-muasa-fullstackdev/" target='_blank' rel='noopenernoreferrer'>
              <span className="">Github</span>
              </Link>
              <Link hrefLang="/about" target='_blank' rel='noopenernoreferrer'>
              <span className="">You tube</span>
              </Link>
              <Link hrefLang="https://www.linkedin.com/in/harman-muasa-fullstackdev/" target='_blank' rel='noopenernoreferrer'>
              <span className="">LinkedIn</span>
              </Link>
              </div>
            </div>

            <div className="">
              <h3 className="">Legal</h3>
              <div className="flex flex-col">
              <Link hrefLang="https://www.linkedin.com/in/harman-muasa-fullstackdev/" target='_blank' rel='noopenernoreferrer'>
              <span className="">Privacy</span>
              </Link>
              <Link hrefLang="/about" target='_blank' rel='noopenernoreferrer'>
              <span className="">Terms &amp; Conditions</span>
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className=""> &copy; Harman Muasa Blog{new Date().getFullYear()} . All Right Reserved</div>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            {<BsFacebook/>}
            {<BsInstagram/>}
            {<BsTwitter/>}
            {<BsGithub/>}
            {<BsDribbble/>}
            {<BsWhatsapp/>}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer