const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Mastering Asynchronous JavaScript',
        author: 'John Doe',
        url: 'http://johndoe.com/mastering-async-js',
        likes: 50,
    },
    {
        title: 'Understanding React Hooks',
        author: 'Jane Smith',
        url: 'http://janesmith.com/understanding-react-hooks',
        likes: 75,
    },
    {
        title: 'A Deep Dive into Node.js',
        author: 'Richard Roe',
        url: 'http://richardroe.com/nodejs-deep-dive',
        likes: 120,
    },
    {
        title: 'Exploring Express Middleware',
        author: 'Emily Emerson',
        url: 'http://emilyemerson.com/express-middleware',
        likes: 30,
    },
]

const initialUsers = [
    {
        username: 'user',
        name: 'user',
        password: 'user',
    },
    {
        username: 'admin',
        name: 'admin',
        password: 'admin',
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb
}
