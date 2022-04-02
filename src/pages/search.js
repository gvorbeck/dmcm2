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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import MarkdownView from 'react-showdown';
import CasinoIcon from '@mui/icons-material/Casino';
import Layout from '../components/Layout/Layout';
import {
  BESTIARY,
  SPELLBOOK,
  UNKNOWN_SEARCH_TYPE,
  SIMPLE_STAT_NAMES,
  TABLE_STAT_NAMES,
  LIFE_STAT_NAMES,
  INFO_STAT_NAMES,
  SPELL_STAT_NAMES,
  SPELL_LEVEL_LABEL,
  RITUAL_EXPLAINER,
  SPELL_STAT_ICONS,
} from '../utils/constants';
import * as CREATURE_TYPES from '../images/creature-types';
import * as MAGIC_TYPES from '../images/magic-types';

function SearchForm({
  data, setValue, value, searchTitle,
}) {
  // If the category changes, change the value to empty so that react doesn't attempt to
  // render results from one category as another category.
  // NOTE: There may be a better place for this, but for now this works.
  // React.useEffect(() => {
  //   setValue([]);
  // }, [category]);

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

function SearchResults({ value }) {
  return (
    <Box
      sx={{
        marginTop: 2,
      }}
    >
      {value.length > 0 && (
        <List
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 50%)',
            gap: 2,
          }}
        >
          {value.map((item) => (
            <SearchResultsItem key={item.name} item={item} />
          ))}
        </List>
      )}
    </Box>
  );
}

