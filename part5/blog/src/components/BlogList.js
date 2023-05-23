import Blog from './Blog'

const BlogList = ({user,blogs, handleLogOut})=>{ 
  return (
    <div>
      <p>{user.username} is logged in</p>
      <button type="submit" onClick={handleLogOut}>Log Out</button>
       {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
}

export default BlogList