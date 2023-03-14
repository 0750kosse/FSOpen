const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map((blog) => {
    sum += blog.likes
    return sum
  })
  return sum
}

const favBlog = (blogs) => {
  const mostVoted = blogs.sort((a, b) => b.likes - a.likes)
  return mostVoted[0]
}

module.exports = { dummy, totalLikes, favBlog }
