import BlogList from "../components/BlogList"
import BlogForm from "../components/BlogForm"
import UserLogOut from '../components/UserLogOut'

const LoggedInContent = ({newBlog, handleNewBlogChange, addBlog,user,blogs, handleLogOut }) => {
  return (
    <div>
      <UserLogOut
          user={user}
          handleLogOut={handleLogOut}
      />
      <BlogForm
          newBlog={newBlog}
          addBlog={addBlog}
          handleNewBlogChange={handleNewBlogChange}/>
      <BlogList
          user={user}
          blogs={blogs}
          handleLogOut={handleLogOut}
      />
    </div>
  )
}

export default LoggedInContent