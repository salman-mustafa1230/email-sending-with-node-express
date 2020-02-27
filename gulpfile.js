const gulp = require('gulp');
const gulpMocha = require("gulp-mocha");
const eslint = require('gulp-eslint');
const friendlyFormatter = require("eslint-friendly-formatter");

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js','!node_modules/**','!node_modules_docker/**'])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format(friendlyFormatter))
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('mocha',  () => {
  return gulp.src([
    "./test/**/*.test.js",
  ]).pipe(gulpMocha({exit: true}));
});


gulp.task('tests', ['lint', 'mocha'], function () {
  // This will only run if the lint task is successful...
});