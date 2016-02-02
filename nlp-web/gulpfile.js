var gulp = require('gulp');
var typescript = require('gulp-typescript');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var seq = require('run-sequence');
var babel = require('gulp-babel');
var tsconfig = require('tsconfig');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var es = require('event-stream');
var rename = require('gulp-rename');

var _log = function (message, isError) {
    var now = new Date();
    var out =
        "["
        + ("0" + now.getHours()).slice(-2) + ":"
        + ("0" + now.getMinutes()).slice(-2) + ":"
        + ("0" + now.getSeconds()).slice(-2)
        + "] "
        + message;
    if (isError) {
        console.error(out);
    } else {
        console.log(out);
    }
};
    
/** scripts  **/
gulp.task("tsc-compile", function () {
    _log("##### [tsc-compile] #####");
    var tsProject = typescript.createProject('tsconfig.json');
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(typescript(tsProject));
    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task("browserify-release", function (done) {
    _log("##### [browserify-release] #####");
    var configPath = "./gulpbrowserify.json";
    if (!fs.existsSync(configPath)) {
        done("config file not found. [" + configPath + "]");
        return
    }
    var config = require(configPath);
    glob(config.glob, function (err, files) {
        if (err) {
            done(err);
            return;
        }
        var tasks = files.map(
            function (entry) {
                return browserify({ entries: [entry], transform: [reactify] })
                    .bundle()
                    .pipe(source(entry))
                    .pipe(rename({
                        dirname: config.dist,
                        basename: path.basename(entry, config.rename.extname.source),
                        extname: config.rename.extname.release
                    }))
                    .pipe(buffer())
                    .pipe(uglify())
                    .pipe(gulp.dest('./')).on('end', function () {
                        _log("completed [" + entry + "]")
                    });
            });
        es.merge(tasks).on('end', done);
    });
});

gulp.task("browserify-debug", function (done) {
    _log("##### [browserify-debug] #####");
    var configPath = "./gulpbrowserify.json";
    if (!fs.existsSync(configPath)) {
        done("[browserify-debug] config file not found. [" + configPath + "]");
    }
    var config = require(configPath);
    glob(config.glob, function (err, files) {
        if (err) {
            done(err);
            return;
        }
        var tasks = files.map(
            function (entry) {
                return browserify({ entries: [entry], transform: [reactify] })
                    .bundle()
                    .pipe(source(entry))
                    .pipe(rename({
                        dirname: config.dist,
                        basename: path.basename(entry, config.rename.extname.source),
                        extname: config.rename.extname.debug
                    }))
                    .pipe(buffer())
                    .pipe(gulp.dest('./')).on('end', function () {
                        _log("completed [" + entry + "]")
                    });
            });
        es.merge(tasks).on('end', done);
    });
});

gulp.task("babel", function (done) {
    _log("##### [babel] #####");
    var configPath = "./jsconfig.json";
    var projectDir = path.dirname();
    var load_tsconfig = function (resolve, reject) {
        fs.stat(configPath, function (err) {
            if (err) {
                reject(path.resolve(configPath) + " not exist");
                return
            }
            resolve(configPath);
        });
    };
    var convert = function () {
        tsconfig
            .readFile(configPath)
            .then(function (result) {
                var tasks = result.files.map(
                    function (file) {
                        var fpath = './' + path.relative(projectDir, file).replace(/\\/g, '/');
                        var fdir = path.dirname(fpath);
                        return gulp.src(fpath)
                            .pipe(babel({
                                presets: ['es2015']
                            }))
                            .pipe(gulp.dest(fdir)).on('end', function () {
                                _log("completed [" + fpath + "]");
                            });
                    });
                es.merge(tasks).on('end', done);
            });
    };

    new Promise(load_tsconfig)
        .then(convert)
        .catch(function (err) {
            console.error(err);
            done(err)
        });
});

gulp.task("build", function (done) {
    _log("##### [build] #####");
    return seq(
        "tsc-compile",
        "babel",
        "browserify-release",
        "browserify-debug",
        function (err) {
            done(err)
            if (err) {
                _log("######### build failed #########", true)
            } else {
                _log("######### build success #########")
            }
        });
});
