import qs from 'qs';

const o = n(47)
  , i = n(26)
  , a = babelHelpers.interopRequireDefault(i)
  , s = n(545)
  , u = babelHelpers.interopRequireDefault(s)
  , d = n(42)
  , f = babelHelpers.interopRequireDefault(d)
  , p = n(702)
  , h = babelHelpers.interopRequireDefault(p)
  , m = n(703)
  , b = n(696)
  , g = babelHelpers.interopRequireDefault(b)
  , y = n(704)
  , v = babelHelpers.interopRequireDefault(y)
  , _ = n(710)
  , k = babelHelpers.interopRequireDefault(_)
  , T = n(712)
  , w = babelHelpers.interopRequireDefault(T)
  , E = n(11)
  , S = babelHelpers.interopRequireDefault(E);

class SignupLoginModal {
  launchSignup(e) {
    function t() {
      (0,
      k.default)(),
      o.callback && o.callback()
    }
    function n() {
      (0,
      k.default)(),
      o.onFinishedFlow && o.onFinishedFlow()
    }
    function r() {
      return (0,
      k.default)(),
      o.prioritizedCallbackReturningPromise ? o.prioritizedCallbackReturningPromise() : Promise.resolve()
    }
    var o = e || {}
      , i = {
        path: window.location.pathname
    };
    o.redirectUrl && (i.redirect_url = o.redirectUrl),
    'auto' === o.launch_type && (i.launch_type = 'auto'),
    o.ajax_endpoint && (i.ajax_endpoint = o.ajax_endpoint),
    o.sticky === !0 && (i.sticky = 'true'),
    o.business_email && (i.business_email = o.business_email,
    (0,
    S.default)().bt_sig && (i.business_email_sig = (0,
    S.default)().bt_sig),
    (0,
    S.default)().bt_ts && (i.business_email_ts = (0,
    S.default)().bt_ts)),
    o.email && (i.email = o.email),
    o.urlParams ? o.urlParams = String(o.urlParams) + '&' + String(qs.stringify(i)) : o.urlParams = qs.stringify(i);
    const a = this.getWindowLocationSearch();
    a.length > 0 && (o.urlParams = String(o.urlParams) + '&' + String(a.slice(1)));
    const s = Object.assign({}, o, {
      callback: t,
      onFinishedFlow: n,
      prioritizedCallbackReturningPromise: r,
    });
    this.setupSignupLogin(m.MODAL_TYPE_SIGNUP, s);
  }

  launchSignupOrLogin(e) {
    h.default.bump('signup_login.launch_signup_or_login', 1, 'status:attempt'),
    (0,
    f.default)('hli') ? (h.default.bump('signup_login.launch_signup_or_login', 1, 'status:launch_login'),
    this.launchLogin(e)) : (h.default.bump('signup_login.launch_signup_or_login', 1, 'status:launch_signup'),
    this.launchSignup(e));
  }

  getWindowLocationSearch() {
    return window.location.search;
  }

  launchLogin(e) {
    h.default.bump('signup_login.launch_login', 1, 'status:attempt'),
    (0,
    w.default)(),
    this.setupSignupLogin(m.MODAL_TYPE_LOGIN, e);
  }

  launchLogout(e) {
    this.setupSignupLogin(m.MODAL_TYPE_LOGOUT, e);
  }

  launchOtp() {
    this.setupSignupLogin(m.MODAL_TYPE_OTP);
  }

