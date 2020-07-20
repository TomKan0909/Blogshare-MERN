import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Bloglist from './components/Bloglist'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import usersService from './services/users'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const addBlogFormRef = useRef()
  
  const [errorMsgAndStatus, seterrorMsgAndStatus] = useState([null, null])

  useEffect(() => {
    blogService.getAll().then(results =>
      setBlogs( results )
    )  
  }, [blogs])


  const handleLogin = async (event) => {
    debugger
    event.preventDefault()
    try{
      console.log('logging in with', username, password)
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch(exception){
      console.log(exception)
      seterrorMsgAndStatus(['wrong username or password', true])
      setTimeout(() => {
        seterrorMsgAndStatus([null, null])
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try{
      console.log('registering with', username, password)
      const response = await usersService.register({
        username, password
      })

      setUsername('')
      setPassword('')
      seterrorMsgAndStatus(['user successfully created', false])
      setTimeout(() => {
        seterrorMsgAndStatus([null, null])
      }, 5000)
    } catch(exception){
      console.log(exception)
      seterrorMsgAndStatus(['username taken', true])
      setTimeout(() => {
        seterrorMsgAndStatus([null, null])
      }, 5000)
    }
  }

  const loginForm = () => (
    
    <form>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleRegister}>register</button>
    </form>
  )

  

  

  const addBlog = (blogObject) => {
    addBlogFormRef.current.toggleVisibility()
    

    blogService.create(blogObject)
      .then( _ => blogService.getAll()
      .then(results => setBlogs(results)))
    seterrorMsgAndStatus([`a new blog ${blogObject.title} by ${blogObject.user.username}`, false])
    setTimeout(() => seterrorMsgAndStatus([null, null]), 5000)
    
  }

  const addBlogForm = () => (
    <Togglable buttonLabel = 'new post' ref={addBlogFormRef}>
      <BlogForm addBlog={addBlog} user ={user}></BlogForm>
    </Togglable>
  )
  
  const removePost = async (blog) => {
    try {
      const response = await blogService.deletePost(blog)
      blogService.getAll().then(results =>
      setBlogs( results )
    )} catch{
      seterrorMsgAndStatus(['have to be original user to delete blog', true])
      setTimeout(() => seterrorMsgAndStatus([null, null]), 5000)
    }
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          BlogShare 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles()

  const SignIn = () => (

    
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={({ target }) => setUsername(target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegister}
            >
              Register
            </Button>
          </form>
          <Typography variant="caption">
            use username: user,  password: password if you do not want to create an account
          </Typography>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    
  )




  return (
    <div>
      <Notification message={errorMsgAndStatus[0]} isError ={errorMsgAndStatus[1]}/>
      { user === null ? SignIn() :
        <div>
          <Typography variant="h6">welcome back {user.username}</Typography>
          <Button variant = "outlined" onClick={handleLogout}>logout</Button>
          {addBlogForm()}
          <Bloglist blogs = {blogs} removeBlog={removePost}/>
        </div>
        
      // user === null ? 
      //   islogin ? loginForm() : registerForm() : 
      //   <div>
      //     <h4>{user.name} logged in </h4>
      //     <button onClick={handleLogout}>logout</button>
      //     {addBlogForm()}
      //     <Bloglist blogs = {blogs} removeBlog={removePost}/>
      //   </div>
      }
    </div>
    
  )
}

export default App
