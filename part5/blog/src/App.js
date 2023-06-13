import './App.css'
import { useState, useEffect } from 'react'
import LoggedInContent from './screens/LoggedInContent'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [newBlog, setNewBlog] = useState({
    title:'',
    author:'',
    url:''
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage]= useState(null)
  
  const successTimeOut =()=> {
    setTimeout(()=> {
      setSuccessMessage(null)
    },5000)
  }

  const errorTimeOut = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  // if user in localstorage, user token passed to blogService
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem("loggedInUser",JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage("login success")
      successTimeOut()
    }
    catch (error) {
     setErrorMessage( error.response.data.error)
      errorTimeOut()
    }
  }

  const handleLogOut = (e)=> {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

// Grabs inputs value, and sets this onto newBlog
  const handleNewBlogChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setNewBlog({...newBlog, [e.target.name]:value})
  }

// adds newBlog to the main blogs state
  const addBlog = (e)=> {
    e.preventDefault()
    blogService.createBlog(newBlog).then((createdBlog) => {
      setBlogs([...blogs, createdBlog])
      setNewBlog({
        title:'',
        author:'',
        url:''
      })
      setSuccessMessage(`Added new blog`);
      successTimeOut()
    })
}

return (
 
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} error/>
      <Notification message={successMessage} success/>
      <div>  
        {user === null ?
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />:
        <LoggedInContent 
          user={user}
          blogs={blogs}
          handleLogOut={handleLogOut}
          newBlog={newBlog}
          addBlog={addBlog}
          handleNewBlogChange={handleNewBlogChange}
          />
        }
      </div>
    </div>
  )
}

export default App
