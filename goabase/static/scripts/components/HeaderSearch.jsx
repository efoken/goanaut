/* eslint-disable react/require-default-props */
import React from 'react';

export default class HeaderSearch extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
    p2: React.PropTypes.bool,
    location: React.PropTypes.string,
    datePlaceholder: React.PropTypes.string,
    groupedDestinations: React.PropTypes.arrayOf(),
    groupedDestinationTips: React.PropTypes.string,
    launchInfantsV2: React.PropTypes.bool,
  };

  static defaultProps = {
    launchInfantsV2: false,
  };

  componentDidMount() {
    this.$form = $(this.form);
    this.$body = $('body');
  }

  setupTwitterTypeahead() {}

  setupAutocomplete() {}

  serializeData() {}

  refreshDestinations() {}

  handleChange() {}

  handleFocus() {}

  handleFocusLost() {}

  handleKeyDown() {}

  handleDestinationsClick() {}

  handleTypeaheadOpen() {}

  handleTypeaheadSelection() {}

  handleSubmit() {}

  emitSearchEvent() {}

  openSettings() {}

  listenToClicks() {}

  closeIfOutside() {}

  render() {
    return (
      <form action={this.props.action} className="header-search navbar-search" onSubmit={this.handleSubmit} ref={ref => this.form = ref}>
        <div>
          <div className="input-group">
            <input type="text" className="form-control" name="location" id="header-search-location" placeholder="Search" autoComplete="off" onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyDown} ref={ref => this.location = ref} />
          </div>
        </div>
      </form>
    );
  }
}
