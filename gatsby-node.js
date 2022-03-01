/*
** GENERATE SLUGS
*/
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // Only operate on `Mdx` nodes. If content is coming from a remote CMS, you can also check
  // to see if the parent node is a `File` node here.
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

/*
** PAGE TEMPLATES
*/
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      adventures: allMdx(filter: {fields: {slug: {regex: "/adventures\\\\/\\\\w+\\\\/$/i"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      locations: allMdx(filter: {fields: {slug: {regex: "/locations/"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const adventures = result.data.adventures.edges;

  function findParentAdventure(slug, section) {
    const regex = new RegExp(section);
    for (let i = 0, l = adventures.length; i < l; i + 1) {
      if (adventures[i].node.fields.slug === slug.split(regex)[0]) {
        return adventures[i].node.id;
      }
    }
    return null;
  }

  adventures.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/components/AdventurePageLayout/AdventurePageLayout.js'),
      context: {
        id: node.id,
        locations: `${node.fields.slug}locations/`,
        npcs: `${node.fields.slug}npcs/`,
      },
    });
  });

  const locations = result.data.locations.edges;
  locations.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/components/LocationPageLayout/LocationPageLayout.js'),
      context: {
        id: node.id,
        pid: findParentAdventure(node.fields.slug, 'locations'),
      },
    });
  });
};
