const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app') 
const User = require('../models/user') 

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
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

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be unique')
})

afterAll(() => {
  mongoose.connection.close() 
})