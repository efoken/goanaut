/* eslint-disable max-len, no-param-reassign */
import $ from 'jquery';
import qs from 'qs';

import * as types from '../consts/ModalTypes';
import eventEmitter from '../eventEmitter';

const o = {}; // n(47);
// const d = n(42);
const f = {}; // babelHelpers.interopRequireDefault(d);
// const b = n(696);
// const g = {}; // babelHelpers.interopRequireDefault(b);
// const y = n(704);
// const v = {}; // babelHelpers.interopRequireDefault(y);
// const _ = n(710);
const k = {}; // babelHelpers.interopRequireDefault(_);
// const T = n(712);
// const w = {}; // babelHelpers.interopRequireDefault(T);
// const E = n(11);
const S = {}; // babelHelpers.interopRequireDefault(E);

class SignupLoginModal {
  constructor() {
    this.modals = {};
  }

  launchSignup(options = {}) {
    const i = {
      path: window.location.pathname,
    };
    if (options.redirectUrl) {
      i.redirect_url = options.redirectUrl;
    }
    if (options.launch_type === 'auto') {
      i.launch_type = 'auto';
    }
    if (options.ajax_endpoint) {
      i.ajax_endpoint = options.ajax_endpoint;
    }
    if (options.business_email) {
      i.business_email = options.business_email;
      if ((0, S.default)().bt_sig) {
        i.business_email_sig = (0, S.default)().bt_sig;
      }
      if ((0, S.default)().bt_ts) {
        i.business_email_ts = (0, S.default)().bt_ts;
      }
    }
    if (options.email) {
      i.email = options.email;
    }

    if (options.urlParams) {
      options.urlParams = `${options.urlParams}&${qs.stringify(i)}`;
    } else {
      options.urlParams = qs.stringify(i);
    }

    const search = this.constructor.getWindowLocationSearch();
    if (search.length > 0) {
      options.urlParams = `${options.urlParams}&${search.slice(1)}`;
    }

    const s = Object.assign({}, options, {
      callback() {
        (0, k.default)();
        if (o.callback) {
          o.callback();
        }
      },
      onFinishedFlow() {
        (0, k.default)();
        if (o.onFinishedFlow) {
          o.onFinishedFlow();
        }
      },
      prioritizedCallbackReturningPromise() {
        (0, k.default)();
        return o.prioritizedCallbackReturningPromise ? o.prioritizedCallbackReturningPromise() : Promise.resolve();
      },
    });
    this.setupSignupLogin(types.MODAL_TYPE_SIGNUP, s);
  }

  launchSignupOrLogin(options) {
    if ((0, f.default)('hli')) {
      this.launchLogin(options);
    } else {
      this.launchSignup(options);
    }
  }

  static getWindowLocationSearch() {
    return window.location.search;
  }

  launchLogin(options) {
    // (0, w.default)();
    this.setupSignupLogin(types.MODAL_TYPE_LOGIN, options);
  }

  launchLogout(options) {
    this.setupSignupLogin(types.MODAL_TYPE_LOGOUT, options);
  }

  launchOtp() {
    this.setupSignupLogin(types.MODAL_TYPE_OTP);
  }

