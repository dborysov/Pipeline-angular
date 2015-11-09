'use strict';

var path = require('path'),
    gulp = require('gulp'),
    ts = require('gulp-typescript'),
    inject = require('gulp-inject');

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

gulp.task('default', ['compile-ts'], () => {
    const sources = gulp.src(src.js.lib);

    return gulp.src(src.html.main)
        .pipe(inject(sources))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', () =>
    gulp.watch(src.ts.custom.concat([src.html.main]), ['default'])
)