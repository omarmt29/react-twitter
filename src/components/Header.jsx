import React, { useEffect, useState } from 'react'
import { Logo } from '../icons-folder/Logo'
import { supabase } from '../supabase/supabase'
import { useNavigate } from "react-router-dom";
import { FaDoorOpen, FaPlusCircle } from "react-icons/fa";
import { Dialog } from '@headlessui/react'

export const Header = () => {

    const [logout, setlogout] = useState(false)
    const [userdata, setuserdata] = useState({ avatar: '', username: '', id: '' })
    const [post, setpost] = useState({ message: '' })
    const Navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(true)
    function handleDeactivate() {
        // ...
    }
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
                        <button  onClick={() => setIsOpen(true)} className='flex gap-2 items-center cursor-pointer'>
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


            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <Dialog.Panel>
                    <Dialog.Title>Deactivate account</Dialog.Title>
                    <Dialog.Description>
                        This will permanently deactivate your account
                    </Dialog.Description>

                    <p>
                        Are you sure you want to deactivate your account? All of your data
                        will be permanently removed. This action cannot be undone.
                    </p>


                    <button  onClick={() => setIsOpen(false)}>Cancel</button>
                    <button onClick={handleDeactivate}>Deactivate</button>
                </Dialog.Panel>
            </Dialog>



        </header >

    )



}
