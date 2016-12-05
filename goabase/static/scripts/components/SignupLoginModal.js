import qs from 'qs';

import * as types from '../consts/ModalTypes';

const o = {}; // n(47);
// const s = n(545);
const u = {}; // babelHelpers.interopRequireDefault(s);
// const d = n(42);
const f = {}; // babelHelpers.interopRequireDefault(d);
// const b = n(696);
const g = {}; // babelHelpers.interopRequireDefault(b);
// const y = n(704);
const v = {}; // babelHelpers.interopRequireDefault(y);
// const _ = n(710);
const k = {}; // babelHelpers.interopRequireDefault(_);
// const T = n(712);
const w = {}; // babelHelpers.interopRequireDefault(T);
// const E = n(11);
const S = {}; // babelHelpers.interopRequireDefault(E);

class SignupLoginModal {
  launchSignup(e) {
    function callback() {
      (0, k.default)();
      if (o.callback) {
        o.callback();
      }
    }

    function onFinishedFlow() {
      (0, k.default)();
      if (o.onFinishedFlow) {
        o.onFinishedFlow();
      }
    }

    function prioritizedCallbackReturningPromise() {
      (0, k.default)();
      return o.prioritizedCallbackReturningPromise ? o.prioritizedCallbackReturningPromise() : Promise.resolve();
    }

    const o = e || {};
    const i = {
      path: window.location.pathname,
    };

    o.redirectUrl && (i.redirect_url = o.redirectUrl);
    o.launch_type === 'auto' && (i.launch_type = 'auto');
    o.ajax_endpoint && (i.ajax_endpoint = o.ajax_endpoint);
    o.sticky === true && (i.sticky = 'true');
    if (o.business_email) {
      i.business_email = o.business_email;
      (0, S.default)().bt_sig && (i.business_email_sig = (0, S.default)().bt_sig);
      (0, S.default)().bt_ts && (i.business_email_ts = (0, S.default)().bt_ts);
    }
    o.email && (i.email = o.email);
    o.urlParams ? o.urlParams = String(o.urlParams) + '&' + String(qs.stringify(i)) : o.urlParams = qs.stringify(i);
    const a = this.getWindowLocationSearch();
    a.length > 0 && (o.urlParams = String(o.urlParams) + '&' + String(a.slice(1)));
    const s = Object.assign({}, o, { callback, onFinishedFlow, prioritizedCallbackReturningPromise });
    this.setupSignupLogin(types.MODAL_TYPE_SIGNUP, s);
  }

  launchSignupOrLogin(e) {
    if ((0, f.default)('hli')) {
      this.launchLogin(e);
    } else {
      this.launchSignup(e);
    }
  }

  getWindowLocationSearch() {
    return window.location.search;
  }

  launchLogin(e) {
    (0, w.default)();
    this.setupSignupLogin(types.MODAL_TYPE_LOGIN, e);
  }

  launchLogout(e) {
    this.setupSignupLogin(types.MODAL_TYPE_LOGOUT, e);
  }

  launchOtp() {
    this.setupSignupLogin(types.MODAL_TYPE_OTP);
  }

