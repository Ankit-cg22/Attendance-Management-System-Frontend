import React from 'react'
import OptionBar from '../OptionBar/OptionBar'

export default function List({ChildComponent , arr , buttonText , onButtonClick}) {
  return (
    <div>
        {arr.map((arrItem,index)=>(
            <OptionBar key={index} ChildComponent ={ChildComponent} arrItem={arrItem} buttonText={buttonText} onButtonClick={onButtonClick}/> 
        ))}
    </div>
  )
}
