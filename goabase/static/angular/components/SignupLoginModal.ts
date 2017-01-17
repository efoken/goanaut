import _ = require('lodash');
import $ = require('jquery');
import qs from 'qs';

import eventEmitter from '../eventEmitter';

const o: any = {};
const f: any = {};
// const k = {};

export const MODAL_TYPE_LOGIN = 'login';
export const MODAL_TYPE_LOGOUT = 'logout';
export const MODAL_TYPE_OTP = 'otp';
export const MODAL_TYPE_SIGNUP = 'signup';

interface ISignupModalOptions {
  redirectUrl?: string;
  launchType?: string;
  ajaxEndpoint?: string;
  businessEmail?: string;
  email?: string;
  urlParams?: string;
  customType?: string;
  onModalShow?: Function;
  onModalChange?: Function;
  $container?: JQuery;
}

class SignupLoginModal {
  /** @var {Object} */
  private modals = {};

  /** @var {Boolean} */
  private modalIsLoading = false;

  /**
   * @param {ISignupModalOptions} options
   */
  public launchSignup(options: ISignupModalOptions = {}): void {
    const params = {
      ajax_endpoint: undefined,
      business_email: undefined,
      email: undefined,
      launch_type: undefined,
      path: window.location.pathname,
      redirect_url: undefined,
    };

    if (options.redirectUrl) {
      params.redirect_url = options.redirectUrl;
    }
    if (options.launchType === 'auto') {
      params.launch_type = 'auto';
    }
    if (options.ajaxEndpoint) {
      params.ajax_endpoint = options.ajaxEndpoint;
    }
    if (options.businessEmail) {
      params.business_email = options.businessEmail;
    }
    if (options.email) {
      params.email = options.email;
    }

    if (options.urlParams) {
      options.urlParams = `${options.urlParams}&${qs.stringify(params)}`;
    } else {
      options.urlParams = qs.stringify(params);
    }

    const search = this.getWindowLocationSearch();
    if (search.length > 0) {
      options.urlParams = `${options.urlParams}&${search.slice(1)}`;
    }

    this.setupSignupLogin(MODAL_TYPE_SIGNUP, _.assign({}, options, {
      callback: () => {
        // (0, k.default)();
        if (o.callback) {
          o.callback();
        }
      },
      onFinishedFlow: () => {
        // (0, k.default)();
        if (o.onFinishedFlow) {
          o.onFinishedFlow();
        }
      },
      prioritizedCallbackReturningPromise: () => {
        // (0, k.default)();
        return o.prioritizedCallbackReturningPromise ? o.prioritizedCallbackReturningPromise() : Promise.resolve();
      },
    }));
  }

  /**
   * @param {ISignupModalOptions} options
   */
  public launchSignupOrLogin(options: ISignupModalOptions): void {
    if (f.default('hli')) {
      this.launchLogin(options);
    } else {
      this.launchSignup(options);
    }
  }

  /**
   * @param {ISignupModalOptions} options
   */
  public launchLogin(options: ISignupModalOptions): void {
    this.setupSignupLogin(MODAL_TYPE_LOGIN, options);
  }

  /**
   * @param {ISignupModalOptions} options
   */
  public launchLogout(options: ISignupModalOptions): void {
    this.setupSignupLogin(MODAL_TYPE_LOGOUT, options);
  }

  /**
   */
  public launchOtp(): void {
    this.setupSignupLogin(MODAL_TYPE_OTP);
  }

  /**
   */
  public init(): void {
    this.initEvents();
    this.initClickEvents();
    // setTimeout(v.default.initSignupPrompt, 0);
  }

  /**
   * @return {String}
   */
  private getWindowLocationSearch(): string {
    return window.location.search;
  }

