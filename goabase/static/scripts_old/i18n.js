import _ from 'lodash';
import Gettext from 'node-gettext';

import deTranslations from './translations/de.json';
import enTranslations from './translations/en.json';

function convert(json) {
  const po = {
    headers: json[''],
    translations: { '': {} },
  };
  _.forEach(json, (msgstr, key) => {
    const msg = {
      msgid: key,
      msgstr: _.drop(msgstr),
    };
    if (msgstr[0] !== null) {
      msg.msgid_plural = msgstr[0];
    }
    po.translations[''][key] = msg;
  });

  return po;
}

const i18n = new Gettext();
i18n.addTranslations('de', 'messages', convert(deTranslations));
i18n.addTranslations('en', 'messages', convert(enTranslations));
i18n.setLocale('en'); // !_.isUndefined(document) && document.documentElement.lang || 'en');

export default i18n;
