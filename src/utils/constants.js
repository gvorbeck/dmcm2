import React from 'react';
import {
  ArrowDownward,
  ArrowUpward,
  Info,
  Map,
} from '@mui/icons-material';
// UTILITY: METADATA
export const SITE_NAME = 'Dungeon Master\'s Campaign Manager';
export const SITE_SHORT_NAME = 'DMCM';
// COMPONENT: LAYOUT
export const FOOTER_COPY = `${SITE_NAME} © ${new Date().getFullYear()} J. Garrett Vorbeck`;
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
// PAGE: ADVENTURE LANDING PAGE
export const NPCS = 'NPCs';
export const LOCATIONS = 'Locations';
// PAGE: ADVENTURE LOCATION
export const LOCATION_NAVIGATION = [
  {
    name: 'Map',
    anchor: 'map',
    icon: <Map />,
  },
  {
    name: 'General Info',
    anchor: 'general',
    icon: <Info />,
  },
  {
    name: 'Up',
    anchor: 'up',
    icon: <ArrowUpward />,
  },
  {
    name: 'Down',
    anchor: 'down',
    icon: <ArrowDownward />,
  },
];
export const GENERAL_INFORMATION = 'General Information';
export const UNKNOWN_ROOM_FLAG = 'The flag listed in this location\'s frontmatter is unrecognized.';
// PAGE: REFERENCES
export const REFERENCE = 'Reference';
export const TABLE_OF_CONTENTS = 'Table of Contents';
// PAGE: SEARCH
export const BESTIARY = 'Bestiary';
export const SPELLBOOK = 'Spellbook';
export const UNKNOWN_SEARCH_TYPE = 'category url param missing';
export const LIFE_STAT_NAMES = ['Armor Class', 'Hit Points'];
export const STRING_STAT_NAMES = ['Speed', 'Saving Throws', 'Skills'];
export const SIMPLE_STAT_NAMES = ['Damage Vulnerabilities', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Senses', 'Languages', 'Challenge'];
export const INFO_STAT_NAMES = ['Traits', 'Actions', 'Reactions', 'Legendary Actions'];
export const SPELL_STAT_NAMES = ['Casting Time', 'Range', 'Components', 'Duration', 'Attack/Save', 'Damage'];
