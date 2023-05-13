const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app') 
const api = supertest(app)

const Blog = require('../models/blog')

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

beforeEach(async () => {
    await Blog.deleteMany({})   // Clear the database

    // Save the initial blogs to the database
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

describe('viewing a specific blog', () => {
    test('the unique identifier property of the blog post is named id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        expect(blogToView.id).toBeDefined()
    })
})

describe('creation of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Async/Await in JavaScript: A Complete Guide',
            author: 'John Doe',
            url: 'http://example.com/async-await',
            likes: 10,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
            'Async/Await in JavaScript: A Complete Guide'
        )
    })

    test('if likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'Async/Await in JavaScript: A Complete Guide',
            author: 'John Doe',
            url: 'http://example.com/async-await',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('if the title and url properties are missing from the request data, respond with 400 status code', async () => {
        const newBlog = {
          author: 'John Doe',
          likes: 5
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
    
        const newBlog2 = {
          title: 'Async/Await in JavaScript: A Complete Guide',
          likes: 5
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog2)
          .expect(400)
      })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )
  
      const contents = blogsAtEnd.map(r => r.title)
  
      expect(contents).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id and data are valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      let blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes += 1
  
      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      expect(updatedBlog.body.likes).toBe(blogToUpdate.likes)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  
      const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes)
    })
  })

afterAll(() => {
    mongoose.connection.close()
})
