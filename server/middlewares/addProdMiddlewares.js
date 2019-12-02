const path = require('path');
// const express = require('express');
// const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');


module.exports = function addProdMiddlewares(app, options) {
    const publicPath = options.publicPath || '/';
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

    // compression middleware compresses your server responses which makes them
    // smaller (applies also to assets). You can read more about that technique
    // and other good practices on official Express.js docs http://mxs.is/googmy
    // app.use(compression());
    // app.use(publicPath, express.static(outputPath));

    // instead of applying compression for inbox files, use already compressed files
    app.use(publicPath, expressStaticGzip(outputPath));

    app.get(
        '*',
        (req, res) => res.sendFile(path.resolve(outputPath, 'index.html.gz')),
    );
};
