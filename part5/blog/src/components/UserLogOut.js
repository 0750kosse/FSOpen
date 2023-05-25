const UserLogOut = ({user, handleLogOut}) => {
  return (
    <>
      <p>{user.username} is logged in</p>
      <button type="submit" onClick={handleLogOut}>Log Out</button>
    </>
  )
}

export default UserLogOut