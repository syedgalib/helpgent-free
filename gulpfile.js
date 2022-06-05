const project = require("./package.json");
const gulp    = require("gulp");
const wpPot   = require("gulp-wp-pot");
const clean   = require("gulp-clean");
const zip     = require("gulp-zip");

gulp.task("pot", function () {
	return gulp
		.src(["**/*.php", "!__*/**", "!src/**", "!assets/**"])
		.pipe(
			wpPot({
				domain: project.name,
				bugReport: "support@wpwax.com",
				team: "wpWax <support@wpwax.com>",
			})
		)
		.pipe(gulp.dest("languages/wpwaxvm.pot"));
});

gulp.task("clean", function () {
	return gulp.src("__build/*.*", { read: false }).pipe(clean());
});

gulp.task("zip", function () {
	return gulp
		.src(
			[
				"assets/**",
				"inc/**",
				"languages/**",
				"*.php",
				"readme.txt",
				"!**/*.map",
			],
			{ base: "..", allowEmpty: true }
		)
		.pipe(zip(project.name + ".zip"))
		.pipe(gulp.dest("__build"));
});

gulp.task("build", gulp.series("pot", "clean", "zip"));
