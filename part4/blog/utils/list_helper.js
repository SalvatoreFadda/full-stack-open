const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxLikes)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
  return {
    author: author,
    blogs: authors[author]
  }
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const likes = _.map(authors, (blogs, author) => ({
    author: author,
    likes: _.sumBy(blogs, 'likes')
  }))
  const mostLiked = _.maxBy(likes, 'likes')
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
