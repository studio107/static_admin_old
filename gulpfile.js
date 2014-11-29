var gulp = require('gulp');

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    cache = require('gulp-cached'),
    rewriteCSS = require('gulp-rewrite-css'),
    livereload = require('gulp-livereload');

var version = '1.0.0';

var minifyOpts = {

};

var imagesOpts = {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
};

var sassOpts = {
    includePaths: [
        'vendor/foundation/scss',
        'vendor/mindy-sass/mindy',
        '/Library/Ruby/Gems/2.0.0/gems/compass-0.12.6/frameworks/compass/stylesheets'
    ]
};

var dst = {
    js: 'dist/js',
    css: 'dist/css',
    images: 'dist/images',
    sass: './css',
    fonts: 'dist/fonts'
};

var paths = {
    js: [
        'vendor/jquery/dist/jquery.min.js',
        'vendor/modernizr/modernizr.js',
        'vendor/jquery.cookie/jquery.cookie.js',
        'vendor/fastclick/lib/fastclick.js',
        'vendor/foundation/js/foundation.min.js',
        'vendor/checkboxes.js/src/jquery.checkboxes.js',
        'vendor/select2/select2.js',
        'vendor/select2/select2_locale_ru.js',
        'vendor/jquery-autosize/jquery.autosize.min.js',
        'vendor/jquery-ui/ui/minified/jquery-ui.min.js',
        'vendor/flow.js/dist/flow.js',
//        'vendor/Chart.js/Chart.js',
        'vendor/mmodal/js/jquery.mindy.modal.js',
        'vendor/fancybox/source/jquery.fancybox.pack.js',
        'vendor/pickmeup/js/jquery.pickmeup.js',

        'components/mtooltip/mtooltip.js',
        'components/jquery.dragsort-0.5.2.min.js',

        'js/*.js'
    ],
    fonts: 'fonts/**/*',
    images: 'images/**/*',
    sass: [
        'scss/**/*.scss',
        'vendor/mmodal/scss/jquery.mmodal.scss'
    ],
    css: [
        'css/**/*.css',

        'fonts/lato/css/style.css',
        'fonts/glyphico/css/style.css',

        'components/mtooltip/mtooltip.css',
        'vendor/pen/src/pen.css',
        'vendor/pickmeup/css/pickmeup.css'
    ]
};

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dst.fonts));
});

gulp.task('wysiwyg', function() {
    return gulp.src('vendor/tinymce107/**/*')
        .pipe(gulp.dest('dist/wysiwyg'));
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        //.pipe(uglify())
        .pipe(concat(version + '.all.js'))
        .pipe(gulp.dest(dst.js));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(changed(dst.images))
        .pipe(cache('imagemin', imagesOpts))
        .pipe(gulp.dest(dst.images));
});

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass(sassOpts))
        .pipe(gulp.dest(dst.sass));
});

gulp.task('css', ['sass', 'fonts'], function() {
    return gulp.src(paths.css)
        .pipe(rewriteCSS({
            destination: 'dist/css/'
        }))
        .pipe(gulp.dest(dst.sass))
        .pipe(concat(version + '.all.css'))
        .pipe(minifyCSS(minifyOpts))
        .pipe(gulp.dest(dst.css));
});

// Rerun the task when a file changes
gulp.task('watch', ['default'], function() {
    var server = livereload(),
        liveReloadCallback = function(file) {
            setTimeout(function() {
                server.changed(file.path);
            }, 300);
        };

    gulp.watch(paths.js, ['js']).on('change', liveReloadCallback);
    gulp.watch(paths.images, ['images']).on('change', liveReloadCallback);
    gulp.watch(paths.sass, ['css']).on('change', liveReloadCallback);
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
        read: false
    }).pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('js', 'css', 'images', 'wysiwyg');
});
