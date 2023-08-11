"use client"
import {motion} from "framer-motion";
import {CiEdit} from "react-icons/ci";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState, useTransition} from "react";
import {AppContext, AppWrapper} from "@/app/AppContext";
import {AiFillCopy, AiFillDelete, AiOutlineDelete, AiOutlineSave} from "react-icons/ai";
import {IoMdClose} from "react-icons/io";
import {BiCopy, BiCross} from "react-icons/bi";
import useCopy from "use-copy";
import {MdOutlineModeEditOutline} from "react-icons/md";
import {createNote} from "@/components/ServerFunctions";

const backgrounds = [
    "bg-yellow-500/20",
    "bg-green-500/20",
    "bg-blue-500/20",
    "bg-indigo-500/20",
    "bg-purple-500/20",
    "bg-pink-500/20",
    "bg-amber-500/20",
    "bg-lime-500/20",
    "bg-cyan-500/20",
    "bg-emerald-500/20",
    "bg-sky-500/20",
    "bg-fuchsia-500/20",
    "bg-rose-500/20",

]

const backgroundsDeep = [
    "bg-yellow-500/90",
    "bg-green-500/90",
    "bg-blue-500/90",
    "bg-indigo-500/90",
    "bg-purple-500/90",
    "bg-pink-500/90",
    "bg-amber-500/90",
    "bg-lime-500/90",
    "bg-cyan-500/90",
    "bg-emerald-500/90",
    "bg-sky-500/90",
    "bg-fuchsia-500/90",
    "bg-rose-500/90",

]
const border = [
    "border-yellow-300",
    "border-green-300",
    "border-blue-300",
    "border-indigo-300",
    "border-purple-300",
    "border-pink-300",
    "border-amber-300",
    "border-lime-300",
    "border-cyan-300",
    "border-emerald-300",
    "border-sky-300",
    "border-fuchsia-300",
    "border-rose-300"
]



const btn_backgrounds = [
    "bg-yellow-500/50",
    "bg-green-500/50",
    "bg-blue-500/50",
    "bg-indigo-500/50",
    "bg-purple-500/50",
    "bg-pink-500/50",
    "bg-amber-500/50",
    "bg-lime-500/50",
    "bg-cyan-500/50",
    "bg-emerald-500/50",
    "bg-sky-500/50",
    "bg-fuchsia-500/50",
    "bg-rose-500/50"
]


const backgrounds_border = [
    "border-yellow-500/50",
    "border-green-500/50",
    "border-blue-500/50",
    "border-indigo-500/50",
    "border-purple-500/50",
    "border-pink-500/50",
    "border-amber-500/50",
    "border-lime-500/50",
    "border-cyan-500/50",
    "border-emerald-500/50",
    "border-sky-500/50",
    "border-fuchsia-500/50",
    "border-rose-500/50"
]

