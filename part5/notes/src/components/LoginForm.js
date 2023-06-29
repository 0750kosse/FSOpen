import { useState } from "react"

const LoginForm = ({handleLogin, username, password, handleUsernameChange, handlePasswordChange}) => {

  const [loginVisible, setloginVisible]= useState(false)

  const hideWhenVisible = {display: loginVisible ? 'none':''}
  const showWhenVisible = {display: loginVisible ? '':'none'}
return (
  <>
  <div style={hideWhenVisible}>
  <button onClick={()=>setloginVisible(true)}>Show login</button>
  </div>

  <div style={showWhenVisible}>
 
  <form onSubmit={handleLogin}>
  <h2>Login</h2>
    <div>
      Username
      <input
        type="text"
        placeholder="Username"
        value={username}
        name="username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        placeholder="Password"
        value={password}
        name="password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>

  </div>
  <div style={showWhenVisible}>
  <button onClick={()=>setloginVisible(false)}>Cancel</button>
  </div>
  
  
  </>

    
  )
}

export default LoginForm