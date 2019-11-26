const { production, development } = require('./browserslist').browserslist;

module.exports = api => ({
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                targets: api.env('production') ? production : development,
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
        production: {
            only:    ['src'],
            plugins: [
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
            ],
        },
    },
});
