/**
 * Created by caohongming on 2016/10/26.
 */
function task() {
    var taskNum = 0;
    var successNum = 0;
    var propertyChange = function () {

    };
    this.addTaskNum = function (n) {
        taskNum += n;
    };
    this.log = function () {
        console.log("taskNum:" + taskNum + "    successNum:" + successNum);
    };
    this.addSuccessNum = function (n) {
        successNum += n;
        if (taskNum == successNum) {
            propertyChange();
        }
    };
    this.setPropertyChange = function (fuc) {
        propertyChange = fuc;
    }
}


var count = 0;
async.whilst(
    function () {
        return count < arr.length;
    },
    function (callback) {
        var appId = arr[count++];


        task.fire(function (result) {
            callback();
            console.log('所有任务执行完毕');
        }, function (e) {
            callback();
            console.log('计算异常:' + e + ':' + new Date())
        });
    },
    function (err, n) {
        callback(null);
    }
);


$.ajax({
    type: 'POST',
    data: {ip_list: JSON.stringify(['10.190.85.72', '10.190.85.73', '10.191.93.134']), query_tag: "query_conf_nginx"},
    url: "http://bmt.jd.com/customer/query/mission_create/",
    cache: false,
    async: false,
    dataType: "json",
    success: function (res) {
        debugger;
        var id = res.match(/(.*\n)*\s*var\s*url\s*=\s*"\/customer\/query\/ajax_mission_status"\s*;\s*\n\s*var\s*data\s*=\s*\"\s*id=(\d+)\s*\"\s*;\s*(.*\n)*/)[2];
    },
    error: function (res) {
        debugger;
    }
});