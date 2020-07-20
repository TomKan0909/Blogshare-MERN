import React, {useState} from 'react'
import BlogSerivce from '../services/blogs'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Comment from './comment'
import Textfield from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Blog = ({ blog, deletePost }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#3b4252',
    borderRadius: '25px' , 
    color: '#81a1c1'
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  // used for adding comment
  const [comment, setComment] = useState('')
  // list of comments
  const [comments, setComments] = useState(blog.comments)
  const hideWhenVisible = {display: visible ? 'none': ''}
  const showWhenVisible = {display: visible ? '' : 'none', marginLeft: 5, marginBottom: 5}

  const toggleVisibility = () => {setVisible(!visible)}
  
  const likePost = async () => {
    const updatedBlog = await BlogSerivce.likePost(blog)
    setLikes(updatedBlog.likes)
  }
  
  const delPost = async () => {
    await deletePost(blog)
  }

  const addComment = async() => {
    const updatedBlog = await BlogSerivce.commentPost(blog, comment)
    console.log(updatedBlog)
    setComment('')
    setComments(updatedBlog.comments)
  }

  const classes = useStyles()

  return (
    <div style={blogStyle}>
      <div style ={hideWhenVisible}>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        {blog.author}
        <Button size = "small" variant="contained" color="primary" className={classes.margin} onClick={toggleVisibility}>view</Button>
      </div>
      <div style ={showWhenVisible} >
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        {blog.author}
        <Button size = "small" variant="contained" color="primary" className={classes.margin} onClick={toggleVisibility}>hide</Button>
        <p>
          <Typography variant="body2" display ="block" gutterBottom>
            <Box fontStyle="italic" m={1}>
              {blog.description}
            </Box>
          </Typography>
        
          <Typography variant="caption" display="block" gutterBottom>
            url: <a href={blog.url} style={{ color: "white"}}>{blog.url}</a>
          </Typography>

          <Typography variant="caption" display="block" gutterBottom>
            likes: {likes} <Button size = "small" variant="contained" color="primary" className={classes.margin} onClick={likePost}>like</Button>
          </Typography> 
        
          <Typography variant="caption" display="block" gutterBottom>
            posted by: {blog.user.username}
          </Typography>

          <Button size = "small" variant="contained" color="primary" className={classes.margin} onClick={delPost}>remove</Button>

          <br/>
          < Textfield 
            id="Add comment"
            label="Add comment"
            multiline
            rows={4}
            defaultValue="Add comment"
            variant="outlined"
            onChange={({target}) => setComment(target.value)}
          />
          <Button size = "small" variant="contained" color="primary" className={classes.margin} onClick={addComment}>Add comment</Button>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>

          <List>
            {comments.map(comment => <React.Fragment><Comment comment={comment}/> <Divider/> </React.Fragment>)}
          </List>
        </p>
      </div>
  </div>
  )
}

export default Blog
