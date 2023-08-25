import { useState } from 'react'
import { Cardpost } from './components/Cardpost'
import { supabase } from './supabase/supabase'
import { Header } from './components/Header';
import { Button } from 'flowbite-react';
import DefaultForm from './components/DefaultForm';
import { Logo } from './icons-folder/Logo';

function App() {

  return (

    <div className="bg-black h-full min-h-screen m-0 ">
      <Header/>

      <div className="max-w-sm m-auto h-full pt-40">
        <DefaultForm/>
      </div>
    </div>

  )
}

export default App

