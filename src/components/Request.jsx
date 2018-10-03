import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import MessageIcon from '@material-ui/icons/Message';

import { withStyles } from '@material-ui/core/styles'

import LazyLoad from 'react-lazyload';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dialogActions from '../store/actions/dialog';
import * as authActions from '../store/actions/auth';

const styles = theme => ({

  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow .3s ease-in-out, transform .2s ease-out',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    },
  },

  cardContent: {
    flexGrow: 1,
  },

  cardMedia: {
    paddingTop: '56.25%',
  },

  date: {
    paddingBottom: 6
  },

  cardActions: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  deleteWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  text: {
    textAlign: 'left'
  }

})


class Request extends Component {

  createNewDialog = (open, title, text, id) => {
    this.props.newDialog(open, title, text, id);
  }

  render() {
    const { classes } = this.props;
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let date = new Date(this.props.createdAt);
    date = `${date.getDate()} de ${monthNames[date.getMonth()]} às ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} por ${this.props.creatorName}`

    return (
      <LazyLoad height={200}>
        <Card className={classes.card}>
          { this.props.img ? <CardMedia
            className={ classes.cardMedia }
            image={ this.props.img } // eslint-disable-line max-len
            title="Image title"
            /> : null }
            <CardContent className={ classes.cardContent }>
              <Typography gutterBottom variant="headline" component="h2" color="secondary">
                { this.props.title }
              </Typography>
              <Typography variant="body2">
                { this.props.location }
              </Typography>
              <Typography variant="caption" color="primary" className={classes.date}>
                { date }
              </Typography>
              <Typography className={classes.text}>
                { this.props.text }
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <div className={classes.actionsWrapper}>
                { this.props.userIsLoggedIn ?
                  <IconButton aria-label="Message" color="primary">
                    <MessageIcon />
                  </IconButton> :
                  null }
                <IconButton aria-label="Share" color="primary">
                  <ShareIcon />
                </IconButton>
              </div>
              { this.props.isFromUser ?
                  <div className={classes.deleteWrapper}>
                    <IconButton onClick={() => this.createNewDialog(true, 'Deletar este pedido?', `Você tem certeza que deseja apagar ${this.props.title}?`, this.props.id)} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </div> :
                null }
              </CardActions>
            </Card>
          </LazyLoad>
        )
    }

}

const mapStateToProps = state => ({
  userIsLoggedIn: state.userIsLoggedIn
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...dialogActions, ...authActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Request));
