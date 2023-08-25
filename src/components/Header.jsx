import React, { useEffect, useState } from 'react'
import { Logo } from '../icons-folder/Logo'
import { supabase } from '../supabase/supabase'
import { useNavigate } from "react-router-dom";
import { FaDoorOpen, FaPlusCircle } from "react-icons/fa";

export const Header = () => {

    const [logout, setlogout] = useState(false)
    const [userdata, setuserdata] = useState({ avatar: '', username: '', id: '' })
    const [post, setpost] = useState({message: ''})
    const Navigate = useNavigate();

    const handlersingout = async () => {

        const { error } = await supabase.auth.signOut()
        Navigate("/")
        if (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const checksession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (data.session) {
                setlogout(true)
                setuserdata({ ...userdata, avatar: data.session.user.user_metadata.avatar_url, username: data.session.user.user_metadata.username, id: data.session.user.id })
                console.log(userdata.id)
                Navigate("/home")

            } else {
                setlogout(false)
            }
        }

        checksession()

    }, [])

    const handlerInsertpost = async (e) => {
        e.preventDefault()
        const { error } = await supabase
            .from('posts')
            .insert({ user_id: userdata.id, message: post.message, username: userdata.username, avatar_url: `https://tnxcsejprnqzxfmnhfop.supabase.co/storage/v1/object/public/avatars/public/${userdata.avatar}` })

        if(error){
            return console.log(error)
        }
        window. location. reload()
    }

    return (

        <header className="bg-transparent text-white border-b-2 border-white/10">

            <nav className="mx-auto flex max-w-7xl items-center justify-between py-5 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <Logo classNameName=' bg-white text-white fill-neutral-50' />

                    </a>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    {logout ? <div className='flex gap-12 items-center'>
                        <div className='flex items-center gap-3'>
                            <div className="relative">
                                <img className="w-10 h-10 rounded-full" src={`https://tnxcsejprnqzxfmnhfop.supabase.co/storage/v1/object/public/avatars/public/${userdata.avatar}`} alt="" />
                                <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                            <p className='text-white font-semibold text-sm'>{userdata.username}</p>
                        </div>
                        <div data-hs-overlay="#hs-vertically-centered-modal" className='flex gap-2 items-center cursor-pointer'>
                            <FaPlusCircle className='text-2xl text-[#1a8cd8]' />
                            <p className="text-sm font-semibold leading-6  text-white">Post</p>
                        </div>
                        <div onClick={e => handlersingout()} className='flex gap-2 items-center cursor-pointer'>
                            <FaDoorOpen className='text-2xl text-white' />
                            <p className="text-sm font-semibold leading-6 me-2 text-white">Logout</p>
                        </div>
                    </div>
                        :  null}

                </div>

            </nav>


            <div id="hs-vertically-centered-modal" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="px-4 flex flex-col bg-slate-900  w-full shadow-sm rounded-xl ">
                        <div className="flex justify-between items-center py-3  ">

                            <button type="button" className="hs-dropdown-toggle inline-flex  justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                        <div className=" overflow-y-auto">
                            <textarea onChange={e => setpost({...post, message: e.target.value}) } className='resize-none h-20 border-transparent focus:border-transparent focus:ring-0 bg-transparent border-none focus:border-none outline-none w-full' placeholder='What is happening?'  />
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4">

                            <button onClick={e => handlerInsertpost(e)} className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-3xl border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </header>

    )



}
