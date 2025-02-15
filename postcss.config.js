const paths = require('./config/paths');

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [paths.srcShared, `${__dirname}/node_modules`],
        }),
        require('postcss-nested')(),
        require('postcss-flexbugs-fixes')(),
        require('tailwindcss')(),
        require('autoprefixer')(),
        require('postcss-custom-properties')(),
        require('postcss-assets')({
            basePath: './assets',
        }),
        // This is broken.
        // require('postcss-normalize')(),
    ],
    sourceMap: true,
};
