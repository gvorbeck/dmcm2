/*
** ?? Custom Icon Rating for creature health bar? on monster result.
** ?? FAB for search result page to return to seach bar. could appear when search bar is off screen?
** ?? Monster result uses Avatar (mui) wrapped in Tooltip (mui) to get
** species and info icons with hover.
*/

/*
NO NEED FOR URL PARAMS?? USE TO.STATE??
*/

import React from 'react';
import { graphql } from 'gatsby';
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import MarkdownView from 'react-showdown';
import Layout from '../components/Layout/Layout';
import {
  BESTIARY,
  SPELLBOOK,
  UNKNOWN_SEARCH_TYPE,
  SIMPLE_STAT_NAMES,
  STRING_STAT_NAMES,
  LIFE_STAT_NAMES,
  INFO_STAT_NAMES,
  SPELL_STAT_NAMES,
} from '../utils/constants';
import * as CREATURE_TYPES from '../images/creature-types';
import * as MAGIC_TYPES from '../images/magic-types';

function SearchForm({
  data, setValue, value, searchTitle,
}) {
  return (
    <Box>
      <Paper>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={data}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label={searchTitle}
              placeholder="Search"
            />
          )}
          value={value || []}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Paper>
    </Box>
  );
}

function SearchResults({ value, category }) {
  return (
    <Box
      sx={{
        marginTop: 2,
      }}
    >
      <List
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 50%)',
          gap: 2,
        }}
      >
        {value.map((item) => (
          <SearchResultsItem key={item.name} item={item} category={category} />
        ))}
      </List>
    </Box>
  );
}

function SearchResultsItem({ category, item }) {
  return (
    <ListItem
      sx={{
        padding: 0,
        display: 'block',
      }}
    >
      <Box component="article">
        <Paper
          sx={{
            px: 2,
            py: 1,
          }}
        >
          <SearchResultsItemHeader category={category} item={item} />
          <SearchResultsItemContent category={category} item={item} />
        </Paper>
      </Box>
    </ListItem>
  );
}
function SearchResultsItemHeader({ category, item }) {
  let Avatar;
  let subtitle;
  if (category === 'monsters') {
    Object.keys(CREATURE_TYPES).forEach((c) => {
      if (item.type.toUpperCase().search(c.toUpperCase()) > -1) {
        Avatar = CREATURE_TYPES[c];
      }
    });
    subtitle = item.type;
  } else if (category === 'spells') {
    Object.keys(MAGIC_TYPES).forEach((m) => {
      if (item.school.toUpperCase().search(m.toUpperCase()) > -1) {
        Avatar = MAGIC_TYPES[m];
      }
    });
    subtitle = `${item.level}  ${item.school}  ${item.ritual}`;
  }
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
      }}
    >
      <SvgIcon
        component={Avatar}
        inheritViewBox
        sx={{
          width: 48,
          height: 48,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          letterSpacing: '3px',
        }}
      >
        {item.name}
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        {subtitle}
      </Typography>
      <Divider />
    </Box>
  );
}

function SearchResultsItemContent({ category, item }) {
  const content = category === 'monsters' ? <SearchResultItemContentMonster monster={item} /> : <SearchResultItemContentSpell spell={item} />;
  return (
    <Box
      sx={{
        marginTop: 4,
      }}
    >
      {content}
    </Box>
  );
}

function SearchResultItemContentMonster({ monster }) {
  return (
    <>
      <MonsterAbilityList abilities={monster.abilities} />
      <MonsterStats
        ac={monster.ac}
        hp={monster.hp}
        speed={monster.speed}
        saves={monster.saves}
        skills={monster.skills}
        dmgvulnerabilities={monster.dmgvulnerabilities}
        dmgresistances={monster.dmgresistances}
        dmgimmunities={monster.dmgimmunities}
        cdnimmunities={monster.cdnimmunities}
        senses={monster.senses}
        languages={monster.languages}
        challenge={monster.challenge}
      />
      <MonsterInformation
        traits={monster.traits}
        actions={monster.actions}
        reactions={monster.reactions}
        lgdyactions={monster.lgdyactions}
      />
    </>
  );
}