function SearchResultsItem({ item }) {
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
          <SearchResultsItemHeader item={item} />
          <SearchResultsItemContent item={item} />
        </Paper>
      </Box>
    </ListItem>
  );
}
function SearchResultsItemHeader({ item }) {
  let Avatar;
  let subtitle;
  let tooltip = '';
  if (item.type) {
    Object.keys(CREATURE_TYPES).forEach((c) => {
      if (item.type.toUpperCase().search(c.toUpperCase()) > -1) {
        Avatar = CREATURE_TYPES[c];
        tooltip = item.type;
      }
    });
    subtitle = item.type;
  } else if (item.school) {
    Object.keys(MAGIC_TYPES).forEach((m) => {
      if (item.school.toUpperCase().search(m.toUpperCase()) > -1) {
        Avatar = MAGIC_TYPES[m];
        tooltip = item.school;
      }
    });
    const ritualExplainer = RITUAL_EXPLAINER;
    const ritual = item.ritual ? (
      <Box
        component="span"
        title={ritualExplainer}
        sx={{
          borderBottom: '1px dashed',
          cursor: 'help',
        }}
      >
        ritual
      </Box>
    ) : 'spell';
    subtitle = [`${SPELL_LEVEL_LABEL} ${item.level}, ${item.school} `, ritual];
  } else {
    console.error('Searched item not recognized. Make sure your content follows frontmatter guidelines.');
  }
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
      }}
    >
      <Tooltip title={tooltip}>
        <SvgIcon
          inheritViewBox
          sx={{
            width: 48,
            height: 48,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <Avatar />
        </SvgIcon>
      </Tooltip>
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

function SearchResultsItemContent({ item }) {
  const content = (
    item.type && <SearchResultItemContentMonster monster={item} />
  ) || (
    item.school && <SearchResultItemContentSpell spell={item} />
  );
  return (
    <Box
      sx={{
        marginTop: 4,
      }}
    >
      {content}
      <Typography
        variant="body2"
        sx={{
          fontStyle: 'italic',
        }}
      >
        {item.source}
      </Typography>
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
                typography: 'h5',
                fontWeight: 700,
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
  traits,
  actions,
  reactions,
  lgdyactions,
}) {
  const simpleStat = (stat) => {
    const listItems = [];
    if (typeof stat === 'object' || typeof stat === 'string') {
      if (typeof stat === 'object' && stat !== null) {
        stat.forEach((s) => {
          listItems.push(s);
        });
      }
      if (typeof stat === 'string') {
        listItems.push(stat);
      }
      return listItems.join(', ');
    }
    console.error('Check your frontmatter or search.js');
    return `Error in frontmatter formatting for: ${stat} - refer to readme documentation.`;
  };
  const speedRegEx = /^\d+\sft\./;

  return (
    <List
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        typography: 'body1',
      }}
    >
      {[ac, hp].map((stat, index) => (
        <ListItem
          key={Math.random()}
          sx={{
            flex: '1 1 50%',
          }}
          secondaryAction={index === 1 ? (
            <Tooltip title="Roll Dice">
              <IconButton edge="end" aria-label="Roll Dice">
                <CasinoIcon />
              </IconButton>
            </Tooltip>
          ) : ''}
        >
          <ListItemText
            primary={LIFE_STAT_NAMES[index]}
            secondary={stat && (`${stat.value} ${stat.notes ? stat.notes : ''}`)}
          />
        </ListItem>
      ))}
      {[speed, saves, skills, senses].map((stat, index) => stat && (
        <ListItem
          key={TABLE_STAT_NAMES[index].title}
          sx={{
            display: 'block',
            flex: '2 2 100%',
          }}
        >
          <ListItemText primary={TABLE_STAT_NAMES[index].title} />
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 10,
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  {TABLE_STAT_NAMES[index].columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stat.map((s) => {
                  // 0 = Movement speed(s)
                  // 3 = Senses
                  if (index === 0 || index === 3) {
                    // Created tableRow(array) to avoid code duplication.
                    return (
                      <MonsterStatsTableRow
                        key={s}
                        cells={[
                          speedRegEx.test(s) ? 'walk' : s.split(' ')[0],
                          speedRegEx.test(s) ? s : s.slice(s.indexOf(' ') + 1),
                        ]}
                        textTransform="capitalize"
                      />
                    );
                  }
                  return (
                    <MonsterStatsTableRow
                      key={s.name}
                      cells={[
                        s.name,
                        s.modifier >= 0 ? `+${s.modifier}` : s.modifier,
                      ]}
                      textTransform={index === 2 ? 'capitalize' : 'uppercase'}
                      button
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
      ))}
      {[
        dmgvulnerabilities,
        dmgresistances,
        dmgimmunities,
        cdnimmunities,
        languages,
        challenge,
      ].map((stat, index) => stat && (
        <ListItem
          key={SIMPLE_STAT_NAMES[index]}
          sx={{
            flex: '1 1 50%',
          }}
        >
          <ListItemText primary={SIMPLE_STAT_NAMES[index]} secondary={simpleStat(stat)} />
        </ListItem>
      ))}
      {[traits, actions, reactions, lgdyactions].map((stat, index) => stat && (
        <ListItem
          key={INFO_STAT_NAMES[index]}
          sx={{
            flex: '2 2 100%',
            display: 'block',
          }}
        >
          <ListItemText primary={INFO_STAT_NAMES[index]} />
          <Divider />
          <List disablePadding>
            {stat.map((s) => (
              <ListItem key={s.name}>
                <ListItemText primary={s.name} secondary={s.content} />
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
}

function MonsterStatsTableRow({ cells, textTransform, button }) {
  const rollButton = (
    <Tooltip title="Roll Dice">
      <IconButton
        size="small"
        aria-label="Roll Dice"
        sx={{
          ml: 1,
        }}
      >
        <CasinoIcon />
      </IconButton>
    </Tooltip>
  );
  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }}
    >
      {cells.map((cell, index) => (
        <TableCell
          key={cell}
          sx={{
            textTransform: textTransform || 'none',
          }}
        >
          <Box component="span">{cell}</Box>
          {(button && index > 0) ? rollButton : ''}
        </TableCell>
      ))}
    </TableRow>
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
      <MarkdownView markdown={spell.description} />
    </>
  );
}

function SpellStats({
  castingTime, range, components, duration, attackSave, damage,
}) {
  return (
    <List
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        typography: 'body1',
      }}
      dense
    >
      {[castingTime, range, components, duration, attackSave, damage].map((stat, index) => (
        <ListItem
          key={SPELL_STAT_NAMES[index]}
          sx={{
            flex: '1 1 50%',
          }}
        >
          <ListItemIcon>
            {// Put a tooltip on the "Components" stat icon.
            index === 2 ? (
              <Tooltip title="Verbal (V), Somatic (S), or Material (M)">
                {SPELL_STAT_ICONS[index]}
              </Tooltip>
            ) : SPELL_STAT_ICONS[index]
            }
          </ListItemIcon>
          <ListItemText primary={SPELL_STAT_NAMES[index]} secondary={stat} />
        </ListItem>
      ))}
    </List>
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
        category={category}
      />
      <SearchResults value={value} />
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
