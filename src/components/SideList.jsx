import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Divider from '@material-ui/core/Divider';

import PropTypes from 'prop-types';

const sideList = (props) => {

  const { classes } = props;

  return (
    <div className={ classes.root }>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Meus Pedidos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Conversas" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Mais informações" />
        </ListItem>
        <ListItem button component="a" href="#simple-list">
          <ListItemText primary="Ajude o app a crescer" />
        </ListItem>
      </List>
    </div>
  );
}

sideList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default sideList;
