const { mostLikes } = require('../utils/list_helper');
const { blogs, blogsSameLikes } = require('../utils/mock-blogs');

describe('author with the most likes', () => {
  test('of empty list is zero', () => {
    expect(mostLikes([])).toBe(null);
  });

  test('when list has only 1 blog === that author', () => {
    expect(mostLikes([blogs[0]])).toEqual([{ author: blogs[0].author, likes: 7 }]);
  });

  test('of a bigger list is calculated correctly', () => {
    expect(mostLikes(blogs)).toEqual([{ author: blogs[1].author, likes: 17 }]);
  });

  test('if two authors have the same number of likes', () => {
    expect(mostLikes(blogsSameLikes)).toEqual([
      { author: blogsSameLikes[1].author, likes: 17 },
      { author: blogsSameLikes[3].author, likes: 17 },
    ]);
  });
});
