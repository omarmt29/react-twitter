import { useState } from "react"
import { Login, Register } from './Buttons'
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase/supabase'

export default function DefaultForm() {

  const [register, setregister] = useState(false)
  const [user, setnewuser] = useState({ email: '', password: '', username: '', avatar_url: '' })
  const [errormessage, seterrormessage] = useState('')
  const Navigate = useNavigate();

  const handleruploadAvatar = async (e) => {
    const avatar = e.target.files[0]
    setnewuser({ ...user, avatar_url: avatar })

  }

  const handlerUploadfile = async (randomstring, e) => {

    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(`public/${randomstring}${e.name}`, e)
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }

  const handlersingup = async (e) => {

    e.preventDefault()
    const randomstring = Math.random().toString(36).slice(-8);
    const photo = randomstring + user.avatar_url.name
    const { data, error } = await supabase.auth.signUp(
      {
        email: user.email,
        password: user.password,
        options: {
          data: {
            username: user.username,
            avatar_url: photo,
          }
        }
      }
    )

    if (error) {
      console.log(error)
      seterrormessage(error.message)
    
    } else[
      console.log(data),
      handlerUploadfile(randomstring, user.avatar_url),
      Navigate("/home")

    ]
  }


  const handlersignin = async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,

    })

    if(error){
      console.log(error.message)
      seterrormessage(error.message)
      setInterval(() => seterrormessage(''), 3000)
    }else{
      Navigate("/home")
      console.log(data)
    }

  }





  return (

    <div>
       <p className="text-red-400 mb-12 text-center"> {errormessage}</p>
      <div className="relative z-0 w-full mb-8 group">
        <input onChange={e => setnewuser({ ...user, email: e.target.value })} type="email" name="email" id="email" className="bg-white/10 block py-2.5 px-0 w-full text-sm ps-3 text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#1a8cd8] peer" placeholder=" " required />
        <label className="ps-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#1a8cd8]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>
      </div>
      {register ? <div className="transition-all ease-in">
        <div className="relative z-0 w-full mb-8 group">
          <input onChange={e => setnewuser({ ...user, username: e.target.value })} type="text" name="username" id="username" className="bg-white/10 block py-2.5 px-0 w-full text-sm ps-3 text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#1a8cd8] peer" placeholder=" " required />
          <label className="ps-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#1a8cd8]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Username</label>
        </div>
        <div className="relative z-0 w-full mb-8 group">
          <input onChange={e => handleruploadAvatar(e)} type="file" name="avatar_url" id="avatar_url" className="bg-white/10 block py-2.5 px-0 w-full text-sm ps-3 text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#1a8cd8] peer" placeholder=" " required />
        </div>
      </div> : null}
      <div className="relative z-0 w-full mb-3 group">
        <input onChange={e => setnewuser({ ...user, password: e.target.value })} type="password" name="password" id="password" className="bg-white/10 block py-2.5 px-0 w-full text-sm ps-3 text-white border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-[#1a8cd8] peer" placeholder=" " required />
        <label className="ps-3 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#1a8cd8]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
      </div>
      <p onClick={e => setregister(!register)} className="text-slate-300 text-xs my-6 cursor-pointer select-none">No tienes una cuenta activa? Registrate aqui</p>

      {register ? <div onClick={e => handlersingup(e)}><Register /> </div> : <div onClick={e => handlersignin(e)}><Login /></div> }

    </div>

  )
}


