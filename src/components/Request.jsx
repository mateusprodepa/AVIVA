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
    paddingTop: '56.25%', // 16:9
  },

  date: {
    paddingBottom: 6
  },
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
              <Typography variant="subheading">
                { this.props.location }
              </Typography>
              <Typography variant="caption" color="primary" className={classes.date}>
                { date }
              </Typography>
              <Typography>
                { this.props.text }
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label="Message" color="primary">
                <MessageIcon />
              </IconButton>
              <IconButton aria-label="Share" color="primary">
                <ShareIcon />
              </IconButton>
              { this.props.isFromUser ?
                <IconButton onClick={() => this.createNewDialog(true, 'Deletar este pedido?', `Você tem certeza que deseja apagar ${this.props.title}?`, this.props.id)} aria-label="Delete" color="secondary">
                  <DeleteIcon />
                </IconButton> :
                null }
              </CardActions>
            </Card>
          </LazyLoad>
        )
    }

}

const mapDispatchToProps = dispatch =>
  bindActionCreators(dialogActions, dispatch);

export default connect(null, mapDispatchToProps)(withStyles(styles)(Request));
