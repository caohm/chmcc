"use strict";

// Gets the persistent filesystem for this app and wraps it in the fs interface.

function getfs(callback) {
    var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    requestFileSystem(window.PERSISTENT, null, function (fs) {
        callback(null, wrapFileSystem(fs));
    }, function (fileError) {
        callback(fileError);
    });
}

// These functions make using async function in the repl easier.  If no
// callback is specified, they log the result to the console.
function log(err) {
    if (err) throw err;
    console.log.apply(console, Array.prototype.slice.call(arguments, 1));
}

function check(path, callback) {
    return function (err) {
        if (err) {
            err.path = path;
            console.error(err);
            callback(err);
        }
        else {
            callback.apply(this, arguments);
        }
    };
}
function rr2(fn) {
    if (CheckConfiger.isOpenFileSystem || false) {
        return function (arg1, arg2, callback) {
            return fn(arg1, arg2, check(arg1, callback || log));
        };
    } else {
        return function (arg1, arg2, callback) {
            callback();
        }
    }

}
function rr1(fn) {
    if (CheckConfiger.isOpenFileSystem || false) {
        return function (arg, callback) {
            return fn(arg, check(arg, callback || log));
        };
    } else {
        return function (arg1, callback) {
            callback();
        }
    }
}


function wrapFileSystem(fileSystem) {
    var cwd = fileSystem.root;
    var fs = {
        readfile: rr1(readfile),
        writefile: rr2(writefile),
        rmfile: rr1(rmfile),
        readdir: rr1(readdir),
        mkdir: rr1(mkdir),
        mkdirs: rr1(mkdirs),
        rmdir: rr1(rmdir),
        copy: rr2(copy),
        move: rr2(move),
        chdir: rr1(chdir),
        existsdir: rr1(existsdir),
        existsfile: rr1(existsfile),
        cleanfs: rr1(cleanfs),
        cwd: function () {
            return cwd.fullPath;
        }
    };

    function existsdir(path, callback) {
        cwd.getDirectory(path, {}, function (dirEntry) {
            callback(null, dirEntry);
        }, callback);
    }

    function cleanfs(path, callback) {
        function cleanfsTask() {
            var taskNum = 0;
            var successNum = 0;
            this.addTaskNum = function (n) {
                taskNum += n;
            };
            this.log = function () {
                console.log("taskNum:" + taskNum + "    successNum:" + successNum);
            };
            this.addSuccessNum = function (n) {
                // debugger;
                if (CheckConfiger.status == "stop")
                    return;
                successNum += n;
                if (taskNum == successNum) {
                    this.propertyChange();
                }
            };
            this.propertyChange = function () {
                // debugger;
                callback();
            }
        }

        var cleanTask = new cleanfsTask();
        CheckConfiger.fs.readdir(path, function (err, res) {
            if (err) {
                console.log(err.name + " : " + err.message);
                cleanTask.addTaskNum(1);
                cleanTask.addSuccessNum(1);
            }
            if (res.length == 0) {
                cleanTask.addTaskNum(1);
                cleanTask.addSuccessNum(1);
            } else {
                cleanTask.addTaskNum(res.length);
                for (var i = 0; i < res.length; i++) {
                    if (res[i].indexOf("/") >= 0) {
                        CheckConfiger.fs.rmdir(path + "/" + res[i], function (err) {
                            cleanTask.addSuccessNum(1);
                            if (err) {
                                console.error(err.name + " : " + err.message);
                            }
                        });
                    } else {
                        CheckConfiger.fs.rmfile(path + "/" + res[i], function (err) {
                            cleanTask.addSuccessNum(1);
                            if (err) {
                                console.error(err.name + " : " + err.message);
                            }
                        });
                    }
                }
            }
        });
    }

    function existsfile(path, callback) {
        cwd.getFile(path, {}, function (fileEntry) {
            callback(null, fileEntry);
        }, callback);
    }

    function readfile(path, callback) {
        cwd.getFile(path, {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(null, this.result);
                };
                // TODO: find a way to read as binary too
                reader.readAsText(file);
            }, callback);
        }, callback);
    }

    function writefile(path, contents, callback) {

        function ef() {
            // debugger;
            cwd.getFile(path, {create: true}, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    var truncated = false;
                    fileWriter.onwriteend = function () {
                        if (!truncated) {
                            truncated = true;
                            this.truncate(this.position);
                            return;
                        }
                        callback();
                    };
                    fileWriter.onerror = callback;
                    // TODO: find a way to write as binary too
                    fileWriter.write(new Blob([contents], {type: 'text/plain'}));
                }, callback);
            }, callback);
        }

        // debugger;
        var name = path.replace(/^\//, '').replace(/\/$/, '');
        if (name.indexOf("/") >= 0) {
            var arr = name.split("/");
            name = name.replace(arr[arr.length - 1], '')
            existsdir(name, function (err, res) {
                if (err) {
                    mkdirs(name, function () {
                        ef();
                    });
                } else {
                    ef();
                }
            });
        } else {
            ef();
        }


    }

    function rmfile(path, callback) {
        cwd.getFile(path, {}, function (fileEntry) {
            fileEntry.remove(function () {
                callback();
            }, callback);
        }, callback);
    }

    function readdir(path, callback) {
        cwd.getDirectory(path, {}, function (dirEntry) {
            var dirReader = dirEntry.createReader();
            var entries = [];
            readEntries();
            function readEntries() {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        callback(null, entries);
                    }
                    else {
                        entries = entries.concat(Array.prototype.slice.call(results).map(function (entry) {
                            return entry.name + (entry.isDirectory ? "/" : "");
                        }));
                        readEntries();
                    }
                }, callback);
            }
        }, callback);
    }

    function mkdir(path, callback) {
        cwd.getDirectory(path, {create: true}, function () {
            // debugger;
            callback();
        }, callback);
    }

    function mkdirs(path, callback) {
        path = path.replace(/^\//, '').replace(/\/$/, '');
        existsdir(path, function (err, res) {
            if (err) {
                var arr = path.split('/');
                var name = "";
                for (var i = 0; i < arr.length; i++) {
                    name += arr[i] + "/";
                    mkdir(name, function (err, res) {
                    });
                }
                existsdir(path, callback);
            } else {
                callback();
            }
        });
    };

    function rmdir(path, callback) {
        cwd.getDirectory(path, {}, function (dirEntry) {
            dirEntry.removeRecursively(function () {
                callback();
            }, callback);
        }, callback);
    }

    function copy(src, dest, callback) {
        // TODO: make sure works for cases where dest includes and excludes file name.
        cwd.getFile(src, {}, function (fileEntry) {
            cwd.getDirectory(dest, {}, function (dirEntry) {
                fileEntry.copyTo(dirEntry, function () {
                    callback();
                }, callback);
            }, callback);
        }, callback);
    }

    function move(src, dest, callback) {
        // TODO: handle more cases like file renames and moving/renaming directories
        cwd.getFile(src, {}, function (fileEntry) {
            cwd.getDirectory(dest, {}, function (dirEntry) {
                fileEntry.moveTo(dirEntry, function () {
                    callback();
                }, callback);
            }, callback);
        }, callback);
    }

    function chdir(path, callback) {
        cwd.getDirectory(path, {}, function (dirEntry) {
            cwd = dirEntry;
            if (fs.onchdir) {
                fs.onchdir(cwd.fullPath);
            }
            callback();
        }, callback);
    }

    return fs;
}

