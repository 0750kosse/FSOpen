const LoginForm = ({handleLogin, username, password, handleUsernameChange, handlePasswordChange}) => {
  return (
  <>
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
</>
)
}

export default LoginForm