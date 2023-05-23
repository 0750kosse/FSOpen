import Blog from './Blog'

const BlogList = ({user,blogs})=>{ 
  console.log("blogs,", blogs)
  return (
    <div>
      <p>{user.username} is logged in</p>
       {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
}

export default BlogList