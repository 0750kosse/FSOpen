const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => {
  return (
    <form onSubmit={handleLogin}> 
      <div>
        Username
        <input 
          placeholder='username'
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input 
          placeholder='password'
          type="password"
          value={password}
          name='Password'
          onChange={({ target })=> setPassword(target.value)}
        />
     </div>
      <button type="submit">Log In</button>
    </form>
  )
 }

 export default LoginForm

