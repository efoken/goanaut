import React, { PropTypes } from 'react/addons';
import shallowCompare from 'react-addons-shallow-compare';

export default class PureRenderer extends React.Component {
  static propTypes = {
    render: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {render, ...other} = this.props;
    return render(other);
  }
}
