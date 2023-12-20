import React, { useContext } from 'react'
import '../css/Main.css'
import Notes from './Notes'
import { ModeContext } from '../context/ModeContext'



export default function Main() {
  const {dark} = useContext(ModeContext);
  return (
    <div className={`main pt-2 ${dark && 'darkTheme'} `}>
      <Notes/>
    </div>
  )
}
