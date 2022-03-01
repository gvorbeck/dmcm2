/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import {
  Box, List, ListItem, Stack,
} from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { NAVIGATION_DATA } from '../../utils/constants';

function Navigation(props) {
  const { sx, homeNav } = props;
  sx.ml = homeNav ? 0 : 'auto';

  const navigationDirection = homeNav ? 'column' : 'row';
  const CustomStack = (customProps) => (
    <Stack
      component="ul"
      direction={navigationDirection}
      sx={{
        height: homeNav ? '100%' : 'auto',
        justifyContent: homeNav ? 'space-around' : 'auto',
        py: 0,
      }}
      {...customProps}
    />
  );
  const navigationListItems = NAVIGATION_DATA.map((item) => (
    <ListItem key={item.title} sx={{ py: 0 }}>
      <Button
        to={item.slug}
        variant={homeNav ? 'contained' : 'outlined'}
        color={homeNav ? 'tertiary' : 'secondary'}
        sx={{
          width: homeNav ? '100%' : 'auto',
        }}
      >
        {item.title}
      </Button>
    </ListItem>
  ));
  return (
    <Box component="nav" sx={sx}>
      <List component={CustomStack}>
        {navigationListItems}
      </List>
    </Box>
  );
}

export default Navigation;
// import React from 'react';
// import {
//   Box,
//   Button,
//   List,
//   ListItem,
//   Stack,
// } from '@mui/material';

// export default function Navigation(props) {
//   const {
//     display,
//     navDir,
//     width,
//     sx,
//     color,
//     size,
//     fullWidth,
//   } = props;
//   const navArr = [
//     {
//       title: 'adventures',
//       slug: '/adventures',
//     },
//     {
//       title: 'bestiary',
//       slug: '/search/?category=monsters',
//     },
//     {
//       title: 'reference',
//       slug: '/ref',
//     },
//     {
//       title: 'spellbook',
//       slug: '/search/?category=spells',
//     },
//   ];

//   const navItems = navArr.map((item) => (
//     <ListItem key={item.title}>
//       <Button
//         variant="contained"
//         size={size}
//         // color={color || 'primary'}
//         width="100%"
//         href={item.slug}
//         sx={{
//           width: fullWidth && '100%',
//         }}
//       >
//         {item.title}
//       </Button>
//     </ListItem>
//   ));

//   const CustomStack = (customProps) =>
// <Stack component="ul" direction={navDir} {...customProps} />;

//   if (display === false) {
//     return null;
//   }
//   return (
//     <Box
//       component="nav"
//       width={width}
//       sx={sx}
//     >
//       <List disablePadding component={CustomStack}>
//         {navItems}
//       </List>
//     </Box>
//   );
// }
