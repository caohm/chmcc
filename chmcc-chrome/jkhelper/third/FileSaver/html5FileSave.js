/**
 * Created by caohongming on 2016/10/18.
 */
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;


var html5FileSave = function (blob, name) {
    var req_fs = window.requestFileSystem || webkit_req_fs || window.mozRequestFileSystem;
    req_fs(window.PERSISTENT, blob.size, createAndSaveFile);
    function createAndSaveFile(fs) {
        fs.root.getFile(name, {create: true, exclusive: true}, function (fileEntry) {
            debugger;
            fileEntry.createWriter(function (fileWriter) {
                console.log(fileEntry);
                fileWriter.onwriteend = function (e) { console.log('Write completed.' + e.toString()); };
                fileWriter.onwrite = function(e) { console.log('on write');console.log(e); };
                fileWriter.onerror = function(e) { console.log('on write error');console.log(e);  };
                var blob = new Blob(['Hello World!'], {type: 'text/plain'});
                fileWriter.write(blob);
            }, errorHandler);
        }, errorHandler);
    }

    var errorHandler = function (err) {
        console.log(err.name + ":" + err.message);
    };
    // window.requestFileSystem(PERSISTENT, 0, function (fs) {
    //     debugger;
    //     console.log('Opened file system: ' + JSON.stringify(fs));
    //     fs.root.getDirectory('notes', {create: true}, function (fileEntry) {
    //         debugger;
    //         console.log(': ' + JSON.stringify(fileEntry));
    //     }, errorHandler);
    // }, errorHandler);

};
