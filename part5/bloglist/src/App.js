import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const loginUser = async (credentials) => {
    try {
      let user;
      if (credentials.username === '' && credentials.password === '') {
        user = { 
          username: 'guest',
          name: 'Guest User',
          token: 'guesttoken' 
        }
      } else {
        user = await loginService.login(credentials)
      }
      blogService.setToken(user.token)
      setUser(user)
      setNotification('Successful login')
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const blogFormRef = React.createRef()

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.create({
        ...blog,
        user: { name: user.name, username: user.username },
      })
      setBlogs(blogs.concat(returnedBlog));
      setNotification(`A new blog: ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setNotification('Blog creation failed')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const logout = () => {
    setUser(null);
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <LoginForm loginUser={loginUser} />
      </div>
    )
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
    } catch (exception) {
      setNotification('Updating the blog failed')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setNotification(`Deleted ${blogToDelete.title} by ${blogToDelete.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Deleting the blog failed')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Notification message={notification} />
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App
