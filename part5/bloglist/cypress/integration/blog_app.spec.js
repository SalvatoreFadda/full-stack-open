describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpassword'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input[type="text"]').type('testuser')
            cy.get('input[type="password"]').type('testpassword')
            cy.get('button[type="submit"]').click()
            cy.contains('Test User logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.get('input[type="text"]').type('wronguser')
            cy.get('input[type="password"]').type('wrongpassword')
            cy.get('button[type="submit"]').click()
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('input[type="text"]').type('testuser')
            cy.get('input[type="password"]').type('testpassword')
            cy.get('button[type="submit"]').click()
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('input').first().type('Test Blog Title')
            cy.get('input').eq(1).type('Test Author')
            cy.get('input').last().type('http://testblog.com')
            cy.get('button[type="submit"]').click()
            cy.contains('Test Blog Title Test Author')
        })

        it('A blog can be liked', function () {
            cy.contains('view').click()
            cy.get('button').contains('like').click()
            cy.contains('likes 1')
        })

        it('The creator can delete a blog', function () {
            cy.contains('view').click()
            cy.get('button').contains('delete').click()
            cy.get('html').should('not.contain', 'Test Blog Title Test Author')
        })

        it('Blogs are ordered by likes', function () {
            // Create another blog and like it twice
            cy.contains('new blog').click()
            cy.get('input').first().type('Another Test Blog Title')
            cy.get('input').eq(1).type('Another Test Author')
            cy.get('input').last().type('http://anothertestblog.com')
            cy.get('button[type="submit"]').click()
            cy.contains('Another Test Blog Title Another Test Author').parent().as('secondBlog')
            cy.get('@secondBlog').contains('view').click()
            cy.get('@secondBlog').contains('like').as('likeButton')
            cy.get('@likeButton').click()
            cy.wait(500)
            cy.get('@likeButton').click()

            // Check the order of the blogs
            cy.get('.blog').then(blogs => {
                cy.wrap(blogs[0]).should('contain', 'Another Test Blog Title')
                cy.wrap(blogs[1]).should('contain', 'Test Blog Title')
            })
        })
    })
})
