/* eslint-disable no-underscore-dangle */
import React from 'react';

import Popup from './Popup';
import * as customPropTypes from '../../customPropTypes';

const propTypes = {
  map: customPropTypes.MapPropType,
  zIndex: React.PropTypes.number,
  clickable: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onDragStart: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
  data: React.PropTypes.any,
};

class MapElementBase extends React.Component {
  constructor(props, n) {
    super(props, n);
    this.state = {
      object: null,
    };
    this.onClick = this.onClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentWillUnmount() {
    const object = this.state.object;
    object.off('click', this.onClick);
    object.off('drag', this.onDrag);
    object.off('dragstart', this.onDragStart);
    object.off('dragend', this.onDragEnd);
    object.off('mouseover', this.onMouseOver);
    object.off('mouseout', this.onMouseOut);
    object.off('mousemove', this.onMouseMove);
    object.detach();
  }

  onClick(ev) {
    if (this.props.onClick) {
      this.props.onClick(this.eventData(ev));
    }
  }

  onDrag(ev) {
    if (this.props.onDrag) {
      this.props.onDrag(this.eventData(ev));
    }
  }

  onDragEnd(ev) {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(this.eventData(ev));
    }
  }

  onDragStart(ev) {
    if (this.props.onDragStart) {
      this.props.onDragStart(this.eventData(ev));
    }
  }

  onMouseMove(ev) {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(this.eventData(ev));
    }
  }

  onMouseOut(ev) {
    if (this.props.onMouseOut) {
      this.props.onMouseOut(this.eventData(ev));
    }
  }

  onMouseOver(ev) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(this.eventData(ev));
    }
  }

  _mountWithObject(object) {
    object.on('click', this.onClick);
    object.on('drag', this.onDrag);
    object.on('dragstart', this.onDragStart);
    object.on('dragend', this.onDragEnd);
    object.on('mouseover', this.onMouseOver);
    object.on('mouseout', this.onMouseOut);
    object.on('mousemove', this.onMouseMove);
    this.setState({ object });
  }

  eventData(event) {
    return {
      nativeEvent: event,
      object: this.state.object,
      data: this.props.data,
    }
  }

  renderChildren() {
    const e = React.Children.count(this.props.children);
    if (e > 1) {
      throw new Error(`<${this.constructor.displayName || 'MapElementBase'} /> cannot have more than one child`);
    }
    if (e !== 1) {
      return null;
    }
    if (this.props.children.type !== Popup) {
      throw new Error(`<${this.constructor.displayName || 'MapElementBase'} />'s child must be a single <Popup />`);
    }
    return React.cloneElement(this.props.children, {
      map: this.props.map,
      parent: this.state.object,
    });
  }

  render() {
    return this.state.object && this.props.children ? this.renderChildren() : null;
  }
}

MapElementBase.propTypes = propTypes;

export default MapElementBase;
