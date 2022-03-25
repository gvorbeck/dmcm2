import React from 'react';
import { graphql, navigate } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  Alert,
  Box,
  ButtonGroup,
  Card,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link, Button } from 'gatsby-theme-material-ui';
import MarkdownView from 'react-showdown';
import Layout from '../Layout/Layout';
import DmcmSpeedDialIcon from '../../images/read.svg';
import DmcmPersonIcon from '../../images/person.svg';
import DmcmEvilMinionIcon from '../../images/evil-minion.svg';
import DmcmSecretDoorIcon from '../../images/secret-door.svg';
import DmcmSixEyesIcon from '../../images/six-eyes.svg';
import DmcmTreasureChestIcon from '../../images/open-treasure-chest.svg';
import DmcmTrapIcon from '../../images/wolf-trap.svg';
import DmcmBullyMinionIcon from '../../images/bully-minion.svg';
import DmcmDiceRandomIcon from '../../images/perspective-dice-six-faces-random.svg';
import {
  LOCATION_NAVIGATION, UNKNOWN_ROOM_FLAG, GENERAL_INFORMATION, SCROLL_MARGIN_TOP,
} from '../../utils/constants';

function AdventureBreadcrumb({ parentAdventureSlug, parentAdventureTitle }) {
  return (
    <Box>
      <Link sx={{ typography: 'subtitle1', color: 'primary.light' }} to={parentAdventureSlug}>{parentAdventureTitle}</Link>
    </Box>
  );
}