function MonsterAbilityList({ abilities }) {
  return (
    <ButtonGroup
      sx={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {Object.keys(abilities).map((ability) => {
        const modifier = Math.floor((abilities[ability] - 10) / 2);
        return (
          <Button
            key={ability}
            modifier={Math.floor((abilities[ability] - 10) / 2)}
            sx={{
              '& span': {
                display: 'block',
                lineHeight: 1,
              },
              display: 'flex !important',
              flexDirection: 'column',
              flex: '1 1 0',
            }}
          >
            <Box
              component="span"
              sx={{
                typography: 'h4',
              }}
            >
              {abilities[ability]}
            </Box>
            <Box
              sx={{
                my: 0.5,
                lineHeight: 1,
              }}
            >
              {modifier > 0 ? `+${modifier}` : modifier}
            </Box>
            <Box
              sx={{
                fontWeight: 700,
              }}
            >
              {ability}
            </Box>
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

function MonsterStats({
  ac,
  hp,
  speed,
  saves,
  skills,
  dmgvulnerabilities,
  dmgresistances,
  dmgimmunities,
  cdnimmunities,
  senses,
  languages,
  challenge,
}) {
  const simpleStat = (stat) => {
    const listItems = [];
    if (typeof stat === 'object' || typeof stat === 'string') {
      if (typeof stat === 'object' && stat !== null) {
        stat.forEach((s) => {
          listItems.push(<ListItem key={s}><ListItemText>{s}</ListItemText></ListItem>);
        });
      }
      if (typeof stat === 'string') {
        listItems.push(<ListItem key={stat}><ListItemText>{stat}</ListItemText></ListItem>);
      }
      return listItems;
    }
    console.error('Check your frontmatter or search.js');
    return `Error in frontmatter formatting for: ${stat} - refer to readme documentation.`;
  };

  return (
    <>
      <Box component="dl" sx={{ typography: 'body1' }}>
        {[ac, hp].map((stat, index) => (
          <Box key={LIFE_STAT_NAMES[index]}>
            <dt>{LIFE_STAT_NAMES[index]}</dt>
            <dd>{stat && (`${stat.value} ${stat.notes ? stat.notes : ''}`)}</dd>
          </Box>
        ))}
        {[speed, saves, skills].map((stat, index) => (
          <Box key={STRING_STAT_NAMES[index]}>
            <dt>{STRING_STAT_NAMES[index]}</dt>
            <dd>
              {stat && (
                <List>
                  {stat.map((s) => <ListItem key={s.name ? s.name : s}>{s.name ? (`${s.name} | ${s.modifier}`) : s}</ListItem>)}
                </List>
              )}
            </dd>
          </Box>
        ))}
        {[
          dmgvulnerabilities,
          dmgresistances,
          dmgimmunities,
          cdnimmunities,
          senses,
          languages,
          challenge,
        ].map((stat, index) => (
          <Box key={SIMPLE_STAT_NAMES[index]}>
            <dt>{SIMPLE_STAT_NAMES[index]}</dt>
            <dd>
              {stat && (
                <List>{simpleStat(stat)}</List>
              )}
            </dd>
          </Box>
        ))}
      </Box>
      <List />
    </>
  );
}

function MonsterInformation({
  traits, actions, reactions, lgdyactions,
}) {
  return (
    <List>
      {[traits, actions, reactions, lgdyactions].map((info, index) => (
        <ListItem key={Math.random()}>
          <Typography variant="h6">{INFO_STAT_NAMES[index]}</Typography>
          <Box component="dl">
            {info !== null && info.map((s) => (
              <Box key={s.name}>
                <dt>{s.name}</dt>
                <dd>{s.content}</dd>
              </Box>
            ))}
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

function SearchResultItemContentSpell({ spell }) {
  return (
    <>
      <SpellStats
        castingTime={spell.castingtime}
        range={spell.range}
        components={spell.components}
        duration={spell.duration}
        attackSave={spell.attacksave}
        damage={spell.damage}
      />
      <SpellInformation description={spell.description} source={spell.source} />
    </>
  );
}

function SpellStats({
  castingTime, range, components, duration, attackSave, damage,
}) {
  return (
    <Box component="dl">
      {[castingTime, range, components, duration, attackSave, damage].map((stat, index) => (
        <Box key={SPELL_STAT_NAMES[index]}>
          <dt>{SPELL_STAT_NAMES[index]}</dt>
          <dd>{stat}</dd>
        </Box>
      ))}
    </Box>
  );
}

function SpellInformation({ description, source }) {
  return (
    <>
      <MarkdownView markdown={description} />
      <Typography variant="body1">{source}</Typography>
    </>
  );
}

function SearchPage({ data, location }) {
  const search = new URLSearchParams(location.search.substring(1));
  const category = search.get('category');
  const searchData = {
    monsters: [],
    spells: [],
  };

  let searchTitle;
  if (category === 'monsters') {
    searchTitle = BESTIARY;
  } else if (category === 'spells') {
    searchTitle = SPELLBOOK;
  } else {
    searchTitle = UNKNOWN_SEARCH_TYPE;
  }

  if (category) {
    data.allMdx.edges.forEach((source) => {
      const content = source.node.frontmatter;
      if (content[category]) {
        content[category].forEach((obj) => {
          searchData[category].push(obj);
        });
      }
    });
    searchData[category].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    console.error('DMCM ERROR: URL Param: \'category\' is missing. Search will not work.');
  }

  let startingValue;
  if (location.state && location.state.query) {
    const result = searchData[category].filter((obj) => (
      obj.name.toUpperCase() === location.state.query.toUpperCase()
    ));
    startingValue = result;
  }
  const [value, setValue] = React.useState(startingValue || []);

  return (
    <Layout title={searchTitle}>
      <SearchForm
        searchTitle={searchTitle}
        value={value}
        setValue={setValue}
        data={searchData[category]}
      />
      <SearchResults value={value} category={category} />
    </Layout>
  );
}

export const query = graphql`
  query SearchQuery {
    allMdx(filter: {fields: {slug: {regex: "/monsters/|/spells/"}}}) {
      edges {
        node {
          frontmatter {
            monsters {
              name
              type
              ac {
                value
                notes
              }
              hp {
                value
                notes
              }
              speed
              abilities {
                str
                dex
                con
                int
                wis
                cha
              }
              saves {
                name
                modifier
              }
              skills {
                name
                modifier
              }
              senses
              languages
              challenge
              dmgvulnerabilities
              dmgresistances
              dmgimmunities
              cdnimmunities
              traits {
                name
                content
              }
              actions {
                name
                content
              }
              reactions {
                name
                content
              }
              lgdyactions {
                name
                content
              }
              description
              source
            }
            spells {
              name
              source
              castingtime
              classes
              components
              description
              duration
              level
              range
              ritual
              school
              attacksave
              damage
            }
          }
        }
      }
    }
  }
`;

export default SearchPage;
