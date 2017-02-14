/* global Airbnb, babelHelpers */
/* eslint-disable class-methods-use-this, max-len */
import $ from 'jquery';
import qs from 'qs';

import eventEmitter from '../eventEmitter';

function n(e) {
  return e;
}

// const u = babelHelpers.interopRequireDefault(n(476));
// const c = babelHelpers.interopRequireDefault(n(7));
// const f = babelHelpers.interopRequireDefault(n(4));
// const h = babelHelpers.interopRequireDefault(n(147));
// const b = babelHelpers.interopRequireDefault(n(39));
// const y = babelHelpers.interopRequireDefault(n(42));
// const T = babelHelpers.interopRequireDefault(n(26));
// const P = babelHelpers.interopRequireDefault(n(37));
// const O = babelHelpers.interopRequireDefault(n(6));
// const D = n(697);
// const x = babelHelpers.interopRequireDefault(n(698));
// const j = babelHelpers.interopRequireDefault(n(699));
// const N = babelHelpers.interopRequireDefault(n(700));
// const L = babelHelpers.interopRequireDefault(n(701));
// const q = babelHelpers.interopRequireDefault(n(713));
// const B = babelHelpers.interopRequireDefault(n(714));
// const G = babelHelpers.interopRequireDefault(n(712));
// const z = n(716);
// const V = babelHelpers.interopRequireDefault(n(11));
// const W = babelHelpers.interopRequireDefault(n(722));
// const K = n(710);
// const X = n(723);
// const J = n(744);
// const Q = babelHelpers.interopRequireDefault(n(708));

function callOnLogin(callback) {
  if (u.default.isLoggedIn()) {
    callback();
  } else {
    eventEmitter.once('login', callback);
  }
}

class SignupLoginForm {
  constructor() {
    this.initSignInOutListeners();
  }