  /**
   * @param {String} type
   * @param {ISignupModalOptions} options
   */
  private setupSignupLogin(type: string, options: ISignupModalOptions = {}): void {
    const modalUrl = this.getModalUrl(type, options.urlParams);

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
      $.get(modalUrl, this.getRequestParams(options), (data) => {
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

        if ([MODAL_TYPE_SIGNUP, MODAL_TYPE_LOGIN].indexOf(type) !== -1) {
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

        if (options.launchType === 'auto') {
          // v.default.addModalBackground();
        }

        $element.on('click', '.modal-link', this.handleModalChange.bind(this, _.omit(options, ['$container'])));
        if (type === MODAL_TYPE_LOGOUT) {
          this.listenForLogin();
        }
        this.modals[name] = $modal;
      });
    }

    // if (options.callback) {
    //   g.default.addLoginCallback(options.callback);
    // }

    // if (options.flow) {
    //   g.default.addFlow(options.flow);
    // }
  }

  /**
   * @param {ISignupModalOptions} options
   * @param {JQueryEventObject} event
   */
  private handleModalChange(options: ISignupModalOptions, event: JQueryEventObject): void {
    event.preventDefault();

    if (options.onModalChange) {
      options.onModalChange();
    }

    const type = $(event.target).data('modalType');

    switch (type) {
      case MODAL_TYPE_LOGIN:
        this.launchLogin(options);
        break;
      case MODAL_TYPE_SIGNUP:
        this.launchSignup(options);
        break;
    }
  }

  /**
   */
  private hideModals(): void {
    _.values(this.modals).filter(el => el).forEach((el) => {
      el.modal('hide');
    });
  }

  /**
   * @param {String} type
   * @param {Boolean} loading
   */
  private setLoading(type: string, loading: boolean): void {
    const $modal = $(`#header [data-${type}-modal]`);

    if (loading) {
      this.modalIsLoading = true;
      $modal.addClass('link-disabled');
      $modal.attr('disabled', 'disabled');
    } else {
      // v.default.removeSignupGardenBanner();
      this.modalIsLoading = false;
      $modal.removeClass('link-disabled');
      $modal.removeAttr('disabled');
    }
  }

  /**
   * @param {String} type
   * @param {String} params
   * @return {String}
   */
  private getModalUrl(type: string, params: string): string {
    let url;

    switch (type) {
      case MODAL_TYPE_LOGIN:
        url = '/accounts/login/';
        break;
      case MODAL_TYPE_SIGNUP:
        url = '/accounts/signup/';
        break;
      case MODAL_TYPE_LOGOUT:
        url = '/signed_out_modal';
        break;
      case MODAL_TYPE_OTP:
        url = '/otp_modal';
        break;
    }

    return params ? `${url}?${params}` : url;
  }

  /**
   */
  private initEvents(): void {
    eventEmitter.on('login-modal:show', this.launchLogin.bind(this));
    eventEmitter.on('signup-modal:show', this.launchSignup.bind(this));
    eventEmitter.on('otp-modal:show', this.launchOtp.bind(this));
    eventEmitter.on('signup-login-modals:hide', this.hideModals.bind(this));
  }

  /**
   */
  private initClickEvents(): void {
    if (!_.includes(['/accounts/login/', '/accounts/signup/'], window.location.pathname)) {
      $(document).on('click', '[data-login-modal]', (event) => {
        event.preventDefault();
        eventEmitter.emit('login-modal:show');
      });
      $(document).on('click', '[data-signup-modal]', (event) => {
        event.preventDefault();
        eventEmitter.emit('signup-modal:show');
      });
    }
  }

  /**
   */
  private listenForLogin(): void {
    eventEmitter.once('login', (value) => {
      if (!value || value.refresh === true) {
        window.location.reload();
      }
    });
  }

  /**
   * @param {Array<any>} args
   * @return {any}
   */
  private getRequestParams(...args): any {
    const options = args.length > 0 && args[0] !== undefined ? args[0] : {};
    const params: any = {};

    if (options.$container) {
      params.embed = 1;
    }
    if (options.redirectUrl) {
      params.redirect_url = options.redirectUrl;
    }

    return params;
  }
}

if (!((<any>window).GoaSignupLoginModal instanceof SignupLoginModal)) {
  (<any>window).GoaSignupLoginModal = SignupLoginModal;
}
export default (<any>window).GoaSignupLoginModal;
