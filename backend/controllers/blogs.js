const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  console.log('token', request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  if (blog.title === undefined && blog.url === undefined) {
    response.status(400).end();
  } else {
    try {
      const user = await User.findById(decodedToken.id);
      blog.user = decodedToken.id;
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.json(savedBlog.toJSON());
    } catch (exception) {
      next(exception);
    }
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    /**
     * so that a blog can be deleted only by the user who added the blog.
     * Therefore, deleting a blog is possible only if the token sent with
     * the request is the same as that of the blog's creator.
     */
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({ error: 'token invalid or missing' });
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const blog = {
    description: body.description,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