  setupSignupLogin(e, t) {
    var n = this
      , r = t || {}
      , i = Object.assign({}, r);
    delete i.$container,
    a.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: Object.assign({
        sub_event: e,
        operation: 'impression',
      }, i),
    });
    var s = r.callback
      , u = r.urlParams
      , l = r.flow
      , c = this.getModalUrl(e, u)
      , d = r.sticky;
    this.setLoading(e, !0),
    this.closeModals();
    var f = r.customType ? String(e) + '.' + String(r.customType) : e;
    !r.$container && this.modals[f] ? (this.modals[f].open(),
    r.onModalOpen && r.onModalOpen(),
    this.setLoading(e, !1),
    g.default.page = e) : $.get(c, this.getRequestParams(r), function(t) {
      var s = void 0;
      if (r.$container ? r.$container.html(t.trim()) : (s = new o.Modal(t.trim(),{
        sticky: d
      }),
      s.open(),
      r.onModalOpen && r.onModalOpen(),
      s.on('close', function() {
        v.default.handleModalClose(n.modalIsLoading),
        a.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'nav_click_away',
            operation: 'impression',
            modal: e,
          },
        })
      }),
      n.modals[f] = s),
      [m.MODAL_TYPE_SIGNUP, m.MODAL_TYPE_LOGIN].indexOf(e) !== -1) {
        var u = $('#link_alipay_user_id')
          , l = !!u.val();
        g.default.init({
          page: e,
          inModal: !0,
          onFinishedFlow: r.onFinishedFlow,
          prioritizedCallbackReturningPromise: r.prioritizedCallbackReturningPromise,
          shouldInitPhoneNumberSignup: l,
        })
      }
      var p = r.$container || s.$element;
      o.Tooltip && o.Tooltip.bind(p),
      n.setLoading(e, !1),
      'auto' === r.launch_type ? (v.default.addModalBackground(),
      a.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'signup_launch_auto',
          operation: 'impression',
          modal_url: c,
        },
      }),
      h.default.bump('signup_login.setup_signup_login', 1, 'launch_type:auto')) : (a.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'signup_launch_else',
          operation: 'impression',
          modal_url: c,
        },
      }),
      h.default.bump('signup_login.setup_signup_login', 1, 'launch_type:else')),
      p.find('input[placeholder], textarea[placeholder]').placeholder(),
      p.on('click', '.modal-link', n.handleModalChange.bind(n, i)),
      e === m.MODAL_TYPE_LOGOUT && n.listenForLogin(),
      n.modals[f] = s
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
      case m.MODAL_TYPE_LOGIN:
        this.launchLogin(e);
        break;
      case m.MODAL_TYPE_SIGNUP:
        this.launchSignup(e);
        break;
    }
  }

  closeModals() {
    Object.values(this.modals).filter(el => el).forEach((el) => {
      el.close();
    });
  }

  setLoading(e, t) {
    const n = $('.airbnb-header [data-' + String(e) + '-modal]');
    const r = 'link-disabled';
    t ? (this.modalIsLoading = !0,
    n.addClass(r),
    n.attr('disabled', !0)) : (v.default.removeSignupGardenBanner(),
    this.modalIsLoading = !1,
    n.removeClass(r),
    n.removeAttr('disabled'));
  }

  getModalUrl(type, params) {
    let url;

    switch (type) {
      case m.MODAL_TYPE_LOGIN:
        url = '/login_modal';
        break;
      case m.MODAL_TYPE_SIGNUP:
        url = '/signup_modal';
        break;
      case m.MODAL_TYPE_LOGOUT:
        url = '/signed_out_modal';
        break;
      case m.MODAL_TYPE_OTP:
        url = '/otp_modal';
        break;
    }

    if (params) {
      url += `?${String(params)}`;
    }
    return url;
  }

  init() {
    this.initEvents();
    this.initClickEvents();
    setTimeout(function() {
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
      $(document).on('click', '[data-login-modal]', function(ev) {
        ev.preventDefault();
        const t = $(ev.currentTarget);
        h.default.bump('signup_login.click_login_modal', 1),
        t.parents('#header').length ? a.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'login_launch_nav',
            operation: 'impression',
          },
        }) : 'banner-login-button' === t.attr('id') && a.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'login_launch_banner',
            operation: 'impression',
          },
        }),
        u.default.emit('login-modal:open')
      });
      $(document).on('click', '[data-signup-modal]', function(ev) {
        ev.preventDefault(),
        h.default.bump('signup_login.click_signup_modal', 1);
        const t = $(ev.currentTarget);
        t.parents('#header').length ? a.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_launch_nav',
            operation: 'impression',
          },
        }) : 'banner-signup-button' === t.attr('id') && a.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_launch_banner',
            operation: 'impression',
          },
        }),
        u.default.emit('signup-modal:open')
      });
    }
  }

  listenForLogin() {
    u.default.once('login', function(e) {
        e && e.refresh === !1 || window.location.reload()
    });
  }

  getRequestParams() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
      , t = {};
    return e.$container && (t.embed = 1),
    e.redirectUrl && (t.redirect_url = e.redirectUrl),
    t;
  }
}

SignupLoginModal.modals = {};

export default window.GoaSignupLoginModal ? window.GoaSignupLoginModal : (window.GoaSignupLoginModal = SignupLoginModal);
