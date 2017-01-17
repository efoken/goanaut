import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const propTypes = {
  render: React.PropTypes.func,
};

class PureRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {render, ...other} = this.props;
    return render(other);
  }
}

PureRenderer.propTypes = propTypes;

export default PureRenderer;