  setupSignupLogin(type, options = {}) {
    const i = Object.assign({}, options);
    delete i.$container;

    const callback = options.callback;
    const flow = options.flow;
    const modalUrl = this.constructor.getModalUrl(type, options.urlParams);

    this.setLoading(type, true);
    this.hideModals();

    const name = options.customType ? `${type}.${options.customType}` : type;

    if (!options.$container && this.modals[name]) {
      this.modals[name].modal('show');
      if (options.onModalShow) {
        options.onModalShow();
      }
      this.setLoading(type, false);
      // g.default.page = type;
    } else {
      $.get(modalUrl, this.constructor.getRequestParams(options), (data) => {
        let $modal;

        if (options.$container) {
          options.$container.html(data.trim());
        } else {
          $modal = $(data.trim()).modal();
          $modal.modal('show');
          if (options.onModalShow) {
            options.onModalShow();
          }
          $modal.on('hide.bs.modal', () => {
            // v.default.handleModalHide(this.modalIsLoading);
          });
          this.modals[name] = $modal;
        }

        if ([types.MODAL_TYPE_SIGNUP, types.MODAL_TYPE_LOGIN].indexOf(type) !== -1) {
          // const u = $('#link_alipay_user_id');
          // const l = !!u.val();
          // g.default.init({
          //   page: type,
          //   inModal: true,
          //   onFinishedFlow: options.onFinishedFlow,
          //   prioritizedCallbackReturningPromise: options.prioritizedCallbackReturningPromise,
          //   shouldInitPhoneNumberSignup: l,
          // });
        }

        const $element = options.$container || $modal;

        if (o.Tooltip) {
          o.Tooltip.bind($element);
        }
        this.setLoading(type, false);

        if (options.launch_type === 'auto') {
          // v.default.addModalBackground();
        }

        $element.on('click', '.modal-link', this.handleModalChange.bind(this, i));
        if (type === types.MODAL_TYPE_LOGOUT) {
          this.constructor.listenForLogin();
        }
        this.modals[name] = $modal;
      });
    }

    if (callback) {
      // g.default.addLoginCallback(callback);
    }

    if (flow) {
      // g.default.addFlow(flow);
    }
  }

  handleModalChange(options, ev) {
    ev.preventDefault();

    if (options.onModalChange) {
      options.onModalChange();
    }

    const type = $(ev.target).data('modalType');

    switch (type) {
      case types.MODAL_TYPE_LOGIN:
        this.launchLogin(options);
        break;
      case types.MODAL_TYPE_SIGNUP:
        this.launchSignup(options);
        break;
      // no default
    }
  }

  hideModals() {
    Object.values(this.modals).filter(el => el).forEach((el) => {
      el.modal('hide');
    });
  }

  setLoading(type, loading) {
    const $modal = $(`#header [data-${type}-modal]`);

    if (loading) {
      this.modalIsLoading = true;
      $modal.addClass('link-disabled');
      $modal.attr('disabled', true);
    } else {
      // v.default.removeSignupGardenBanner();
      this.modalIsLoading = false;
      $modal.removeClass('link-disabled');
      $modal.removeAttr('disabled');
    }
  }

  static getModalUrl(type, params) {
    let url;

    switch (type) {
      case types.MODAL_TYPE_LOGIN:
        url = '/accounts/login/';
        break;
      case types.MODAL_TYPE_SIGNUP:
        url = '/accounts/signup/';
        break;
      case types.MODAL_TYPE_LOGOUT:
        url = '/signed_out_modal';
        break;
      case types.MODAL_TYPE_OTP:
        url = '/otp_modal';
        break;
      // no default
    }

    if (params) {
      url += `?${params}`;
    }
    return url;
  }

  init() {
    this.initEvents();
    this.constructor.initClickEvents();
    setTimeout(() => {
      // v.default.initSignupPrompt();
    }, 0);
  }

  initEvents() {
    eventEmitter.on('login-modal:show', this.launchLogin.bind(this));
    eventEmitter.on('signup-modal:show', this.launchSignup.bind(this));
    eventEmitter.on('otp-modal:show', this.launchOtp.bind(this));
    eventEmitter.on('signup-login-modals:hide', this.hideModals.bind(this));
  }

  static initClickEvents() {
    if (!['/accounts/login/', '/accounts/signup/'].includes(window.location.pathname)) {
      $(document).on('click', '[data-login-modal]', (ev) => {
        ev.preventDefault();
        eventEmitter.emit('login-modal:show');
      });
      $(document).on('click', '[data-signup-modal]', (ev) => {
        ev.preventDefault();
        eventEmitter.emit('signup-modal:show');
      });
    }
  }

  static listenForLogin() {
    eventEmitter.once('login', (value) => {
      if (value && value.refresh === false) {
        // do nothing
      } else {
        window.location.reload();
      }
    });
  }

  static getRequestParams(...args) {
    const options = args.length > 0 && args[0] !== undefined ? args[0] : {};
    const params = {};

    if (options.$container) {
      params.embed = 1;
    }
    if (options.redirectUrl) {
      params.redirect_url = options.redirectUrl;
    }

    return params;
  }
}

export default window.GoaSignupLoginModal ? window.GoaSignupLoginModal : (window.GoaSignupLoginModal = SignupLoginModal);
