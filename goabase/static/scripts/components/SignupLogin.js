/* global Airbnb, babelHelpers */
/* eslint-disable class-methods-use-this, max-len */
import $ from 'jquery';
import qs from 'qs';

import eventEmitter from '../eventEmitter';

function n(e) {
  return e;
}

const s = n(476);
const u = babelHelpers.interopRequireDefault(s);
const l = n(7);
const c = babelHelpers.interopRequireDefault(l);
const d = n(4);
const f = babelHelpers.interopRequireDefault(d);
const p = n(147);
const h = babelHelpers.interopRequireDefault(p);
const m = n(39);
const b = babelHelpers.interopRequireDefault(m);
const g = n(42);
const y = babelHelpers.interopRequireDefault(g);
const k = n(26);
const T = babelHelpers.interopRequireDefault(k);
const S = n(37);
const P = babelHelpers.interopRequireDefault(S);
const C = n(6);
const O = babelHelpers.interopRequireDefault(C);
const D = n(697);
const M = n(698);
const x = babelHelpers.interopRequireDefault(M);
const R = n(699);
const j = babelHelpers.interopRequireDefault(R);
const A = n(700);
const N = babelHelpers.interopRequireDefault(A);
const I = n(701);
const L = babelHelpers.interopRequireDefault(I);
const H = n(713);
const q = babelHelpers.interopRequireDefault(H);
const F = n(714);
const B = babelHelpers.interopRequireDefault(F);
const U = n(712);
const G = babelHelpers.interopRequireDefault(U);
const z = n(716);
const Y = n(11);
const V = babelHelpers.interopRequireDefault(Y);
const W = babelHelpers.interopRequireDefault(n(722));
const K = n(710);
const X = n(723);
const J = n(744);
const Z = n(708);
const Q = babelHelpers.interopRequireDefault(Z);

function r(e) {
  u.default.isLoggedIn() ? e() : eventEmitter.once('login', e);
}

class SignupLogin {
  constructor() {
    this.initSignInOutListeners();
  }

