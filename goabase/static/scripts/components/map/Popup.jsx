import React from 'react';
import ReactDOM from 'react-dom';

import * as customPropTypes from '../../customPropTypes';

const propTypes = {
  map: customPropTypes.MapPropType,
  parent: React.PropTypes.any,
  offset: customPropTypes.PositionPropType,
  clearance: customPropTypes.PositionPropType,
  visible: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  onOpen: React.PropTypes.func,
  onMapClick: React.PropTypes.func,
};

const defaultProps = {
  offset: {
    x: 0,
    y: 0,
  },
  clearance: {
    x: 15,
    y: 50,
  },
  visible: false,
};

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.domElement = null;
    this.popup = null;
    this.onClose = n.onClose.bind(n);
    this.onOpen = n.onOpen.bind(n);
    this.onMapClick = n.onMapClick.bind(n);
  }

  componentDidMount() {
    const parent = this.props.parent;

    if (!this.props.map) {
      throw new Error('<Popup /> was not properly passed a map context. Make sure you are using this inside of a <Map /> component.');
    }
    if (!parent) {
      throw new Error('The <Popup /> component must be a child of a <MapElementBase /> component');
    }

    this.domElement = document.createElement('div');

    if (this.props.visible) {
      this.actualRender();
      parent.setPopupContent(this.domElement);
      this.open();
    } else {
      parent.setPopupContent(this.domElement);
    }
  }

  componentWillReceiveProps(newProps) {
    const visible = this.props.visible;

    if (visible !== newProps.visible) {
      if (newProps.visible === true) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  componentDidUpdate() {
    this.actualRender();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.domElement);
    this.close();
  }

  onClose() {
    this.props.onClose && this.props.onClose({
      map: this.props.map,
      parent: this.props.parent,
    })
  }

  onOpen() {
    this.props.onOpen && this.props.onOpen({
      map: this.props.map,
      parent: this.props.parent,
    })
  }

  onMapClick() {
    this.props.onMapClick && this.props.onMapClick();
  }

  actualRender() {
    ReactDOM.render(React.createElement('div', this.props), this.domElement);
  }

  close() {
    const map = this.props.map;
    const parent = this.props.parent;
    map.popup.getParent() === parent && map.popup.isOpen() && document.contains(parent.getPopupContent()) && map.popup.close();
  }

  open() {
    const parent = this.props.parent;
    const map = this.props.map;

    if (!(map.popup.getParent() === parent && map.popup.isOpen())) {
      map.popup.setClearance(this.props.clearance);
      map.popup.open(parent, {
        onClose: this.onClose,
        onMapClick: this.onMapClick,
        offset: this.props.offset,
      });
      this.onOpen();
    }
  }

  render() {
    return null;
  }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;

export default Popup;
