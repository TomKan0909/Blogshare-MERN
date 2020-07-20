import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const BlogForm = ({ addBlog, user }) => { 
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState()
  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      user: user,
      url: url,
      description: description,
      comments: []
    }
    addBlog(blogObject)
    setTitle('')
    setUrl('')
  }

  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={createBlog}>
      <div>
          {/* Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          /> */}

        <TextField  
          id="standard-title-input"
          label="title"
          type="title"
          autoComplete="title"
          onChange={({target}) => setTitle(target.value)} 
        />
        <br/>
          {/* Url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}
          /> */}
          <TextField  
            id="standard-url-input"
            label="url"
            type="url"
            autoComplete="url"
            onChange={({target}) => setUrl(target.value)} 
          />
        
          <br/>
        
          {/* Description
          <input
            type="text"
            value={description}
            name="Description"
            onChange={({target}) => setDescription(target.value)}
          /> */}

        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          defaultValue="Add description"
          variant="outlined"
          onChange={({target}) => setDescription(target.value)}
        />
        <br/>


        <Button variant = "outlined" type="submit">create blog</Button>
       </div>
     </form>
  )
}

export default BlogForm