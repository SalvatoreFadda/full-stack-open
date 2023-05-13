const listHelper = require('../utils/list_helper')

describe('list helpers', () => {

  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe('total likes', () => {
    const listWithOneBlog = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }]

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('favorite blog', () => {
    const blogs = [{
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
    }]

    test('returns blog with most likes', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
    })
  })

  describe('most blogs', () => {
    const blogs = [{
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
    }]

    test('returns author with most blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })
  })

  describe('most likes', () => {
    const blogs = [{
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
    }]

    test('returns author with most likes', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
    })
  })

})
