// UTILITY: METADATA
export const SITE_NAME = 'Dungeon Master\'s Campaign Manager';
export const SITE_SHORT_NAME = 'DMCM';
// COMPONENT: LAYOUT
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
// COMPONENT: ADVENTURE-DETAILS
export const SETTING = 'Setting';
export const PLAYERS = 'Players';
export const LEVELS = 'Levels';
// COMPONENT: NPC-TABLE
export const HEADER_CELLS = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'race',
    numeric: false,
    label: 'Race',
  },
  {
    id: 'location',
    numeric: false,
    label: 'Location',
  },
  {
    id: 'occupation',
    numeric: false,
    label: 'Job',
  },
  {
    id: 'age',
    numeric: true,
    label: 'Age',
  },
  {
    id: 'stats',
    numeric: false,
    label: 'Stats',
  },
  {
    id: 'emotion',
    numeric: false,
    label: 'Emotion',
  },
  {
    id: 'motive',
    numeric: false,
    label: 'Motive',
  },
  {
    id: 'voice',
    numeric: false,
    label: 'Voice',
  },
];
// PAGE: INDEX
export const GREETING = 'Hail fellow well met.';
export const DESCRIPTION = 'The DMCM is a React-based campaign manager for your favorite 5E TTRPG.';
// PAGE: ADVENTURES
export const ADVENTURES = 'Adventures';
