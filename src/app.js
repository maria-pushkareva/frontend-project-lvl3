import _ from 'lodash';
import i18n from 'i18next';
import { setLocale } from 'yup';
import startView from './view.js';
import validate from './validate.js';
import en from './locales/en.js';
import { handleSubmit } from './handlers.js';

export default () => {
  const state = {
    form: {
      state: '',
      error: null,
    },
    feeds: [],
    posts: [],
  };

  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'en',
    debug: true,
    resources: { en },
  }).then(() => setLocale({
    mixed: {
      notOneOf: i18nInstance.t('validation.notOneOf'),
      required: i18nInstance.t('validation.required'),
    },
    string: {
      url: i18nInstance.t('validation.url'),
    },
  }));

  const watchedState = startView(state);

  const rssForm = document.querySelector('.rss-form');

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(e, watchedState);
  });
};