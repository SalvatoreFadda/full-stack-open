const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let favorite = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    const authorBlogCounts = _.map(authors, (blogs, author) => ({ author, blogs: blogs.length }))
    return _.maxBy(authorBlogCounts, 'blogs')
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    const authorLikeCounts = _.map(authors, (blogs, author) => ({
        author,
        likes: _.reduce(blogs, (sum, blog) => sum + blog.likes, 0)
    }))
    return _.maxBy(authorLikeCounts, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}