import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'

import ShareIcon from '@material-ui/icons/Share';
import MessageIcon from '@material-ui/icons/Message';

import { withStyles } from '@material-ui/core/styles'

import LazyLoad from 'react-lazyload';

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
})


const request = (props) => {

  const { classes } = props;

  return (
    <LazyLoad height={200}>
      <Card className={classes.card}>
        { props.img ? <CardMedia
          className={ classes.cardMedia }
          image={ props.img } // eslint-disable-line max-len
          title="Image title"
          /> : null }
        <CardContent className={ classes.cardContent }>
          <Typography gutterBottom variant="headline" component="h2" color="secondary">
            { props.title }
          </Typography>
          <Typography>
            { props.text }
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="Message" color="primary">
              <MessageIcon />
          </IconButton>
          <IconButton aria-label="Share" color="primary">
              <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </LazyLoad>
  )
}

export default withStyles(styles)(request);
