let project_folder = "dist";
let source_folder = "#src";

let puth = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gig,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gig,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html');


function browserSync(){
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

function html(){
    return src(puth.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(puth.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(puth.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(puth.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(puth.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(puth.src.js)
        .pipe(fileinclude())
        .pipe(dest(puth.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(puth.build.js))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(puth.src.fonts)
        .pipe(dest(puth.build.fonts))
}

function images() {
    return src(puth.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(puth.build.img))
        .pipe(src(puth.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(puth.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(){
    gulp.watch([puth.watch.html], html);
    gulp.watch([puth.watch.css], css);
    gulp.watch([puth.watch.js], js);
    gulp.watch([puth.watch.img], images);
}

function clean(){
    return del(puth.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = build;
exports.build = build;
exports.watch = watch;
exports.default = watch;