const { browserslist } = require('./browserslist');

module.exports = ({ env }) => ({
    plugins: [
        require('postcss-import')({ /* ...options */ }), // eslint-disable-line global-require
        require('autoprefixer')({ // eslint-disable-line global-require
            // todo: move all browserslist usage to packaje.json file. E.V.
            overrideBrowserslist: env === 'development' ? browserslist.development : browserslist.production,
            cascade:              false,
        }),
    ],
});
