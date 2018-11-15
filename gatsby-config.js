module.exports = {
  siteMetadata: {
    name: `Fabien Lemaitre`,
    title: `🎼Web Audio Visualization Applied to Speech 🗣`,
    date: `Thursday October 25th, 2018`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `slides`,
        path: `${__dirname}/src`,
      },
    },
  ],
};
