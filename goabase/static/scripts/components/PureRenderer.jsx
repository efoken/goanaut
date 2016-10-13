import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class PureRenderer extends React.Component {
  static propTypes = {
    render: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {render, ...other} = this.props;
    return render(other);
  }
}
