import React from 'react'
import Blog from './Blog'
import BlogSerivce from '../services/blogs'
import Typography from '@material-ui/core/Typography';
const Bloglist = ({blogs, removeBlog}) => {
  console.log(blogs)
  // debugger
  console.log('repeatetion???')

  // console.log(blogs)
  return(
    <div>
      <Typography variant="h2" gutterBottom>
          Blogs
      </Typography>
      {blogs.map(blog => 
        <Blog key = {blog.id} blog = {blog} deletePost={removeBlog}/>  
      )}
    </div>
  )
}

export default Bloglist