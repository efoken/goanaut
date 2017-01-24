/* global Airbnb, babelHelpers */
function r(e) {
  u.default.isLoggedIn() ? e() : _.default.once('login', e);
}

function n(e) {
  return;
}

const s = n(476),
  u = babelHelpers.interopRequireDefault(s),
  l = n(7),
  c = babelHelpers.interopRequireDefault(l),
  d = n(4),
  f = babelHelpers.interopRequireDefault(d),
  p = n(147),
  h = babelHelpers.interopRequireDefault(p),
  m = n(39),
  b = babelHelpers.interopRequireDefault(m),
  g = n(42),
  y = babelHelpers.interopRequireDefault(g),
  v = n(545),
  _ = babelHelpers.interopRequireDefault(v),
  k = n(26),
  T = babelHelpers.interopRequireDefault(k),
  w = n(12),
  E = babelHelpers.interopRequireDefault(w),
  S = n(37),
  P = babelHelpers.interopRequireDefault(S),
  C = n(6),
  O = babelHelpers.interopRequireDefault(C),
  D = n(697),
  M = n(698),
  x = babelHelpers.interopRequireDefault(M),
  R = n(699),
  j = babelHelpers.interopRequireDefault(R),
  A = n(700),
  N = babelHelpers.interopRequireDefault(A),
  I = n(701),
  L = babelHelpers.interopRequireDefault(I),
  H = n(713),
  q = babelHelpers.interopRequireDefault(H),
  F = n(714),
  B = babelHelpers.interopRequireDefault(F),
  U = n(712),
  G = babelHelpers.interopRequireDefault(U),
  z = n(716),
  Y = n(11),
  V = babelHelpers.interopRequireDefault(Y),
  $ = n(722),
  W = babelHelpers.interopRequireDefault($),
  K = n(710),
  X = n(723),
  J = n(744),
  Z = n(708),
  Q = babelHelpers.interopRequireDefault(Z);

class SignupLogin {
  constructor() {
    this.initSignInOutListeners();
  }

