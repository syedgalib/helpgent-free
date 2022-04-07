const project = require("./package.json");
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
const wpPot = require("gulp-wp-pot");
const clean = require("gulp-clean");
const webpack = require("webpack");
const webpackProdConfig = require("./webpack.config.prod.js");
const webpackDevConfig = require("./webpack.config.dev.js");
const zip = require("gulp-zip");

sass.compiler = require("node-sass");

gulp.task("sass", function () {
  return gulp
    .src(["style.scss"], { cwd: "src/sass" })
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoPrefixer({ browsers: ["> 1%", "last 2 versions"] }))
    .pipe(gulp.dest("assets/css/"));
});

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
        "**",
        "!__*/**",
        "!node_modules/**",
        "!src/**",
        "!gulpfile.js",
        "!.DS_Store",
        "!package.json",
        "!package-lock.json",
        "!todo.txt",
      ],
      { base: ".." }
    )
    .pipe(zip(project.name + ".zip"))
    .pipe(gulp.dest("__build"));
});

gulp.task("webpackProd", function (cb) {
  return new Promise((resolve, reject) => {
    webpack(webpackProdConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join("\n")));
      }
      resolve();
    });
  });
});

gulp.task("webpackDev", function (cb) {
  return new Promise((resolve, reject) => {
    webpack(webpackDevConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join("\n")));
      }
      resolve();
    });
  });
});

gulp.task("watch:js", function () {
  gulp.watch(["src/apps/**/*", "src/js/**/*"], gulp.series("webpackDev"));
});

gulp.task("watch:sass", function () {
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
});

gulp.task("watch", function () {
  gulp.watch(["src/apps/**/*", "src/js/**/*"], gulp.series("webpackDev"));
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
});

gulp.task("all", gulp.parallel("sass", "pot", "webpackProd"));
gulp.task("build", gulp.series("all", "clean", "zip"));