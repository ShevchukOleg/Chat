const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps'),
      watch = require('gulp-watch'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      browserSync = require('browser-sync').create(),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify'),
      del = require('del');



gulp.task('sass', function(){
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
    })
  )
  .pipe(cleanCSS({level: 2}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src/css/'))
  .pipe(browserSync.stream());
})

gulp.task('scripts', function(){
  return gulp.src(['./src/js/jscomponents/My-script.js','./src/js/jscomponents/uncompressed_development_jQuery_3.3.1.js', './src/js/jscomponents/bootstrap.min.js'])
  .pipe(concat('resultScript.js'))
  .pipe(gulp.dest('./src/js'))
  .pipe(browserSync.stream());
  });



function clean(){
    return del(['docs/*']);
}

gulp.task('clean', clean);

gulp.task('watch', function(){
  browserSync.init({
		server:{
			baseDir: './src'
		}
  });
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/js/jscomponents/**/*.js', gulp.series('scripts'));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
})

gulp.task('moveHTML', function(){
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('./docs'));
  });

gulp.task('moveCSS', function(){
  return gulp.src(['src/css/style.css'])
    .pipe(gulp.dest('./docs/css'));
  });

gulp.task('moveJS', function(){
  return gulp.src(['src/js/resultScript.js'])
    .pipe(gulp.dest('./docs/js'));
  });

gulp.task('moveFonts', function(){
  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest('./docs/fonts'));
  });

gulp.task('moveImages', function(){
  return gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('./docs/images'));
  });

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('sass', 'scripts'),
  gulp.parallel('moveHTML', 'moveCSS', 'moveJS', 'moveFonts', 'moveImages')));