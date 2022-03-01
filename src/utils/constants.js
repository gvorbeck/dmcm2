import theme from '../theme';

// UTILITY: COLORS
export const COLOR_PRIMARY_MAIN = theme.palette.primary.main;
export const COLOR_SECONDARY_MAIN = theme.palette.secondary.main;
export const COLOR_TERTIARY_MAIN = theme.palette.tertiary.main;
export const COLORS = {
  primary: theme.palette.primary,
  secondary: theme.palette.secondary,
  tertiary: theme.palette.tertiary,
};
// COMPONENT: LAYOUT
export const SITE_SHORT_NAME = 'DMCM';
export const FOOTER_COPY = `© ${new Date().getFullYear()} J. Garrett Vorbeck`;
// COMPONENT: NAVIGATION
export const NAVIGATION_DATA = [
  {
    title: 'adventures',
    slug: '/adventures',
  },
  {
    title: 'bestiary',
    slug: '/search/?category=monsters',
  },
  {
    title: 'reference',
    slug: '/reference',
  },
  {
    title: 'spellbook',
    slug: '/search/?category=spells',
  },
];
// PAGE: INDEX
export const GREETING = 'Hail fellow well met.';
export const DESCRIPTION = 'The DMCM is a React-based campaign manager for your favorite 5E TTRPG.';