  init(e) {
    const t = this;
    if (e) {
      t.page = e.page;
      t.inModal = !!e.inModal;
      t.initForgotPasswordCallbacks = !!e.initForgotPasswordCallbacks;
      t.onFinishedFlow = e.onFinishedFlow;
      t.prioritizedCallbackReturningPromise = e.prioritizedCallbackReturningPromise;
      t.shouldInitPhoneNumberSignup = e.shouldInitPhoneNumberSignup;
    }
    $('#signin_email').on('change', function change() {
      const e = $(this);
      e.val($.trim(e.val()));
    });
    if (!($('#otp').length > 0)) {
      const n = $('.signup.modal-content').length > 0 || t.inModal;
      this.initValidation(n);
      this.initFacebookEvents();
      this.initLogin();
      this.initForgotPassword(n);
      if (this.initForgotPasswordCallbacks) {
        this.initForgotPasswordValidation();
        this.initForgotPasswordEvents();
      }
      this.initFacebookSignup();
      this.initAmexSignup();
      (0, G.default)();
      this.initFieldSync();
      this.initLspSignup();
      this.initOauthPopupListeners();
      const r = this.getTOSCheckbox();
      if (r.length) {
        r.on('click', () => {
          t.getTOSCheckboxLabel().removeClass('tos-checkbox-error');
        });
      }
      $('.create-using-email').on('click', (e) => {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_email',
            operation: 'click',
          },
        });
        e.preventDefault();
        t.ensureTOSCheckboxIsChecked() && (r.length && (t.getTOSCheckboxLabel().remove(),
        r.remove()),
        t.initEmailSignup(),
        $('.signup-form-fields input[type!="hidden"]').first().focus());
      });
      $('.create-using-phone-number').on('click', (e) => {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_phone_number',
            operation: 'click',
          },
        });
        e.preventDefault();
        t.initPhoneNumberSignup();
        e.target.className.includes('pnr-email-default') && (t.initEmailSignup(),
        $('.phone-signup-form').addClass('hide'));
      });
      $('.btn-alipay.to-signup').on('click', () => {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            datadog_key: 'alipay.signup_login_flow',
            datadog_tags: ['section:alipay_prepare', `page:${f.default.get('controller_action_pair')}`, 'operation:click'],
            section: 'alipay_prepare',
            operation: 'click',
          },
        });
        $('.signup-panel-box').removeClass('hide');
        $('.alipay-signup-prepare-modal').addClass('hide');
        $('.phone-signup-form input[type!="hidden"]').first().focus();
      });
      if (t.shouldInitPhoneNumberSignup) {
        if (Q.default.inAlipaySignupFlowExperiment()) {
          t.initPhoneNumberSignup(false);
          $('.signup-panel-box').addClass('hide');
          $('.alipay-signup-prepare-modal').removeClass('hide');
          T.default.logEvent({
            event_name: 'signup_login_flow',
            event_data: {
              datadog_key: 'alipay.signup_login_flow',
              datadog_tags: ['section:alipay_prepare', `page:${f.default.get('controller_action_pair')}`, 'operation:impression'],
              section: 'alipay_prepare',
              operation: 'impression',
            },
          });
        } else {
          t.initPhoneNumberSignup();
        }
      }
      if (this.flow === 'lys-login-signup-redesign') {
        $('#user_birthday_year').one('focus', function focus() {
          const e = t.defaultBirthdayYear();
          t.autoSelectOption(this, e);
        });
      }
      $('[data-hook="password-strength"]').addClass('hide');
      t.trackInternalLinks(t.page);
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
    };
    const n = new j.default();
    n.check(`.${e} [data-hook="user_password"]`, t);
  }

  enableSubmitOnValidate(e, t) {
    let n = false;
    e.each(function each() {
      $(this).val() === '' && (n = true);
    });
    n ? t.prop('disabled', true) : t.prop('disabled', false);
  }

  setLspSignupButtonStateForEmail() {
    const e = this;
    const t = $('#signin_email, #signin_password');
    const n = $('.lsp-signup-submit');
    this.enableSubmitOnValidate(t, n);
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  setLspSignupButtonStateForPhone() {
    const e = this;
    const t = $('#signin_phone, #signin_password, .confirmation-code-textarea');
    const n = $('.lsp-signup-submit');
    this.enableSubmitOnValidate(t, n);
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  setLspFinishSignupButtonState() {
    const e = this;
    const t = $('#signup_first_name, #signup_last_name, #user_birthday_month, #user_birthday_day, #user_birthday_year');
    const n = $('.lsp-finish-signup-submit');
    this.enableSubmitOnValidate(t, n);
    t.change(() => {
      e.enableSubmitOnValidate(t, n);
    });
  }

  setGetSmsCodeButtonState() {
    const t = $('#signin_phone');
    const n = $('.lsp-get-sms-code');
    this.enableSubmitOnValidate(t, n);
    t.change(() => {
      this.enableSubmitOnValidate(t, n);
    });
  }

  showLspFinishSignupForm() {
    $('.lsp-signup-fields').addClass('hide');
    $('.signup-or-separator.lsp-signup-box').addClass('hide');
    $('.social-circles').addClass('hide');
    $('.generic-tos').addClass('hide');
    $('.lsp-finish-signup-fields').removeClass('hide');
    $('input[name="user[email]"]').rules('remove');
    $('input[name="user[national_number]"]').rules('remove');
    $('input[name="user[verification_code]"]').rules('remove');
    $('input[name="user[password]"]').rules('remove');
  }

  verifyMobileConfirmationCode() {
    const confirmationCode = $('#inputConfirmationCode input').val().replace(/\D/g, '');

    if (confirmationCode) {
      if (confirmationCode.length !== 4) {
        this.showError(h.default.t('phone_number_widget.verification_code_four_digits'));
      } else {
        this.clearErrorMessage();

        $.post('/users/verify_mobile_confirmation_code', {
          phone_number: this.getPhoneNumberInput($('.signup-form-phone')),
          verification_code: confirmationCode,
        }, (data) => {
          data.success ? this.showLspFinishSignupForm() : this.showErrorMessage(data.message);
        }).fail(() => {
          this.showErrorMessage(h.default.t('user.login.generic_error'));
        });
      }
    } else {
      this.showError(h.default.t('phone_number_widget.verify_validation_error'));
    }
  }

  checkEmailAlreadyInUse() {
    const email = $('#signin_email').val().trim();

    this.clearErrorMessage();

    c.default.post('/v2/accounts', {
      data: {
        email,
        type: 'email',
        _validate_only: true,
        _format: 'for_validate_only',
      },
      contentType: 'application/json',
      success: (data) => {
        if (data.account.account_exists) {
          this.showErrorMessage(h.default.t('validation.failure.email_in_use'));
        } else {
          this.showLspFinishSignupForm();
        }
      },
      error: () => {
        this.showErrorMessage(h.default.t('user.login.generic_error'));
      },
    });
  }

  initLspSignup() {
    this.initPasswordStrengthCheck('lsp-signup-fields');
    const t = $('.signup-form-lsp');
    this.setLspSignupButtonStateForEmail();
    this.setLspSignupButtonStateForPhone();
    this.setGetSmsCodeButtonState();
    this.setLspFinishSignupButtonState();
    t.find('.use-phone-instead').on('click', (t) => {
      this.trackSignupLoginMethodChange('email', 'phone');
      t.preventDefault();
      this.clearErrorMessage();
      $('.email-signup-header').addClass('hide');
      $('#inputEmail').addClass('hide');
      $('.phone-signup-header').removeClass('hide');
      $('.phone-number-signup-form-fields').removeClass('hide');
      $('.phone-verification-code').removeClass('hide');
      $('.signup-form-lsp input[name="from"]').val('phone_signup');
      this.setLspSignupButtonStateForPhone();
    });
    t.find('.use-email-instead').on('click', (t) => {
      this.trackSignupLoginMethodChange('phone', 'email');
      t.preventDefault();
      this.clearErrorMessage();
      $('.phone-signup-header').addClass('hide');
      $('.phone-number-signup-form-fields').addClass('hide');
      $('.phone-verification-code').addClass('hide');
      $('.email-signup-header').removeClass('hide');
      $('#inputEmail').removeClass('hide');
      $('.signup-form-lsp input[name="from"]').val('email_signup');
      this.setLspSignupButtonStateForEmail();
    });
    this.initCountrySelector(t, 'signup');
    $('.lsp-get-sms-code').on('click', (t) => {
      t.preventDefault();
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number',
          operation: 'submit',
        },
      });
      this.submitPhoneNumberAndShowConfirmationForm();
    });
    $('.lsp-signup-submit').on('click', (t) => {
      t.preventDefault();
      const n = $('input[name="from"]').val();
      const r = $('.signup-form-lsp').validate();
      let o = true;
      let i = true;
      let s = true;
      n === 'email_signup' ? o = r.element('input[name="user[email]"]') : n === 'phone_signup' && (i = r.element('input[name="user[national_number]"]'),
      s = r.element('input[name="user[verification_code]"]'));
      const u = r.element('input[name="user[password]"]');
      o && i && s && u && (n === 'phone_signup' ? this.verifyMobileConfirmationCode() : n === 'email_signup' && this.checkEmailAlreadyInUse());
    });
  }

  initOauthPopupListeners() {
    function e(e, t, n) {
      if (e.closed && clearInterval(t),
      (0, y.default)('oauth_popup')) {
        let r = {};
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
        const s = $(t.currentTarget).parents('form:first');
        const u = `${s.attr('action')}&oauth_popup=true`;
        const l = `/oauth/popup_form?url=${encodeURIComponent(u)}`;
        let r;
        let o;
        let i;
        s.hasClass('js-facebook-auth') ? (i = 'Facebook',
        r = 580,
        o = 400) : (i = 'Google',
        r = 500,
        o = 600);
        const c = (0, W.default)(l, 'Signup', r, o);
        const d = () => {
          const e = c.window.document.getElementById('oauth_form');
          e == null ? (c.close(),
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
    const n = window.location.search;
    const r = qs.parse(n.split('?')[1]);
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
    this.clearErrorMessage();

    if (e.success && e.ask_alipay_linking) {
      this.handleAlipayAccountLinking(e, t);
    } else if (e.data && e.data.redirect) {
      window.location.replace(e.data.redirect);
    } else if (e.data && e.data.otp) {
      eventEmitter.emit('otp-modal:open');
    } else if (e.data && e.data.suspended_state_redirect) {
      window.location.replace(e.data.suspended_state_redirect);
    } else if (e.data && e.data.underage_user) {
      eventEmitter.emit('signup-login-modals:close');
      this.showUnderageUserModal();
    } else if (e.success) {
      this.handleAuthResponseSuccess(e);
    } else {
      this.showErrorMessage(e.message);
    }
  }

  handleAuthResponseSuccess(e) {
    const t = this;
    eventEmitter.emit('signup-login-modals:close');
    const n = () => {
      t.onFinishedFlow && r(t.onFinishedFlow);
    };
    if (e.show_remember_browser) {
      return void this.showRememberBrowserModal().done(() => {
        t.afterAjaxSuccess(),
        n();
      });
    }
    const o = () => {
      e.signup_survey_question ? t.startSignupSurveyFlow(e.signup_survey_question, n) : n();
    };
    const i = () => {
      e.account_activation_flow ? r(() => t.startAccountActivationFlow(o)) : o();
    };
    const a = () => {
      e.show_business_referral_info_modal ? r(() => {
        (0, z.launchReferralRewardInformationModal)().then(i);
      }) : i();
    };
    const s = () => {
      t.prioritizedCallbackReturningPromise ? t.prioritizedCallbackReturningPromise().then(() => {
        a();
      }) : a();
    };
    const l = () => {
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
    e.ask_alipay_linking = false;

    $('.alipay-account-linking-login img').attr('src', e.data.profile_pic_url);

    $('.alipay-account-linking-login button').on('click', () => {
      $('.alipay-account-linking-login').addClass('loading');
      $.post('/users/alipay_account_linking_related_operations', {
        link_account: true,
      }, (r) => {
        $('.alipay-account-linking-login').removeClass('loading');
        if (r.success) {
          this.handleAuthResponse(e, t);
        } else {
          this.showErrorMessage(r.message);
        }
      }, 'json').fail(() => {
        $('.alipay-account-linking-login').removeClass('loading');
        this.showErrorMessage(h.default.t('user.login.generic_error'));
      });
    });

    $('.alipay-account-linking-login a').on('click', () => {
      this.clearErrorMessage();
      this.handleAuthResponse(e, t);
    }),

    $('.alipay-account-linking-login').removeClass('hide');
    $('.login-modal-content-js').addClass('hide');
  }

  initEmailSignup() {
    this.initPasswordStrengthCheck('signup-form-fields');

    const $form = $('.signup-form');

    $form.find('.other-signup-options').on('click', () => {
      this.trackSignupLoginMethodChange('email', 'more_options');
      this.clearErrorMessage();
      this.showCreationOptions();
      $('.social-buttons').removeClass('hide');
      $('#signup-modal-content .signup-or-separator').removeClass('hide');
      $('.signup-form-fields').addClass('hide');
      $('#tos_outside').removeClass('hide');
    });

    $form.find('.use-phone-instead').on('click', () => {
      this.trackSignupLoginMethodChange('email', 'phone');
      this.clearErrorMessage();
      $('.signup-form-fields').addClass('hide');
      $('.phone-signup-form').removeClass('hide');
    });

    this.showEmailSignupForm();
  }

  showEmailSignupForm() {
    this.hideCreationOptions();

    $('.social-buttons').addClass('hide');
    $('.signup-form-fields').removeClass('hide');
    $('#tos_outside').addClass('hide');

    if (this.hasPhoneNumberSignup()) {
      $('#signup-modal-content .signup-or-separator').addClass('hide');
    } else {
      $('.social-links').removeClass('hide');
    }

    $('.contextual-signup-form-header-container').hide();
  }

  hasPhoneNumberSignup() {
    return $('.signup-form-phone').length > 0;
  }

  initConfirmationCodeInputEvent(e) {
    e.find('.confirmation-code-textarea').on('input', (ev) => {
      const element = ev.currentTarget;
      if (element.value.length === 4) {
        $(element).parent('.control-group').addClass('loading');
        e.submit();
      }
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
    const e = this;
    const t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];
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
          sub_event: `${e.page}_change_phone_number`,
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
        sub_event: `change_${this.page}_method`,
        operation: 'click',
        from_method: e,
        to_method: t,
      },
    });
  }

  initLogin() {
    const e = this;
    const t = $('.login-form-phone');
    const n = $('.login-form');
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
    const e = this;
    const t = f.default.get('amex_checkout');
    const n = t.env;
    const r = t.client_id;
    const o = t.client_key;
    let i = '';
    (0, V.default)().amextest === '1' && (0, y.default)('amextest', true),
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
          $('.signup-form').append(`<input type="hidden" name="amex_profile_token" value="${n.amex_profile_token}">`),
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
    i += `<amex:init client_id="${r}" theme="responsive" action="sign-up" locale="en_US" env="${n}" disable_btn="false" button_color="plain" callback="amexCheckoutHandler" />`,
    i += `<amex:buy context_id="signup" key_name="client_key" key_value="${o}" />`,
    i += '<script src="https://icm.aexp-static.com/Internet/IMDC/US_en/RegisteredCard/AmexExpressCheckout/js/AmexExpressCheckout.js"></script>',
    $('#amex-express-checkout').append(i);
  }

  initValidation(e) {
    jQuery.validator.addMethod('forbiddenContentCheck', function method(e, t) {
      if (this.optional(t) || e === null) {
        return true;
      }
      const n = $(t).parents('.control-group').siblings();
      const r = n.find('input[name="user[email]"]').val();
      const o = n.find('input[name="user[first_name]"]').val();
      const i = n.find('input[name="user[last_name]"]').val();
      const s = n.find('input[name="user[national_number]"]').val();
      const u = e.toLowerCase();
      return !(i && u.includes(i.toLowerCase()) || o && u.includes(o.toLowerCase()) || s && u.includes(s.toLowerCase()) || r && u.includes(r.split('@')[0].toLowerCase()));
    }),
    jQuery.validator.addMethod('strengthCheck', function method(e, t) {
      if (this.optional(t)) {
        return true;
      }
      const n = x.default.test(null, e);
      return n.score >= 35;
    }),
    jQuery.validator.addMethod('checkValidPhoneNumber', function method(e, t) {
      return !(!this.optional(t) && e !== null) || !!/^[0-9 ().,+-]*$/.test(e) && (e = e.replace(/\D/g, ''),
      e.length >= 6);
    });
    const t = $('.login-form');
    const n = $('.login-form-phone');
    const r = $('.signup-form');
    const o = $('.signup-form-phone');
    const i = $('.signup-form-lsp');
    const s = $('.signup-form-social');
    const u = $('#oauth2_service').attr('value');
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
    s.validate($.extend({}, this.getValidationOptions(s, `${u}`, e), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.email_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));
  }

  getSubEvent(e) {
    let t = `${this.page}_attempt_${e}`;
    if (e === 'lsp') {
      const n = $('input[name="from"]').val();
      n === 'email_signup' ? t = 'signup_attempt_email' : n === 'phone_signup' && (t = 'signup_attempt_phone');
    }
    return t;
  }

  getValidationOptions(e, t, n) {
    const r = this;
    const o = e.find('[data-hook="password-strength"]');
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
            datadog_tags: [`sub_event:${i},platform:web`],
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
              datadog_tags: [`sub_event:${o},platform:web`],
            },
          });
        }
      },
    }, this.getErrorPlacement(o));
  }

  fixSignupKeys() {
    const e = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {};
    const t = {};
    Object.entries(e).forEach((e) => {
      const n = babelHelpers.slicedToArray(e, 2);
      const r = n[0];
      const o = n[1];
      t[`user[${r}]`] = o;
    });
    return t;
  }

  trackFacebookEvent(e, t, n) {
    const r = u.default.current();
    const o = this;
    T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: `${o.page}_attempt_facebook`,
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
    t === 'cancelled_perm_flow' && T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: `${o.page}_response_facebook`,
        operation: 'frontend',
        response: 'failure',
        failure_reason: 'cancelled_perm_flow',
      },
    });
  }

  initFacebookEvents() {
    const e = this;
    const t = window.ga;
    const n = $('#facebook_form');
    const r = n.hasClass('in_modal');
    const o = (0, y.default)('fbs');
    let i;

    const s = (a) => {
      const s = window.location.pathname === '/signup_login' || window.location.pathname === '/login';
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `${e.page}_attempt_facebook`,
          operation: 'click',
        },
        queue: s,
      }),
      r && o === 'not_authorized' ? e.trackFacebookEvent(s, 'start_perm_flow', true) : (o === 'not_authorized' && e.trackFacebookEvent(s, 'start_perm_flow_fb_cookie', false),
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
      const n = $(e.currentTarget);
      const r = n.data('from');
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `nav_forgot_password_${r}`,
          operation: 'click',
          button_text: n.text(),
        },
      });
      let o = n.attr('href');
      let i = $('input[name=email]').val();
      undefined === i && (i = $('.auth_merge_email').text()),
      i.length && (o = `${o.split('?')[0]}?${qs.stringify({
        email: i,
      })}`),
      $.get(o, {
        from: r,
      }, (e) => {
        const n = $(`#${t.page}-modal-content`);
        n.html($.trim(e));
        const r = n.find('form');
        r.find('input').placeholder(),
        t.initForgotPasswordValidation(),
        t.initForgotPasswordEvents();
      });
    }) : void $('.forgot_password_container').find('input').placeholder();
  }

  initForgotPasswordEvents() {
    const e = this;
    const t = {
      includeTips: true,
    };
    const n = new j.default();
    n.check('[data-hook="new_password"]', t);
    const r = $('.forgot-password-phone');
    const o = $('.forgot-password-email');
    const i = $('.submit-confirmation-code');
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
    jQuery.validator.addMethod('checkConfirmPassword', e => e === null || $('.submit-new-password input[name="password"]').val() === e),
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
            sub_event: `forgot_password_${e}`,
            operation: 'submit',
            status: 'valid',
          },
        }),
        t.disableSubmit(n);
        const r = $(n);
        e === 'email' ? t.submitForgotPasswordEmail(r) : e === 'phone' ? t.submitForgotPasswordPhone(r) : e === 'phone_confirmation' ? t.submitForgotPasswordPhoneConfirmation(r) : e === 'reset_password' && t.submitForgotPasswordReset(r);
      },
      invalidHandler: (t, n) => {
        n.numberOfInvalids() > 0 && T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: `forgot_password_${e}`,
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
      control: () => false,
      disable_button: () => true,
      treatment_unknown: () => false,
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
    this.broadcastLogin();
    (0, K.reportLoginEventToExternalPartners)();
  }

  ajaxSubmitFunction(e) {
    const t = this;
    const n = $(e);
    const r = {
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
      let r = {};
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
    return this.page === 'forgot-password' ? $('.forgot-password-notice') : $(`#${this.page}-modal-content .notice`);
  }

  showErrorMessage(e) {
    undefined === e && (e = h.default.t('user.login.generic_error')),
    this.getErrorContainer().html(`<i class="icon icon-alert-alt alert-icon"></i>${e}`).show();
  }

  clearErrorMessage() {
    this.getErrorContainer().hide();
  }

  initFacebookSignup() {
    const e = this;
    const t = $('#facebook_form.in_modal');
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
    eventEmitter.removeListener('login', e),
    eventEmitter.on('login', e);
  }

  addLogoutCallback(e) {
    eventEmitter.removeListener('logout', e),
    eventEmitter.on('logout', e);
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
      const r = e.find('.country-code-show');
      const o = r.find(':selected').val();
      const i = $(n.currentTarget).find(':selected').data('prefix');
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `${t}_country_code_change`,
          operation: 'click',
          from_code: o,
          to_code: i,
        },
      }),
      r.html(`<option value="${i}" selected>+${i}</option>`);
    });
  }

  initSignInOutListeners() {
    eventEmitter.on('login', this.onLogin);
    eventEmitter.on('logout', this.onLogout);

    if (typeof window != 'undefined') {
      $(window).on('storage', (e) => {
        if (e.originalEvent.key === 'logged_in_event') {
          e.originalEvent.newValue === 'true' ? eventEmitter.emit('login') : eventEmitter.emit('logout');
        }
      });
    }
  }

  clearOnLogout() {
    Airbnb.header.clearThumbnailUrl();
    (0, b.default)('user_first_name', null);
    (0, b.default)('hash_user_id', null);
    (0, b.default)('modal_userpic_url', null);
    (0, b.default)('host_navbar_x_out', null);
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
    eventEmitter.emit('logout');
  }

  broadcastLogin(e) {
    eventEmitter.emit('login', e),
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
    if (e === 'login') {
      $('.link-to-signup-in-login').on('click', () => {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'nav_signup',
            operation: 'click',
            origin: 'login-modal',
          },
        });
      });
    } else if (e === 'signup') {
      $('.link-to-login-in-signup').on('click', () => {
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
}

SignupLogin.loginCallbacks = [];
SignupLogin.logoutCallbacks = [];

export default SignupLogin;