export function NoteForm({className, closeAction, poppedup = true}: {
    className?: string, closeAction?: () => void, poppedup?: boolean
}) {
    const context = useContext(AppContext);
    const [text, setText] = useState("");
    const [editing, setEdit] = useState(false);
    const ref = useRef(null);
    const [copied, copy, setCopied] = useCopy(text);
    const [isPending, startTransition] = useTransition()
const [title,setTitle] = useState("")

    let reset = 'bg-gray-100/50 dark:bg-[#0d1426] shadow-2xl dark:border-cyan-400 bg-white dark:border-[.5px]'
    let double_border = context?.dualBorder && 'border-double dark:border-double dark:border-gray-400/70 '
    let btn_double_border = context?.dualBorder ? 'border-double' : 'border-none'
    let button_reset = context?.dualBorder && 'border-[5px]'
    let glassy = "border-gradient-purple " + context?.darkMode ? "" : "shadow-violet-500/60"
    let roundedlg = context?.roundedCorners && "rounded-lg";
    let roundedxl = context?.roundedCorners && " rounded-xl"
    let roundedtxxl = context?.roundedCorners && "rounded-xl"
    let roundedxxxl = context?.roundedCorners && "rounded-3xl"

    function returnColors() {
        let random = Math.floor(Math.random() * backgrounds.length);
        return {
            light: backgrounds[random], border: backgrounds_border[random], btn: btn_backgrounds[random],checked:border[random],deep:backgroundsDeep[random],
        }
    }

    const colors = useMemo(() => {

            return returnColors();
        }

        , [context?.glassy]);

    function copyToClipboard(text: string) {
        copy()
        context?.openModal("Copied to Clipboard")

    }


    function textChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault()
        setText(event.target.value)
    }


    const handleInputChange = useCallback((event: any) => {
        textChange(event);
    }, []);
    const [hidden, setHidden] = useState<string | ReadonlyArray<string> | number | undefined>("false");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            createNote({
                text: text,
                id: Math.random()*10000000,
                date: new Date().toISOString(),
                hidden: hidden === "true",
                title:title
            }).then(() => {
                setText("");
                context?.openModal("Note Created")
                context?.refreshNotes()
                closeAction && closeAction()
            }).catch((err) => {
                console.log("error was", err)
            })
        })
    }

    function toggleHidden() {
        let value = hidden === "true" ? "false" : "true"
        setHidden(value)
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setTitle(event.target.value)
    }



    return (<form onSubmit={onSubmit} className={className}>
            <div
                className={`border-[10px] select-none w-[100%]  ${roundedxxxl} ${context?.glassy ? colors.border : context?.readMode && "border-gray-700"}   ${context?.readMode && reset} ${double_border} ${context?.readMode && context.darkMode && context.roundedCorners && 'rounded-xl'} ${context?.readMode && context.darkMode && 'dark-card'} ${context?.glassy && context.darkMode && "shadow drop-shadow-2xl shadow-blue-950 "} ${context?.glassy&& !context?.darkMode && "text-gray-200" }  `}>
                <motion.div
                    className={`w-full dark:text-gray-200 p-6 w-[100%]   ${context?.glassy && colors.border + glassy}  dark:border-none   ${roundedtxxl}  h-fit ${poppedup && "md:h-96"}  shadow-2xl dark:text-white  ${colors.light} dark:bg-[#0d1426]/80 ${className} ${context?.readMode && reset} `}>

                    <div className="relative  overflow-ellipsis flex justify-between p-2">
                        <motion.h1 className="underline-offset-4 text-base  ">Enter New Clip</motion.h1>
                        <span onClick={(event) => {
                            event.preventDefault();
                            closeAction && closeAction()
                        }}
                              className=" select-none text-3xl">
                        <IoMdClose className={`${!context?.darkMode && 'fill-red-500'}`}/> </span>
                    </div>
                    <div className="h-12 m-1">
                        <input
                            placeholder={"Enter your title here"}
                            type="text"
                            className={`dark:bg-black bg-inherit w-full focus:outline-none border-2 p-2 ${context?.glassy && !context.darkMode ? colors.border : 'border-gray-700/80'} ${roundedxl} ${context?.darkMode && "text-green-600"}`}
                        value={title}
                        onChange={handleTitleChange}
                        />
                    </div>
                    <div className={`h-32 ${poppedup && 'h-52'} `}>
                        <textarea value={text} onInput={handleInputChange}
                                  ref={ref}
                                  placeholder={"Enter your text here"}
                                  className={`dark:bg-black bg-inherit h-full w-full focus:outline-none border-2 p-2 ${context?.glassy && !context.darkMode ? colors.border : 'border-gray-700/80'} ${roundedxl} ${context?.darkMode && "text-green-600 md:h-52"}`}></textarea>
                    </div>
                    <div>
                        <label className="pl-3.5 relative">
                            <input name="hidden" type="checkbox" onInput={toggleHidden} value={hidden} className=" opacity-0 bg-none rounded-xl focus:outline-none h-5 mt-3 mr-2 w-5 "/>

                                <span className={ `absolute ${hidden=='true' ? colors.checked+ " border-4 " + colors.deep: colors.light} rounded left-3.5 -top-1 h-5 w-5`}></span>
                            <span className="absolute text-sm font-bold bottom-[3px] ">Hidden</span>
                        </label>
                    </div>
                    <div className="flex flex-row gap-3 text-base justify-between mb-3">
                        <button
                            type="submit"

                            className={`${colors.btn} text-sm  ${btn_double_border} blur-none z-20 text-white ${roundedlg} p-2 mt-4 dark:border-0 dark:hover:border-4 dark:border-white  dark:bg-inherit ${button_reset}  ${context?.glassy && colors.border}  `}>

                            Add
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                closeAction && closeAction()
                            }}
                            className={`${colors.btn} text-sm  ${btn_double_border}  text-white ${roundedlg} p-2 mt-4 dark:border-0 dark:hover:border-4 dark:border-white dark:bg-inherit  ${button_reset}  ${context?.glassy && colors.border} `}>
                            Cancel
                        </button>
                    </div>
                </motion.div>


            </div>
        </form>)
}
