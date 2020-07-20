import React, { useState,useImperativeHandle } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })

  const classes = useStyles();

  return (
    <div classname={classes.root}>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>{props.buttonLabel}</Button>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable