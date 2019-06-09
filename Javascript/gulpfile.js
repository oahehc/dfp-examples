const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./'],
    },
  });

  gulp.watch(['*.html']).on('change', browserSync.reload);
});
