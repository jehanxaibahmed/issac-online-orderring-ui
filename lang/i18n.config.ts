import translations from './index';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'EN',
  messages: translations,
}));
