var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'), 
    minifycss = require('gulp-minify-css'),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    es6Path = 'es6/*.js',
    compilePath = '/js/compiled',
    babel = require('gulp-babel');

var paths = {
    styles: ['./scss/style.scss']
}

gulp.task('styles', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions','safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: true
        }))
        .pipe(gulp.dest('./css')) //save as styles.css 
        .pipe(minifycss()) //minify
        .pipe(rename('style.min.css')) //rename it
        .pipe(gulp.dest('./css')) //destination dir
        .pipe(notify('SCSS compiled!'));
});

// gulp.task('babel', function () {
//     gulp.src('./es6/*.js')
//         .pipe(plumber())
//         .pipe(babel())
//         .pipe(gulp.dest(compilePath))
//         .pipe(notify({message: 'ES6 Compiled to ES5'}))
// });

gulp.task('js', function () {
    gulp.src('./js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('styles.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('js/min'))
        .pipe(notify({message: 'JS Compiled!'}))
});

gulp.task('watch', function () {
    // livereload.listen();
    gulp.watch('./scss/partials/*.scss', ['styles']); // watch main styles.scss  
    gulp.watch('./scss/vendor/*.scss', ['styles']); // watch partials and vendor dirs
    gulp.watch([es6Path]);    
    gulp.watch('./js/*.js', ['js']);
});


gulp.task('default', function() {
  gulp.start('watch','styles','js');
});