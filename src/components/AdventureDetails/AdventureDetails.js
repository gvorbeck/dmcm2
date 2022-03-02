import * as React from 'react';
import {
  Box, Stack, ListItem, Chip, Tooltip,
} from '@mui/material';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PublicIcon from '@mui/icons-material/Public';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import { useTheme } from '@mui/styles';
import {
  SETTING, PLAYERS, LEVELS,
} from '../../utils/constants';

function AdventureDetails(props) {
  const {
    body, levels, players, setting, direction,
  } = props;
  const theme = useTheme();
  const adventureDetailsListItems = [
    {
      title: SETTING,
      icon: <PublicIcon />,
      content: setting,
    },
    {
      title: LEVELS,
      icon: <SwitchAccessShortcutIcon />,
      content: levels,
    },
    {
      title: PLAYERS,
      icon: <SupervisedUserCircleIcon />,
      content: players,
    },
  ].map((item) => (
    <ListItem key={item.title} sx={{ justifyContent: 'center' }}>
      <Tooltip title={item.title}>
        <Chip icon={item.icon} label={item.content} />
      </Tooltip>
    </ListItem>
  ));
  return (
    <Stack direction={direction || 'column'}>
      <Box>
        <Stack
          component="ul"
          direction="row"
          sx={{
            background: theme.palette.tertiary.main,
            p: 0,
            justifyContent: 'space-between',
            m: 0,
          }}
        >
          {adventureDetailsListItems}
        </Stack>
      </Box>
      <Box
        color={theme.palette.tertiary.main}
        sx={{
          p: '0 1rem',
          overflow: 'hidden',
          background: theme.palette.secondary.main,
          border: `1px solid ${theme.palette.tertiary.main}`,
        }}
      >
        <MDXRenderer>
          {body}
        </MDXRenderer>
      </Box>
    </Stack>
  );
}

export default AdventureDetails;
