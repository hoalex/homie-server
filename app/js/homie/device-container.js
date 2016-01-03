'use strict';

import React from 'react';

import Light from './devices/light';
import Temperature from './devices/temperature';
import Shutters from './devices/shutters';
import Condition from './devices/condition';
import Heater from './devices/heater';

let Nodes = {
  'light': Light,
  'temperature': Temperature,
  'shutters': Shutters,
  'condition': Condition,
  'heater': Heater
};

export default class DeviceContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    if (!this.props.devices.length) {
      return (
        <div>Aucun objet</div>
      );
    }

    let nodes = [];
    this.props.devices.map((device, deviceIndex) => {
      if (this.props.devicesShown !== 'all' && this.props.devicesShown.indexOf(device.id) <= -1) {
        return;
      }

      let groupColor;
      let groupForThisDevice = this.props.groups.filter((group) => {
        return group.devices.indexOf(device.id) > -1;
      });

      if (groupForThisDevice.length) {
        groupColor = groupForThisDevice[0].color;
      }

      device.nodes.map((node, nodeIndex) => {
        let Node = Nodes[node.type];
        nodes.push(<Node name={node.name} type={node.type} state={node.state} deviceId={device.id} deviceColor={device.color} nodeId={node.id} nodeColor={node.color} groupColor={groupColor} deviceState={device.state} location={device.location} setProperty={this.props.setProperty} key={deviceIndex + '-' + nodeIndex} />);
      });
    });

    return (
      <div className='ui five column doubling grid'>
        {nodes}
      </div>
    );
  }
}

DeviceContainer.propTypes = {
  devices: React.PropTypes.array.isRequired,
  devicesShown: React.PropTypes.oneOfType([ React.PropTypes.array, React.PropTypes.string ]).isRequired,
  groups: React.PropTypes.array.isRequired,
  setProperty: React.PropTypes.func.isRequired
};
