var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


/**
 * Kompilacja SASS -> CSS
 */
gulp.task( 'sass', function(){
    return gulp.src('scss/main.scss') // Plik wejściowy do kompilacji

        .pipe( sass().on('error', sass.logError) ) // Wyświetlanie informacji o błędach w kodzie

        .pipe( sourcemaps.init() ) // Inicjalizacja funckji map źródłowych
        .pipe(sourcemaps.identityMap())

        .pipe( autoprefixer({
            browsers: ['last 4 versions'] // Uruchomienie autoprefixera dla 4 wersji przeglądarek wstecz
        }))

        .pipe( sass({
            outputStyle: 'compressed' // Kompilacja z SASS na CSS
        }))

        .pipe( sourcemaps.write() ) // Dopisanie do pliku mapy źródłowej

        .pipe( gulp.dest('css') ) // Zapis zmodyfikowanego pliku do katalogu /css

        .pipe(browserSync.stream()) // Odświeżenie widoku
});


/**
 * Obserwator plików
 */
gulp.task( 'watch', function(){
    browserSync.init({
        server: ".",
        notify: true,
        open: true,
        browser: "google chrome"
    });

    // Obserwacja SASS'a
    gulp.watch( 'scss/**/*.scss', ['sass'] );

    // Obserwacja HTML'a
    gulp.watch('./index.html', browserSync.reload);
});
