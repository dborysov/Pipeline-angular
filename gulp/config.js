'use strict';

const baseDir = {
        dest: 'dist',
        src: 'frontend'
    },
    folderNames = {
        npm: 'node_modules',
        bower: 'bower_components',
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
        js: {
            libs: {
                npm: ['angular2/bundles/angular2.min.js'],
                bower: ['system.js/dist/system.js']
            }
        },
        css: {
            libs: {
                npm: [],
                bower: ['bootstrap/dist/css/bootstrap.min.css']
            }
        },
        get bowerLibs() {
            return this.js.libs.bower.concat(this.css.libs.bower);
        },
        get npmLibs() {
            return this.js.libs.npm.concat(this.css.libs.npm);
        },
        get libs() {
            return this.bowerLibs.concat(this.npmLibs);
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