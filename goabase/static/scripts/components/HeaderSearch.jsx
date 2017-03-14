/* eslint-disable react/require-default-props */
import React from 'react';
import { css, withStyles } from 'react-with-styles';
import eventEmitter from '../eventEmitter';

const propTypes = {
  action: React.PropTypes.string,
  submitAfterSelectLocation: React.PropTypes.bool,
  location: React.PropTypes.string,
  datePlaceholder: React.PropTypes.string,
  showSettings: React.PropTypes.bool,
};

const defaultProps = {
  submitAfterSelectLocation: false,
  showSettings: false,
};

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleGoogleTypeaheadSelection = this.handleGoogleTypeaheadSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeaheadSelection = this.handleTypeaheadSelection.bind(this);
    this.setupGoogleAutocomplete = this.setupGoogleAutocomplete.bind(this);
    this.state = {
      settingsAreVisible: false,
      placeId: undefined,
      googleAutocompleteEnabled: false,
    };
  }

  componentDidMount() {
    this.$form = $(this.searchForm);
  }

  onOutsideClick(ev) {
    const $target = $(ev.target)
    let hideSettings = true;

    const r = $target.closest('.ui-datepicker').length || $target.hasClass('.ui-datepicker-backdrop') || $target.closest('.tt-menu').length;
    const a = (0, x.didClickOverElement)(ev, this.settings);
    if (r || a) {
      hideSettings = false;
    }

    if (hideSettings) {
      this.setState({ settingsAreVisible: false });
    }
  }

  setupAirbnbTypeahead() {
    this.$typeahead = $(this.location);
    const e = new L.default;
    e.init();
    this.$typeahead.typeahead({
      hint: false,
    }, {
      name: 'airbnb-location-suggester',
      source: e.engine,
      display: (e) => {
        return q.default.getSuggestionDescription(e);
      },
      templates: {
        suggestion: (e) => {
          return q.default.getSuggestionTemplate(e);
        },
      },
    });
    this.$typeahead.bind('typeahead:select', this.handleTypeaheadSelection);
  }

  setupGoogleAutocomplete() {
    this.autocomplete = new window.google.maps.places.Autocomplete(this.location, (0, F.default)());
    window.google.maps.event.addListener(this.autocomplete, 'place_changed', this.handleGoogleTypeaheadSelection);
    this.setState({ googleAutocompleteEnabled: true });
  }

  serializeData(e, ev) {
    return {
      baseUrl: this.props.action,
      data: e.serializeObject(),
      event: ev || null,
    };
  }

  handleFocus() {
    if (!this.typeaheadInited) {
      if (d.default.country() !== 'CN') {
        Airbnb.Utils.loadGooglePlacesAndBreaksChina();
        (0, G.default)(this.setupGoogleAutocomplete);
      } else if (window.Bloodhound) {
        this.setupAirbnbTypeahead();
        setTimeout(() => {
          $(this.location).focus();
        });
      }
      this.typeaheadInited = true;
    }
  }

  handleTypeaheadSelection() {
    this.emitSearchEvent();
    if (this.props.showSettings) {
      this.openSettings();
    }
  }

  handleGoogleTypeaheadSelection() {
    this.setState({ placeId: this.autocomplete.getPlace().place_id });
    this.handleTypeaheadSelection();
  }

  handleSubmit(ev) {
    this.emitSearchEvent(ev);
    ev.preventDefault();
    if (this.props.showSettings && this.state.settingsAreVisible) {
      (0, B.handleFormSubmit)(this.$form);
    } else if (this.props.showSettings) {
      this.openSettings();
    }
  }

  emitSearchEvent(ev) {
    eventEmitter.emit('header:search', this.serializeData(this.$form, ev))
  }

  openSettings() {
    this.setState({ settingsAreVisible: true });
  }

  render() {
    const n = this.props.datePlaceholder;
    const a = this.props.styles;
    const i = this.state.placeId;
    const l = u.default.t('shared.Search');

    const c = (
      <input
        type="text"
        placeholder="Search"
        autoComplete="off"
        name="location"
        id="header-search-form-input-type"
        onFocus={this.handleFocus}
        ref={ref => this.location = ref}
        defaultValue={this.props.location}
        {...css(a.input)}
      />
    );

    const d = (
      <button
        id="header-search-form-button-type"
        onClick={() => eventEmitter.emit('search-modal:open', 'flyout_view')}
        {...css(a.input, a.input_button)}
      >
        <div {...css(a.input_text)}>
          {React.createElement(w.default, {
            inline: true,
            muted: true,
          }, this.props.location)}
        </div>
      </button>
    );

    return (
      <form
        action={this.props.action}
        onSubmit={this.handleSubmit}
        ref={ref => this.searchForm = ref}
        {...css(a.container)}
      >
        <div {...css(a.content)}>
          <label htmlFor="header-search-form" {...css(a.label)}>
            {React.createElement(T.default, null, l)}
            {React.createElement(v.default, {
              breakpoint: 'mediumAndAbove',
            }, c)}
            {React.createElement(_.default, {
              breakpoint: 'mediumAndAbove',
            }, d)}
          </label>
          <div {...css(a.icon)}>
            {React.createElement(m.default, null)}
          </div>
        </div>
        {this.state.settingsAreVisible ? (
          {React.createElement(R.default, {
            onOutsideClick: this.onOutsideClick,
          }, React.createElement('div', babelHelpers.extends({}, css(a.settings), {
            ref: ref => this.settings = ref,
          }), React.createElement(N.default, {
            datePlaceholder: n,
          })
        ))}
        ) : null}
        <input type="hidden" name="source" value="hdr" />
        {i ? (
          <input type="hidden" name="place_id" value={i} />
        ) : null}
      </form>
    );
  }
}

HeaderSearch.propTypes = propTypes;
HeaderSearch.defaultProps = defaultProps;

export default withStyles(({ color, font, responsive, unit }) => ({

}))(HeaderSearch);
