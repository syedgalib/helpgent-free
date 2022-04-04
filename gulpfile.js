var  project    = require('./package.json'),
gulp            = require('gulp'),
babel           = require("gulp-babel");
sass            = require('gulp-sass');
autoPrefixer    = require('gulp-autoprefixer'),
wpPot           = require('gulp-wp-pot'),
clean           = require('gulp-clean'),
zip             = require('gulp-zip');

sass.compiler = require('node-sass');


gulp.task('babel', function () {
    return gulp.src('src/js/main.js')
        .pipe(babel({
            presets: ['es2015','react']
        }))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('sass', function () {
	return gulp.src(['style.scss'], {cwd: 'src/sass'})
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoPrefixer({ browsers: ["> 1%", "last 2 versions"] }))
	.pipe(gulp.dest('assets/css/'))
});

gulp.task('pot', function () {
	return gulp.src(['**/*.php', '!__*/**', '!src/**', '!assets/**'])
	.pipe(wpPot( {
		domain: project.name,
		bugReport: 'support@wpwax.com',
		team: 'wpWax <support@wpwax.com>'
	} ))
	.pipe(gulp.dest('languages/wpwaxvm.pot'));
});

gulp.task('clean', function () {
	return gulp.src('__build/*.*', {read: false})
	.pipe(clean());
});

gulp.task('zip', function () {
	return gulp.src(['**', '!__*/**', '!node_modules/**', '!src/**', '!gulpfile.js', '!.DS_Store', '!package.json', '!package-lock.json', '!todo.txt'], { base: '..' })
	.pipe(zip(project.name+'.zip'))
	.pipe(gulp.dest('__build'));
});

gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('run', gulp.parallel('sass','pot'));
gulp.task('build', gulp.series('run','clean','zip'));

gulp.task('default', gulp.series('sass','watch'));