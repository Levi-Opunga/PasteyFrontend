"use client"
import React, {MouseEvent, useContext} from "react";
import Image from "next/image";
import image from "../public/logo-no-background.svg"
import {Logo} from "@/components/Logo";
import {motion} from "framer-motion"
import {AppContext} from "@/app/AppContext";

export default function Footer() {
    const context = useContext(AppContext);

    function handleSubscribe(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }


    return (
        <footer className="dark:text-white text-gray-700 w-[80%]  py-4 font-pirata">
            <div className="hidden md:grid md:grid-cols-3 ">
                <p className="text-2xl ml-[10%] my-auto  ">
                    Levi <sub className="text-xs font-fira">.TM</sub>{" "}
                </p>

                <div className="font-roboto">
                    <p className="sm:text-center font-pirata pb-2 ">
                        Blog <b className="text-blue-500">U</b>pdates
                    </p>
                    <span>
            <form className="flext grid grid-rows-2 md:inline mx-auto ">
              <motion.span
                  className={`relative bg-gradient-to-r from-cyan-300/60 to-blue-400/60 dark:from-blue-900 dark:to-blue-950 dark:bg-cyan-900 flex p-1 justify-center ${context?.darkMode && 'dark-card ring-blue-600 bl shadow-xl'} ${context?.darkMode&&context.readMode && "night-hawk ring-blue-500 shadow-2xl"} w-full ${context?.roundedCorners && 'rounded-xl'}`}
              >
               <span className={`absolute -top-0 h-[120%] -z-10  w-full blur-xl  ${context?.darkMode && 'bg-blue-400'} ${context?.darkMode&&context.readMode && "bg-cyan-100"} w-full ${context?.roundedCorners && 'rounded-xl'}`}></span>

                  <input
                      type="email"
                      placeholder="john@example.com"
                      className={`bg-white place-self-center text-center ${context?.darkMode && 'dark-card'} ${context?.darkMode&&context.readMode && "night-hawk"} ${context?.roundedCorners && 'rounded-xl'} w-full dark:text-white placeholder:text-white/9 p-2 h-[3rem]
                   font-bold focus:outline-none bg-transparent  border-transparent  placeholder:text-black dark:placeholder:text-white`}
                  /></motion.span>
         <div className="flex justify-center">

             <motion.button
                 whileTap={{scale: 0.9}} onClick={handleSubscribe}
                 className={`font-pirata font-bold place-self-center md:p-2 text-center mx-auto px-2 my-2 border-4 bg-transparent border-white h-10  w-fit   ${context?.darkMode && 'dark-card ring-blue-600 bl shadow-xl'} ${context?.darkMode&&context.readMode && "night-hawk shadow-2xl"} w-full ${context?.roundedCorners && 'rounded-xl'}`}  >
                <span className="text-blue-500">S</span>ubscribe
         </motion.button>
         </div>
            </form>
          </span>
                </div>
                <div
                    className="md:w-16 ml-[70%] mt-8 fill-black"
                >


                    <Logo className="fill-black dark:fill-white" size="36"/>
                </div>
            </div>

            <div className="md:hidden  ">
                <div className="font-roboto">
                    <p className="text-center font-pirata ">
                        Blog <span className="text-blue-500">U</span>pdates
                    </p>
                    <span>
            <form className="flext grid grid-rows-2 md:inline mx-auto ">
              <motion.span
                 className={`relative bg-gradient-to-r from-cyan-300/60 to-blue-400/60 dark:from-blue-900 dark:to-blue-950 dark:bg-cyan-900 flex p-1 justify-center ${context?.darkMode && 'dark-card ring-blue-600 bl shadow-xl'} ${context?.darkMode&&context.readMode && "night-hawk ring-blue-500 shadow-2xl"} w-full ${context?.roundedCorners && 'rounded-xl'}`}
             >
               <span className={`absolute -top-0 h-[120%] -z-10  w-full blur-xl  ${context?.darkMode && 'bg-blue-400'} ${context?.darkMode&&context.readMode && "bg-cyan-100"} w-full ${context?.roundedCorners && 'rounded-xl'}`}></span>

                  <input
                 type="email"
                 placeholder="john@example.com"
                 className={`bg-white place-self-center text-center ${context?.darkMode && 'dark-card'} ${context?.darkMode&&context.readMode && "night-hawk"} ${context?.roundedCorners && 'rounded-xl'} w-full dark:text-white placeholder:text-white/9 p-2 h-[3rem]
                   font-bold focus:outline-none bg-transparent  border-transparent  placeholder:text-black dark:placeholder:text-white `}
             /></motion.span>
         <div className="flex justify-center">

             <motion.button
             whileTap={{scale: 0.9}} onClick={handleSubscribe}
             className={`font-pirata font-bold place-self-center md:p-2 text-center mx-auto px-2 my-2 border-4 bg-transparent border-white h-10  w-fit   ${context?.darkMode && 'dark-card ring-blue-600 bl shadow-xl'} ${context?.darkMode&&context.readMode && "night-hawk shadow-2xl"} w-full ${context?.roundedCorners && 'rounded-xl'}`}  >
                <span className="text-blue-500">S</span>ubscribe
         </motion.button>
         </div>
            </form>
          </span>
                </div>
                <div className="grid grid-cols-2 mt-3 ">
                    <div className=" ">
                        {" "}
                        <p className=" text-2xl ml-[10%] my-auto ">
                            Levi <sub className="text-xs font-fira">.TM</sub>{" "}
                        </p>
                    </div>
                    <div
                        className="md:w-16 ml-[70%]  flex items-center justify-center fill-black"
                    >


                        <Logo className="fill-cyan dark:fill-white" size="36"/>
                    </div>
                </div>
            </div>
        </footer>
    );
}
