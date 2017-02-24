/*!
 * gulp
 * $ npm install gulp-sass gulp-less gulp-autoprefixer gulp-minify-css gulp-htmlmin gulp.spritesmith gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
 */
// 加载各个模块
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    spritesmith = require('gulp.spritesmith'),
    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
// sass编译
gulp.task('sass', function() {
    return gulp.src(['scss/index.scss'])
        .pipe(sass())
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css'))
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(notify({ message: 'sass task complete' }));
});
// less编译
gulp.task('less', function() {
    return gulp.src('less/style.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css'))
});
// 图片压缩
gulp.task('images', function() {
    return gulp.src('images/*')
           .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
           .pipe(gulp.dest('images'))
});
//雪碧图
gulp.task('sprite',['sass','less','images'], function () {
    return gulp.src('images/{*title*,*zan*,*btn*,*lottery_img*}.{jpg,png}')
            .pipe(spritesmith({
                imgName: 'images/sprite.png',
                cssName: 'css/sprite.css',
                algorithm:'top-down',
            }))
            .pipe(gulp.dest(''));
});
//css合并
gulp.task('css', ['sprite'], function() {
    return gulp.src(['css/*.css','!css/all.css'])
           .pipe(concat('all.css'))
           .pipe(minifycss())
           .pipe(gulp.dest('css'))
});
// js合并压缩
gulp.task('js', function() {
    return gulp.src(['js/*.js','!js/all.js'])
            //.pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('all.js'))
            //.pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('js'))
            //.pipe(notify({ message: 'JS task complete' }));
});
// 监听
gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('images/*', ['images']);
    livereload.listen();
    gulp.watch(['css/*.css','js/*.js','*.html']).on('change', livereload.changed);
});
// 默认任务
gulp.task('default',['watch'], function() {
    gulp.start('sass', 'less', 'images', 'sprite','css','js');
});

