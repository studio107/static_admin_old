var gulp = require('gulp');

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    // rewriteCSS = require('gulp-rewrite-css'),
    coffee = require('gulp-coffee'),
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
        'vendor/mindy-sass/mindy'
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
        'vendor/remarkable/dist/remarkable.js',
        'vendor/jquery-form/jquery.form.js',

        'vendor/underscore/underscore.js',
        'vendor/ckeditor/ckeditor.js',
        'vendor/meditor/js/utils.js',
        'vendor/meditor/js/core.js',
        'vendor/meditor/js/engine.js',
        'vendor/meditor/js/editor.js',
        'vendor/meditor/js/block.js',
        'vendor/meditor/js/plugins/text/text.js',
        'vendor/meditor/js/plugins/video.js',
        'vendor/meditor/js/plugins/lost.js',
        'vendor/meditor/js/plugins/space.js',
        'vendor/meditor/js/plugins/image.js',
        'vendor/meditor/js/plugins/map/map.js',

        'vendor/ace/build/src/ace.js',
        'vendor/ace/build/src/mode-twig.js',
        'vendor/ace/build/src/theme-crimson_editor.js',
        'vendor/ace/build/src/ext-emmet.js',
        'vendor/ace/build/src/ext-language_tools.js',
        'vendor/ace/build/src/snippets/text.js',
        'vendor/ace/build/src/snippets/twig.js',

        // https://github.com/nightwing/emmet-core
        'components/emmet.js',
        'components/mtooltip/mtooltip.js',
        'components/jquery.dragsort-0.5.2.min.js',

        'js/*.js'
    ],
    coffee: 'js/**/*.coffee',
    fonts: 'fonts/**/*',
    images: 'images/**/*',
    sass: [
        'scss/**/*.scss'
    ],
    css: [
        'css/**/*.css',

        'fonts/lato/css/style.css',
        'fonts/glyphico/css/style.css',

        'vendor/meditor/css/editor.css',
        'vendor/pen/src/pen.css',
        'vendor/pickmeup/css/pickmeup.css',

        'components/mtooltip/mtooltip.css'
    ]
};

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dst.fonts));
});

gulp.task('wysiwyg', function() {
    return gulp.src('vendor/tinymce107/**/*')
        .pipe(gulp.dest('dist/wysiwyg'))
        .pipe(livereload());
});

gulp.task('coffee', function() {
    gulp.src(paths.coffee)
        .pipe(coffee({
            bare: true
        }).on('error', function(err) {
            console.log(err);
        }))
        .pipe(gulp.dest(dst.js))
});

gulp.task('js', ['coffee'], function() {
    return gulp.src(paths.js)
        // .pipe(uglify())
        .pipe(concat(version + '.all.js'))
        .pipe(gulp.dest(dst.js))
        .pipe(livereload());
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(changed(dst.images))
        .pipe(imagemin(imagesOpts))
        .pipe(gulp.dest(dst.images));
});

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass(sassOpts))
        .pipe(gulp.dest(dst.sass));
});

gulp.task('css', ['sass', 'fonts'], function() {
    return gulp.src(paths.css)
        //.pipe(rewriteCSS({
        //    destination: 'dist/css/'
        //}))
        .pipe(gulp.dest(dst.sass))
        .pipe(concat(version + '.all.css'))
        .pipe(minifyCSS(minifyOpts))
        .pipe(gulp.dest(dst.css))
        .pipe(livereload());
});

gulp.task('watch', ['default'], function() {
    livereload.listen();
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.sass, ['css']);
});

gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
        read: false
    }).pipe(clean());
});

gulp.task('default', ['clean'], function() {
    return gulp.start('js', 'css', 'images', 'wysiwyg');
});
