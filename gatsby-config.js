module.exports = {
  siteMetadata: {
    title: 'Dungeon Master\'s Compaign Manager',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: ['gatsby-plugin-image', 'gatsby-plugin-react-helmet', 'gatsby-plugin-mdx', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp', 'gatsby-plugin-sass', {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/images/',
    },
    __key: 'images',
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: './src/pages/',
    },
    __key: 'pages',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: './src/content/',
    },
    __key: 'content',
  },
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /images/,
      },
    },
  }],
};
