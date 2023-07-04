import { useState } from "react"

const Toggable =({children, buttonLabel})=> {
  const [loginVisible, setloginVisible]= useState(false)

  const hideWhenVisible = {display: loginVisible ? 'none':''}
  const showWhenVisible = {display: loginVisible ? '':'none'}
  
  return (
  <>
    <div style={hideWhenVisible}>
      <button onClick={()=>setloginVisible(true)}>{buttonLabel}</button>
    </div>
    <div style={showWhenVisible}>
      {children}
      <button onClick={()=>setloginVisible(false)}>Cancel</button>
    </div>
  </>
  )
}

export default Toggable