function LocationNavigation({ parentAdventureSlug, parentAdventureTitle, currentLocation }) {
  const navigator = (anchor) => {
    if (anchor === 'up' || anchor === 'down') {
      if (currentLocation === '#map') {
        if (anchor === 'down') {
          return '#general';
        }
      }
      if (currentLocation === '#general') {
        if (anchor === 'up') {
          return '#map';
        }
        if (anchor === 'down') {
          return '#1';
        }
      }
      if (currentLocation === '#1') {
        if (anchor === 'up') {
          return '#general';
        }
        if (anchor === 'down') {
          return '#2';
        }
      }
      if (currentLocation === '') {
        return '#1';
      }
      if (anchor === 'up') {
        return (`#${parseInt(currentLocation.substring(1), 10) - 1}`);
      }
      if (anchor === 'down') {
        return (`#${parseInt(currentLocation.substring(1), 10) + 1}`);
      }
    }
    return `#${anchor}`;
  };
  return (
    // Temporary styles
    <Box
      sx={{
        position: 'sticky',
        top: '5rem',
        zIndex: 9999,
        paddingLeft: '6.25rem',
      }}
    >
      <ButtonGroup variant="contained" aria-label="Location navigation">
        {LOCATION_NAVIGATION.map((item) => (
          <Button
            key={item.name}
            anchor={item.anchor}
            onClick={(event) => {
              navigate(navigator(event.currentTarget.attributes.anchor.value), {
                state: {
                  parentAdventureSlug,
                  parentAdventureTitle,
                },
              });
            }}
          >
            {item.icon}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

function LocationMap({
  areas, image, map, title,
}) {
  const overlayFrame = (map && map.image && map.width && map.height && map.padding)
    ? {
      // From Location file's frontmatter.
      padding: map.padding,
      display: 'grid',
      gridTemplateColumns: `repeat(${map.width}, 1fr)`,
      gridTemplateRows: `repeat(${map.height}, 1fr)`,
      // Positioning Area List over the Map Image.
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }
    : null;

  const mapListTrapItems = areas.map((area) => {
    if (area.traps) {
      return area.traps.map((trap) => {
        const coordinates = {
          griedColumnStart: trap.x,
          gridColumnEnd: trap.x + trap.w,
          gridRowStart: trap.y,
          gridRowEnd: trap.y + trap.h,
        };
        return (
          <LocationMapTrapItem
            key={((trap.x % trap.y) * trap.w) % (trap.h)}
            trap={trap}
            coordinates={coordinates}
          />
        );
      });
    }
    return null;
  });

  const mapListAreaItems = areas.map((area, index) => {
    const coordinates = {
      gridColumnStart: area.x,
      gridRowStart: area.y,
      padding: 0,
      display: 'block',
      position: 'relative',
    };
    return (
      <LocationMapAreaItem key={`${area.name}-${Math.random()}`} area={area} coordinates={coordinates} index={index} />
    );
  });

  return (
    <Box
      id="map"
      sx={{
        scrollMarginTop: SCROLL_MARGIN_TOP,
        marginTop: 1,
        position: 'relative',
      }}
    >
      <GatsbyImage
        image={image}
        loading="eager"
        alt={`Map of ${title}`}
      />
      <LocationMapOverlay
        overlayFrame={overlayFrame}
        mapListTrapItems={mapListTrapItems}
        mapListAreaItems={mapListAreaItems}
      />
    </Box>
  );
}

function LocationMapTrapItem({ trap, coordinates }) {
  return (
    <ListItem
      sx={coordinates}
      className="dmcm-ListItem-trap"
    />
  );
}

function LocationMapAreaItem({ area, coordinates, index }) {
  return (
    <ListItem
      sx={coordinates}
    >
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={(event) => {
          console.log(event);
          // THIS WILL WORK LATER. COPY OF LOCATION NAV BEHAVIOR.
          // navigate(`#${event.currentTarget.attributes.anchor.value}`, {
          //   state: {
          //     parentAdventureSlug,
          //     parentAdventureTitle,
          //   },
          // });
        }}
        sx={{
          padding: 0.25,
          minWidth: 'auto',
          lineHeight: 1,
          width: '100%',
          boxShadow: 5,
        }}
      >
        {index + 1}
      </Button>
      <LocationMapAreaItemCard index={index} title={area.name} flags={area.flags} />
    </ListItem>
  );
}

function LocationMapAreaItemCard({ title, flags }) {
  const flagIcons = {
    person: {
      icon: <DmcmPersonIcon />,
      title: 'A person of interest is here.',
    },
    monster: {
      icon: <DmcmEvilMinionIcon />,
      title: 'Monster(s) present here.',
    },
    secret: {
      icon: <DmcmSecretDoorIcon />,
      title: 'There are hidden passages or items here.',
    },
    eyes: {
      icon: <DmcmSixEyesIcon />,
      title: 'Players can/are being observed here.',
    },
    treasure: {
      icon: <DmcmTreasureChestIcon />,
      title: 'There is loot here.',
    },
    trap: {
      icon: <DmcmTrapIcon />,
      title: 'There is a trap here.',
    },
    boss: {
      icon: <DmcmBullyMinionIcon />,
      title: 'A boss level monster is here.',
    },
  };

  return (
    <Card
      sx={{
        position: 'absolute',
        display: 'none',
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Divider />
      <Stack>
        {flags && flags.map((flag) => (
          <Tooltip
            key={flagIcons[flag] ? flagIcons[flag].title : Math.random()}
            title={flagIcons[flag] ? flagIcons[flag].title : UNKNOWN_ROOM_FLAG}
          >
            <SvgIcon>
              {flagIcons[flag] ? flagIcons[flag].icon : <DmcmDiceRandomIcon />}
            </SvgIcon>
          </Tooltip>
        ))}
      </Stack>
    </Card>
  );
}

function LocationMapOverlay({ overlayFrame, mapListTrapItems, mapListAreaItems }) {
  return (
    <List
      sx={overlayFrame}
    >
      {mapListAreaItems}
      {mapListTrapItems}
    </List>
  );
}

function GeneralFeatures({ markdown }) {
  return (
    <Box
      id="general"
      sx={{
        scrollMarginTop: SCROLL_MARGIN_TOP,
      }}
    >
      <Paper>
        <Typography variant="h4">{GENERAL_INFORMATION}</Typography>
        <Divider />
        <MDXRenderer>
          {markdown}
        </MDXRenderer>
      </Paper>
    </Box>
  );
}

function LocationAreaList({ areas }) {
  return (
    <Box>
      <List component="ol">
        {areas.map((area, index) => <LocationAreaListItem key={`${area.name}-${area.x + area.y}`} index={index} area={area} />)}
      </List>
    </Box>
  );
}

function LocationAreaListItem({ area, index }) {
  return (
    <ListItem id={index + 1}>
      <Paper>
        <Box component="article">
          <Box component="header">
            <Typography variant="h1">{area.name}</Typography>
          </Box>
          <Box>
            {area.flavor && (
              <Alert
                severity="info"
                icon={<DmcmTreasureChestIcon width="50px" />}
              >
                <Typography variant="subtitle1" component="div">
                  <MarkdownView markdown={area.flavor} />
                </Typography>
              </Alert>
            )}
            {area.callout && (
              <Alert
                severity="warning"
                icon={<DmcmSpeedDialIcon width="50px" />}
                sx={[
                  {
                    '.dmcm-Paper-root + &': {
                      mt: '1rem',
                    },
                  },
                ]}
              >
                <Typography variant="subtitle1" component="div">
                  <MarkdownView markdown={area.callout} />
                </Typography>
              </Alert>
            )}
            {area.content && <MarkdownView markdown={area.content} />}
          </Box>
        </Box>
      </Paper>
    </ListItem>
  );
}

function LocationPageLayout({ data, location }) {
  const parentAdventureTitle = location.state ? location.state.parentAdventureTitle : '';
  const parentAdventureSlug = location.state ? location.state.parentAdventureSlug : '';
  return (
    // Temporary styles
    <Layout title={data.mdx.frontmatter.title}>
      {parentAdventureTitle && (
        <Box sx={{ position: 'relative' }}>
          <AdventureBreadcrumb
            parentAdventureSlug={parentAdventureSlug}
            parentAdventureTitle={parentAdventureTitle}
          />
        </Box>
      )}
      <LocationNavigation
        parentAdventureSlug={parentAdventureSlug}
        parentAdventureTitle={parentAdventureTitle}
        currentLocation={location.hash}
        locationMax={data.mdx.frontmatter.areas.length}
      />
      <LocationMap
        image={getImage(data.mdx.frontmatter.map.image)}
        map={data.mdx.frontmatter.map}
        title={data.mdx.frontmatter.title}
        areas={data.mdx.frontmatter.areas}
      />
      <GeneralFeatures markdown={data.mdx.body} />
      <LocationAreaList areas={data.mdx.frontmatter.areas} />
    </Layout>
  );
}

export const query = graphql`
query ($id: String, $pid: String) {
  mdx(id: {eq: $id}) {
    id
    body
    fields {
      slug
    }
    frontmatter {
      title
      areas {
        flavor
        callout
        content
        name
        x
        y
        flags
        traps {
          x
          y
          h
          w
        }
      }
      map {
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        width
        height
        padding
      }
    }
  }
  adventure: mdx(id: {eq: $pid}) {
    slug
    frontmatter {
      title
      players {
        class
        name
        passiveperception
        race
      }
    }
  }
}
`;

export default LocationPageLayout;

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import * as React from 'react';
// import { graphql, navigate } from 'gatsby';
// import {
//   Alert, Box, Breadcrumbs, Card, Divider,
//   List, ListItem, SpeedDial, SvgIcon, Tooltip, Typography,
// } from '@mui/material';
// import { Button, Link, IconButton } from 'gatsby-theme-material-ui';
// import { useTheme } from '@mui/styles';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import { MDXRenderer } from 'gatsby-plugin-mdx';
// import MarkdownView from 'react-showdown';
// import Layout from '../Layout/Layout';
// import { LOCATION_NAVIGATION, GENERAL_INFORMATION,
// UNKNOWN_ROOM_FLAG } from '../../utils/constants';
// import DmcmSpeedDialIcon from '../../images/read.svg';
// import DmcmPersonIcon from '../../images/person.svg';
// import DmcmSixEyesIcon from '../../images/six-eyes.svg';
// import DmcmWolfTrapIcon from '../../images/wolf-trap.svg';
// import DmcmBullyMinionIcon from '../../images/bully-minion.svg';
// import DmcmSecretDoorIcon from '../../images/secret-door.svg';
// import DmcmEvilMinionIcon from '../../images/evil-minion.svg';
// import DmcmTreasureChestIcon from '../../images/open-treasure-chest.svg';
// import DmcmDiceRandomIcon from '../../images/perspective-dice-six-faces-random.svg';

// /*
// ** TODO
// - reorganize layout of code.
// - all sx blocks should be moved to variables outside of the return statement
// -- variables should be named: stylesLocal_name.
// */
// const stylesHeader = (theme) => ({
//   background: theme.palette.primary.main,
//   px: '1rem',
// });

// const cardFlagIcons = {
//   person: {
//     icon: <DmcmPersonIcon />,
//     title: 'A person of interest is here.',
//   },
//   monster: {
//     icon: <DmcmEvilMinionIcon />,
//     title: 'Monster(s) present here.',
//   },
//   secret: {
//     icon: <DmcmSecretDoorIcon />,
//     title: 'There are hidden passages or items here.',
//   },
//   eyes: {
//     icon: <DmcmSixEyesIcon />,
//     title: 'Players can/are being observed here.',
//   },
//   treasure: {
//     icon: <DmcmTreasureChestIcon />,
//     title: 'There is loot here.',
//   },
//   trap: {
//     icon: <DmcmWolfTrapIcon />,
//     title: 'There is a trap here.',
//   },
//   boss: {
//     icon: <DmcmBullyMinionIcon />,
//     title: 'A boss level monster is here.',
//   },
// };

// function LocationMapAreaCardFlag(props) {
//   const { flag } = props;
//   return (
//     <Tooltip title={cardFlagIcons[flag] ? cardFlagIcons[flag].title : UNKNOWN_ROOM_FLAG}>
//       <IconButton>
//         <SvgIcon>
//           {cardFlagIcons[flag] ? cardFlagIcons[flag].icon : <DmcmDiceRandomIcon />}
//         </SvgIcon>
//       </IconButton>
//     </Tooltip>
//   );
// }

// function LocationMapAreaCard(props) {
//   const {
//     theme, index, area, setNavLocation,
//   } = props;

//   const stylesLocalMapCardWrapper = [
//     {
//       position: 'relative',
//       height: '100%',
//     },
//     {
//       '& .dmcm-Card-root': {
//         display: 'none',
//       },
//     },
//     {
//       '&:hover .dmcm-Card-root': {
//         display: 'block',
//       },
//     },
//   ];

//   return (
//     <Box sx={stylesLocalMapCardWrapper}>
//       <Button
//         onClick={() => setNavLocation(index + 1)}
//         // to={`#${index + 1}`}
//         variant="caption"
//         underline="none"
//         color={theme.palette.info.main}
//         sx={[
//           {
//             '&:hover': {
//               background: theme.palette.tertiary.light,
//             },
//           },
//           {
//             background: theme.palette.tertiary.light,
//             display: 'block',
//             fontWeight: 700,
//             height: '100%',
//             width: '100%',
//             lineHeight: 1,
//             boxShadow: 3,
//             p: 0,
//             minWidth: 'auto',
//             fontSize: '1vw',
//             color: theme.palette.info.main,
//           },
//         ]}
//       >
//         {index + 1}
//       </Button>
//       <Card
//         sx={{
//           background: theme.palette.tertiary.dark,
//           p: 1,
//           position: 'absolute',
//           zIndex: 1,
//           boxShadow: 3,
//         }}
//       >
//         <Typography
//           variant="body2"
//           component="p"
//           sx={{
//             color: theme.palette.tertiary.light,
//             fontWeight: 500,
//           }}
//         >
//           {area.name}
//         </Typography>
//         <Divider />
//         {area.flags && (
//           <List
//             disablePadding
//             sx={{
//               display: 'flex',
//               flexDirection: 'row',
//             }}
//           >
//             {area.flags.map((flag) => (
//               <ListItem
//                 key={flag}
//                 sx={{
//                   p: 1,
//                 }}
//               >
//                 <LocationMapAreaCardFlag flag={flag} />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Card>
//     </Box>
//   );
// }

// function LocationMap(props) {
//   const {
//     title, image, map, areas, setNavLocation,
//   } = props;
//   const theme = useTheme();
//   const screenFrame = (map && map.image && map.width && map.height && map.padding)
//     ? {
//       // From Location file's frontmatter.
//       p: map.padding,
//       gridTemplateColumns: `repeat(${map.width}, 1fr)`,
//       gridTemplateRows: `repeat(${map.height}, 1fr)`,
//       // Positioning Area List over the Map Image.
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       display: 'grid',
//     }
//     : null;
//   const trapMapListItems = areas.map((area) => {
//     if (area.traps) {
//       return area.traps.map((trap) => {
//         const coordinates = {
//           griedColumnStart: trap.x,
//           gridColumnEnd: trap.x + trap.w,
//           gridRowStart: trap.y,
//           gridRowEnd: trap.y + trap.h,
//         };
//         return (
//           <ListItem
//             key={((trap.x % trap.y) * trap.w) % (trap.h)}
//             sx={coordinates}
//             className="dmcm-ListItem-trap"
//           />
//         );
//       });
//     }
//     return null;
//   });
//   const areaMapListItems = areas.map((area, index) => {
//     const coordinates = {
//       gridColumnStart: area.x,
//       gridRowStart: area.y,
//       p: 0,
//       display: 'block',
//     };
//     return (
//       <ListItem
//         key={`${area.name}-${area.x}-${area.y}`}
//         sx={coordinates}
//       >
//         <LocationMapAreaCard
//           theme={theme}
//           index={index}
//           area={area}
//           setNavLocation={setNavLocation}
//         />
//       </ListItem>
//     );
//   });
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         boxShadow: 3,
//       }}
//     >
//       {/* Location Map Image */}
//       <GatsbyImage
//         image={image}
//         loading="eager"
//         alt={`Map of ${title}`}
//       />
//       {/* Location Map Area List */}
//       <List sx={screenFrame}>
//         {areaMapListItems}
//         {trapMapListItems}
//       </List>
//     </Box>
//   );
// }

// function SpeedDialNavigation(props) {
//   const { navLocation, setNavLocation, locationMax } = props;
//   const theme = useTheme();

//   React.useEffect(() => {
//     if (navLocation !== '') {
//       navigate(`#${navLocation}`, { replace: true });
//     }
//     if (navLocation === '') {
//       navigate('', { replace: true });
//     }
//   }, [navLocation]);

//   const handleNavItemClick = (anchor) => {
//     if (anchor === 'up' || anchor === 'down') {
//       // If we click up or down.
//       if (navLocation) {
//         // If there is currently a hash in the url.
//         if (Number(navLocation)) {
//           // If the navLocation is a number.
//           if (Number(navLocation) > 1 && Number(navLocation) < locationMax) {
//             // If the navLocation number is higher than one.
//             if (anchor === 'up') {
//               setNavLocation(Number(navLocation) - 1);
//             } else {
//               setNavLocation(Number(navLocation) + 1);
//             }
//           } else {
//             // eslint-disable-next-line no-lonely-if
//             if (anchor === 'up') {
//               setNavLocation('general');
//             } else if (Number(navLocation) < locationMax) {
//               setNavLocation(Number(navLocation) + 1);
//             }
//           }
//         } else {
//           // It's not a number (so a string).
//           // eslint-disable-next-line no-lonely-if
//           if (navLocation === 'general') {
//             if (anchor === 'up') {
//               setNavLocation('map');
//             } else {
//               setNavLocation(1);
//             }
//           }
//           if (navLocation === 'map') {
//             if (anchor === 'down') {
//               setNavLocation('general');
//             }
//           }
//         }
//       } else {
//         setNavLocation(1);
//       }
//     }
//     if (anchor === 'general') {
//       setNavLocation('general');
//     }
//     if (anchor === 'map') {
//       setNavLocation('map');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: 56,
//         transform: 'translateZ(0px)',
//         flexGrow: 1,
//         position: 'sticky',
//         top: '1rem',
//         left: '1rem',
//         zIndex: 1,
//         my: 1,
//       }}
//     >
//       <SpeedDial
//         ariaLabel="Navigation"
//         sx={{ position: 'absolute', top: 0, left: 0 }}
//         icon={(
//           <SvgIcon>
//             <DmcmSpeedDialIcon
//               sx={{
//                 color: theme.palette.tertiary.main,
//               }}
//             />
//           </SvgIcon>
//         )}
//         direction="right"
//       >
//         {LOCATION_NAVIGATION.map((action) => (
//           <SpeedDialAction
//             key={action.name}
//             icon={action.icon}
//             tooltipTitle={action.name}
//             onClick={() => handleNavItemClick(action.anchor)}
//           />
//         ))}
//       </SpeedDial>
//     </Box>
//   );
// }

// function LocationPageLayout(props) {
//   const { data, location } = props;
//   const [navLocation, setNavLocation] = React.useState(location.hash.substring(1));
//   const [parentAdventure] = React.useState({
//     title: location.state ? location.state.parentAdventureTitle : null,
//     slug: location.state ? location.state.parentAdventureSlug : null,
//   });
//   const theme = useTheme();

//   const breadcrumbItems = [
//     {
//       title: 'Adventures',
//       slug: '/adventures',
//     },
//     {
//       title: parentAdventure && parentAdventure.title,
//       slug: parentAdventure && parentAdventure.slug,
//     },
//     {
//       title: data.mdx.frontmatter.title,
//       slug: null,
//     },
//   ].map((crumb) => (
//     <Link
//       key={crumb.title || Math.random()}
//       underline="hover"
//       color={theme.palette.primary.main}
//       to={crumb.slug}
//     >
//       {crumb.title}
//     </Link>
//   ));
//   const areaNoteItems = data.mdx.frontmatter.areas.map((area, index) => (
//     <ListItem
//       key={area.name + area.x + area.y}
//       id={index + 1}
//       sx={{
//         display: 'block',
//         pt: 'calc(56px + 2rem)',
//         px: 0,
//         pb: 0,
//       }}
//     >
//       <Box component="article">
//         <Box component="header" sx={stylesHeader(theme)}>
//           <Typography
//             // color={theme.palette.secondary.main}
//             variant="h3"
//             component="h1"
//           >
//             {`${index + 1}. ${area.name}`}
//           </Typography>
//         </Box>
//         <Typography
//           variant="body1"
//           component="div"
//           sx={{
//             overflow: 'hidden',
//             border: '1px solid',
//             borderTop: 0,
//             p: '1rem',
//           }}
//         >
//           {area.flavor && (
//             <Alert
//               severity="info"
//               icon={<DmcmTreasureChestIcon width="50px" fill={theme.palette.info.dark} />}
//             >
//               <Typography variant="subtitle1" component="div">
//                 <MarkdownView markdown={area.flavor} />
//               </Typography>
//             </Alert>
//           )}
//           {area.callout && (
//             <Alert
//               severity="warning"
//               icon={<DmcmSpeedDialIcon width="50px" fill={theme.palette.warning.dark} />}
//               sx={[
//                 {
//                   '.dmcm-Paper-root + &': {
//                     mt: '1rem',
//                   },
//                 },
//               ]}
//             >
//               <Typography variant="subtitle1" component="div">
//                 <MarkdownView markdown={area.callout} />
//               </Typography>
//             </Alert>
//           )}
//           {area.content && <MarkdownView markdown={area.content} />}
//         </Typography>
//       </Box>
//     </ListItem>
//   ));

//   return (
//     <Layout title={data.mdx.frontmatter.title} sx={{ position: 'relative' }}>
//       <Breadcrumbs
//         aria-label="breadcrumb"
//         color={theme.palette.tertiary.main}
//       >
//         {breadcrumbItems}
//       </Breadcrumbs>

//       <div id="map" />
//       <SpeedDialNavigation
//         navLocation={navLocation}
//         setNavLocation={setNavLocation}
//         locationMax={data.mdx.frontmatter.areas.length}
//         location={location}
//       />

//       <LocationMap
//         image={getImage(data.mdx.frontmatter.map.image)}
//         map={data.mdx.frontmatter.map}
//         title={data.mdx.frontmatter.title}
//         areas={data.mdx.frontmatter.areas}
//         setNavLocation={setNavLocation}
//       />

//       <Box
//         id="general"
//         component="article"
//         sx={{
//           pt: 'calc(56px + 2rem)',
//         }}
//       >
//         <Box component="header" sx={stylesHeader(theme)}>
//           <Typography variant="h3">{GENERAL_INFORMATION}</Typography>
//         </Box>
//         <Box
//           variant="body1"
//           sx={{
//             overflow: 'hidden',
//             border: '1px solid',
//             borderTop: 0,
//             p: '1rem',
//           }}
//         >
//           <MDXRenderer>
//             {data.mdx.body}
//           </MDXRenderer>
//         </Box>
//       </Box>
//       <Box>
//         <List>
//           {areaNoteItems}
//         </List>
//       </Box>
//     </Layout>
//   );
// }

// // X Card for map location hovers
// //   Snackbar for dice results
// // - Bottom Navigation for play stat menu
// // X Breadcrumb to go back to adventure
// // X Speed Dial for navigation
// export default LocationPageLayout;
