import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (!visible) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }

  Blog.propTypes = {
    blog: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    }).isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </p>
      {blog.user.username === user.username && (
        <button onClick={handleDelete}>delete</button>
      )}
      <p>{blog.user.name}</p>
    </div>
  )
}

export default Blog