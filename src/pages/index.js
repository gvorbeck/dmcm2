import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../components/Layout/Layout';
import Navigation from '../components/Navigation/Navigation';
import { GREETING, DESCRIPTION } from '../utils/constants';

function IndexPage(props) {
  console.log(props);
  return (
    <Layout hideNavigation>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          gridColumnGap: '2rem',
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          sx={{
            fontWeight: 500,
            gridColumn: '1 / 3',
          }}
        >
          {GREETING}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            gridColumn: '1 / 3',
            gridRow: '2 / 3',
            mt: 2,
            borderTop: '1px solid',
            pt: '1rem',
          }}
        >
          {DESCRIPTION}
        </Typography>
        <Navigation
          btnColor="tertiary"
          homeNav
          sx={{
            gridColumn: '3 / 4',
            gridRow: '1 / 3',
            justifyContent: 'space-between',
            height: '100%',
          }}
        />
      </Box>
    </Layout>
  );
}

export default IndexPage;
