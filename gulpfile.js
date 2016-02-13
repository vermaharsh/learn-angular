var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var print = require('gulp-print');
var angularFilesort = require('gulp-angular-filesort');
var uglify = require('gulp-uglify');
var del = require('del');
var ts = require('gulp-typescript');

gulp.task('build', ['spa-task'], function() {
});

gulp.task('clean-build', function() {
    return del(['.build'], {force: true}).then(paths =>
        console.log('Deleted files and folders:\n', paths.join('\n')));
});

gulp.task('copy-posts-html', ['clean-build'], function() {
    var target = gulp.src('./src/posts/*.html');
    return target.pipe(gulp.dest('.build/posts/'));
});

gulp.task('copy-index-html', ['clean-build'], function() {
    var target = gulp.src('./views/index.html');
    return target.pipe(gulp.dest('.build/'));
});

gulp.task('copy-html', ['copy-posts-html', 'copy-index-html'], function() {
});
 
gulp.task('css-task', ['copy-html'], function () {
    var target = gulp.src('.build/index.html');
 
    var customCssStream = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
                                    './styles/site.css']);
 
    return target
        .pipe(inject(
            customCssStream.pipe(print())
            .pipe(concat('appStyles.css'))
            .pipe(gulp.dest('.build/css')), { name: 'styles' })
            )
        .pipe(gulp.dest('.build/'));
});

gulp.task('vendors-task', ['css-task'], function () {
    var target = gulp.src('.build/index.html');
 
    var vendorStream = gulp.src(['./bower_components/angular-route/angular-route.js',
                                 './bower_components/angular/angular.js',
                                 './bower_components/bootstrap/dist/js/bootstrap.js',
                                 './bower_components/jquery/dist/jquery.js']);
 
    return target
        .pipe(inject(
            vendorStream.pipe(print())
                        .pipe(angularFilesort())
                        .pipe(concat('vendors.js'))
                        .pipe(gulp.dest('.build/vendors')), { name: 'vendors' }))
        .pipe(gulp.dest('.build/'));
});

gulp.task('ts-compile-domain', ['clean-build'], function() {
    var domainTsResult = gulp.src('./src/domain/*.ts');
    return domainTsResult
        .pipe(ts({
            out: 'domain.js'
        }))
        .pipe(gulp.dest('.build/src-js/'));
});

gulp.task('ts-compile-app', ['clean-build'], function() {
    var appTsResult = gulp.src(['./src/app.ts', './src/common/services/*.ts', './src/posts/*.ts']);
    return appTsResult
        .pipe(ts({
            out: 'app.js'
        }))
        .pipe(gulp.dest('.build/src-js/'));
});

gulp.task('ts-compile', ['ts-compile-domain', 'ts-compile-app'], function() {
});

gulp.task('spa-task', ['ts-compile', 'vendors-task'], function () {
    var target = gulp.src('.build/index.html');
 
    var appDomainStream = gulp.src('.build/src-js/domain.js');
    var appStream = gulp.src('.build/src-js/app.js');
 
    return target
                .pipe(inject(appDomainStream
                        .pipe(print())
                        .pipe(concat('domain.js'))
                        .pipe(uglify())
                        .pipe(gulp.dest('.build/spa')), { name: 'domain' }))
                        .pipe(gulp.dest('.build/'))
                .pipe(inject(appStream
                        .pipe(print())
                        .pipe(concat('app.js'))
                        .pipe(uglify())
                        .pipe(gulp.dest('.build/spa')), { name: 'app' }))
                        .pipe(gulp.dest('.build/'))
});
