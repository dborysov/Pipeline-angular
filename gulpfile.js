'use strict';

var path = require('path'),
    gulp = require('gulp'),
    ts = require('gulp-typescript'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass');

var src = {
    js: {
        lib: [
            './node_modules/systemjs/dist/system.js',
            './node_modules/typescript/lib/typescript.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js',
            './node_modules/angular2/bundles/http.dev.js'
        ]
    },
    css: {
        lib: [
            './bower_components/bootstrap/dist/css/bootstrap.min.css'
        ]
    },
    sass: {
        custom: [
            './app/Content/Sass/+(*.sass|*.scss)'
        ]
    },
    ts: {
        custom: [
            './app/**/*.ts'
        ]
    },
    html: {
        main: './index.html'
    }
};

var dest = './dest';

gulp.task('compile-ts', () =>
    gulp.src(src.ts.custom)
    .pipe(ts({
        target: 'ES5',
        module: 'commonjs',
        sortOutput: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false
    })).js
    .pipe(gulp.dest(path.join(dest, 'app')))
);

gulp.task('compile-css', () => 
    gulp.src(src.sass.custom)
        .pipe(sass())
        .pipe(gulp.dest(path.join(dest, '/css'))));

gulp.task('default', ['compile-ts', 'compile-css'], () => {
    const sources = gulp.src(src.js.lib.concat(src.css.lib).concat(path.join(dest, 'css', '*.css')));

    return gulp.src(src.html.main)
        .pipe(inject(sources))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', () =>
    gulp.watch(src.ts.custom.concat([src.html.main]), ['default'])
)