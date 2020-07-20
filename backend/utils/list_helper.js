const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (accum, blog) => accum + blog.likes;

  return blogs.reduce(reducer, 0);
};

// returns blog/blogs with most likes
const favoriteBlog = (blogs) => {
  const reducer = (prev, curr) => {
    return (prev.likes > curr.likes) ? prev : curr;
  };
  return blogs.length === 0 ? null : blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  const reducer = (accum, blog) => {
    if (!accum[blog.author]) {
      accum[blog.author] = 1;
      return accum;
    }
    accum[blog.author] += 1;
    return accum;
  };

  const totals = blogs.reduce(reducer, {});

  const keys = Object.keys(totals);

  const values = keys.map(x => totals[x]);

  const most = keys.filter(x => totals[x] === Math.max(...values));

  const results = most.map(blog => {
    const temp = { author: blog, blogs: totals[blog] };

    return temp;
  });
  // returns a list of blogs/blog
  return results.length === 0 ? null : results;
};

const mostLikes = (blogs) => {
  const reducer = (accum, blog) => {
    if (!accum[blog.author]) {
      accum[blog.author] = blog.likes;
      return accum;
    }
    accum[blog.author] += blog.likes;
    return accum;
  };

  const totals = blogs.reduce(reducer, {});

  const keys = Object.keys(totals);

  const values = keys.map(x => totals[x]);

  const most = keys.filter(x => totals[x] === Math.max(...values));

  const results = most.map(blog => {
    const temp = { author: blog, likes: totals[blog] };

    return temp;
  });
  // returns a list of blogs/blog
  return results.length === 0 ? null : results;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
