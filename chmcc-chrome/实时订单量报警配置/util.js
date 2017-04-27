/**
 * Created by jiawenlong on 2016/6/19.
 */
/**
 * 增减日期
 * @param dd
 * @param dadd
 * @returns {Date}
 */
function addDate(dd,dadd){
    var a = new Date(dd)
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000
    a = new Date(a)
    return a;
}

var NOTIFY_ARRAY = [];
/**
 * 发通知
 * @param title
 */
function notify(title) {
    askPermission();
    if(Notification && Notification.permission === "granted"){
        sendNotify(title);
    }else if(Notification && Notification.permission !== "denied") {
    }else{
        alert("用chrome！如未弹出授权框，设置->隐私设置->内容设置->通知->选择询问，然后刷新看看");
    }

    /**
     * 请求用户授权
     */
    function askPermission(){
        if(Notification && Notification.permission !== "granted"){
            Notification.requestPermission(function(status){
                if(Notification.permission !== status){
                    Notification.permission = status;
                }
            });
        }
    }

    /**
     * 发送
     * @param title
     */
    function sendNotify(title){
        if(window.console){
            console.log(title);
        }
        var options={
            dir: "ltr",
            lang: "utf-8",
            icon: "http://static.360buyimg.com/devfe/error-new/1.0.0/css/i/error_06.png",
            body: title
        };
        var notify = new Notification("监控报警", options);
        NOTIFY_ARRAY.push(notify);
        notify.onshow = function(){};
        notify.onclick = function() {};
        notify.onclose = function(){
            var notifyItem = NOTIFY_ARRAY.pop();
            while (notifyItem != undefined){
                try{
                    notifyItem.close();
                    notifyItem = NOTIFY_ARRAY.pop();
                } catch(e){
                    notifyItem = undefined;
                    NOTIFY_ARRAY = [];
                }
            }
        };
        notify.onerror = function() {}
    }
};
$(function(){
    Date.prototype.format = function(format){
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }
});