  /**
   * @param {Object} options
   */
  init(options) {
    if (options) {
      this.page = options.page;
      this.inModal = !!options.inModal;
      this.initForgotPasswordCallbacks = !!options.initForgotPasswordCallbacks;
      this.onFinishedFlow = options.onFinishedFlow;
      this.prioritizedCallbackReturningPromise = options.prioritizedCallbackReturningPromise;
      this.shouldInitPhoneNumberSignup = options.shouldInitPhoneNumberSignup;
    }

    $('#signin_email').on('change', function change() {
      const $element = $(this);
      $element.val($.trim($element.val()));
    });

    if (!($('#otp').length > 0)) {
      const isAjax = $('.signup.modal-content').length > 0 || this.inModal;

      this.initValidation(isAjax);
      this.initFacebookEvents();
      this.initLogin();
      this.initForgotPassword(isAjax);

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
      const $tosCheckbox = this.getTOSCheckbox();

      if ($tosCheckbox.length) {
        $tosCheckbox.on('click', () => {
          this.getTOSCheckboxLabel().removeClass('tos-checkbox-error');
        });
      }

      $('.create-using-email').on('click', (ev) => {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_email',
            operation: 'click',
          },
        });
        ev.preventDefault();

        if (this.ensureTOSCheckboxIsChecked()) {
          if ($tosCheckbox.length) {
            this.getTOSCheckboxLabel().remove();
            $tosCheckbox.remove();
          }
          this.initEmailSignup();
          $('.signup-form-fields input[type!="hidden"]').first().focus();
        }
      });

      $('.create-using-phone-number').on('click', (ev) => {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'signup_phone_number',
            operation: 'click',
          },
        });
        ev.preventDefault();
        this.initPhoneNumberSignup();

        if (ev.target.className.includes('pnr-email-default')) {
          this.initEmailSignup();
          $('.phone-signup-form').addClass('hide');
        }
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

      if (this.shouldInitPhoneNumberSignup) {
        if (Q.default.inAlipaySignupFlowExperiment()) {
          this.initPhoneNumberSignup(false);
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
          this.initPhoneNumberSignup();
        }
      }

      if (this.flow === 'lys-login-signup-redesign') {
        const that = this;
        $('#user_birthday_year').one('focus', function focus() {
          const year = that.defaultBirthdayYear();
          that.autoSelectOption(this, year);
        });
      }

      $('[data-hook="password-strength"]').addClass('hide');
      this.trackInternalLinks(this.page);

      if (Airbnb.header) {
        Airbnb.header.clearThumbnailUrl();
      }
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

  /**
   * @param {Element} $field
   */
  syncFields($field) {
    $field.change((ev) => {
      $field.val(ev.currentTarget.value);
    });
  }

  /**
   * @param {string} classSelector
   */
  initPasswordStrengthCheck(classSelector) {
    const passwordStrength = new j.default(); // eslint-disable-line new-cap
    passwordStrength.check(`.${classSelector} [data-hook="user_password"]`, {
      includeTips: false,
    });
  }

  /**
   * @param {Array<Element>} $inputs
   * @param {Element} $submit
   */
  enableSubmitOnValidate($inputs, $submit) {
    let isValid = false;

    $inputs.each(function each() {
      if ($(this).val() === '') {
        isValid = true;
      }
    });

    if (isValid) {
      $submit.prop('disabled', true);
    } else {
      $submit.prop('disabled', false);
    }
  }

  setLspSignupButtonStateForEmail() {
    const $inputs = $('#signin_email, #signin_password');
    const $submit = $('.lsp-signup-submit');

    this.enableSubmitOnValidate($inputs, $submit);

    $inputs.change(() => {
      this.enableSubmitOnValidate($inputs, $submit);
    });
  }

  setLspSignupButtonStateForPhone() {
    const $inputs = $('#signin_phone, #signin_password, .confirmation-code-textarea');
    const $submit = $('.lsp-signup-submit');

    this.enableSubmitOnValidate($inputs, $submit);

    $inputs.change(() => {
      this.enableSubmitOnValidate($inputs, $submit);
    });
  }

  setLspFinishSignupButtonState() {
    const $inputs = $('#signup_first_name, #signup_last_name, #user_birthday_month, #user_birthday_day, #user_birthday_year');
    const $submit = $('.lsp-finish-signup-submit');

    this.enableSubmitOnValidate($inputs, $submit);

    $inputs.change(() => {
      this.enableSubmitOnValidate($inputs, $submit);
    });
  }

  setGetSmsCodeButtonState() {
    const $inputs = $('#signin_phone');
    const $submit = $('.lsp-get-sms-code');

    this.enableSubmitOnValidate($inputs, $submit);

    $inputs.change(() => {
      this.enableSubmitOnValidate($inputs, $submit);
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
          if (data.success) {
            this.showLspFinishSignupForm();
          } else {
            this.showErrorMessage(data.message);
          }
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

    const $lspSignupForm = $('.signup-form-lsp');

    this.setLspSignupButtonStateForEmail();
    this.setLspSignupButtonStateForPhone();
    this.setGetSmsCodeButtonState();
    this.setLspFinishSignupButtonState();

    $lspSignupForm.find('.use-phone-instead').on('click', (ev) => {
      this.trackSignupLoginMethodChange('email', 'phone');
      ev.preventDefault();
      this.clearErrorMessage();
      $('.email-signup-header').addClass('hide');
      $('#inputEmail').addClass('hide');
      $('.phone-signup-header').removeClass('hide');
      $('.phone-number-signup-form-fields').removeClass('hide');
      $('.phone-verification-code').removeClass('hide');
      $('.signup-form-lsp input[name="from"]').val('phone_signup');
      this.setLspSignupButtonStateForPhone();
    });

    $lspSignupForm.find('.use-email-instead').on('click', (ev) => {
      this.trackSignupLoginMethodChange('phone', 'email');
      ev.preventDefault();
      this.clearErrorMessage();
      $('.phone-signup-header').addClass('hide');
      $('.phone-number-signup-form-fields').addClass('hide');
      $('.phone-verification-code').addClass('hide');
      $('.email-signup-header').removeClass('hide');
      $('#inputEmail').removeClass('hide');
      $('.signup-form-lsp input[name="from"]').val('email_signup');
      this.setLspSignupButtonStateForEmail();
    });

    this.initCountrySelector($lspSignupForm, 'signup');

    $('.lsp-get-sms-code').on('click', (ev) => {
      ev.preventDefault();
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number',
          operation: 'submit',
        },
      });
      this.submitPhoneNumberAndShowConfirmationForm();
    });

    $('.lsp-signup-submit').on('click', (ev) => {
      ev.preventDefault();
      const type = $('input[name="from"]').val();
      const validator = $('.signup-form-lsp').validate();
      let isEmailValid = true;
      let isNationalNumberValid = true;
      let isVerificationCodeValid = true;

      if (type === 'email_signup') {
        isEmailValid = validator.element('input[name="user[email]"]');
      } else if (type === 'phone_signup') {
        isNationalNumberValid = validator.element('input[name="user[national_number]"]');
        isVerificationCodeValid = validator.element('input[name="user[verification_code]"]');
      }

      const isPasswordValid = validator.element('input[name="user[password]"]');

      if (isEmailValid && isNationalNumberValid && isVerificationCodeValid && isPasswordValid) {
        if (type === 'phone_signup') {
          this.verifyMobileConfirmationCode();
        } else if (type === 'email_signup') {
          this.checkEmailAlreadyInUse();
        }
      }
    });
  }

  initOauthPopupListeners() {
    function e(e, interval, provider) {
      if (e.closed) {
        clearInterval(interval);
      }

      if ((0, y.default)('oauth_popup')) {
        let data = {};

        try {
          data = JSON.parse((0, y.default)('oauth_popup'));
        } catch (n) {
          e.close();
          clearInterval(interval);
          (0, y.default)('oauth_popup', null, {
            path: '/',
          });
          this.showErrorMessage(h.default.t('user.login.generic_error'));
        }

        if (data.message) {
          data.message = data.message.replace(/\+/g, ' ');
        }

        if (data.close_window) {
          T.default.logEvent({
            event_name: 'signup_login_flow',
            event_data: {
              provider,
              sub_event: 'popup_closed',
              flow: data.flow,
              success: data.sucess,
            },
          });

          e.close();
          clearInterval(interval);
          this.handleAuthResponse(data);
          (0, y.default)('oauth_popup', null, {
            path: '/',
          });
        }
      }
    }

    const params = qs.parse(window.location.search.split('?')[1]);

    if (params.oauth_popup_enabled || O.default.getBootstrap('oauth_popup')) {
      $('.js-google-auth, .js-facebook-auth').on('click', (ev) => {
        ev.preventDefault();

        if (this.ensureTOSCheckboxIsChecked()) {
          const $form = $(ev.currentTarget).parents('form:first');
          const urlParam = `${$form.attr('action')}&oauth_popup=true`;
          const authUrl = `/oauth/popup_form?url=${encodeURIComponent(urlParam)}`;
          let r;
          let o;
          let provider;

          if ($form.hasClass('js-facebook-auth')) {
            provider = 'Facebook';
            r = 580;
            o = 400;
          } else {
            provider = 'Google';
            r = 500;
            o = 600;
          }

          const c = (0, W.default)(authUrl, 'Signup', r, o);
          const d = () => {
            const authForm = c.window.document.getElementById('oauth_form');
            if (authForm == null) {
              c.close();
              $form.submit();
            } else {
              authForm.submit();
            }
          };

          if (c.addEventListener) {
            c.addEventListener('load', d, false);
          } else if (c.attachEvent) {
            c.attachEvent('onload', d, false);
          }

          T.default.logEvent({
            event_name: 'signup_login_flow',
            event_data: {
              provider,
              sub_event: 'popup_open',
            },
          });

          const interval = setInterval(() => {
            e.call(this, c, interval, provider);
          }, 200);
        }
      });
    }
  }

  /**
   * @returns {Element}
   */
  getTOSCheckbox() {
    return $('#tos-mandatory-checkbox');
  }

  /**
   * @returns {Element}
   */
  getTOSCheckboxLabel() {
    return this.getTOSCheckbox().next('label');
  }

  /**
   * @returns {boolean}
   */
  ensureTOSCheckboxIsChecked() {
    const $tosCheckbox = this.getTOSCheckbox();
    return !($tosCheckbox.length && !$tosCheckbox.prop('checked')) || (this.getTOSCheckboxLabel().addClass('tos-checkbox-error'),
    false);
  }

  /**
   * @param {Object} response
   * @param {Object} t
   */
  handleAuthResponse(response, t) {
    this.clearErrorMessage();

    if (response.success && response.ask_alipay_linking) {
      this.handleAlipayAccountLinking(response, t);
    } else if (response.data && response.data.redirect) {
      window.location.replace(response.data.redirect);
    } else if (response.data && response.data.otp) {
      eventEmitter.emit('otp-modal:open');
    } else if (response.data && response.data.suspended_state_redirect) {
      window.location.replace(response.data.suspended_state_redirect);
    } else if (response.data && response.data.underage_user) {
      eventEmitter.emit('signup-login-modals:close');
      this.showUnderageUserModal();
    } else if (response.success) {
      this.handleAuthResponseSuccess(response);
    } else {
      this.showErrorMessage(response.message);
    }
  }

  /**
   * @param {Object} response
   */
  handleAuthResponseSuccess(response) {
    eventEmitter.emit('signup-login-modals:close');

    const n = () => {
      if (this.onFinishedFlow) {
        callOnLogin(this.onFinishedFlow);
      }
    };

    if (response.show_remember_browser) {
      this.showRememberBrowserModal().done(() => {
        this.afterAjaxSuccess();
        n();
      });
      return;
    }

    const o = () => {
      if (response.signup_survey_question) {
        this.startSignupSurveyFlow(response.signup_survey_question, n);
      } else {
        n();
      }
    };

    const i = () => {
      if (response.account_activation_flow) {
        callOnLogin(() => this.startAccountActivationFlow(o));
      } else {
        o();
      }
    };

    const a = () => {
      if (response.show_business_referral_info_modal) {
        callOnLogin(() => {
          (0, z.launchReferralRewardInformationModal)().then(i);
        });
      } else {
        i();
      }
    };

    const s = () => {
      if (this.prioritizedCallbackReturningPromise) {
        this.prioritizedCallbackReturningPromise().then(() => {
          a();
        });
      } else {
        a();
      }
    };

    const l = () => {
      if (!response.show_community_commitment) {
        if ((0, b.default)('force_commitment')) {
          u.default.reset();
          this.startCommunityCommitmentFlow(() => {
            this.afterAjaxSuccess();
            s();
          });
        } else {
          this.afterAjaxSuccess();
          s();
        }
      }
    };

    l();
  }

  /**
   * @param {Object} response
   * @param {Object} t
   */
  handleAlipayAccountLinking(response, t) {
    response.ask_alipay_linking = false; // eslint-disable-line

    $('.alipay-account-linking-login img').attr('src', response.data.profile_pic_url);

    $('.alipay-account-linking-login button').on('click', () => {
      $('.alipay-account-linking-login').addClass('loading');
      $.post('/users/alipay_account_linking_related_operations', {
        link_account: true,
      }, (data) => {
        $('.alipay-account-linking-login').removeClass('loading');
        if (data.success) {
          this.handleAuthResponse(data, t);
        } else {
          this.showErrorMessage(data.message);
        }
      }, 'json').fail(() => {
        $('.alipay-account-linking-login').removeClass('loading');
        this.showErrorMessage(h.default.t('user.login.generic_error'));
      });
    });

    $('.alipay-account-linking-login a').on('click', () => {
      this.clearErrorMessage();
      this.handleAuthResponse(response, t);
    });

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

  /**
   * @returns {boolean}
   */
  hasPhoneNumberSignup() {
    return $('.signup-form-phone').length > 0;
  }

  /**
   * @param {Element} $form
   */
  initConfirmationCodeInputEvent($form) {
    $form.find('.confirmation-code-textarea').on('input', (ev) => {
      const element = ev.currentTarget;
      if (element.value.length === 4) {
        $(element).parent('.control-group').addClass('loading');
        $form.submit();
      }
    });
  }

  showCreationOptions() {
    $('.create-using-email').removeClass('hide');
    $('.create-using-phone-number').removeClass('hide');
    $('.create-using-facebook').removeClass('hide');
    $('.create-using-google').removeClass('hide');
  }

  hideCreationOptions() {
    $('.create-using-email').addClass('hide');
    $('.create-using-phone-number').addClass('hide');
    $('.create-using-facebook').addClass('hide');
    $('.create-using-google').addClass('hide');
  }

  /**
   * @param {Object} args
   */
  initPhoneNumberSignup(...args) {
    this.initPasswordStrengthCheck('phone-signup-form');
    const $phoneSignupForm = $('.signup-form-phone');
    this.initCountrySelector($phoneSignupForm, 'signup');

    $phoneSignupForm.find('.other-signup-options').on('click', (ev) => {
      this.trackSignupLoginMethodChange('phone', 'more_options');
      ev.preventDefault();
      this.clearErrorMessage();
      this.showCreationOptions();
      $('.social-buttons').removeClass('hide');
      $('#signup-modal-content .signup-or-separator').removeClass('hide');
      $('.phone-signup-form').addClass('hide');
      $('#tos_outside').removeClass('hide');
    });

    $phoneSignupForm.find('.use-email-instead').on('click', (ev) => {
      this.trackSignupLoginMethodChange('phone', 'email');
      ev.preventDefault();
      this.clearErrorMessage();
      $('.phone-signup-form').addClass('hide');
      $('#signup-modal-content .signup-or-separator').removeClass('hide');
      this.initEmailSignup();
    });

    $('.finished-phone-signup-fields').on('click', (ev) => {
      ev.preventDefault();
      $('#inputConfirmationCode input').rules('remove');
      $('.js-login-footer').addClass('hide');

      if ($phoneSignupForm.valid()) {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'confirm_phone_number',
            operation: 'submit',
          },
        });
        this.submitPhoneNumberAndShowConfirmationForm();
      }
    });

    $('.phone-verification-field .change-phone-number').on('click', () => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `${this.page}_change_phone_number`,
          operation: 'submit',
        },
      });
      this.clearErrorMessage();
      $('.phone-number-signup-form-fields').removeClass('hide');
      $('.js-login-footer').removeClass('hide');
      $('.phone-verification-field').addClass('hide');
    });

    this.initConfirmationCodeInputEvent($phoneSignupForm);
    this.hideCreationOptions();

    $('.social-buttons').addClass('hide');
    $('#signup-modal-content .signup-or-separator').addClass('hide');
    $('.phone-signup-form').removeClass('hide');
    $('#tos_outside').addClass('hide');
    $('.contextual-signup-form-header-container').hide();

    const t = !(args.length > 0 && undefined !== args[0]) || args[0];
    if (t) {
      $('.phone-signup-form input[type!="hidden"]').first().focus();
    }
  }

  submitPhoneNumberAndShowConfirmationForm() {
    $.post('/users/send_mobile_confirmation_code', {
      phone_number: this.getPhoneNumberInput($('.signup-form-phone')),
    }, (data) => {
      if (data.success) {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'confirm_phone_number_success',
            operation: 'submit',
          },
        });

        $('.mobile-national-number').html(data.national_number);
        $('.phone-number-signup-form-fields input[name="user[phone]"]').val(data.international_number);
        this.clearErrorMessage();
        $('#inputConfirmationCode input').rules('add', D.validationRules.phone_confirmation_code.verification_code);

        if ($('.lsp-get-sms-code').length) {
          $('.get-sms-code-text').addClass('hide');
          $('.resend-code-text').removeClass('hide');
        } else {
          $('.phone-number-signup-form-fields').addClass('hide');
          $('.phone-verification-field').removeClass('hide');
          $('.phone-verification-field input[type!="hidden"]').first().focus();
        }
      } else {
        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: 'confirm_phone_number_failure',
            operation: 'submit',
          },
        });
        this.showErrorMessage(data.message);
      }
    }, 'json').fail(() => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'confirm_phone_number_failure',
          operation: 'submit',
        },
      });
      this.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  /**
   * @param {string} fromMethod
   * @param {string} toMethod
   */
  trackSignupLoginMethodChange(fromMethod, toMethod) {
    T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: `change_${this.page}_method`,
        operation: 'click',
        from_method: fromMethod,
        to_method: toMethod,
      },
    });
  }

  initLogin() {
    const $phoneLoginForm = $('.login-form-phone');
    const $loginForm = $('.login-form');

    $loginForm.find('.use-phone-instead').on('click', () => {
      this.trackSignupLoginMethodChange('email', 'phone');
      this.clearErrorMessage();
      $loginForm.addClass('hide');
      $phoneLoginForm.removeClass('hide');
    });

    $('#signin_password').on('input', () => {
      this.clearErrorMessage();
    });

    this.initCountrySelector($phoneLoginForm, 'login');

    $phoneLoginForm.find('.use-email-instead').on('click', (ev) => {
      this.trackSignupLoginMethodChange('phone', 'email');
      ev.preventDefault();
      this.clearErrorMessage();
      $phoneLoginForm.addClass('hide');
      $loginForm.removeClass('hide');
    });

    $phoneLoginForm.find('.phone-login-button').on('click', () => {
      if ($phoneLoginForm.valid()) {
        $phoneLoginForm.find('input[name="phone"]').val(this.getPhoneNumberInput($phoneLoginForm));
        $phoneLoginForm.submit();
      }
    });
  }

  initAmexSignup() {
    const t = f.default.get('amex_checkout');

    if ((0, V.default)().amextest === '1') {
      (0, y.default)('amextest', true);
    }

    $('#amex-express-checkout').on('click', () => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'signup_attempt_amex',
        },
      });
    });

    window.amexCheckoutHandler = (t) => {
      $('#signup-modal-content').addClass('loading');

      $.ajax({
        url: c.default.getUrl('/v2/amex_checkout_identities'),
        method: 'POST',
        data: JSON.stringify(t),
        success: (data) => {
          $('#signup-modal-content').removeClass('loading');
          this.showEmailSignupForm();
          $('.email-signup-header').hide();
          $('#signup-modal-content .signup-or-separator').hide();
          $('.social-links').hide();
          const n = data.amex_checkout_identity;
          $('.signup-form input[name="user[email]"]').val(n.email);
          $('.signup-form input[name="user[first_name]"]').val(n.first_name);
          $('.signup-form input[name="user[last_name]"]').val(n.last_name);
          $('.signup-form select[name="user[birthday_year]"]').val(n.birthday_year);
          $('.signup-form select[name="user[birthday_month]"]').val(n.birthday_month);
          $('.signup-form select[name="user[birthday_day]"]').val(n.birthday_day);
          $('.signup-form').append(`<input type="hidden" name="amex_profile_token" value="${n.amex_profile_token}">`);
          $('.signup-form input[name="user[password]"]').addClass('invalid');
          $('.signup-form input[name="user[password]"]').val('');
          $('.amex-signup-header').removeClass('hide');
        },
        error: () => {
          $('#signup-modal-content').removeClass('loading');
          window.alert(h.default.t('amex.signup.could_not_connect')); // eslint-disable-line no-alert
        },
      });
    };

    $('#amex-express-checkout').append(`
      <amex:init client_id="${t.client_id}" theme="responsive" action="sign-up" locale="en_US" env="${t.env}" disable_btn="false" button_color="plain" callback="amexCheckoutHandler" />
      <amex:buy context_id="signup" key_name="client_key" key_value="${t.client_key}" />
      <script src="https://icm.aexp-static.com/Internet/IMDC/US_en/RegisteredCard/AmexExpressCheckout/js/AmexExpressCheckout.js"></script>
    `);
  }

  /**
   * @param {boolean} isAjax
   */
  initValidation(isAjax) {
    jQuery.validator.addMethod('forbiddenContentCheck', function method(value, element) {
      if (this.optional(element) || value === null) {
        return true;
      }

      const $formGroups = $(element).parents('.control-group').siblings();
      const userEmail = $formGroups.find('input[name="user[email]"]').val();
      const userFirstName = $formGroups.find('input[name="user[first_name]"]').val();
      const userLastName = $formGroups.find('input[name="user[last_name]"]').val();
      const userNationalNumber = $formGroups.find('input[name="user[national_number]"]').val();
      const lowerValue = value.toLowerCase();

      // eslint-disable-next-line no-mixed-operators
      return !(userLastName && lowerValue.includes(userLastName.toLowerCase()) || userFirstName && lowerValue.includes(userFirstName.toLowerCase()) || userNationalNumber && lowerValue.includes(userNationalNumber.toLowerCase()) || userEmail && lowerValue.includes(userEmail.split('@')[0].toLowerCase()));
    });

    jQuery.validator.addMethod('strengthCheck', function method(value, element) {
      if (this.optional(element)) {
        return true;
      }
      const check = x.default.test(null, value);
      return check.score >= 35;
    });

    jQuery.validator.addMethod('checkValidPhoneNumber', function method(value, element) {
      // eslint-disable-next-line
      return !(!this.optional(element) && value !== null) || !!/^[0-9 ().,+-]*$/.test(value) && (value = value.replace(/\D/g, ''),
      value.length >= 6);
    });

    const $loginEmail = $('.login-form');
    const $loginPhone = $('.login-form-phone');
    const $signupEmail = $('.signup-form');
    const $signupPhone = $('.signup-form-phone');
    const $signupLsp = $('.signup-form-lsp');
    const $signupSocial = $('.signup-form-social');
    const authService = $('#oauth2_service').attr('value');

    $loginEmail.validate($.extend({}, this.getValidationOptions($loginEmail, 'email', isAjax), {
      rules: D.validationRules.email_login,
    }, {
      messages: (0, D.localizedMessages)(),
    }));

    $loginPhone.validate($.extend({}, this.getValidationOptions($loginPhone, 'phone', isAjax), {
      rules: D.validationRules.phone_login,
    }, {
      messages: (0, D.localizedMessages)(),
    }));

    $signupEmail.validate($.extend({}, this.getValidationOptions($signupEmail, 'email', isAjax), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.email_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));

    $signupPhone.validate($.extend({}, this.getValidationOptions($signupPhone, 'phone', isAjax), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.phone_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));

    $signupLsp.validate($.extend({}, this.getValidationOptions($signupLsp, 'lsp', isAjax), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.lsp_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));

    $signupSocial.validate($.extend({}, this.getValidationOptions($signupSocial, `${authService}`, isAjax), {
      groups: D.validationGroups.signup,
    }, {
      rules: this.fixSignupKeys(D.validationRules.email_signup),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));
  }

  /**
   * @param {string} e
   * @returns {string}
   */
  getSubEvent(e) {
    let subEvent = `${this.page}_attempt_${e}`;

    if (e === 'lsp') {
      const type = $('input[name="from"]').val();
      if (type === 'email_signup') {
        subEvent = 'signup_attempt_email';
      } else if (type === 'phone_signup') {
        subEvent = 'signup_attempt_phone';
      }
    }

    return subEvent;
  }

  getValidationOptions($element, t, isAjax) {
    const $passwordInput = $element.find('[data-hook="password-strength"]');

    return Object.assign({}, D.validationOptions, {
      submitHandler: (form) => {
        const i = this.getSubEvent(t);

        T.default[this.inModal ? 'logEvent' : 'queueEvent']({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: i,
            operation: 'click',
            status: 'valid',
            remember_me: $('#remember_me2:checked').length > 0,
            in_modal: this.inModal,
            datadog_key: 'signup_login.valid',
            datadog_count: 1,
            datadog_tags: [`sub_event:${i},platform:web`],
          },
        });

        this.disableSubmit(form);
        this.showLoadingStateForSubmit(form);

        if ($passwordInput.length) {
          $passwordInput.addClass('hide');
        }

        if (isAjax) {
          this.ajaxSubmitFunction(form);
        } else {
          form.submit();
        }
      },
      invalidHandler: (ev, validator) => {
        if (validator.numberOfInvalids() > 0) {
          const subEvent = this.getSubEvent(t);

          T.default.logEvent({
            event_name: 'signup_login_flow',
            event_data: {
              sub_event: subEvent,
              operation: 'click',
              status: 'invalid',
              reason: validator.invalid,
              remember_me: $('#remember_me2:checked').length > 0,
              in_modal: this.inModal,
              datadog_key: 'signup_login.invalid',
              datadog_count: 1,
              datadog_tags: [`sub_event:${subEvent},platform:web`],
            },
          });
        }
      },
    }, this.getErrorPlacement($passwordInput));
  }

  fixSignupKeys(...args) {
    const keys = args.length > 0 && args[0] !== undefined ? args[0] : {};
    const data = {};

    Object.entries(keys).forEach((element) => {
      const n = babelHelpers.slicedToArray(element, 2);
      const r = n[0];
      const o = n[1];
      data[`user[${r}]`] = o;
    });

    return data;
  }

  trackFacebookEvent(isQueued, step, inModal) {
    const r = u.default.current();

    T.default.logEvent({
      event_name: 'signup_login_flow',
      event_data: {
        sub_event: `${this.page}_attempt_facebook`,
        operation: 'third_party_backend',
        step,
        in_modal: inModal,
        fb_logged_in: (0, y.default)('fbs'),
        fb_connected: r.facebook_connected,
        fb_publish_permission: r.og_publish,
        fb_perms: Airbnb.FACEBOOK_PERMS,
        status, // FIXME: Where is `status` defined?
      },
      queue: isQueued,
    });

    if (step === 'cancelled_perm_flow') {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `${this.page}_response_facebook`,
          operation: 'frontend',
          response: 'failure',
          failure_reason: 'cancelled_perm_flow',
        },
      });
    }
  }

  initFacebookEvents() {
    const ga = window.ga;
    const $facebookForm = $('#facebook_form');
    const inModal = $facebookForm.hasClass('in_modal');
    const o = (0, y.default)('fbs');

    $('.fb-button').click((ev) => {
      const isQueued = window.location.pathname === '/signup_login' || window.location.pathname === '/login';

      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `${this.page}_attempt_facebook`,
          operation: 'click',
        },
        queue: isQueued,
      });

      if (inModal && o === 'not_authorized') {
        this.trackFacebookEvent(isQueued, 'start_perm_flow', true);
      } else {
        if (o === 'not_authorized') {
          this.trackFacebookEvent(isQueued, 'start_perm_flow_fb_cookie', false);
        }
        this.trackFacebookEvent(isQueued, 'start_perm_flow', false);
      }

      ga('send', 'event', 'Authenticate', 'FacebookClick', 'Signup/Login');

      window.FB.login((response) => {
        if (response.authResponse) {
          ga('send', 'event', 'Authenticate', 'FacebookLogin', 'Signup/Login');

          if (inModal && (0, y.default)('fbs')) {
            this.trackFacebookEvent(false, 'finished_perm_flow', true);
          } else {
            this.trackFacebookEvent(false, 'finished_perm_flow', false);
          }

          $facebookForm.submit();
          this.disableSubmit();
        } else {
          ga('send', 'event', 'Authenticate', 'FacebookDeny', 'Signup/Login');
          this.trackFacebookEvent(false, 'cancelled_perm_flow', false);
        }
      }, {
        scope: Airbnb.FACEBOOK_PERMS,
      });

      ev.preventDefault();
    });
  }

  initForgotPassword(isAjax) {
    if (isAjax) {
      $(document).on('click', '.forgot-password', (ev) => {
        ev.preventDefault();
        const $element = $(ev.currentTarget);
        const from = $element.data('from');

        T.default.logEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: `nav_forgot_password_${from}`,
            operation: 'click',
            button_text: $element.text(),
          },
        });

        let url = $element.attr('href');
        let email = $('input[name=email]').val();

        if (email === undefined) {
          email = $('.auth_merge_email').text();
        }

        if (email.length) {
          url = `${url.split('?')[0]}?${qs.stringify({ email })}`;
        }

        $.get(url, { from }, (data) => {
          const $modalContent = $(`#${this.page}-modal-content`);
          $modalContent.html($.trim(data));
          const $form = $modalContent.find('form');
          $form.find('input').placeholder();
          this.initForgotPasswordValidation();
          this.initForgotPasswordEvents();
        });
      });
    } else {
      $('.forgot_password_container').find('input').placeholder();
    }
  }

  initForgotPasswordEvents() {
    const passwordStrength = new j.default(); // eslint-disable-line new-cap
    passwordStrength.check('[data-hook="new_password"]', {
      includeTips: true,
    });

    const $forgotPasswordPhone = $('.forgot-password-phone');
    const $forgotPasswordEmail = $('.forgot-password-email');
    const $confirmationCodeForm = $('.submit-confirmation-code');

    this.initCountrySelector($forgotPasswordPhone, 'forgot_password');

    $forgotPasswordPhone.find('.use-email-instead').on('click', (ev) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_method_change',
          operation: 'click',
          from_method: 'phone',
          to_method: 'email',
        },
      });
      ev.preventDefault();
      this.clearErrorMessage();
      $forgotPasswordPhone.addClass('hide');
      $forgotPasswordEmail.removeClass('hide');
    });

    $forgotPasswordEmail.find('.use-phone-instead').on('click', (ev) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_method_change',
          operation: 'click',
          from_method: 'email',
          to_method: 'phone',
        },
      });
      ev.preventDefault();
      this.clearErrorMessage();
      $forgotPasswordEmail.addClass('hide');
      $forgotPasswordPhone.removeClass('hide');
    });

    $confirmationCodeForm.find('.change-phone-number').on('click', (ev) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_change_phone_number',
          operation: 'click',
        },
      });
      ev.preventDefault();
      this.clearErrorMessage();
      $confirmationCodeForm.addClass('hide');
      $forgotPasswordPhone.removeClass('hide');
    });

    $('.resend-confirmation-code').on('click', (ev) => {
      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: 'forgot_password_resend_sms',
          operation: 'click',
        },
      });
      ev.preventDefault();
      this.submitForgotPasswordPhone($forgotPasswordPhone);
    });

    this.initConfirmationCodeInputEvent($confirmationCodeForm);
  }

  initForgotPasswordValidation() {
    jQuery.validator.addMethod('checkConfirmPassword', value => value === null || $('.submit-new-password input[name="password"]').val() === value);
    $('.forgot-password-email').validate($.extend({}, this.getForgotPasswordValidationOptions('email'), {
      rules: D.validationRules.forgot_password_email,
    }, {
      messages: (0, D.localizedMessages)(),
    }));
    $('.forgot-password-phone').validate($.extend({}, this.getForgotPasswordValidationOptions('phone'), {
      rules: this.fixSignupKeys(D.validationRules.forgot_password_phone),
    }, {
      messages: this.fixSignupKeys((0, D.localizedMessages)()),
    }));
    $('.submit-confirmation-code').validate($.extend({}, this.getForgotPasswordValidationOptions('phone_confirmation'), {
      rules: D.validationRules.phone_confirmation_code,
    }, {
      messages: (0, D.localizedMessages)(),
    }));
    $('.submit-new-password').validate($.extend({}, this.getForgotPasswordValidationOptions('reset_password'), {
      rules: D.validationRules.reset_password,
    }, {
      messages: (0, D.localizedMessages)(),
    }));
  }

  submitForgotPasswordEmail($form) {
    $.post($form.attr('action'), $form.serialize(), () => {
      window.location.reload();
    }, 'json');
  }

  submitForgotPasswordPhone($form) {
    $.post($form.attr('action'), {
      phone_number: this.getPhoneNumberInput($form),
      check_phone_number_exist: true,
      check_login_identifier: true,
    }, (data) => {
      if (data.success) {
        $('.submit-confirmation-code .mobile-national-number').html(data.national_number);
        $('.submit-confirmation-code input[name="phone_number"]').val(data.international_number);
        $('.submit-new-password input[name="phone_number"]').val(data.international_number);

        this.clearErrorMessage();

        $('.forgot-password-phone').addClass('hide');
        $('.submit-confirmation-code').removeClass('hide');
        $('.submit-confirmation-code input[type!="hidden"]').first().focus();
      } else {
        this.showErrorMessage(data.message);
      }
    }, 'json').fail(() => {
      this.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  submitForgotPasswordPhoneConfirmation($form) {
    $.post($form.attr('action'), $form.serialize(), (data) => {
      if (data.success) {
        $('.submit-new-password input[name="verification_code"]').val($('.submit-confirmation-code input[name="verification_code"]').val());
        this.clearErrorMessage();
        $('.submit-confirmation-code').addClass('hide');

        if (this.inAlipayApp()) {
          this.handleForgotPasswordAlipayAccountLinking(data.profile_pic_url);
        }

        $('.submit-new-password').removeClass('hide');
        $('.submit-new-password input[type!="hidden"]').first().focus();
      } else {
        this.showErrorMessage(data.message);
      }

      $('.submit-confirmation-code .control-group').removeClass('loading');
    }, 'json').fail(() => {
      this.showErrorMessage(h.default.t('user.login.generic_error'));
      $('.submit-confirmation-code .control-group').removeClass('loading');
    });
  }

  submitForgotPasswordReset($form) {
    $.post($form.attr('action'), $form.serialize(), (data) => {
      if (data.success) {
        if (data.redirect_url) {
          window.location.replace(data.redirect_url);
        } else {
          window.location.reload();
        }
      } else {
        this.showErrorMessage(data.message);
        $('.reset-password-submit').removeClass('disabled');
      }
    }, 'json').fail(() => {
      this.showErrorMessage(h.default.t('user.login.generic_error'));
    });
  }

  handleForgotPasswordAlipayAccountLinking(e) {
    const t = this;
    $('.alipay-account-linking-fp img').attr('src', e);
    $('.alipay-account-linking-fp button').on('click', () => {
      $('.alipay-account-linking-fp').addClass('loading');
      $.post('/users/alipay_account_linking_related_operations', {
        phone_number: $('.submit-new-password input[name="phone_number"]').val(),
        redirect_url: $('.submit-new-password input[name="redirect_url"]').val(),
      }, (data) => {
        $('.alipay-account-linking-fp').removeClass('loading');
        if (data.success) {
          if (data.redirect_url) {
            window.location.replace(data.redirect_url);
          } else {
            window.location.reload();
          }
        } else {
          t.showErrorMessage(data.message);
        }
      }, 'json').fail(() => {
        $('.alipay-account-linking-fp').removeClass('loading');
        t.showErrorMessage(h.default.t('user.login.generic_error'));
      });
    });
    $('.alipay-account-linking-fp a').on('click', () => {
      t.clearErrorMessage();
      t.skipForgotPasswordAlipayAccountLinking();
    });
    $('.alipay-account-linking-fp').removeClass('hide');
    $('.forgot-password-panel-js').addClass('hide');
    $('.forgot_password_container').addClass('hide');
  }

  skipForgotPasswordAlipayAccountLinking() {
    $('.alipay-account-linking-fp').addClass('hide');
    $('.forgot-password-panel-js').removeClass('hide');
    $('.forgot_password_container').removeClass('hide');
  }

  getForgotPasswordValidationOptions(e) {
    return Object.assign({}, D.validationOptions, {
      submitHandler: (form) => {
        T.default.queueEvent({
          event_name: 'signup_login_flow',
          event_data: {
            sub_event: `forgot_password_${e}`,
            operation: 'submit',
            status: 'valid',
          },
        });
        this.disableSubmit(form);
        const $form = $(form);
        if (e === 'email') {
          this.submitForgotPasswordEmail($form);
        } else if (e === 'phone') {
          this.submitForgotPasswordPhone($form);
        } else if (e === 'phone_confirmation') {
          this.submitForgotPasswordPhoneConfirmation($form);
        } else if (e === 'reset_password') {
          this.submitForgotPasswordReset($form);
        }
      },
      invalidHandler: (ev, validator) => {
        if (validator.numberOfInvalids() > 0) {
          T.default.logEvent({
            event_name: 'signup_login_flow',
            event_data: {
              sub_event: `forgot_password_${e}`,
              operation: 'submit',
              status: 'invalid',
              reason: validator.invalid,
            },
          });
        }
      },
    }, this.getErrorPlacement($('.submit-new-password .password-strength')));
  }

  getErrorPlacement($element) {
    return {
      errorPlacement: (error, element) => {
        const $formGroup = element.parents('.control-group');
        $formGroup.addClass('invalid');
        error.prependTo($formGroup);
        element.one('focus', () => {
          this.clearError($formGroup);
        });
        if ($element.length) {
          $element.addClass('hide');
        }
      },
    };
  }

  inAlipayApp() {
    return $('.alipay-account-linking-fp, .alipay-account-linking-login').length > 0;
  }

  disableSubmit(form) {
    if (this.shouldDisableSubmitButton()) {
      $('[type="submit"]', form).prop('disabled', true);
    } else {
      $('[type="submit"]', form).addClass('disabled');
    }
  }

  enableSubmit(form) {
    if (this.shouldDisableSubmitButton()) {
      $('[type="submit"]', form).prop('disabled', false);
    } else {
      $('[type="submit"]', form).removeClass('disabled');
    }
  }

  shouldDisableSubmitButton() {
    return P.default.deliverExperiment('signup_form_disable_submit', {
      control: () => false,
      disable_button: () => true,
      treatment_unknown: () => false,
    });
  }

  showLoadingStateForSubmit(form) {
    $('[type="submit"]', form).addClass('loading');
  }

  removeLoadingStateForSubmit(form) {
    $('[type="submit"]', form).removeClass('loading');
  }

  autoSelectOption(input, value) {
    const $option = $(input).val(value);
    $option.prop('selected', 'selected');
  }

  defaultBirthdayYear() {
    const year = (new Date()).getFullYear();
    return year - 18;
  }

  showUnderageUserModal() {
    const modal = new q.default(); // eslint-disable-line new-cap
    return modal.perform();
  }

  showRememberBrowserModal() {
    const modal = new N.default(); // eslint-disable-line new-cap
    return modal.perform();
  }

  afterAjaxSuccess() {
    this.broadcastLogin();
    (0, K.reportLoginEventToExternalPartners)();
  }

  ajaxSubmitFunction(form) {
    const $form = $(form);

    Airbnb.Airlock.post($form.attr('action'), {
      data: $form.serialize(),
    }).then((response) => {
      this.handleAuthResponse(response, $form.serializeObject());
      this.removeLoadingStateForSubmit($form);
      this.enableSubmit($form);
      $form.find('.control-group').removeClass('loading');
    }, (response) => {
      this.removeLoadingStateForSubmit($form);
      this.enableSubmit($form);

      let data = {};

      try {
        data = JSON.parse(response.responseText);
      } catch (e) {
        // do nothing
      }

      $form.find('.control-group').removeClass('loading');

      if (data && data.message) {
        this.showErrorMessage(data.message);
      } else {
        this.showErrorMessage(h.default.t('user.login.generic_error'));
      }
    });
  }

  startSignupSurveyFlow(e, callback) {
    (0, X.showSignupSurvey)(e).then(() => {
      callback();
    });
  }

  startAccountActivationFlow(callback) {
    (0, B.default)().then(() => {
      callback();
    });
  }

  startCommunityCommitmentFlow(callback) {
    (0, J.showCommunityCommitmentModalBeforeProceeding)({
      isInSignupFlow: true,
    }).then((t) => {
      if (!(t && t.canceledAccount)) {
        callback();
      }
    }).catch((t) => {
      callback();
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

  showErrorMessage(message = h.default.t('user.login.generic_error')) {
    this.getErrorContainer().html(`<i class="icon icon-alert-alt alert-icon"></i>${message}`).show();
  }

  clearErrorMessage() {
    this.getErrorContainer().hide();
  }

  initFacebookSignup() {
    const $facebookForm = $('#facebook_form.in_modal');
    $facebookForm.submit((ev) => {
      ev.preventDefault();
      this.ajaxSubmitFunction($facebookForm);
    });
  }

  clearError($formGroup) {
    $formGroup.removeClass('invalid');
    $formGroup.find('label.invalid').remove();
  }

  addLoginCallback(callback) {
    eventEmitter.removeListener('login', callback);
    eventEmitter.on('login', callback);
  }

  addLogoutCallback(callback) {
    eventEmitter.removeListener('logout', callback);
    eventEmitter.on('logout', callback);
  }

  addFlow(flow) {
    this.flow = flow;
    (0, y.default)('signup_flow', flow, {
      path: '/',
    });
  }

  /**
   * @param {Element} $form
   * @returns {string}
   */
  getPhoneNumberInput($form) {
    return $form.find('.country-code-show :selected').val() + $form.find('input[name*="national_number"]').val().replace(/\D/g, '');
  }

  initCountrySelector($form, type) {
    $form.find('.phone-country-select__names').on('change', (ev) => {
      const $countrySelect = $form.find('.country-code-show');
      const selectedCode = $countrySelect.find(':selected').val();
      const prefix = $(ev.currentTarget).find(':selected').data('prefix');

      T.default.logEvent({
        event_name: 'signup_login_flow',
        event_data: {
          sub_event: `${type}_country_code_change`,
          operation: 'click',
          from_code: selectedCode,
          to_code: prefix,
        },
      });

      $countrySelect.html(`<option value="${prefix}" selected>+${prefix}</option>`);
    });
  }

  initSignInOutListeners() {
    eventEmitter.on('login', this.onLogin);
    eventEmitter.on('logout', this.onLogout);

    if (typeof window !== 'undefined') {
      $(window).on('storage', (ev) => {
        if (ev.originalEvent.key === 'logged_in_event') {
          eventEmitter.emit(ev.originalEvent.newValue === 'true' ? 'login' : 'logout');
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

    const $form = $('<form />');
    $form.hide().attr({
      method: 'POST',
      action: '/logout',
    });

    $(document.body).append($form);
    $form.submit();

    this.clearOnLogout();
    this.broadcastLoggedInStatusToOtherTabs(false);
    eventEmitter.emit('logout');
  }

  broadcastLogin(e) {
    eventEmitter.emit('login', e);
    this.broadcastLoggedInStatusToOtherTabs(true);
  }

  onLogin() {
    u.default.reset();
    T.default.addContext({
      user_id: u.default.current().id,
    });
    Airbnb.header.personalizeHeader();
  }

  onLogout() {
    T.default.addContext({
      user_id: null,
    });
    Airbnb.header.personalizeHeader();
    L.default.launchLogout();
  }

  broadcastLoggedInStatusToOtherTabs(e) {
    if (window.localStorage) {
      window.localStorage.setItem('logged_in_event', e);
    }
  }

  /**
   * @param {string} page
   */
  trackInternalLinks(page) {
    if (page === 'login') {
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
    } else if (page === 'signup') {
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

SignupLoginForm.loginCallbacks = [];
SignupLoginForm.logoutCallbacks = [];

export default window.GoaSignupLoginForm ? window.GoaSignupLoginForm : (window.GoaSignupLoginForm = new SignupLoginForm);
