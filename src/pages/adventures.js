import * as React from 'react';
import { graphql } from 'gatsby';
import {
  Box, List, ListItem, Paper, Typography,
} from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import Layout from '../components/Layout/Layout';
import AdventureDetails from '../components/AdventureDetails/AdventureDetails';
import { ADVENTURES } from '../utils/constants';

function AdventureList(props) {
  const { adventures } = props;
  return (
    <List>
      {adventures.map((adventure) => (
        <AdventureListItem
          key={adventure.node.frontmatter.title}
          adventure={adventure.node}
        />
      ))}
    </List>
  );
}

function AdventureListItem(props) {
  const { adventure } = props;
  return (
    <ListItem>
      <Box component="article" sx={{ typography: 'body1' }}>
        <Paper>
          <Box component="header">
            <Typography variant="h3" component="h1">
              <Link to={adventure.fields.slug}>{adventure.frontmatter.title}</Link>
            </Typography>
          </Box>
          <AdventureDetails
            body={adventure.body}
            levels={adventure.frontmatter.levels}
            players={adventure.frontmatter.playernum}
            setting={adventure.frontmatter.setting}
          />
        </Paper>
      </Box>
    </ListItem>
  );
}

function AdventuresPage(props) {
  const { data } = props;
  return (
    <Layout title={ADVENTURES}>
      <AdventureList adventures={data.allMdx.edges} />
    </Layout>
  );
}

export const query = graphql`
  query AdventuresListPageQuery {
    allMdx(
      filter: {slug: {regex: "/adventures/.+/$/"}}
      sort: {fields: frontmatter___title}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            setting
            levels
            playernum
          }
          fields {
            slug
          }
          body
        }
      }
    }
  }
`;

export default AdventuresPage;

// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react/function-component-definition */
// import * as React from 'react';
// import { graphql } from 'gatsby';
// import {
//   Box, List, ListItem, Paper, Stack, Typography,
// } from '@mui/material';
// import { Link } from 'gatsby-theme-material-ui';
// import { useTheme } from '@mui/styles';
// import Layout from '../components/Layout/Layout';
// import AdventureDetails from '../components/AdventureDetails/AdventureDetails';
// import { ADVENTURES } from '../utils/constants';

// function AdventurePage(props) {
//   const { data } = props;
//   const theme = useTheme();
//   const CustomStack = (customProps) => (
//     <Stack
//       component="ul"
//       direction="row"
//       sx={{
//         flexWrap: 'wrap',
//         gap: 2,
//         alignItems: 'start',
//       }}
//       {...customProps}
//     />
//   );

//   const adventureListItems = data.allMdx.edges.map((adventure) => {
//     const { node } = adventure;
//     return (
//       <ListItem
//         key={node.id}
//         disableGutters
//         sx={{
//           flex: 50,
//         }}
//       >
//         <Box component="article">
//           <Paper
//             elevation={5}
//           >
//             <Box
//               component="header"
//               sx={{
//                 p: '1rem',
//                 background: theme.palette.primary.main,
//               }}
//             >
//               <Typography variant="h3" component="h1">
//                 <Link
//                   to={node.fields.slug}
//                   color="#000000"
//                   sx={{
//                     display: 'block',
//                   }}
//                 >
//                   {node.frontmatter.title}
//                 </Link>
//               </Typography>
//             </Box>
//             <AdventureDetails
//               body={node.body}
//               levels={node.frontmatter.levels}
//               players={node.frontmatter.playernum}
//               setting={node.frontmatter.setting}
//             />
//           </Paper>
//         </Box>
//       </ListItem>
//     );
//   });
//   return (
//     <Layout title={ADVENTURES}>
//       <List component={CustomStack}>
//         {adventureListItems}
//       </List>
//     </Layout>
//   );
// }

// export const query = graphql`
//   query AdventuresListPageQuery {
//     allMdx(
//       filter: {slug: {regex: "/adventures/.+/$/"}}
//       sort: {fields: frontmatter___title}
//     ) {
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             setting
//             levels
//             playernum
//           }
//           fields {
//             slug
//           }
//           body
//         }
//       }
//     }
//   }
// `;

// export default AdventurePage;
