var gulp = require('gulp');
var tsd = require('gulp-tsd');
var typescript = require('gulp-typescript');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
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
var dtsBundle = require('dts-bundle');
var merge = require('merge2');
    
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
    var tsResult = tsProject.src().pipe(typescript(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('./.definitions')),
        tsResult.js.pipe(gulp.dest('./'))
    ])
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

gulp.task("dts-bundle", function () {
    console.log("executing [dts-bundle]...");
    dtsBundle.bundle({
        name: 'nlp-data',
        main: '.definitions/index.d.ts',
        out: '../.publish/nlp-data/nlp-data.d.ts'
    });
});

gulp.task("copy-files-for-publish", function (callback) {
    console.log("executing [copy-files-for-publish]...");

    return glob("src/*/*.js", null, function (error, files) {
        console.log("copy " + files.length + " src files....");
        files.forEach(function (file) {
            console.log("・" + file);
            var outDir = path.dirname(file)
            gulp.src(file)
                .pipe(gulp.dest(".publish/nlp-data/" + outDir))
        }, this);


        var others = ["index.js", "package.json"]
        console.log("copy others ....");
        others.forEach(function (file) {
            console.log("・" + file);
            gulp.src(file)
                .pipe(gulp.dest(".publish/nlp-data"))
        }, this);
        
        callback();
    })
});



gulp.task("build", function (callback) {
    console.log("executing [script]...");
    return seq(
        "tsconfig-update",
        "tsc-compile",
        "jsconfig-update",
        "babel",
        callback);
});

gulp.task("publish", function (callback) {
    console.log("executing [script]...");
    return seq(
        "tsconfig-update",
        "tsc-compile",
        "jsconfig-update",
        "babel",
        "dts-bundle",
        "copy-files-for-publish",
        callback);
});
