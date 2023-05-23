import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("loginng in with", username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem("loggedInUser",JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (e) {
      console.log("Error", e)
    }
  }

const handleLogOut = (e)=> {
  e.preventDefault()
  window.localStorage.clear()
  setUser(null)
}
  
  return (
    <div>
      <h2>blogs</h2>
     {console.log("blogs", blogs)}
      <div>  
        {user === null ?
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />:
        <BlogList 
          user={user}
          blogs={blogs}
          handleLogOut={handleLogOut}
          />
        }
      </div>
    </div>
  )
}

export default App
