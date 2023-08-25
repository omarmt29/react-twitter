import React from 'react'
import { useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase/supabase'
import { Cardpost } from '../components/Cardpost';
import { FaPooStorm } from 'react-icons/fa';

export const Home = () => {

  const [userdata, setuserdata] = useState({ avatar: '', username: '' })
  const [post, setpost] = useState([])
  const Navigate = useNavigate();


  useEffect(() => {

    const checksession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        setuserdata({ ...userdata, avatar: data.session.user.user_metadata.avatar_url, username: data.session.user.user_metadata.username })

      }else{
        Navigate("/")
      }
    }

    checksession()

  }, [])

  


  useEffect(() => {

    const handlerfetchpost = async () => {

      const { data, error } = await supabase
        .from('posts')
        .select()
        .order('id', { ascending: false })
        setpost(data)
      if (error) {
        console.log(error)
      } else {
        console.log(post)

      }
    }

    handlerfetchpost()

  },[])





  return (
    <div className='bg-black h-screen '>
      <Header />
      <h2 className='text-white font-semibold text-2xl  text-center mt-12'>Publicaciones recientes</h2>

      <div className='max-w-2xl m-auto mt-16 border-x-2 border-white/10 px-6 overflow-hidden overflow-y-scroll max-h-[800px] '>
        {post.map(e => <div key={e.id}><Cardpost  username={e.username} message={e.message} avatar={e.avatar_url} date={e.created_at} namecolor='text-white text-ms ' /></div>  )}
      </div>
    </div>
  )


}
