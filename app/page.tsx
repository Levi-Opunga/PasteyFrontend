"use client"

import {motion, AnimatePresence} from "framer-motion"
import React, {useContext, useEffect, useState, useTransition} from "react";
import {Card} from "@/components/Card";
import {ToolBar} from "@/components/ToolBar";
import {AppContext, AppWrapper} from "@/app/AppContext";
import {environment} from "@/environment";
import {deleteNoteById, ServerElement} from "@/components/ServerFunctions";
import Footer from "@/components/footer";
import {NoteForm} from "@/components/NoteForm";



export default function Home() {
    const context = useContext(AppContext);
    const [isHovered, setHovered] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [pastedTexts, setPastedTexts] = useState(context!.notes);
    const [initialCoordinates, setInitialCoordinates] = useState({x: 0, y: 0});
    const [readMode, setReadMode] = useState(true);
    const [base, setBase] = useState("")
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        console.log(context?.notes)
    }, [context]);

    let grids = [
        "md:grid-cols-1",
        "md:grid-cols-2",
        "md:grid-cols-3",
        "md:grid-cols-4",
        "md:grid-cols-5",

    ]


    function clickedClip(e: React.MouseEvent, index: number) {
        e.preventDefault()
        setInitialCoordinates({x: e.clientX, y: e.clientY})
        setSelectedId(index);


    }

    function toggleReadMode() {
        setReadMode(!readMode)
        context?.togglereadMode()
    }

    return (
        <main
            className={`flex min-h-screen  w-screen  relative flex-col items-center gap-8 p-[5%] pt-8 ${context?.readMode && 'dark:bg-[#13111c] bg-slate-200/50 '} ${context?.darkMode && context.readMode && "night-hawk"}`}>
            <motion.div animate={{x: 0, width: "initial", opacity: 1, scale: 1.8}}
                        whileHover={{scale: 1.2}}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}

                        whileTap={{scale: 0.9}}
                        initial={{width: 0, opacity: 0,}}

                        transition={{
                            ease: "linear",
                            delay: .1, duration: isHovered ? 0.5 : 1.5
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500  bg-clip-text ">
                <motion.h1
                    onClick={toggleReadMode}
                    className="text-4xl font-bold text-center text-transparent  uppercase">Pastey
                </motion.h1>
            </motion.div>


            <ToolBar></ToolBar>
            {!context?.readMode &&
                <>
                    <div
                        className="h-40 w-20 bg-gradient-to-r from-indigo-500/80 via-purple-500 to-pink-500/60  blur-3xl absolute top-[40%]  ">

                    </div>
                    <div
                        className="h-20 w-40 bg-gradient-to-r from-indigo-500/80 via-purple-500 to-pink-500/60  blur-3xl  absolute left-[5%] top-[40%]  ">

                    </div>
                    <div
                        className="h-40 w-20 bg-gradient-to-r from-indigo-500/80 via-purple-500 to-pink-500/60  blur-3xl absolute top-[40%] right-[5%]  ">

                    </div>
                    <div
                        className="h-20 w-40 bg-gradient-to-r from-indigo-500 via-emerald-500 to-pink-500 right-[45%] blur-3xl absolute top-[10%]  ">

                    </div>
                    <div
                        className="h-40 w-20 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  blur-3xl absolute top-[5%] left-[10%]    ">


                    </div>
                    <div className="h-32 w-20 bg-orange-500  blur-3xl absolute top-[10%] right-[15%] shadow-blue-700  ">


                    </div>
                    <div
                        className="h-20 w-20 bg-violet-500  blur-2xl absolute bottom-[10%] left-[15%] shadow-blue-700  ">


                    </div>
                    <div
                        className="h-20 w-20 bg-gradient-to-l from-pink-100 via-40% via-indigo-500 to-pink-900  blur-2xl absolute bottom-[10%] right-[15%] shadow-blue-700  ">


                    </div>
                    <div
                        className="h-20 w-20 bg-gradient-to-l from-pink-100 via-40% via-indigo-500 to-pink-900  blur-2xl absolute bottom-[10%] right-[45%] shadow-blue-700  ">


                    </div>
                </>
            }

            {!context?.readMode && <div className={` 2xl:mt-20 gap-8 w-fit  ${grids[context!.itemsPerRow]}  grid  `}>  {
                context?.notes.map((item, index) => {
                    return (
                        <motion.div
                            key={index}
                            transition={{delay: .05, duration: .3}}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            whileHover={{scale: 1.06}}>
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 100}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * .2, duration: 1}}
                                className="z-10"
                                onDoubleClick={(event) => clickedClip(event, index)}
                            >
                                <AnimatePresence>
                                    {
                                        <motion.div
                                            key={index}
                                            initial={{scale: 0}}
                                            animate={{scale: 1}}
                                            transition={{duration: 0.5}}
                                            exit={{scale: 0}}>
                                            <Card
                                                closeAction={() => {
                                                    setSelectedId(null)
                                                    startTransition(async () => {
                                                     let res= await deleteNoteById(item.id)
                                                       res.message === "success" && context?.openModal("Note Deleted")
                                                    })
                                                    context?.notes.splice(index, 1)
                                                    context?.setNotes([...context?.notes])
                                                }}
                                                {...item}  /></motion.div> ?? null}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )
                })
            }
            </div>}
            {context?.readMode &&
                <div className={` 2xl:mt-20 w-fit  gap-8 ${grids[context!.itemsPerRow]} grid `}>  {
                    context.notes.map((item, index) => {
                        return (
                            <motion.div
                                key={index}
                                transition={{delay: .05, duration: .3}}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                whileHover={{scale: 1.06}}>
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 100}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * .3, duration: 1}}
                                    className="z-10"
                                    onDoubleClick={(event) => clickedClip(event, index)}
                                >
                                    <AnimatePresence>
                                        {
                                            <motion.div
                                                key={index}
                                                initial={{scale: 0}}
                                                animate={{scale: 1}}
                                                transition={{duration: 0.5}}
                                                exit={{scale: 0}}>
                                                <Card
                                                    closeAction={() => {
                                                        setSelectedId(null)
                                                        context?.notes.splice(index, 1)
                                                        context?.setNotes([...context?.notes])
                                                    }}
                                                    {...item}  /></motion.div> ?? null}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        )
                    })
                }
                </div>}
            <AnimatePresence>
                {
                    selectedId || selectedId == 0 ?
                        <motion.div
                            className="z-40 fixed -top-0 md:top-35% left-0 h-screen w-screen bg-black/70"
                        >
                            <motion.div
                                initial={{opacity: 0, y: initialCoordinates.y, x: initialCoordinates.x}}
                                animate={{opacity: 1, y: "50%", x: "15%", scale: 1}}
                                exit={{opacity: 0, y: initialCoordinates.y, x: initialCoordinates.x}}
                                transition={{delay: 0.1}}
                                className=" w-[80%]">
                                <Card {...context?.notes[selectedId]!} poppedup={true} className={``}
                                      closeAction={() => setSelectedId(null)}/>
                            </motion.div>
                        </motion.div>
                        : null
                }
            </AnimatePresence>
            {context?.addNote &&


                <motion.div
                    className={`fixed z-40 top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center`}

                ><NoteForm className={"w-[80%]"} closeAction={() => context?.toggleAddNote()}/></motion.div>

            }
            <Footer/>
        </main>
    )
}
