const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app.js');

const api = supertest(app);

const Blog = require('../models/blog.js');

const intialBlogs = [
  {
    title: 'blog 1',
    author: 'author 1',
    url: 'url 1',
    likes: 0,
  },
  {
    title: 'blog 2',
    author: 'author 2',
    url: 'url 2',
    likes: 1,
  },
];


beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = intialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('notes are returned as json and num of blogs is 2', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(intialBlogs.length);
});

test('notes have property id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;
  blogs.map((blog) => expect(blog.id).toBeDefined());
});

test('a note has been sucessfully added', async () => {
  const newblog = {
    title: 'blog add',
    author: 'author add',
    url: 'url add',
    likes: 2,
  };
  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogs = response.body;
  expect(blogs).toHaveLength(intialBlogs.length + 1);
  // remove id attribute from each blog generated from mongodb
  blogs.map((blog) => delete blog.id);
  expect(blogs).toContainEqual(newblog);
});

test('a note with undefined likes property has 0 likes', async () => {
  const newBlog = {
    title: 'no likes',
    author: 'Bulldog',
    url: 'nolikesurl',
  };
  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.body.likes).toEqual(0);
});

test('a note with no url or title', async() => {
  const newBlog = {
    author: 'bulldog',
    likes: '2',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