  setupSignupLogin(e, t) {
    const n = this;
    const r = t || {};
    const i = Object.assign({}, r);
    delete i.$container;
    const s = r.callback;
    const u = r.urlParams;
    const l = r.flow;
    const c = this.getModalUrl(e, u);
    const d = r.sticky;
    this.setLoading(e, true),
    this.closeModals();
    const f = r.customType ? String(e) + '.' + String(r.customType) : e;
    !r.$container && this.modals[f] ? (this.modals[f].open(),
    r.onModalOpen && r.onModalOpen(),
    this.setLoading(e, false),
    g.default.page = e) : $.get(c, this.getRequestParams(r), (t) => {
      let s = void 0;

      if (r.$container) {
        r.$container.html(t.trim());
      } else {
        s = new o.Modal(t.trim(), {
          sticky: d,
        });
        s.open();
        r.onModalOpen && r.onModalOpen();
        s.on('close', () => {
          v.default.handleModalClose(n.modalIsLoading);
        });
        n.modals[f] = s;
      }

      if ([types.MODAL_TYPE_SIGNUP, types.MODAL_TYPE_LOGIN].indexOf(e) !== -1) {
        const u = $('#link_alipay_user_id');
        const l = !!u.val();
        g.default.init({
          page: e,
          inModal: true,
          onFinishedFlow: r.onFinishedFlow,
          prioritizedCallbackReturningPromise: r.prioritizedCallbackReturningPromise,
          shouldInitPhoneNumberSignup: l,
        });
      }
      const p = r.$container || s.$element;
      o.Tooltip && o.Tooltip.bind(p);
      n.setLoading(e, false);

      if ('auto' === r.launch_type) {
        v.default.addModalBackground();
      }

      p.find('input[placeholder], textarea[placeholder]').placeholder();
      p.on('click', '.modal-link', n.handleModalChange.bind(n, i));
      if (e === types.MODAL_TYPE_LOGOUT) {
        n.listenForLogin();
      }
      n.modals[f] = s;
    }),
    s && g.default.addLoginCallback(s),
    l && g.default.addFlow(l);
  }

  handleModalChange(e, ev) {
    ev.preventDefault();

    if (e.onModalChange) {
      e.onModalChange();
    }

    const type = ev.target.getAttribute('data-modal-type');

    switch (type) {
      case types.MODAL_TYPE_LOGIN:
        this.launchLogin(e);
        break;
      case types.MODAL_TYPE_SIGNUP:
        this.launchSignup(e);
        break;
      // no default
    }
  }

  closeModals() {
    Object.values(this.modals).filter(el => el).forEach((el) => {
      el.close();
    });
  }

  setLoading(e, t) {
    const $modal = $(`.airbnb-header [data-${e}-modal]`);

    if (t) {
      this.modalIsLoading = true;
      $modal.addClass('link-disabled');
      $modal.attr('disabled', true);
    } else {
      v.default.removeSignupGardenBanner();
      this.modalIsLoading = false;
      $modal.removeClass('link-disabled');
      $modal.removeAttr('disabled');
    }
  }

  getModalUrl(type, params) {
    let url;

    switch (type) {
      case types.MODAL_TYPE_LOGIN:
        url = '/login_modal';
        break;
      case types.MODAL_TYPE_SIGNUP:
        url = '/signup_modal';
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
      url += `?${String(params)}`;
    }
    return url;
  }

  init() {
    this.initEvents();
    this.initClickEvents();
    setTimeout(() => {
      v.default.initSignupPrompt();
    }, 0);
  }

  initEvents() {
    u.default.on('login-modal:open', this.launchLogin.bind(this));
    u.default.on('signup-modal:open', this.launchSignup.bind(this));
    u.default.on('otp-modal:open', this.launchOtp.bind(this));
    u.default.on('signup-login-modals:close', this.closeModals.bind(this));
  }

  initClickEvents() {
    if (!['/login', '/signup_login'].includes(window.location.pathname)) {
      $(document).on('click', '[data-login-modal]', (ev) => {
        ev.preventDefault();
        const t = $(ev.currentTarget);
        if (!t.parents('#header').length) {
          u.default.emit('login-modal:open');
        }
      });
      $(document).on('click', '[data-signup-modal]', (ev) => {
        ev.preventDefault();
        const t = $(ev.currentTarget);
        if (!t.parents('#header').length) {
          u.default.emit('signup-modal:open');
        }
      });
    }
  }

  listenForLogin() {
    u.default.once('login', (e) => {
      e && e.refresh === false || window.location.reload();
    });
  }

  getRequestParams() {
    const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const t = {};
    return e.$container && (t.embed = 1),
    e.redirectUrl && (t.redirect_url = e.redirectUrl),
    t;
  }
}

SignupLoginModal.modals = {};

export default window.GoaSignupLoginModal ? window.GoaSignupLoginModal : (window.GoaSignupLoginModal = SignupLoginModal);