  init(e) {
    const t = this;
    if (e && (t.page = e.page,
    t.inModal = !!e.inModal,
    t.initForgotPasswordCallbacks = !!e.initForgotPasswordCallbacks,
    t.onFinishedFlow = e.onFinishedFlow,
    t.prioritizedCallbackReturningPromise = e.prioritizedCallbackReturningPromise,
    t.shouldInitPhoneNumberSignup = e.shouldInitPhoneNumberSignup),
    $('#signin_email').on('change', function change() {
      const e = $(this);
      e.val($.trim(e.val()));
    }),
    !($('#otp').length > 0)) {
      const n = $('.signup.modal-content').length > 0 || t.inModal;
      this.initValidation(n),
      this.initFacebookEvents(),
      this.initLogin(),
      this.initForgotPassword(n),
      this.initForgotPasswordCallbacks && (this.initForgotPasswordValidation(),
      this.initForgotPasswordEvents()),
      this.initFacebookSignup(),
      this.initAmexSignup(),
      (0, G.default)(),
      this.initFieldSync(),
      this.initLspSignup(),
      this.initOauthPopupListeners();
      const r = this.getTOSCheckbox();
      r.length && r.on('click', function click() {
        t.getTOSCheckboxLabel().removeClass('tos-checkbox-error');
      }),
      $('.create-using-email').on('click', function click(e) {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_email',
            operation: 'click',
          },
        }),
        e.preventDefault(),
        t.ensureTOSCheckboxIsChecked() && (r.length && (t.getTOSCheckboxLabel().remove(),
        r.remove()),
        t.initEmailSignup(),
        $('.signup-form-fields input[type!="hidden"]').first().focus());
      }),
      $('.create-using-phone-number').on('click', function click(e) {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_phone_number',
            operation: 'click',
          },
        }),
        e.preventDefault(),
        t.initPhoneNumberSignup(),
        e.target.className.includes('pnr-email-default') && (t.initEmailSignup(),
        $('.phone-signup-form').addClass('hide'));
      }),
      $('.btn-alipay.to-signup').on('click', function click() {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            datadog_key: 'alipay.signup_login_flow',
            datadog_tags: ['section:alipay_prepare', 'page:' + String(f.default.get('controller_action_pair')), 'operation:click'],
            section: 'alipay_prepare',
            operation: 'click',
          },
        }),
        $('.signup-panel-box').removeClass('hide'),
        $('.alipay-signup-prepare-modal').addClass('hide'),
        $('.phone-signup-form input[type!="hidden"]').first().focus();
      }),
      t.shouldInitPhoneNumberSignup && (Q.default.inAlipaySignupFlowExperiment() ? (t.initPhoneNumberSignup(false),
      $('.signup-panel-box').addClass('hide'),
      $('.alipay-signup-prepare-modal').removeClass('hide'),
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          datadog_key: 'alipay.signup_login_flow',
          datadog_tags: ['section:alipay_prepare', 'page:' + String(f.default.get('controller_action_pair')), 'operation:impression'],
          section: 'alipay_prepare',
          operation: 'impression',
        },
      })) : t.initPhoneNumberSignup()),
      'lys-login-signup-redesign' === this.flow && $('#user_birthday_year').one('focus', function focus() {
        const e = t.defaultBirthdayYear();
        t.autoSelectOption(this, e);
      }),
      $('[data-hook="password-strength"]').addClass('hide'),
      t.trackInternalLinks(t.page),
      Airbnb.header && Airbnb.header.clearThumbnailUrl();
    }
  }

  initFieldSync() {
    this.syncFields($('input[name="user[first_name]"]'));
    this.syncFields($('input[name="user[last_name]"]'));
    this.syncFields($('input[name="user[password]"]'));
    this.syncFields($('select[name="user[birthday_year]"]'));
    this.syncFields($('select[name="user[birthday_month]"]'));
    this.syncFields($('select[name="user[birthday_day]"]'));
  }

  syncFields(e) {
    e.change((t) => {
      e.val(t.currentTarget.value);
    });
  }

  initPasswordStrengthCheck(e) {
    const t = {
      includeTips: false,
    },
      n = new j.default();
    n.check('.' + String(e) + ' [data-hook="user_password"]', t);
  }

  enableSubmitOnValidate(e, t) {
    const n = false;
    e.each(function each() {
      '' === $(this).val() && (n = true);
    }),
    n ? t.prop('disabled', true) : t.prop('disabled', false);
  }

  setLspSignupButtonStateForEmail() {
    const e = this,
      t = $('#signin_email, #signin_password'),
      n = $('.lsp-signup-submit');
    this.enableSubmitOnValidate(t, n),
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  setLspSignupButtonStateForPhone() {
    const e = this,
      t = $('#signin_phone, #signin_password, .confirmation-code-textarea'),
      n = $('.lsp-signup-submit');
    this.enableSubmitOnValidate(t, n),
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  setLspFinishSignupButtonState() {
    const e = this,
      t = $('#signup_first_name, #signup_last_name, #user_birthday_month, #user_birthday_day, #user_birthday_year'),
      n = $('.lsp-finish-signup-submit');
    this.enableSubmitOnValidate(t, n),
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  setGetSmsCodeButtonState() {
    const e = this,
      t = $('#signin_phone'),
      n = $('.lsp-get-sms-code');
    this.enableSubmitOnValidate(t, n),
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  showLspFinishSignupForm() {
    $('.lsp-signup-fields').addClass('hide'),
    $('.signup-or-separator.lsp-signup-box').addClass('hide'),
    $('.social-circles').addClass('hide'),
    $('.generic-tos').addClass('hide'),
    $('.lsp-finish-signup-fields').removeClass('hide'),
    $('input[name="user[email]"]').rules('remove'),
    $('input[name="user[national_number]"]').rules('remove'),
    $('input[name="user[verification_code]"]').rules('remove'),
    $('input[name="user[password]"]').rules('remove');
  }

  verifyMobileConfirmationCode() {
    const e = this,
      t = '/users/verify_mobile_confirmation_code',
      n = $('#inputConfirmationCode input').val().replace(/\D/g, ''),
      r = {
        phone_number: this.getPhoneNumberInput($('.signup-form-phone')),
        verification_code: n,
      },
      o = this;
    n ? 4 !== n.length ? this.showError(h.default.t('phone_number_widget.verification_code_four_digits')) : (this.clearErrorMessage(),
    $.post(t, r, (e) => {
      e.success ? o.showLspFinishSignupForm() : o.showErrorMessage(e.message);
    }).fail(() => {
      e.showErrorMessage(h.default.t('user.login.generic_error'));
    })) : this.showError(h.default.t('phone_number_widget.verify_validation_error'));
  }

  checkEmailAlreadyInUse() {
    const e = $('#signin_email').val().trim(),
      t = {
        type: 'email',
        email: e,
        _validate_only: true,
        _format: 'for_validate_only',
      };
    this.clearErrorMessage();
    const n = this;
    c.default.post('/v2/accounts', {
      data: t,
      contentType: 'application/json',
      success: (e) => {
        e.account.account_exists ? n.showErrorMessage(h.default.t('validation.failure.email_in_use')) : n.showLspFinishSignupForm();
      },
      error: () => {
        n.showErrorMessage(h.default.t('user.login.generic_error'));
      },
    });
  }

  initLspSignup() {
    const e = this;
    this.initPasswordStrengthCheck('lsp-signup-fields');
    const t = $('.signup-form-lsp');
    this.setLspSignupButtonStateForEmail(),
    this.setLspSignupButtonStateForPhone(),
    this.setGetSmsCodeButtonState(),
    this.setLspFinishSignupButtonState(),
    t.find('.use-phone-instead').on('click', function click(t) {
      e.trackSignupLoginMethodChange('email', 'phone'),
      t.preventDefault(),
      e.clearErrorMessage(),
      $('.email-signup-header').addClass('hide'),
      $('#inputEmail').addClass('hide'),
      $('.phone-signup-header').removeClass('hide'),
      $('.phone-number-signup-form-fields').removeClass('hide'),
      $('.phone-verification-code').removeClass('hide'),
      $('.signup-form-lsp input[name="from"]').val('phone_signup'),
      e.setLspSignupButtonStateForPhone();
    }),
    t.find('.use-email-instead').on('click', function click(t) {
      e.trackSignupLoginMethodChange('phone', 'email'),
      t.preventDefault(),
      e.clearErrorMessage(),
      $('.phone-signup-header').addClass('hide'),
      $('.phone-number-signup-form-fields').addClass('hide'),
      $('.phone-verification-code').addClass('hide'),
      $('.email-signup-header').removeClass('hide'),
      $('#inputEmail').removeClass('hide'),
      $('.signup-form-lsp input[name="from"]').val('email_signup'),
      e.setLspSignupButtonStateForEmail();
    }),
    this.initCountrySelector(t, 'signup'),
    $('.lsp-get-sms-code').on('click', function click(t) {
      t.preventDefault(),
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number',
          operation: 'submit',
        },
      }),
      e.submitPhoneNumberAndShowConfirmationForm();
    }),
    $('.lsp-signup-submit').on('click', function click(t) {
      t.preventDefault();
      const n = $('input[name="from"]').val(),
        r = $('.signup-form-lsp').validate(),
        o = true,
        i = true,
        s = true;
      'email_signup' === n ? o = r.element('input[name="user[email]"]') : 'phone_signup' === n && (i = r.element('input[name="user[national_number]"]'),
      s = r.element('input[name="user[verification_code]"]'));
      const u = r.element('input[name="user[password]"]');
      o && i && s && u && ('phone_signup' === n ? e.verifyMobileConfirmationCode() : 'email_signup' === n && e.checkEmailAlreadyInUse());
    });
  }

  initOauthPopupListeners() {
    function e(e, t, n) {
      if (e.closed && clearInterval(t),
      (0, y.default)('oauth_popup')) {
        const r = {};
        try {
          r = JSON.parse((0, y.default)('oauth_popup'));
        } catch (n) {
          e.close(),
          clearInterval(t),
          (0, y.default)('oauth_popup', null, {
            path: '/',
          }),
          this.showErrorMessage(h.default.t('user.login.generic_error'));
        }
        r.message && (r.message = r.message.replace(/\+/g, ' ')),
        r.close_window && (T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            provider: n,
            sub_event: 'popup_closed',
            flow: r.flow,
            success: r.sucess,
          },
        }),
        e.close(),
        clearInterval(t),
        this.handleAuthResponse(r),
        (0, y.default)('oauth_popup', null, {
          path: '/',
        }));
      }
    }
    function t(t) {
      const n = this;
      if (t.preventDefault(),
      this.ensureTOSCheckboxIsChecked()) {
        const r = undefined,
          o = undefined,
          i = undefined,
          s = $(t.currentTarget).parents('form:first'),
          u = String(s.attr('action')) + '&oauth_popup=true',
          l = '/oauth/popup_form?url=' + String(encodeURIComponent(u));
        s.hasClass('js-facebook-auth') ? (i = 'Facebook',
        r = 580,
        o = 400) : (i = 'Google',
        r = 500,
        o = 600);
        const c = (0, W.default)(l, 'Signup', r, o),
        d = () => {
          const e = c.window.document.getElementById('oauth_form');
          null == e ? (c.close(),
          s.submit()) : e.submit();
        };
        c.addEventListener ? c.addEventListener('load', d, false) : c.attachEvent && c.attachEvent('onload', d, false),
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            provider: i,
            sub_event: 'popup_open',
          },
        });
        const f = setInterval(() => {
          e.call(n, c, f, i);
        }, 200);
      }
    }
    const n = window.location.search,
      r = E.default.parse(n.split('?')[1]);
    (r.oauth_popup_enabled || O.default.getBootstrap('oauth_popup')) && $('.js-google-auth, .js-facebook-auth').on('click', t.bind(this));
  }

  getTOSCheckbox() {
    return $('#tos-mandatory-checkbox');
  }

  getTOSCheckboxLabel() {
    return this.getTOSCheckbox().next('label');
  }

  ensureTOSCheckboxIsChecked() {
    const e = this.getTOSCheckbox();
    return !(e.length && !e.prop('checked')) || (this.getTOSCheckboxLabel().addClass('tos-checkbox-error'),
    false);
  }

  handleAuthResponse(e, t) {
    this.clearErrorMessage(),
    e.success && e.ask_alipay_linking ? this.handleAlipayAccountLinking(e, t) : e.data && e.data.redirect ? window.location.replace(e.data.redirect) : e.data && e.data.otp ? _.default.emit('otp-modal:open') : e.data && e.data.suspended_state_redirect ? window.location.replace(e.data.suspended_state_redirect) : e.data && e.data.underage_user ? (_.default.emit('signup-login-modals:close'),
    this.showUnderageUserModal()) : e.success ? this.handleAuthResponseSuccess(e) : this.showErrorMessage(e.message);
  }

  handleAuthResponseSuccess(e) {
    const t = this;
    _.default.emit('signup-login-modals:close');
    const n = () => {
      t.onFinishedFlow && r(t.onFinishedFlow);
    };
    if (e.show_remember_browser)
      return void this.showRememberBrowserModal().done(() => {
        t.afterAjaxSuccess(),
        n();
      });
    const o = () => {
      e.signup_survey_question ? t.startSignupSurveyFlow(e.signup_survey_question, n) : n();
    },
    i = () => {
      e.account_activation_flow ? r(() => {
        return t.startAccountActivationFlow(o);
      }) : o();
    },
    a = () => {
      e.show_business_referral_info_modal ? r(() => {
        (0, z.launchReferralRewardInformationModal)().then(i);
      }) : i();
    },
    s = () => {
      t.prioritizedCallbackReturningPromise ? t.prioritizedCallbackReturningPromise().then(() => {
        a();
      }) : a();
    },
    l = () => {
      e.show_community_commitment || (0, b.default)('force_commitment') ? (u.default.reset(),
      t.startCommunityCommitmentFlow(() => {
        t.afterAjaxSuccess(),
        s();
      })) : (t.afterAjaxSuccess(),
      s());
    };
    l();
  }

  handleAlipayAccountLinking(e, t) {
    const n = this;
    e.ask_alipay_linking = false,
    $('.alipay-account-linking-login img').attr('src', e.data.profile_pic_url),
    $('.alipay-account-linking-login button').on('click', () => {
      $('.alipay-account-linking-login').addClass('loading'),
      $.post('/users/alipay_account_linking_related_operations', {
        link_account: true,
      }, (r) => {
        $('.alipay-account-linking-login').removeClass('loading'),
        r.success ? n.handleAuthResponse(e, t) : n.showErrorMessage(r.message);
      }, 'json').fail(() => {
        $('.alipay-account-linking-login').removeClass('loading'),
        n.showErrorMessage(h.default.t('user.login.generic_error'));
      });
    }),
    $('.alipay-account-linking-login a').on('click', () => {
      n.clearErrorMessage(),
      n.handleAuthResponse(e, t);
    }),
    $('.alipay-account-linking-login').removeClass('hide'),
    $('.login-modal-content-js').addClass('hide');
  }

  initEmailSignup() {
    const e = this;
    this.initPasswordStrengthCheck('signup-form-fields');
    const t = $('.signup-form');
    t.find('.other-signup-options').on('click', () => {
      e.trackSignupLoginMethodChange('email', 'more_options'),
      e.clearErrorMessage(),
      e.showCreationOptions(),
      $('.social-buttons').removeClass('hide'),
      $('#signup-modal-content .signup-or-separator').removeClass('hide'),
      $('.signup-form-fields').addClass('hide'),
      $('#tos_outside').removeClass('hide');
    }),
    t.find('.use-phone-instead').on('click', () => {
      e.trackSignupLoginMethodChange('email', 'phone'),
      e.clearErrorMessage(),
      $('.signup-form-fields').addClass('hide'),
      $('.phone-signup-form').removeClass('hide');
    }),
    this.showEmailSignupForm();
  }

  showEmailSignupForm() {
    this.hideCreationOptions(),
    $('.social-buttons').addClass('hide'),
    $('.signup-form-fields').removeClass('hide'),
    $('#tos_outside').addClass('hide'),
    this.hasPhoneNumberSignup() ? $('#signup-modal-content .signup-or-separator').addClass('hide') : $('.social-links').removeClass('hide'),
    $('.contextual-signup-form-header-container').hide();
  }

  hasPhoneNumberSignup() {
    return $('.signup-form-phone').length > 0;
  }

  initConfirmationCodeInputEvent(e) {
    e.find('.confirmation-code-textarea').on('input', (t) => {
      const n = t.currentTarget;
      4 === n.value.length && ($(n).parent('.control-group').addClass('loading'),
      e.submit());
    });
  }

  showCreationOptions() {
    $('.create-using-email').removeClass('hide'),
    $('.create-using-phone-number').removeClass('hide'),
    $('.create-using-facebook').removeClass('hide'),
    $('.create-using-google').removeClass('hide');
  }

  hideCreationOptions() {
    $('.create-using-email').addClass('hide'),
    $('.create-using-phone-number').addClass('hide'),
    $('.create-using-facebook').addClass('hide'),
    $('.create-using-google').addClass('hide');
  }

  initPhoneNumberSignup() {
    const e = this,
      t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
    this.initPasswordStrengthCheck('phone-signup-form');
    const n = $('.signup-form-phone');
    this.initCountrySelector(n, 'signup'),
    n.find('.other-signup-options').on('click', (t) => {
      e.trackSignupLoginMethodChange('phone', 'more_options'),
      t.preventDefault(),
      e.clearErrorMessage(),
      e.showCreationOptions(),
      $('.social-buttons').removeClass('hide'),
      $('#signup-modal-content .signup-or-separator').removeClass('hide'),
      $('.phone-signup-form').addClass('hide'),
      $('#tos_outside').removeClass('hide');
    }),
    n.find('.use-email-instead').on('click', (t) => {
      e.trackSignupLoginMethodChange('phone', 'email'),
      t.preventDefault(),
      e.clearErrorMessage(),
      $('.phone-signup-form').addClass('hide'),
      $('#signup-modal-content .signup-or-separator').removeClass('hide'),
      e.initEmailSignup();
    }),
    $('.finished-phone-signup-fields').on('click', (t) => {
      t.preventDefault(),
      $('#inputConfirmationCode input').rules('remove'),
      $('.js-login-footer').addClass('hide'),
      n.valid() && (T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number',
          operation: 'submit',
        },
      }),
      e.submitPhoneNumberAndShowConfirmationForm());
    }),
    $('.phone-verification-field .change-phone-number').on('click', () => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: String(e.page) + '_change_phone_number',
          operation: 'submit',
        },
      }),
      e.clearErrorMessage(),
      $('.phone-number-signup-form-fields').removeClass('hide'),
      $('.js-login-footer').removeClass('hide'),
      $('.phone-verification-field').addClass('hide');
    }),
    this.initConfirmationCodeInputEvent(n),
    this.hideCreationOptions(),
    $('.social-buttons').addClass('hide'),
    $('#signup-modal-content .signup-or-separator').addClass('hide'),
    $('.phone-signup-form').removeClass('hide'),
    $('#tos_outside').addClass('hide'),
    $('.contextual-signup-form-header-container').hide(),
    t && $('.phone-signup-form input[type!="hidden"]').first().focus();
  }

  submitPhoneNumberAndShowConfirmationForm() {
    const e = this;
    $.post('/users/send_mobile_confirmation_code', {
      phone_number: this.getPhoneNumberInput($('.signup-form-phone')),
    }, (t) => {
      t.success ? (T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number_success',
          operation: 'submit',
        },
      }),
      $('.mobile-national-number').html(t.national_number),
      $('.phone-number-signup-form-fields input[name="user[phone]"]').val(t.international_number),
      e.clearErrorMessage(),
      $('#inputConfirmationCode input').rules('add', D.validationRules.phone_confirmation_code.verification_code),
      $('.lsp-get-sms-code').length ? ($('.get-sms-code-text').addClass('hide'),
      $('.resend-code-text').removeClass('hide')) : ($('.phone-number-signup-form-fields').addClass('hide'),
      $('.phone-verification-field').removeClass('hide'),
      $('.phone-verification-field input[type!="hidden"]').first().focus())) : (T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number_failure',
          operation: 'submit',
        },
      }),
      e.showErrorMessage(t.message));
    }, 'json').fail(() => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number_failure',
          operation: 'submit',
        },
      }),
      e.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  trackSignupLoginMethodChange(e, t) {
    T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: 'change_' + String(this.page) + '_method',
        operation: 'click',
        from_method: e,
        to_method: t,
      },
    });
  }

  initLogin() {
    const e = this,
      t = $('.login-form-phone'),
      n = $('.login-form');
    n.find('.use-phone-instead').on('click', () => {
      e.trackSignupLoginMethodChange('email', 'phone'),
      e.clearErrorMessage(),
      n.addClass('hide'),
      t.removeClass('hide');
    }),
    $('#signin_password').on('input', () => {
      e.clearErrorMessage();
    }),
    this.initCountrySelector(t, 'login'),
    t.find('.use-email-instead').on('click', (r) => {
      e.trackSignupLoginMethodChange('phone', 'email'),
      r.preventDefault(),
      e.clearErrorMessage(),
      t.addClass('hide'),
      n.removeClass('hide');
    }),
    t.find('.phone-login-button').on('click', () => {
      t.valid() && (t.find('input[name="phone"]').val(e.getPhoneNumberInput(t)),
      t.submit());
    });
  }

  initAmexSignup() {
    const e = this,
      t = f.default.get('amex_checkout'),
      n = t.env,
      r = t.client_id,
      o = t.client_key,
      i = '';
    '1' === (0, V.default)().amextest && (0, y.default)('amextest', true),
    $('#amex-express-checkout').on('click', () => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'signup_attempt_amex',
        },
      });
    }),
    window.amexCheckoutHandler = (t) => {
      $('#signup-modal-content').addClass('loading'),
      $.ajax({
        url: c.default.getUrl('/v2/amex_checkout_identities'),
        method: 'POST',
        data: JSON.stringify(t),
        success: (t) => {
          $('#signup-modal-content').removeClass('loading'),
          e.showEmailSignupForm(),
          $('.email-signup-header').hide(),
          $('#signup-modal-content .signup-or-separator').hide(),
          $('.social-links').hide();
          const n = t.amex_checkout_identity;
          $('.signup-form input[name="user[email]"]').val(n.email),
          $('.signup-form input[name="user[first_name]"]').val(n.first_name),
          $('.signup-form input[name="user[last_name]"]').val(n.last_name),
          $('.signup-form select[name="user[birthday_year]"]').val(n.birthday_year),
          $('.signup-form select[name="user[birthday_month]"]').val(n.birthday_month),
          $('.signup-form select[name="user[birthday_day]"]').val(n.birthday_day),
          $('.signup-form').append("<input type='hidden' name='amex_profile_token' value='" + String(n.amex_profile_token) + "'>"),
          $('.signup-form input[name="user[password]"]').addClass('invalid'),
          $('.signup-form input[name="user[password]"]').val(''),
          $('.amex-signup-header').removeClass('hide');
        },
        error: () => {
          $('#signup-modal-content').removeClass('loading'),
          window.alert(h.default.t('amex.signup.could_not_connect'));
        },
      });
    },
    i += '<amex:init client_id="' + String(r) + '" theme="responsive" action="sign-up" locale="en_US" env="' + String(n) + '" disable_btn="false" button_color="plain" callback="amexCheckoutHandler" />',
    i += '<amex:buy context_id="signup" key_name="client_key" key_value="' + String(o) + '" />',
    i += '<script src="https://icm.aexp-static.com/Internet/IMDC/US_en/RegisteredCard/AmexExpressCheckout/js/AmexExpressCheckout.js"></script>',
    $('#amex-express-checkout').append(i);
  }

  initValidation(e) {
    jQuery.validator.addMethod('forbiddenContentCheck', function method(e, t) {
      if (this.optional(t) || null === e)
        return true;
      const n = $(t).parents('.control-group').siblings(),
        r = n.find('input[name="user[email]"]').val(),
        o = n.find('input[name="user[first_name]"]').val(),
        i = n.find('input[name="user[last_name]"]').val(),
        s = n.find('input[name="user[national_number]"]').val(),
        u = e.toLowerCase();
      return !(i && u.includes(i.toLowerCase()) || o && u.includes(o.toLowerCase()) || s && u.includes(s.toLowerCase()) || r && u.includes(r.split('@')[0].toLowerCase()));
    }),
    jQuery.validator.addMethod('strengthCheck', function method(e, t) {
      if (this.optional(t))
        return true;
      const n = x.default.test(null, e);
      return n.score >= 35;
    }),
    jQuery.validator.addMethod('checkValidPhoneNumber', function method(e, t) {
      return !(!this.optional(t) && null !== e) || !!/^[0-9 ().,+-]*$/.test(e) && (e = e.replace(/\D/g, ''),
      e.length >= 6);
    });
    const t = $('.login-form'),
      n = $('.login-form-phone'),
      r = $('.signup-form'),
      o = $('.signup-form-phone'),
      i = $('.signup-form-lsp'),
      s = $('.signup-form-social'),
      u = $('#oauth2_service').attr('value');
    t.validate($.extend({}, this.getValidationOptions(t, 'email', e), {
      rules: D.validationRules.email_login,
    }, {
      messages: (0, D.localizedMessages)(),
    })),
    n.validate($.extend({}, this.getValidationOptions(n, 'phone', e), {
      rules: D.validationRules.phone_login,
    }, {
      messages: (0, D.localizedMessages)(),
    })),
    r.validate($.extend({}, this.getValidationOptions(r, 'email', e), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.email_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    })),
    o.validate($.extend({}, this.getValidationOptions(o, 'phone', e), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.phone_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    })),
    i.validate($.extend({}, this.getValidationOptions(i, 'lsp', e), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.lsp_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    })),
    s.validate($.extend({}, this.getValidationOptions(s, '' + String(u), e), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.email_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));
  }

  getSubEvent(e) {
    const t = String(this.page) + '_attempt_' + String(e);
    if ('lsp' === e) {
      const n = $('input[name="from"]').val();
      'email_signup' === n ? t = 'signup_attempt_email' : 'phone_signup' === n && (t = 'signup_attempt_phone');
    }
    return t;
  }

  getValidationOptions(e, t, n) {
    const r = this,
      o = e.find('[data-hook="password-strength"]');
    return Object.assign({}, D.validationOptions, {
      submitHandler: (e) => {
        const i = r.getSubEvent(t);
        T.default[r.inModal ? 'logEvent' : 'queueEvent']({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: i,
            operation: 'click',
            status: 'valid',
            remember_me: $('#remember_me2:checked').length > 0,
            in_modal: r.inModal,
            datadog_key: 'signup_login.valid',
            datadog_count: 1,
            datadog_tags: ['sub_event:' + String(i) + ',platform:web'],
          },
        }),
        r.disableSubmit(e),
        r.showLoadingStateForSubmit(e),
        o.length && o.addClass('hide'),
        n ? r.ajaxSubmitFunction(e) : e.submit();
      },
      invalidHandler: (e, n) => {
        if (n.numberOfInvalids() > 0) {
          const o = r.getSubEvent(t);
          T.default.logEvent({
            event_name: 'signup_login_flow',
            event_data: {
              sub_event: o,
              operation: 'click',
              status: 'invalid',
              reason: n.invalid,
              remember_me: $('#remember_me2:checked').length > 0,
              in_modal: r.inModal,
              datadog_key: 'signup_login.invalid',
              datadog_count: 1,
              datadog_tags: ['sub_event:' + String(o) + ',platform:web'],
            },
          });
        }
      },
    }, this.getErrorPlacement(o));
  }

  fixSignupKeys() {
    const e = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {},
      t = {};
    return Object.entries(e).forEach((e) => {
      const n = babelHelpers.slicedToArray(e, 2),
        r = n[0],
        o = n[1];
      t['user[' + String(r) + ']'] = o;
    }),
    t;
  }

  trackFacebookEvent(e, t, n) {
    const r = u.default.current(),
      o = this;
    T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: String(o.page) + '_attempt_facebook',
        operation: 'third_party_backend',
        step: t,
        in_modal: n,
        fb_logged_in: (0, y.default)('fbs'),
        fb_connected: r.facebook_connected,
        fb_publish_permission: r.og_publish,
        fb_perms: Airbnb.FACEBOOK_PERMS,
        status: status,
      },
      queue: e,
    }),
    'cancelled_perm_flow' === t && T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: String(o.page) + '_response_facebook',
        operation: 'frontend',
        response: 'failure',
        failure_reason: 'cancelled_perm_flow',
      },
    });
  }

  initFacebookEvents() {
    const e = this,
      t = window.ga,
      n = $('#facebook_form'),
      r = n.hasClass('in_modal'),
      o = (0, y.default)('fbs'),
      i = undefined,
      s = (a) => {
        const s = '/signup_login' === window.location.pathname || '/login' === window.location.pathname;
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: String(e.page) + '_attempt_facebook',
            operation: 'click',
          },
          queue: s,
        }),
        r && 'not_authorized' === o ? e.trackFacebookEvent(s, 'start_perm_flow', true) : ('not_authorized' === o && e.trackFacebookEvent(s, 'start_perm_flow_fb_cookie', false),
        e.trackFacebookEvent(s, 'start_perm_flow', false)),
        t('send', 'event', 'Authenticate', 'FacebookClick', 'Signup/Login'),
        i = (o) => {
          o.authResponse ? (t('send', 'event', 'Authenticate', 'FacebookLogin', 'Signup/Login'),
          r && (0, y.default)('fbs') ? e.trackFacebookEvent(false, 'finished_perm_flow', true) : e.trackFacebookEvent(false, 'finished_perm_flow', false),
          n.submit(),
          e.disableSubmit()) : (t('send', 'event', 'Authenticate', 'FacebookDeny', 'Signup/Login'),
          e.trackFacebookEvent(false, 'cancelled_perm_flow', false));
        },
        window.FB.login(i, {
          scope: Airbnb.FACEBOOK_PERMS,
        }),
        a.preventDefault();
      };
    $('.fb-button').click(s);
  }

  initForgotPassword(e) {
    const t = this;
    return e ? void $(document).on('click', '.forgot-password', (e) => {
      e.preventDefault();
      const n = $(e.currentTarget),
        r = n.data('from');
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'nav_forgot_password_' + String(r),
          operation: 'click',
          button_text: n.text(),
        },
      });
      const o = n.attr('href'),
        i = $('input[name=email]').val();
      undefined === i && (i = $('.auth_merge_email').text()),
      i.length && (o = String(o.split('?')[0]) + '?' + String(E.default.stringify({
        email: i,
      }))),
      $.get(o, {
        from: r,
      }, (e) => {
        const n = $('#' + String(t.page) + '-modal-content');
        n.html($.trim(e));
        const r = n.find('form');
        r.find('input').placeholder(),
        t.initForgotPasswordValidation(),
        t.initForgotPasswordEvents();
      });
    }) : void $('.forgot_password_container').find('input').placeholder();
  }

  initForgotPasswordEvents() {
    const e = this,
      t = {
        includeTips: true,
      },
      n = new j.default();
    n.check('[data-hook="new_password"]', t);
    const r = $('.forgot-password-phone'),
      o = $('.forgot-password-email'),
      i = $('.submit-confirmation-code');
    this.initCountrySelector(r, 'forgot_password'),
    r.find('.use-email-instead').on('click', (t) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_method_change',
          operation: 'click',
          from_method: 'phone',
          to_method: 'email',
        },
      }),
      t.preventDefault(),
      e.clearErrorMessage(),
      r.addClass('hide'),
      o.removeClass('hide');
    }),
    o.find('.use-phone-instead').on('click', (t) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_method_change',
          operation: 'click',
          from_method: 'email',
          to_method: 'phone',
        },
      }),
      t.preventDefault(),
      e.clearErrorMessage(),
      o.addClass('hide'),
      r.removeClass('hide');
    }),
    i.find('.change-phone-number').on('click', (t) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_change_phone_number',
          operation: 'click',
        },
      }),
      t.preventDefault(),
      e.clearErrorMessage(),
      i.addClass('hide'),
      r.removeClass('hide');
    }),
    $('.resend-confirmation-code').on('click', (t) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_resend_sms',
          operation: 'click',
        },
      }),
      t.preventDefault(),
      e.submitForgotPasswordPhone(r);
    }),
    this.initConfirmationCodeInputEvent(i);
  }

  initForgotPasswordValidation() {
    jQuery.validator.addMethod('checkConfirmPassword', (e) => {
      return null === e || $('.submit-new-password input[name="password"]').val() === e;
    }),
    $('.forgot-password-email').validate($.extend({}, this.getForgotPasswordValidationOptions('email'), {
      rules: D.validationRules.forgot_password_email,
    }, {
      messages: (0, D.localizedMessages)(),
    })),
    $('.forgot-password-phone').validate($.extend({}, this.getForgotPasswordValidationOptions('phone'), {
      rules: this.fixSignupKeys(D.validationRules.forgot_password_phone),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    })),
    $('.submit-confirmation-code').validate($.extend({}, this.getForgotPasswordValidationOptions('phone_confirmation'), {
      rules: D.validationRules.phone_confirmation_code,
    }, {
      messages: (0, D.localizedMessages)(),
    })),
    $('.submit-new-password').validate($.extend({}, this.getForgotPasswordValidationOptions('reset_password'), {
      rules: D.validationRules.reset_password,
    }, {
      messages: (0, D.localizedMessages)(),
    }));
  }

  submitForgotPasswordEmail(e) {
    $.post(e.attr('action'), e.serialize(), () => {
      window.location.reload();
    }, 'json');
  }

  submitForgotPasswordPhone(e) {
    const t = this;
    $.post(e.attr('action'), {
      phone_number: this.getPhoneNumberInput(e),
      check_phone_number_exist: true,
      check_login_identifier: true,
    }, (e) => {
      e.success ? ($('.submit-confirmation-code .mobile-national-number').html(e.national_number),
      $('.submit-confirmation-code input[name="phone_number"]').val(e.international_number),
      $('.submit-new-password input[name="phone_number"]').val(e.international_number),
      t.clearErrorMessage(),
      $('.forgot-password-phone').addClass('hide'),
      $('.submit-confirmation-code').removeClass('hide'),
      $('.submit-confirmation-code input[type!="hidden"]').first().focus()) : t.showErrorMessage(e.message);
    }, 'json').fail(() => {
      t.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  submitForgotPasswordPhoneConfirmation(e) {
    const t = this;
    $.post(e.attr('action'), e.serialize(), (e) => {
      e.success ? ($('.submit-new-password input[name="verification_code"]').val($('.submit-confirmation-code input[name="verification_code"]').val()),
      t.clearErrorMessage(),
      $('.submit-confirmation-code').addClass('hide'),
      t.inAlipayApp() && t.handleForgotPasswordAlipayAccountLinking(e.profile_pic_url),
      $('.submit-new-password').removeClass('hide'),
      $('.submit-new-password input[type!="hidden"]').first().focus()) : t.showErrorMessage(e.message),
      $('.submit-confirmation-code .control-group').removeClass('loading');
    }, 'json').fail(() => {
      t.showErrorMessage(h.default.t('user.login.generic_error')),
      $('.submit-confirmation-code .control-group').removeClass('loading');
    });
  }

  submitForgotPasswordReset(e) {
    const t = this;
    $.post(e.attr('action'), e.serialize(), (e) => {
      e.success ? e.redirect_url ? window.location.replace(e.redirect_url) : window.location.reload() : (t.showErrorMessage(e.message),
      $('.reset-password-submit').removeClass('disabled'));
    }, 'json').fail(() => {
      t.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  handleForgotPasswordAlipayAccountLinking(e) {
    const t = this;
    $('.alipay-account-linking-fp img').attr('src', e),
    $('.alipay-account-linking-fp button').on('click', () => {
      $('.alipay-account-linking-fp').addClass('loading'),
      $.post('/users/alipay_account_linking_related_operations', {
        phone_number: $('.submit-new-password input[name="phone_number"]').val(),
        redirect_url: $('.submit-new-password input[name="redirect_url"]').val(),
      }, (e) => {
        $('.alipay-account-linking-fp').removeClass('loading'),
        e.success ? e.redirect_url ? window.location.replace(e.redirect_url) : window.location.reload() : t.showErrorMessage(e.message);
      }, 'json').fail(() => {
        $('.alipay-account-linking-fp').removeClass('loading'),
        t.showErrorMessage(h.default.t('user.login.generic_error'));
      });
    }),
    $('.alipay-account-linking-fp a').on('click', () => {
      t.clearErrorMessage(),
      t.skipForgotPasswordAlipayAccountLinking();
    }),
    $('.alipay-account-linking-fp').removeClass('hide'),
    $('.forgot-password-panel-js').addClass('hide'),
    $('.forgot_password_container').addClass('hide');
  }

  skipForgotPasswordAlipayAccountLinking() {
    $('.alipay-account-linking-fp').addClass('hide'),
    $('.forgot-password-panel-js').removeClass('hide'),
    $('.forgot_password_container').removeClass('hide');
  }

  getForgotPasswordValidationOptions(e) {
    const t = this;
    return Object.assign({}, D.validationOptions, {
      submitHandler: (n) => {
        T.default.queueEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'forgot_password_' + String(e),
            operation: 'submit',
            status: 'valid',
          },
        }),
        t.disableSubmit(n);
        const r = $(n);
        'email' === e ? t.submitForgotPasswordEmail(r) : 'phone' === e ? t.submitForgotPasswordPhone(r) : 'phone_confirmation' === e ? t.submitForgotPasswordPhoneConfirmation(r) : 'reset_password' === e && t.submitForgotPasswordReset(r);
      },
      invalidHandler: (t, n) => {
        n.numberOfInvalids() > 0 && T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'forgot_password_' + String(e),
            operation: 'submit',
            status: 'invalid',
            reason: n.invalid,
          },
        });
      },
    }, this.getErrorPlacement($('.submit-new-password .password-strength')));
  }

  getErrorPlacement(e) {
    const t = this;
    return {
      errorPlacement: (n, r) => {
        const o = r.parents('.control-group');
        o.addClass('invalid'),
        n.prependTo(o),
        r.one('focus', () => {
          t.clearError(o);
        }),
        e.length && e.addClass('hide');
      },
    };
  }

  inAlipayApp() {
    return $('.alipay-account-linking-fp, .alipay-account-linking-login').length > 0;
  }

  disableSubmit(e) {
    this.shouldDisableSubmitButton() ? $('[type="submit"]', e).prop('disabled', true) : $('[type="submit"]', e).addClass('disabled');
  }

  enableSubmit(e) {
    this.shouldDisableSubmitButton() ? $('[type="submit"]', e).prop('disabled', false) : $('[type="submit"]', e).removeClass('disabled');
  }

  shouldDisableSubmitButton() {
    return P.default.deliverExperiment('signup_form_disable_submit', {
      control: () => {
        return false;
      },
      disable_button: () => {
        return true;
      },
      treatment_unknown: () => {
        return false;
      },
    });
  }

  showLoadingStateForSubmit(e) {
    $('[type="submit"]', e).addClass('loading');
  }

  removeLoadingStateForSubmit(e) {
    $('[type="submit"]', e).removeClass('loading');
  }

  autoSelectOption(e, t) {
    const n = $(e).val(t);
    n.prop('selected', 'selected');
  }

  defaultBirthdayYear() {
    const e = (new Date()).getFullYear();
    return e - 18;
  }

  showUnderageUserModal() {
    const e = new q.default();
    return e.perform();
  }

  showRememberBrowserModal() {
    const e = new N.default();
    return e.perform();
  }

  afterAjaxSuccess() {
    this.broadcastLogin(),
    (0, K.reportLoginEventToExternalPartners)();
  }

  ajaxSubmitFunction(e) {
    const t = this,
      n = $(e),
      r = {
        data: n.serialize(),
      };
    Airbnb.Airlock.post(n.attr('action'), r).then((e) => {
      t.handleAuthResponse(e, n.serializeObject()),
      t.removeLoadingStateForSubmit(n),
      t.enableSubmit(n),
      n.find('.control-group').removeClass('loading');
    }, (e) => {
      t.removeLoadingStateForSubmit(n),
      t.enableSubmit(n);
      const r = {};
      try {
        r = JSON.parse(e.responseText);
      } catch (e) {}
      n.find('.control-group').removeClass('loading'),
      r && r.message ? t.showErrorMessage(r.message) : t.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  startSignupSurveyFlow(e, t) {
    (0, X.showSignupSurvey)(e).then(() => {
      t();
    });
  }

  startAccountActivationFlow(e) {
    (0, B.default)().then(() => {
      e();
    });
  }

  startCommunityCommitmentFlow(e) {
    (0, J.showCommunityCommitmentModalBeforeProceeding)({
      isInSignupFlow: true,
    }).then((t) => {
      t && t.canceledAccount || e();
    }).catch((t) => {
      e(),
      T.default.queueEvent({
        event_name: 'community_commitment',
        event_data: {
          error: t,
          operation: 'unexpected_error',
        },
      });
    });
  }

  getErrorContainer() {
    return 'forgot-password' === this.page ? $('.forgot-password-notice') : $('#' + String(this.page) + '-modal-content .notice');
  }

  showErrorMessage(e) {
    undefined === e && (e = h.default.t('user.login.generic_error')),
    this.getErrorContainer().html('<i class="icon icon-alert-alt alert-icon"></i>' + String(e)).show();
  }

  clearErrorMessage() {
    this.getErrorContainer().hide();
  }

  initFacebookSignup() {
    const e = this,
      t = $('#facebook_form.in_modal');
    t.submit((n) => {
      n.preventDefault(),
      e.ajaxSubmitFunction(t);
    });
  }

  clearError(e) {
    e.removeClass('invalid'),
    e.find('label.invalid').remove();
  }

  addLoginCallback(e) {
    _.default.removeListener('login', e),
    _.default.on('login', e);
  }

  addLogoutCallback(e) {
    _.default.removeListener('logout', e),
    _.default.on('logout', e);
  }

  addFlow(e) {
    this.flow = e,
    (0, y.default)('signup_flow', e, {
      path: '/',
    });
  }

  getPhoneNumberInput(e) {
    return e.find('.country-code-show :selected').val() + e.find('input[name*="national_number"]').val().replace(/\D/g, '');
  }

  initCountrySelector(e, t) {
    e.find('.phone-country-select__names').on('change', (n) => {
      const r = e.find('.country-code-show'),
        o = r.find(':selected').val(),
        i = $(n.currentTarget).find(':selected').data('prefix');
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: String(t) + '_country_code_change',
          operation: 'click',
          from_code: o,
          to_code: i,
        },
      }),
      r.html('<option value="' + String(i) + '" selected="selected">+' + String(i) + '</option>');
    });
  }

  initSignInOutListeners() {
    _.default.on('login', this.onLogin),
    _.default.on('logout', this.onLogout),
    'undefined' != typeof window && $(window).on('storage', (e) => {
      'logged_in_event' === e.originalEvent.key && ('true' === e.originalEvent.newValue ? _.default.emit('login') : _.default.emit('logout'));
    });
  }

  clearOnLogout() {
    Airbnb.header.clearThumbnailUrl(),
    (0, b.default)('user_first_name', null),
    (0, b.default)('hash_user_id', null),
    (0, b.default)('modal_userpic_url', null),
    (0, b.default)('host_navbar_x_out', null),
    (0, b.default)('header_userpic_url', null);
  }

  doLogout() {
    T.default.queueEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: 'logout',
        operation: 'impression',
      },
    });
    const e = $('<form></form>');
    e.hide().attr({
      method: 'POST',
      action: '/logout',
    }),
    $(document.body).append(e),
    e.submit(),
    this.clearOnLogout(),
    this.broadcastLoggedInStatusToOtherTabs(false),
    _.default.emit('logout');
  }

  broadcastLogin(e) {
    _.default.emit('login', e),
    this.broadcastLoggedInStatusToOtherTabs(true);
  }

  onLogin() {
    u.default.reset(),
    T.default.addContext({
      user_id: u.default.current().id,
    }),
    Airbnb.header.personalizeHeader();
  }

  onLogout() {
    T.default.addContext({
      user_id: null,
    }),
    Airbnb.header.personalizeHeader(),
    L.default.launchLogout();
  }

  broadcastLoggedInStatusToOtherTabs(e) {
    window.localStorage && window.localStorage.setItem('logged_in_event', e);
  }

  trackInternalLinks(e) {
    'login' === e ? $('.link-to-signup-in-login').on('click', () => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'nav_signup',
          operation: 'click',
          origin: 'login-modal',
        },
      });
    }) : 'signup' === e && $('.link-to-login-in-signup').on('click', () => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'nav_login',
          operation: 'click',
          origin: 'signup-modal',
        },
      });
    });
  }
}

SignupLogin.loginCallbacks = [];
SignupLogin.logoutCallbacks = [];

export default SignupLogin;
