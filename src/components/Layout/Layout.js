import React from 'react';
import {
  AppBar, Box, Container, Stack, SvgIcon, Typography,
} from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';
// import { useTheme } from '@mui/styles';
import {
  SITE_NAME, SITE_SHORT_NAME, FOOTER_COPY,
} from '../../utils/constants';
import Navigation from '../Navigation/Navigation';
import DmcmBlackBridgeIcon from '../../images/black-bridge.svg';

// const dmcmTheme = () => useTheme();
// eslint-disable-next-line react/function-component-definition
const HeaderContainer = (props) => <Container component="header" {...props} />;

function Layout({
  children, hideNavigation, title, navDirection,
}) {
//   console.log(`
//      _____        ___          ___          ___     
//     /  /::\\      /__/\\        /  /\\        /__/\\    
//    /  /:/\\:\\    |  |::\\      /  /:/       |  |::\\   
//   /  /:/  \\:\\   |  |:|:\\    /  /:/        |  |:|:\\  
//  /__/:/ \\__\\:|__|__|:|\\:\\  /  /:/  ___  __|__|:|\\:\\ 
//  \\  \\:\\ /  /:/__/::::| \\:\\/__/:/  /  /\\/__/::::| \\:\\
//   \\  \\:\\  /:/\\  \\:\\~~\\__\\/\\  \\:\\ /  /:/\\  \\:\\~~\\__\\/
//    \\  \\:\\/:/  \\  \\:\\       \\  \\:\\  /:/  \\  \\:\\      
//     \\  \\::/    \\  \\:\\       \\  \\:\\/:/    \\  \\:\\     
//      \\__\\/      \\  \\:\\       \\  \\::/      \\  \\:\\    
//                  \\__\\/        \\__\\/        \\__\\/    
// `);
  return (
    <>
      <Helmet defaultTitle="DMCM" title={`${title} | ${SITE_NAME}`} />
      <Stack
        sx={{
          typography: 'body1',
          color: 'secondary.main',
          // Add universal styles here.
          // <code/> styles
          '& code': {
            backgroundColor: 'background.paper',
            padding: 0.5,
          },
          // Table header row styles
          '& thead tr': {
            backgroundColor: 'primary.main',
          },
        }}
      >
        <AppBar
          component={HeaderContainer}
          sx={{
            backgroundColor: 'primary.main',
            minHeight: '4.25rem',
            // display: 'block',
            position: 'static',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              boxShadow: 2,
              position: 'absolute',
              zIndex: 'appBar',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              <Link
                underline="none"
                to="/"
                sx={{
                  lineHeight: 1,
                  color: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1.25rem 0.5rem 0.5rem',
                }}
              >
                {SITE_SHORT_NAME}
                <SvgIcon
                  sx={{
                    paddingTop: '0.5rem',
                    fontSize: '4rem',
                  }}
                >
                  <DmcmBlackBridgeIcon />
                </SvgIcon>
              </Link>
            </Typography>
          </Box>
          <Navigation hideNavigation={hideNavigation} navDirection={navDirection} />
        </AppBar>
        <Container
          component="main"
          sx={{
            marginTop: '3rem',
            position: 'relative',
          }}
        >
          {title && title !== 'Home' && (
            <Typography
              variant="h2"
              sx={{
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Container>
        <Container
          component="footer"
          sx={{
            marginTop: '2rem',
          }}
        >
          {FOOTER_COPY}
        </Container>
      </Stack>
    </>
  );
}

export default Layout;
