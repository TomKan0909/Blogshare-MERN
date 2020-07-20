import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';



// Make comment a string for now 

const Comment = ({comment}) => {


  return (
    <ListItem alignItems="flex-start">
        <ListItemText 
          primary={comment}
        />
    </ListItem>
  )

}

export default Comment