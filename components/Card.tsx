"use client"
import {motion} from "framer-motion";
import {CiEdit} from "react-icons/ci";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AppContext, AppWrapper} from "@/app/AppContext";
import {AiFillCopy, AiFillDelete, AiOutlineDelete, AiOutlineSave} from "react-icons/ai";
import {IoMdClose} from "react-icons/io";
import {BiCopy, BiCross} from "react-icons/bi";
import useCopy from "use-copy";
import {MdOutlineModeEditOutline} from "react-icons/md";
import {deleteNoteById, updateNoteById} from "@/components/ServerFunctions";

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
    "border-yellow-500",
    "border-green-500",
    "border-blue-500",
    "border-indigo-500",
    "border-purple-500",
    "border-pink-500",
    "border-amber-500",
    "border-lime-500",
    "border-cyan-500",
    "border-emerald-500",
    "border-sky-500",
    "border-fuchsia-500",
    "border-rose-500"
]


export function randomBackground() {
    let random = Math.floor(Math.random() * btn_backgrounds.length);
    return btn_backgrounds[random]
}


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

export function Card({text,id, date, className, closeAction, poppedup = false, hidden}: {
    text: string, id:number,date: string, className?: string, closeAction?: () => void, poppedup?: boolean, hidden?: boolean
}) {
    const context = useContext(AppContext);
    const [editText, setEditText] = useState(text);
    const [editing, setEdit] = useState(false);
    const ref = useRef(null);
    const [copied, copy, setCopied] = useCopy(editText);
    let dateCreated = new Date(date);

    let day = dateCreated.getDate();

    let month = dateCreated.getMonth();

    let year = dateCreated.getFullYear();
    let reset = 'bg-gray-100/50 dark:bg-[#0d1426] shadow-2xl dark:border-cyan-400 bg-white dark:border-[.5px] '
    let double_border = context?.dualBorder && 'border-double dark:border-double dark:border-gray-400/70 '
    let btn_double_border = context?.dualBorder ? 'border-double' : 'border-none'
    let button_reset = context?.dualBorder && 'border-[5px]'
    let glassy = "border-gradient-purple " + context?.darkMode? "": "shadow-violet-500/60"
    let roundedlg = context?.roundedCorners && "rounded-lg";
    let roundedxl = context?.roundedCorners && " rounded-xl"
    let roundedtxxl = context?.roundedCorners && "rounded-xl"
    let roundedxxxl = context?.roundedCorners && "rounded-3xl"

    function returnColors() {
        let random = Math.floor(Math.random() * backgrounds.length);
        return {
            light: backgrounds[random], border: backgrounds_border[random], btn: btn_backgrounds[random]
        }
    }

    const colors = useMemo(() => {

            return returnColors();
        }

        , [context?.glassy]);

    function copyToClipboard(text: string) {
        // navigator.clipboard.writeText(text).then(() => {
        //     context?.openModal("Copied to Clipboard")
        //
        // })
        copy()
        context?.openModal("Copied to Clipboard")


    }


    function textChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault()
        setEditText(event.target.value)
    }


    const handleInputChange = useCallback((event: any) => {
        textChange(event);
    }, []);

   async function updateNote() {

        context!.notes.filter(item=>item.id===id)[0].text = editText;
        context?.setNotes(context!.notes)

       await updateNoteById(id, {
            text: editText,
            date: date,
            id: id,
            hidden: hidden!,
        })

        context?.openModal("Note Updated")



        setEdit(!editing)
    }

    const deleteNote = () => {
        context?.setNotes(context!.notes.filter(item => item.id !== id))
        deleteNoteById(id)
        context?.openModal("Note Deleted")

    };
    return (
        <div
            className={`mx-[7%] w-[86%] md:mx-0 md:w-full border-[10px]  ${roundedxxxl} ${context?.glassy ? colors.border : context?.readMode && "border-gray-700"}  ${context?.readMode && reset } ${ double_border} ${context?.readMode && context.darkMode && context.roundedCorners && 'rounded-xl'} ${context?.readMode && context.darkMode && 'dark-card'} ${context?.glassy && context.darkMode && "shadow  shadow-blue-950 "}  `}>
            <motion.div
                className={`  w-full dark:text-gray-200 p-6  ${context?.glassy &&  colors.border + glassy}  dark:border-none  text-gray-700 ${roundedtxxl}  h-72 ${poppedup && "h-fit md:h-96"} ${hidden && context?.hideHidden && 'blur'}  shadow-2xl dark:text-white ${!context?.readMode && "text-white"}  ${colors.light} dark:bg-[#0d1426]/40 ${className} ${context?.readMode && reset}  `}>

                <div className="relative  overflow-ellipsis flex justify-between p-2">
                    <motion.h1 className="underline-offset-4 text-base ">{`${year}-${month}-${day}`}</motion.h1>
                    <span  className="text-gray-600 select-none text-3xl">{poppedup ?
                        <IoMdClose onClick={closeAction} className={"fill-red-600 dark:fill-amber-50"} /> : <AiOutlineDelete
                            onClick={deleteNote}
                            className={"fill-red-600 dark:fill-amber-50"}/>}</span>
                </div>
                <div className={`h-32 ${poppedup && 'h-56'} `}>
                    {!editing ?
                        <p className={`md:text-xl text-base line-clamp-4 ${poppedup && "line-clamp-6 md:h-56"}`}>{editText}</p> :
                        <textarea value={editText} onInput={handleInputChange}
                                  ref={ref}
                                  className={`dark:bg-black bg-inherit h-full w-full focus:outline-none border-2 p-2 border-amber-50 ${roundedxl} ${poppedup && "text-green-600 md:h-52"} `}></textarea>}
                </div>
                <div className="flex flex-row gap-3 text-base justify-between mb-3">
                    <button
                        onClick={() => copyToClipboard(editText)}
                        className={`${colors.btn} text-sm  ${btn_double_border} blur-none z-20 text-white ${roundedlg} p-2 mt-4 dark:border-0 dark:hover:border-4 dark:border-white  dark:bg-inherit ${button_reset}  ${context?.glassy &&  colors.border }  `}>
                        <BiCopy size={32}/>
                    </button>
                    <button
                        className={`${colors.btn} text-sm  ${btn_double_border}  text-white ${roundedlg} p-2 mt-4 dark:border-0 dark:hover:border-4 dark:border-white dark:bg-inherit  ${button_reset}  ${context?.glassy &&  colors.border } `}>
                        {editing ?  <span   onClick={updateNote}>Save <AiOutlineSave


                            className="inline"/> </span>: <MdOutlineModeEditOutline
                            onClick={() => setEdit(!editing)}
                            className="inline w-8 h-6"/>}
                    </button>
                </div>
            </motion.div>


        </div>)
}
