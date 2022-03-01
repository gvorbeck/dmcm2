import * as React from 'react';
import {
  AppBar, Box, Container, Stack, Typography,
} from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import { GiBlackBridge } from 'react-icons/gi';
// import theme from '../../theme';
import { SITE_SHORT_NAME, FOOTER_COPY, COLORS } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';

function CustomContainer(props) {
  return <Container component="header" {...props} />;
}

function Layout(props) {
  const { children, hideNavigation, title } = props;
  return (
    <Stack color={COLORS.tertiary.main}>
      <AppBar
        component={CustomContainer}
        position="relative"
        sx={{
          py: 1,
          minHeight: '68px',
        }}
      >
        <Box
          color={COLORS.tertiary.contrastText}
          sx={{
            background: COLORS.tertiary.main,
            display: 'flex',
            flexDirection: 'column',
            p: 0.5,
            position: 'absolute',
            textAlign: 'center',
            top: 0,
          }}
        >
          <Typography
            variant="h6"
            component="h1"
          >
            <Link
              underline="none"
              color={COLORS.tertiary.contrastText}
              to="/"
              sx={{
                lineHeight: 1,
              }}
            >
              {SITE_SHORT_NAME}
              <Box sx={{ m: 'auto' }}>
                <GiBlackBridge size="3rem" />
              </Box>
            </Link>
          </Typography>
        </Box>
        <Navigation
          sx={{
            display: hideNavigation ? 'none' : 'inline',
          }}
        />
      </AppBar>
      <Container
        component="main"
        sx={{
          mt: '4rem',
        }}
      >
        {
          title && (
            <Typography
              variant="h1"
              component="h2"
              sx={{
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {title}
            </Typography>
          )
        }
        {children}
      </Container>
      <Container
        component="footer"
        sx={{
          mt: '2rem',
        }}
      >
        {FOOTER_COPY}
      </Container>
    </Stack>
  );
}

export default Layout;
