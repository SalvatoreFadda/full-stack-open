const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app') // Import your express app
const User = require('../models/user') // Import your User model

const api = supertest(app) // Wrap your app with supertest for easy HTTP requests

beforeEach(async () => {
  await User.deleteMany({}) // Clear the users collection before each test
})

test('creation fails with proper status code and message if username is missing', async () => {
  const newUser = {
    password: 'password',
    name: 'Test Name',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be at least 3 characters long')
})

test('creation fails with proper status code and message if password is missing', async () => {
  const newUser = {
    username: 'username',
    name: 'Test Name',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password must be at least 3 characters long')
})

test('creation fails with proper status code and message if username is not unique', async () => {
  const newUser = {
    username: 'username',
    password: 'password',
    name: 'Test Name',
  }

  // Create the user for the first time
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Try to create the same user again
  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be unique')
})

afterAll(() => {
  mongoose.connection.close() // Close the mongoose connection after all tests are done
})
