
/*
	This file automates the application.

	It builds compiles the files, minify them, move them to public directory. 
	A directory named public is created if it is not present in the root directory. 

	It injects all the script and styles files including libraries to the index.html before moving to the public folder.

	It runs the Server at port 8080 on localhost. 

    For production run gulp with '--type production' flag to minify the output files
*/




/*

* Including all required modules

*/


var gulp   = require('gulp'),
	gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    exec = require('child_process').exec,
    open = require('gulp-open'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    uglify = require('gulp-uglify'),
    series = require('stream-series'),
    angularFilesort = require('gulp-angular-filesort');



// define the default task and adding other tasks to it

gulp.task(
	'default',

	[ 
		'jshint', 
		'build-scripts',
		'move-server',
		'server',
		'open', 
		'watch'
	]
);




gulp.task(
	'build-scripts', 

	function() {

		gutil.log('Building HTML, javascript and CSS files and sending them to the public folder');

		gulp.src('source/*.html').pipe(gulp.dest('public'));

		var libsJs = gulp.src('source/libs/js/*.js').pipe(angularFilesort()).pipe(gulp.dest('public/js'));

  		var appJs =  gulp.src('source/js/**/*.js')

    		.pipe(sourcemaps.init())

    		.pipe(concat('app.js'))

    		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 

    		.pipe(sourcemaps.write())

    		.pipe(gulp.dest('public/js'));

    	var libsCss = gulp.src('source/libs/css/*.css').pipe(gulp.dest('public/css'));

  		var styleCss = gulp.src('source/sass/**/*.sass')

    		.pipe(sourcemaps.init()) 

		    .pipe(sass())

    		.pipe(concat('app.css'))

		    .pipe(sourcemaps.write())

		    .pipe(gulp.dest('public/css'));

    	gulp.src('source/index.html')

			.pipe(inject(series(libsJs, appJs, libsCss, styleCss), {

                ignorePath: 'public',

                addRootSlash: false

            }))

			.pipe(gulp.dest('public'));
	}
);





gulp.task(
	'jshint', 

	function() {

  		return gulp.src('source/js/**/*.js')

    		.pipe(jshint())

    		.pipe(jshint.reporter('jshint-stylish'));

	}
);



gulp.task(
	'move-server', 

	function() {

		gutil.log('Sending server.js to the public folder');

  		return gulp.src('server.js').pipe(gulp.dest('public'));

	}
);

gulp.task(
	'server', 

	function (cb) {

		gutil.log('Starting Node Server');

		exec('node public/server.js', function (err, stdout, stderr) {

			console.log(stdout);

			console.log(stderr);

			cb(err);

		});
	}
);

gulp.task(
	'open', 

	function(){

		gutil.log('Goto http://localhost:8080 in your browser');

	}
);

gulp.task(
	'watch', 

	function() {

		gulp.watch('source/js/**/*.js', ['build-scripts']);

		gulp.watch('source/sass/**/*.sass', ['build-scripts']);

		gulp.watch('source/**/*.html', ['build-scripts']);

	}
);