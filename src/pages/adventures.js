import * as React from 'react';
import { graphql } from 'gatsby';
import { Container, List } from '@mui/material';
import Layout from '../components/Layout/Layout';

function AdventurePage(props) {
  console.log(props);
  const adventureListItems = null;
  return (
    <Layout title="adventures">
      <Container component="section">
        <List>
          {adventureListItems}
        </List>
      </Container>
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

export default AdventurePage;
