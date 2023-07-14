import Blog from './Blog'

const BlogList = ({blogs})=>{ 
  return (
    <div>
    <h2>Latest Blogs</h2>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
}

export default BlogList

