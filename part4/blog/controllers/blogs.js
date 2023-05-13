const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  
    response.json(blogs.map(blog => blog.toJSON()))
  })

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user


    if (!body.title || !body.url) {
        return response.status(400).end()
    }
    
    if (!user) {
        return response.status(401).json({ error: 'Token missing or invalid' })
      }
    
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
    
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog.toJSON())
    })

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
  
    if (!user) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    }
  
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'You are not authorized to delete this blog' })
    }
  
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
