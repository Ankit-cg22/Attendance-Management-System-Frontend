import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import OptionBar from '../OptionBar/OptionBar'

export default function Demo() {
  const handleClick=() => {}
  return (
    <div>
      <OptionBar text="okay" buttonText={"okay"} onButtonClick={handleClick}/>
    </div>
  )
}
