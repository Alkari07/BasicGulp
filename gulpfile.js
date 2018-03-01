const gulp = require('gulp'); //imports the gulp module from node environment
const imagemin = require('gulp-imagemin');
const uglify = require ('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
    --TOP LEVEL FUNCTIONS
    gulp.task - Defines tasks 
    gulp.src - Point to files to use
    gulp.dest - points to folder to output to
    gulp.watch - watches files for changes
*/

//basic task that Logs a message
gulp.task('message', function() {
    return console.log('gulp is running on message');
});

//default task that runs if you don't specify anything
//the array specifies all goals you want run, similar to ant or mvn
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'scripts', 'sass', 'watch'] );

//copies html
gulp.task('copyHtml', function() {
    gulp.src('src/*.html').pipe(gulp.dest('dist')); //grabs any file with html ending and pipes to gulp.dest
});

//Optimize images using a plugin (makes them smaller to store)
//installed it as a dev dependency using npm install --save-dev gulp-imagemin
gulp.task('imageMin', function() {
    //labmda style exptression
    gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
});

//minify JS using another plugin called uglify
gulp.task('minify', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//compile Sass to css
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

//concatinate seperate js files into one called main.js
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    //param to watch location/file type, and if a match is found, what script to run
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
})