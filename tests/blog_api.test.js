const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogsJSON = [{ "_id": "5a422a851b54a676234d17f7", "title": "React patterns", "author": "Michael Chan", "url": "https://reactpatterns.com/", "likes": 7, "__v": 0 }, { "_id": "5a422ba71b54a676234d17fb", "title": "TDD harms architecture", "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", "likes": 0, "__v": 0 }, { "_id": "5a422aa71b54a676234d17f8", "title": "Go To Statement Considered Harmful", "author": "Edsger W. Dijkstra", "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", "likes": 5, "__v": 0 }, { "_id": "5a422b891b54a676234d17fa", "title": "First class tests", "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", "likes": 10, "__v": 0 }, { "_id": "5a422bc61b54a676234d17fc", "title": "Type wars", "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", "likes": 2, "__v": 0 }, { "_id": "5a422b3a1b54a676234d17f9", "title": "Canonical string reduction", "author": "Edsger W. Dijkstra", "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", "likes": 12, "__v": 0 }]

const initialBlogs = initialBlogsJSON.map(j => JSON.stringify(j)).map(j => JSON.parse(j));
console.log(initialBlogs)
beforeEach(async () => {
    await Blog.deleteMany({})
    for (let i = 0; i < initialBlogs.length; i++) {
        let blogObj = new Blog(initialBlogs[i])
        await blogObj.save()
    }
})

test('blogs in JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are six notes', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].content).toBe('HTML is easy')
})

afterAll(() => {
    mongoose.connection.close()
})