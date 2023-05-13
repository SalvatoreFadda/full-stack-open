const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app') 
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = {
    username: 'testUser',
    name: 'Test User',
    password: 'testpassword',
  }

  const user = await new User(newUser)
  await user.save()

  const userForToken = {
    username: newUser.username,
    id: user._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: user._id })
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Unknown',
    url: 'http://example.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('creation fails with proper status code and message if token is not provided', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Unknown',
    url: 'http://example.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('likes property missing from the request will default to the value 0', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Unknown',
    url: 'http://example.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Unknown',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes = 999

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

  expect(updatedBlog.likes).toBe(999)
})

afterAll(() => {
  mongoose.connection.close()
})

