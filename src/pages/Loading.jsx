import React from 'react';
import { injectStyle } from '../utils/utils';

const keyframesStyle = `
      @-webkit-keyframes pulse {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`

injectStyle(keyframesStyle);

const styles = {

  loadingPage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#f74D4D'
  },

  loader: {
    width: '100px',
    height: '100px',
    position: 'absolute',
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)',
    border: '10px solid #FFFFFF',
    borderRight: '10px solid #F79999',
    borderLeft: '10px solid #F79999',
    borderRadius: '50%',
    WebkitAnimation: 'pulse 1s linear infinite'
  },

}


const loading = (props) => {
  return (
    <div style={ styles.loadingPage }>
      <div style={ styles.loader }>

      </div>
    </div>
  )
}

export default loading;
