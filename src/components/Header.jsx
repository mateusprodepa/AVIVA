import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

import { AppBar, Toolbar, IconButton, Typography, Input, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as drawerActions from '../store/actions/drawer';
import * as authActions from '../store/actions/auth';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    fontFamily: 'Montserrat',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  menu: {
    transform: 'translateX(-60px)'
  }
});

class Header extends Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  signOut = () => {
    this.handleClose();
    this.props.userLogout();
    // logout();
  }

  componentDidMount() {
    this.props.isLoggedIn();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={ () => this.props.toggleDrawer(1) } className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              AVIVA!
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Pesquisar…"
                disableUnderline
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                />
            </div>
            { !this.props.userIsLoggedIn ? <Button onClick={ () => this.props.history.push('/signIn') } color="inherit">Login</Button> : (
              <React.Fragment>
                <Avatar
                  aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  img={this.props.user.img}/>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  className={classes.menu}
                >
                <MenuItem onClick={this.handleClose}>Meu Perfil</MenuItem>
                <MenuItem onClick={this.handleClose}>Configurações da Conta</MenuItem>
                <MenuItem onClick={this.signOut}>Sair da conta</MenuItem>
              </Menu>
              </React.Fragment>
            ) }
          </Toolbar>
        </AppBar>
      </div>
    )
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userIsLoggedIn: state.userIsLoggedIn,
  user: state.user
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...drawerActions, ...authActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
