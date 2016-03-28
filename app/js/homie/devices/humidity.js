'use strict';

import React from 'react';

import Device from '../device';

export default class Humidity extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Device image='thermometer' color='#e67e22' {...this.props}>
        <div className='ui small horizontal statistic'>
          <div className='value'>
            { typeof this.props.state.current.humidity !== 'undefined' ? this.props.state.current.humidity : '?' }
          </div>
          <div className='label'>
            %
          </div>
        </div>
      </Device>
    );
  }
}

Humidity.propTypes = {
  state: React.PropTypes.shape({
    current: React.PropTypes.shape({
      humidity: React.PropTypes.number
    })
  })
};
