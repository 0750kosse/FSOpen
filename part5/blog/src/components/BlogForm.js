import {useState, useRef} from 'react'
import Toggable from './Toggable'

const BlogForm = ({addBlog}) => {

  const [newBlog, setNewBlog] = useState({
    title:'',
    author:'',
    url:''
  })
  const ref = useRef()

  // Grabs inputs value, and sets this onto newBlog
  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setNewBlog({...newBlog, [e.target.name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url:newBlog.url
    }
    
    addBlog(blogObject)
    setNewBlog('')
    ref.current.toggleVisibility()
}
// value={newBlog.title || ''} >> otherwise uncontrolled input warning
return (
  <div>   
   <Toggable buttonLabel='Create new note' ref={ref}>
    <h2>Create a new Blog</h2>
    <form onSubmit={handleSubmit}>
        Title : 
        <input 
          type='text'
          name='title'
          placeholder='Title'
          value={newBlog.title || ''}
          onChange={handleChange}
        />
        Author : 
        <input 
          type='text'
          name='author'
          placeholder='Author'
          value={newBlog.author || ''}
          onChange={handleChange}
        />
        Url : 
        <input 
          type='text'
          name='url'
          placeholder='Url'
          value={newBlog.url || ''}
          onChange={handleChange}
        />
       <button type="submit">Submit</button>
      </form>
      </Toggable>
  </div>
  )
}

export default BlogForm