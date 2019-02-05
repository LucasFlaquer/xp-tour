const gulp = 					require("gulp");
const sass = 					require("gulp-sass");
const postcss = 			require("gulp-postcss");
const autoprefixer = 	require("autoprefixer");
const cssnano = 			require("cssnano");
const sourcemaps = 		require("gulp-sourcemaps");
const browserSync = 	require("browser-sync").create();

const path = {
	root: "./",
	src: {
		root: 		"app/",
		fonts: 		"app/fonts",
    samples: 	"app/samples",
		sass: 		"app/scss/**/*.scss",
    js: 			"app/js/**/*.js",
    template:  "app/templates/*.html"
	},
	dist: {
		root: "dist/",
		css: "dist/css",
    js: "dist/js"
	}
}
const bootstrap = path.root + "node_modules/bootstrap/dist/js/bootstrap.js";
const popper = path.root + "node_modules/popper.js/dist/umd/popper.js";
const jquery = path.root + "node_modules/jquery/dist/jquery.js";
const javascript = path.src.js;
//compile scss files to css, minify and sync the browser
function style() {
  return gulp
    .src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.reload({stream: true}));  
}
//copy html files
function copyHtml() {
	return gulp
		.src(path.src.template)
		.pipe(gulp.dest((path.dist.root)))
		.pipe(browserSync.reload({stream: true}));
}
function copyJs() {
  return gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.reload({stream: true}));
}
// reload browser starta o browser
function browsersync() {
	browserSync.init({
    server: {
      baseDir: path.dist.root,
    },
    port: 8080,
    startPath: 'index.html',
  })
}
//build the javascripts files (bootstrap, jquery, popper and custo files)
function buildJS() {
  return gulp
    .src([bootstrap, popper, jquery, javascript])
    .pipe(gulp.dest(path.dist.js));
}
// Add browsersync initialization at the start of the watch task
function watch() {
  gulp.watch(path.src.sass, style);
  gulp.watch(path.src.template, copyHtml);
  gulp.watch(path.src.js, copyJs);
}

const build = gulp.parallel(buildJS, style, copyHtml);

exports.watch = watch;
exports.browsersync = browsersync;
exports.build = build;
exports.default = gulp.series(build, gulp.parallel(browsersync, watch));