"use client"
import React, {useEffect, useState, useTransition} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useAmp} from "next/amp";
import {randomBackground} from "@/components/Card";
import {getAllNotes} from "@/components/ServerFunctions";

interface User {
}

interface Context {
    user: User | null;
    setUser: (user: User | null) => void;
    getUser: () => User | null;
    notes: Note[];
    setNotes: (notes: Note[]) => void;
    refreshNotes: () => void;
    darkMode: boolean;
    setdarkMode: () => void;
    setlightMode: () => void;
    openModal: (message: string) => void;
    glassy: boolean;
    toggleGlassy: () => void;
    hideHidden: boolean;
    toggleHideHidden: () => void;
    readMode: boolean;
    togglereadMode: () => void;
    dualBorder: boolean;
    toggleDualBorder: () => void;
    roundedCorners: boolean;
    toggleRoundedCorners: () => void;
    itemsPerRow: number;
    setItemsPerRowAndSave: (n: number) => void;
    addNote: boolean;
    toggleAddNote: () => void;
}

export const AppContext = React.createContext<Context | null>(null);

function Modal(props: { closeModal: () => void, message: string }) {
    useEffect(() => {
        setTimeout(() => {
            props.closeModal()
        }, 1200)
    }, [])
    return <div className="fixed top-0 z-50 left-0 w-full h-full bg-gray-400/10 ">
        <motion.div
            animate={{x: 0}}
            initial={{x: 500}}
            exit={{y: -500}}
            transition={{duration: .3}}
            className={`${randomBackground()} fixed right-3  p-4 mt-32  rounded-2xl w-4/12`}>
            <div className="text-center text-xl">{props.message}</div>
            {/*<div className="flex justify-center">*/}
            {/*    <button onClick={props.closeModal} className="bg-blue-400 p-2 rounded-2xl">Close</button>*/}
            {/*</div>*/}
        </motion.div>
    </div>;

}

function themeInit() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

}


export function AppWrapper({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [glassy, setGlassy] = useState<boolean>(false);
    const [hideHidden, setHideHidden] = useState<boolean>(false);
    const [readMode, setReadMode] = useState<boolean>(true);
    const [dualBorder, setDualBorder] = useState<boolean>(false);
    const [roundedCorners, setRoundedCorners] = useState<boolean>(false);
    const [itemsPerRow, setItemsPerRow] = useState<number>(3);
    const [notes, setNotes] = useState<Note[]>([]);
    const [isPending, startTransition] = useTransition()
    const [addNote, setAddNote] = useState<boolean>(false);

    async function refreshNotes() {
        const notes = await getAllNotes();
        setNotes(notes);

    }

    useEffect(() => {
        const darkMode = localStorage.getItem("darkMode")
        const glassy = localStorage.getItem("glassy")
        if (darkMode === "true") {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
        if (glassy === "true") {
            setGlassy(true)
        } else {
            setGlassy(false)
        }
        if (localStorage.getItem("hideHidden") === "true") {
            setHideHidden(true)
        } else {
            setHideHidden(false)
        }
        if (localStorage.getItem("readMode") === "true") {
            setReadMode(true)
            console.log("readMode", true)
        } else {
            setReadMode(false)
        }
        if (localStorage.getItem("dualBorder") === "true") {
            setDualBorder(true)
        } else {
            setDualBorder(false)
        }
        if (localStorage.getItem("roundedCorners") === "true") {
            setRoundedCorners(true)
        } else {
            setRoundedCorners(false)
        }
        if (localStorage.getItem("itemsPerRow") !== null) {
            setItemsPerRow(parseInt(localStorage.getItem("itemsPerRow") as string))
        } else {
            setItemsPerRow(3)
        }

        getAllNotes().then(res => {
            setNotes(res)
        });
        themeInit();
    }, [])

    useEffect(() => {
        themeInit();
    }, [darkMode])

    function toggleAddNote() {
        setAddNote(!addNote)
    }

    function setItemsPerRowAndSave(n: number) {
        localStorage.setItem("itemsPerRow", n.toString())
        setItemsPerRow(n)
    }

    function toggleRoundedCorners() {
        localStorage.setItem("roundedCorners", (!roundedCorners).toString())
        setRoundedCorners(!roundedCorners)
        console.log("roundedCorners", roundedCorners);
    }

    function setlightMode() {
        setDarkMode(false)
        localStorage.setItem("darkMode", "false")
        localStorage.theme = 'light'
    }

    function togglereadMode() {
        localStorage.setItem("readMode", (!readMode).toString())
        setReadMode(!readMode)
        console.log(readMode)
    }

    function setdarkMode() {
        setDarkMode(true)
        localStorage.setItem("darkMode", "true")
        localStorage.theme = 'dark'

    }

    function toggleDualBorder() {
        localStorage.setItem("dualBorder", (!dualBorder).toString())
        setDualBorder(!dualBorder)
    }

    function toggleGlassy() {
        localStorage.setItem("glassy", (!glassy).toString())
        setGlassy(!glassy)
    }

    function toggleHideHidden() {
        localStorage.setItem("hideHidden", (!hideHidden).toString())
        setHideHidden(!hideHidden)
    }

    function openModal(message: string) {
        setMessage(message);
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    return <AppContext.Provider value={{
        user,
        setUser,
        getUser: () => user,
        darkMode,
        setdarkMode,
        setlightMode,
        openModal,
        glassy,
        toggleGlassy,
        hideHidden,
        toggleHideHidden,
        readMode,
        togglereadMode,
        dualBorder,
        toggleDualBorder,
        roundedCorners,
        toggleRoundedCorners,
        itemsPerRow,
        setItemsPerRowAndSave,
        notes,
        setNotes,
        refreshNotes,
        addNote,
        toggleAddNote
    }}>
        <AnimatePresence>
            {modal && <Modal message={message} closeModal={closeModal}/>}
        </AnimatePresence>
        {children}
    </AppContext.Provider>
}