"use client"
import {CiSettings, CiStickyNote} from "react-icons/ci";
import {motion, AnimatePresence} from "framer-motion";
import {BiFullscreen, BiRefresh, BiSearch} from "react-icons/bi";
import {useContext, useEffect, useState} from "react";
import {CgDarkMode, CgFileDocument} from "react-icons/cg";
import {MdDarkMode, MdLightMode} from "react-icons/md";
import {AppContext} from "@/app/AppContext";
import {AiFillFileAdd} from "react-icons/ai";
import {BsCircle, BsFullscreen, BsIncognito} from "react-icons/bs";
import {TfiLineDouble} from "react-icons/tfi";
import {RxEnterFullScreen} from "react-icons/rx";

export function ToolBar() {

    const [toggleitems, setToggleitems] = useState(false)
    const context = useContext(AppContext);
    const [bordersInfo, setBordersInfo] = useState(false)
    const [darkModeInfo, setDarkInfo] = useState(false)
    const [lightmodeInfo, setLightInfo] = useState(false)

    function toggle() {
        setToggleitems(!toggleitems)
    }


    function toggleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    return <motion.div
        transition={{duration: .5}}
        className={`fixed ${toggleitems ? 'right-[46%]' : 'right-6'} md:right-6 top-[47%] bg-gray-400/60 p-1 rounded-2xl md:top-6 z-40`}>
        <motion.div
            whileTap={{scale: 1.3, translateX: 10, rotate: 360}}
            transition={{duration: 1.1}}
            initial={{x: 0, y: 0}}><CiSettings onClick={toggle} size="40px"/></motion.div>
        <AnimatePresence>
            {toggleitems && <motion.div
                animate={{y: 0, x: 0}}
                initial={{y: 100, x: 150}}
                exit={{y: 100, x: 150}}
                transition={{duration: .5}}
                className="absolute md:static right-[0%] top-[-280%] bg-gray-400/70 p-1 mb-1 rounded-2xl md:top-6 z-20"
            >
                <motion.div
                    animate={{rotate: 760}}
                    initial={{rotate: 0}}
                    whileTap={{rotate: -720}}
                    transition={{duration: 1}}>
                    <BiRefresh className="fill-blue-400" size="40px"/>
                </motion.div>
                <motion.div
                    onClick={context?.toggleHideHidden}
                    className={`${context?.hideHidden ? "bg-blue-400" : "bg-gray-400/70"} flex justify-center items-center rounded-2xl`}
                >
                    <BsIncognito className="" size={"36px"}/>
                </motion.div>
                <motion.div
                    onClick={toggleFullScreen}
                    className={`${context?.hideHidden ? "bg-blue-400" : "bg-gray-400/70"} flex justify-center items-center mt-1 rounded p-1`}
                >
                    <BiFullscreen className="" size={"30px"}/>
                </motion.div>

            </motion.div>
            }
        </AnimatePresence>
        <AnimatePresence>
            {toggleitems && <motion.div
                animate={{y: 0}}
                initial={{y: 150}}
                exit={{x: 150, rotate: 360}}
                transition={{duration: .5}}
                className={`absolute md:static left-[-120%] -top-[90%]  p-1 mb-1  bg-gray-400/70 rounded-2xl md:top-6 z-20`}
            >
                <motion.div
                    animate={{rotate: 360, y: 0}}
                    initial={{rotate: 0, y: 20}}
                    transition={{duration: 1}}>
                    <div onClick={context?.setlightMode}
                         onMouseEnter={() => setLightInfo(true)}
                         onMouseLeave={() => setLightInfo(false)}
                         className={`${!context?.darkMode ? "bg-blue-400" : "bg-gray-400/7"} relative rounded-2xl`}><MdLightMode
                        size="40px"/>
                        {lightmodeInfo &&
                            <p className={`absolute bg-gray-400 text-white text-lg -left-28 p-[.37rem] rounded top-0 `}>Light Mode </p>}</div>

                    <div onClick={context?.toggleGlassy}
                         onMouseEnter={() => setBordersInfo(true)}
                         onMouseLeave={() => setBordersInfo(false)}
                         className={`${context?.glassy ? "bg-pink-300" : "bg-gray-400/7"} relative mt-1 rounded-2xl`}>
                        <CgDarkMode
                            size="40px"/>
                        {bordersInfo &&
                            <p className={`absolute bg-gray-400 text-white text-lg -left-24 p-[.37rem] rounded top-0 `}>Borders </p>}
                    </div>
                    <div onClick={context?.setdarkMode}
                         onMouseEnter={() => setDarkInfo(true)}
                         onMouseLeave={() => setDarkInfo(false)}
                         className={` ${context?.darkMode ? "bg-blue-400" : "bg-gray-400/7"} mt-1 relative rounded-2xl`}>
                        <MdDarkMode size="40px"/>
                        {darkModeInfo &&
                            <p className={`absolute bg-gray-400 text-white text-lg -left-28 p-[.37rem] rounded bottom-0 `}>Dark Mode </p>}
                    </div>
                </motion.div>

            </motion.div>
            }</AnimatePresence>


        <AnimatePresence>
            {toggleitems &&
                <motion.div
                    animate={{y: 0, x: 0}}
                    initial={{y: -100, x: 150}}
                    exit={{y: -100, x: 150}}
                    transition={{duration: .5}}
                    className="absolute md:static right-[0%] bottom-[-290%] bg-gray-400/70 p-1 md:mb-1 rounded-2xl md:top-6 z-20"
                >
                    <motion.div
                        animate={{y: 0}}
                        initial={{y: -20}}
                        transition={{duration: 1}}>
                        <BiSearch size="40px"/>
                    </motion.div>
                    <motion.div
                        onClick={context?.toggleAddNote}
                        animate={{y: 0}}
                        initial={{y: -20}}
                        transition={{duration: .5}}>
                        <CiStickyNote size="40px"/>
                    </motion.div>
                    <motion.div
                        className="flex justify-center  items-center"
                        animate={{y: 0}}
                        initial={{y: -20}}
                        transition={{duration: .5}}>
                        <select value={context?.itemsPerRow} onInput={(e)=>context?.setItemsPerRowAndSave(Number(e.currentTarget.value))}
                                className="w-full p-3 h-12 rounded-2xl text-xl font-bold bg-gray-400/70 appearance-none focus:outline-none bg">
                            <option className="font-bold" value="0">1</option>
                            <option className="font-bold" value="1">2</option>
                            <option className="font-bold" value="2">3</option>
                            <option className="font-bold" value="3">4</option>
                            <option className="font-bold" value="4">5</option>
                        </select>
                    </motion.div>

                </motion.div>
            }
        </AnimatePresence> <AnimatePresence>
        {toggleitems &&
            <motion.div
                animate={{y: 0, x: 0}}
                initial={{y: -100, x: 150}}
                exit={{y: 0, x: 150}}
                transition={{duration: .5}}
                className="absolute md:static right-[-120%] bottom-[-90%] bg-gray-400/70 p-1 md:mb-1 rounded-2xl md:top-6 z-20"
            >
                <motion.div
                    onClick={context?.togglereadMode}
                    className={`${context?.readMode ? "bg-blue-400" : "bg-gray-400/70"} rounded-2xl`}
                    animate={{y: 0}}
                    initial={{y: -20}}
                    transition={{duration: 1}}>
                    <CgFileDocument size="40px"/>
                </motion.div>
                <motion.div
                    onClick={context?.toggleDualBorder}
                    className={`${context?.dualBorder ? "bg-blue-400" : "bg-gray-400/70"} mt-1 rounded-2xl`}
                    animate={{y: 0}}
                    initial={{y: -20}}
                    transition={{duration: .5}}>
                    <TfiLineDouble size="40px"/>
                </motion.div>
                <motion.div
                    onClick={context?.toggleRoundedCorners}
                    className={`${context?.roundedCorners ? "bg-blue-400" : "bg-gray-400/70"} mt-1 rounded-3xl`}
                    animate={{y: 0}}
                    initial={{y: -20}}
                    transition={{duration: .5}}>
                    <BsCircle size="40px"/>
                </motion.div>
            </motion.div>
        }</AnimatePresence>

    </motion.div>
}