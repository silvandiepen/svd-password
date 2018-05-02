module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "password",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Easy sharable lists"
      },
      { name: "msapplication-TileColor", content: "#ffffff" },
      {
        name: "msapplication-TileImage",
        content: "/favicon/ms-icon-144x144.png"
      },
      { name: "theme-color", content: "#ffffff" }
    ]
  },
  plugins: [
    {
      src: "~/plugins/svd-vue-components"
    }
  ],
  modules: ["nuxt-rfg-icon", "@nuxtjs/manifest"],
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        "postcss-cssnext": {
          browsers: ["last 2 versions", "ie >= 9"],
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  css: [
    {
      src: "~assets/scss/app.scss",
      lang: "scss"
    }
  ]
};
