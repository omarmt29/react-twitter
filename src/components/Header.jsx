import React, { useEffect, useState } from 'react'
import { Logo } from '../icons-folder/Logo'
import { supabase } from '../supabase/supabase'
import { useNavigate } from "react-router-dom";
import { FaDoorOpen, FaPlusCircle } from "react-icons/fa";


export const Header = () => {

    const [logout, setlogout] = useState(false)
    const [userdata, setuserdata] = useState({ avatar: '', username: '', id: '' })
    const [post, setpost] = useState({ message: '' })
    const Navigate = useNavigate();

    const handlersingout = async () => {

        const { error } = await supabase.auth.signOut()
        Navigate("/")
        if (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        import('preline');
      }, []);
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

        if (error) {
            return console.log(error)
        }
        window.location.reload()
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
                        <button data-hs-overlay="#hs-unstyled-modal" className='flex gap-2 items-center cursor-pointer'>
                            <FaPlusCircle className='text-2xl text-[#1a8cd8]' />
                            <p className="text-sm font-semibold leading-6  text-white">Post</p>
                        </button>
                        <div onClick={e => handlersingout()} className='flex gap-2 items-center cursor-pointer'>
                            <FaDoorOpen className='text-2xl text-white' />
                            <p className="text-sm font-semibold leading-6 me-2 text-white">Logout</p>
                        </div>
                    </div>
                        : null}

                </div>

            </nav>


            <div id="hs-unstyled-modal" class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="px-4 flex flex-col bg-slate-900  w-full shadow-sm rounded-xl ">
                        <div className="flex justify-between items-center py-3  ">

                            <button type="button" className="hs-dropdown-toggle inline-flex  justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                <button type="button" class="inline-flex  text-white justify-center items-center gap-2  font-medium  shadow-sm align-middle  transition-all text-base " data-hs-overlay="#hs-unstyled-modal">
                                    x
                                </button>
                              
                            </button>
                        </div>
                        <div className=" overflow-y-auto">
                            <textarea onChange={e => setpost({ ...post, message: e.target.value })} className='resize-none h-20 border-transparent focus:border-transparent focus:ring-0 bg-transparent border-none focus:border-none outline-none w-full' placeholder='What is happening?' />
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
