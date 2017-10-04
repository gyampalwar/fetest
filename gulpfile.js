'use strict';

// Load plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require("gulp-concat"),
	pkg = require('./package.json'),
	paths = pkg.paths,
	gif = require('gulp-if'),
	merge = require('merge-stream'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	cleanCSS = require('gulp-cleancss'),
	csslint = require('gulp-csslint'),
	spritesmith = require("gulp.spritesmith"),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	del = require('del'),
	notify = require('gulp-notify'),
	svgSprite = require("gulp-svg-sprite"),
	browserify = require('browserify'),
	watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	watching = false;


//css task to check scss files for errors and combine to single style.css output file
gulp.task('css', function () {
	var streams = merge();
	paths.css.forEach(function (path) {
		streams.add(gulp.src(path.src + '*.scss')
			.pipe(gif(gutil.env.sourcemaps, sourcemaps.init()))
			.pipe(sass())
			.pipe(prefix({cascade: true}))
			.pipe(csslint())
			.pipe(gulp.dest(path.dest)))
		.pipe(cleanCSS({
			level: {
				1: {
				  all: false, // set all values to `false`
				  tidySelectors: true // turns on optimizing selectors
				}
			  }
		}))
		.pipe(gulp.dest(path.dest))
			.pipe(notify({ message: 'css task complete' }));
	});
	return streams;
});

gulp.task("concat-js", function () {
    return gulp.src(paths.jslib.src + ["*.js"])
          .pipe(concat('concat.min.js'))
        .pipe(gulp.dest(paths.jslib.dest))
		.pipe(uglify())
		.pipe(gulp.dest(paths.jslib.dest))
});

gulp.task('minify-js', function () {
	gulp.src(paths.js.dest + '*.js')
	.pipe(uglify())
	.pipe(gulp.dest(paths.js.dest));
});

//js task to check js files for errors and combine to single app.js output file
gulp.task('_js', function () {
	var opts = {
		entries: ['./' + paths.js.src + 'app.js'], // browserify requires relative path
		debug: gutil.env.sourcemaps
	};
	if (watching) {
		opts = Object.assign(opts, watchify.args);
	}
	var bundler = browserify(opts);
	if (watching) {
		bundler = watchify(bundler);
	}
	// optionally transform
	// bundler.transform('transformer');

	bundler.on('update', function (ids) {
		gutil.log('File(s) changed: ' + gutil.colors.cyan(ids));
		gutil.log('Rebundling...');
		rebundle(ids);
	});

	bundler.on('log', gutil.log);

	function rebundle (ids) {
		
		return bundler.bundle()
			.on('error', function (e) {
				gutil.log('Browserify Error', gutil.colors.red(e));
			})
			
			.pipe(source('app.js'))
			// sourcemaps
				.pipe(buffer())
				.pipe(sourcemaps.init({loadMaps: true}))
				.on('error', gutil.log)
				.pipe(notify({ message: 'js task complete' }))
				.pipe(sourcemaps.write('./'))	
			// 
			.pipe(gulp.dest(paths.js.dest));
	}
	return rebundle();
});

//Clean JS Map File task
gulp.task('js', ['_js'], function () {
  return del([
    paths.js.dest + "*.js.map"
  ]);
});

//watch task 
gulp.task('watch', function() {
  livereload.listen();
  watching = true;
  // Watch .scss files
	gulp.watch(paths.css.map(function (path) {
		return path.src + '*.scss';
	}), ['css']);
	// Watch .js files
	gulp.watch(paths.js.src, ['js']);
});

//default task
gulp.task('default', ['watch', 'development']);

gulp.task('development', ['concat-js','js','css']);

gulp.task('production', ['concat-js','minify-js','css']);
