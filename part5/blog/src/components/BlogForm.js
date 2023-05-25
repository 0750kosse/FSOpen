
const BlogForm = ({newBlog, handleNewBlogChange, addBlog}) => {
  return (
    <div>
    Create a new Blog
      <form onSubmit={addBlog}>
        Title : 
        <input 
          type='text'
          name='title'
          placeholder='Title'
          value={newBlog.title}
          onChange={handleNewBlogChange}
        />
        Author : 
        <input 
          type='text'
          name='author'
          placeholder='Author'
          value={newBlog.author}
          onChange={handleNewBlogChange}
        />
        Url : 
        <input 
          type='text'
          name='url'
          placeholder='Url'
          value={newBlog.url}
          onChange={handleNewBlogChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm