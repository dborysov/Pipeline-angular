'use strict';

const baseDir = {
        dest: 'dist',
        src: 'app'
    },
    folderNames = {
        nodeModules: 'node_modules',
        outputCss: 'css',
        outputLibs: 'libs'
    },
    fileNames = {
        outputJs: 'all.js',
        indexHtml: 'index.html'
    },
    htmlMinifyConfig = {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
    },
    src = {
        ts: {
            mainFile: `${baseDir.src}/app.ts`
        },
        css: {
            libs: ['bootstrap/dist/css/bootstrap.min.css']
        },
        sass: {
            custom: [`./${baseDir.src}/Content/Sass/+(*.sass|*.scss)`]
        },
        html: {
            main: `./${baseDir.src}/index.html`,
            partials: [`./${baseDir.src}/${folderNames.partials}/${'*.html'}`]
        }
    };

module.exports = {
    baseDir,
    folderNames,
    fileNames,
    htmlMinifyConfig,
    src
};