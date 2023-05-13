const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url1.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url2.com',
      likes: 2,
      __v: 0
    }
  ]

  test('when list has multiple blogs, equals the sum of their likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url1.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url2.com',
      likes: 7,
      __v: 0
    }
  ]

  test('of a list is found correctly', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual({
      title: 'Blog 2',
      author: 'Author 2',
      likes: 7
    })
  })
})

describe('author with most blogs', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url1.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url2.com',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Blog 3',
      author: 'Author 1',
      url: 'http://url3.com',
      likes: 5,
      __v: 0
    }
  ]

  test('is found correctly', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'Author 1',
      blogs: 2
    })
  })
})

describe('author with most likes', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url1.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url2.com',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Blog 3',
      author: 'Author 1',
      url: 'http://url3.com',
      likes: 5,
      __v: 0
    }
  ]

  test('is found correctly', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual({
      author: 'Author 1',
      likes: 8
    })
  })
})
