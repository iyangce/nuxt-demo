export default {
    mode: 'universal',
    /*
   ** Headers of the page
   */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        script: [
            {
                src: '/flexible.js',
                type: 'text/javascript',
                charset: 'utf-8'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        __dangerouslyDisableSanitizers: ['script']
    },

    /*
   ** Customize the progress-bar color
   */
    loading: { color: '#fff' },
    /*
   ** Global CSS
   */
    css: ['iview/dist/styles/iview.css', './assets/css/base.less'],
    /*
   ** Plugins to load before mounting the App
   */
    plugins: ['@/plugins/iview'],
    /*
   ** Nuxt.js dev-modules
   */
    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
   ** Nuxt.js modules
   */
    modules: [
    // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],
    /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
    axios: {},
    /*
   ** Build configuration
   */
    build: {
    /*
     ** You can extend webpack config here
     */ postcss: [
            require('postcss-plugin-px2rem')({
                rootValue: 100, //比例
                selectorBlackList: ['vux', 'weui', 'border', 'dp', 'scroller']
            })
        ],
        vendor: ['axios'],
        extend(config, ctx) {
            config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            });
        }
    }
};
