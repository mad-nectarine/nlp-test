var gulp = require('gulp');
var tsd = require('gulp-tsd');
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
var through = require('through2');
var glob = require('glob');
var es = require('event-stream');
var rename = require('gulp-rename');
var path = require('path');
    
/** config  **/
gulp.task("tsconfig-update", function () {
    console.log("executing [tsconfig-update]...");
    var configPath = "./tsconfig.json";
    var projectDir = path.dirname();
    var load_tsconfig = function (resolve, reject) {
        fs.stat(configPath, function (err) {
            if (err) {
                reject(path.default.resolve(configPath) + " not exist");
            }
            resolve(configPath);
        });
    };
    var get_files = function () {
        return tsconfig
            .load(projectDir)
            .then(function (result) {
                //Resolve files into relative path"
                var resolved = [];
                result.files.forEach(function (file) {
                    var fpath = './' + path.relative(projectDir, file).replace(/\\/g, '/');
                    resolved.push(fpath);
                });
                result.files = resolved;
                return result;
            });
    };
    var write_config = function (tsconfig) {
        fs.writeFile(configPath, JSON.stringify(tsconfig, null, 2));
    };
    new Promise(load_tsconfig)
        .then(get_files)
        .then(write_config)
        .catch(function (err) {
            console.error("[tsconfig-update] " + err);
        });
});
gulp.task("jsconfig-update", function () {
    console.log("executing [jsconfig-update]...");
    var configPath = "./jsconfig.json";
    var projectDir = path.dirname();
    var load_tsconfig = function (resolve, reject) {
        fs.stat(configPath, function (err) {
            if (err) {
                reject(path.resolve(configPath) + " not exist");
            }
            resolve(configPath);
        });
    };
    var get_files = function () {
        return tsconfig
            .readFile(configPath)
            .then(function (result) {
                //Resolve files into relative path"
                var resolved = [];
                result.files.forEach(function (file) {
                    var fpath = './' + path.relative(projectDir, file).replace(/\\/g, '/');
                    resolved.push(fpath);
                });
                result.files = resolved;
                return result;
            });
    };
    var write_config = function (tsconfig) {
        fs.writeFile(configPath, JSON.stringify(tsconfig, null, 2));
    };
    return new Promise(load_tsconfig)
        .then(get_files)
        .then(write_config)
        .catch(function (err) {
            console.error("[jsconfig-update] " + err);
        });
});
/** scripts  **/
gulp.task("tsc-compile", function () {
    console.log("executing [tsc-compile]...");
    var tsProject = typescript.createProject('tsconfig.json');
    var tsResult = tsProject.src() // instead of gulp.src(...) 
        .pipe(typescript(tsProject));
    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task("browserify-release", function (done) {    
    console.log("executing [browserify-release]...");
    var configPath = "./gulpbrowserify.json";
    if(!fs.existsSync(configPath)){
        done("config file not found. [" + configPath + "]");
    }
    var config = require(configPath);
    glob(config.glob, function(err, files) {
        if(err) done(err);
        var tasks = files.map(
            function(entry) {
                return browserify({ entries: [entry],transform: [reactify] })
                    .bundle()
                    .pipe(source(entry))
                    .pipe(rename({
                        dirname: config.dist,
                        basename: path.basename(entry, config.rename.extname.source),
                        extname: config.rename.extname.release
                    }))
                    .pipe(buffer())
                    .pipe(uglify())
                    .pipe(gulp.dest('./'));
            });
        es.merge(tasks).on('end', done);
    });
});

gulp.task("browserify-debug", function (done) {    
    console.log("executing [browserify-debug]...");
    var configPath = "./gulpbrowserify.json";
    if(!fs.existsSync(configPath)){
        done("config file not found. [" + configPath + "]");
    }
    var config = require(configPath);
    glob(config.glob, function(err, files) {
        if(err) done(err);
        var tasks = files.map(
            function(entry) {
                return browserify({ entries: [entry],transform: [reactify] })
                    .bundle()
                    .pipe(source(entry))
                    .pipe(rename({
                        dirname: config.dist,
                        basename: path.basename(entry, config.rename.extname.source),
                        extname: config.rename.extname.debug
                    }))
                    .pipe(buffer())
                    .pipe(gulp.dest('./'));
            });
        es.merge(tasks).on('end', done);
    });
});

gulp.task("babel", function () {
    console.log("executing [babel]...");
    var configPath = "./jsconfig.json";
    var projectDir = path.dirname();
    var load_tsconfig = function (resolve, reject) {
        fs.stat(configPath, function (err) {
            if (err) {
                reject(path.resolve(configPath) + " not exist");
            }
            resolve(configPath);
        });
    };
    var convert = function () {
        return tsconfig
            .readFile(configPath)
            .then(function (result) {
                //Resolve files into relative path"
                result.files.forEach(function (file) {
                    var fpath = './' + path.relative(projectDir, file).replace(/\\/g, '/');
                    var fdir = path.dirname(fpath);
                    gulp.src(fpath)
                        .pipe(babel({
                            presets: ['es2015']
                        }))
                        .pipe(gulp.dest(fdir));
                    //.pipe(gulp.dest('./babel'));
                });
                return result;
            });
    };

    return new Promise(load_tsconfig)
        .then(convert)
        .catch(function (err) {
            console.error("[jsconfig-update] " + err);
        });
});

gulp.task("build", function (callback) {
    console.log("executing [script]...");
    return seq(
        "tsconfig-update",
        "tsc-compile",
        "jsconfig-update",
        "babel",
        "browserify-release",
        "browserify-debug",
        callback);
});
