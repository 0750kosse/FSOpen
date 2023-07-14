import { useState,forwardRef, useImperativeHandle } from "react";

const Toggable = forwardRef(({buttonLabel, children}, ref)=> {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '': 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, ()=> {
    return {toggleVisibility}
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>

  )
})

export default Toggable