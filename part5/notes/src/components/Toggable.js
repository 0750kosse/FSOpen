import { useState,forwardRef, useImperativeHandle } from "react"

const Toggable =forwardRef((props,refs)=> {
  const [loginVisible, setloginVisible]= useState(false)

  const hideWhenVisible = {display: loginVisible ? 'none':''}
  const showWhenVisible = {display: loginVisible ? '':'none'}

  const toggleVisibility = () => {
    setloginVisible(!loginVisible)
  } 

  useImperativeHandle(refs, ()=>{
    return {
      toggleVisibility
    }
  })

  return (
  <>
    <div style={hideWhenVisible}>
      <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>
    <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleVisibility}>Cancel</button>
    </div>
  </>
  )
})

export default Toggable