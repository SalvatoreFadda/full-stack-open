import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const mockHandler = jest.fn()

    beforeEach(() => {
        const blog = {
            title: 'Testing Blog Component',
            author: 'John Doe',
            url: 'http://testblog.com',
            likes: 5,
            user: { username: 'testuser', name: 'Test User' }
        }

        const user = {
            username: 'testuser',
            name: 'Test User'
        }

        component = render(
            <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} user={user} />
        )
    })

    test('renders title and author, but not url or likes by default', () => {
        expect(component.container).toHaveTextContent('Testing Blog Component')
        expect(component.container).toHaveTextContent('John Doe')
        expect(component.container).not.toHaveTextContent('http://testblog.com')
        expect(component.container).not.toHaveTextContent('5')
    })

    test('renders url and likes when view button is clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('http://testblog.com')
        expect(component.container).toHaveTextContent('5')
    })

    test('if the like button is clicked twice, the event handler is called twice', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
