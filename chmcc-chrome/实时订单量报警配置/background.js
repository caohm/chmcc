var MONITOR_CONFIG_ORDER = {
    data: [
        {title:"全部订单（新）", switch:"on", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=99&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"PC端订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=20&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"全部订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=0&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"手机订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=10&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"余额订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=3&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"优惠券订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=2&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"礼品卡订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=4&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"京豆订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=11&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"手机充值", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=137&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"彩票", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=136&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"手Q订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=23&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"易迅订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=18&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"微信订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=19&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"新用户订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=6&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"}
    ],
    intervalId : ''
}
MONITOR_CONFIG_ORDER_BAK = {
    data: [
        {title:"全部订单（新）", switch:"on", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=99&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"PC端订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=20&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"全部订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=0&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"手机订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=10&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"余额订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=3&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"优惠券订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=2&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"礼品卡订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=4&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"京豆订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=11&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"手机充值", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=137&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"彩票", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=136&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"手Q订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=23&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"易迅订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=18&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"微信订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=19&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"},
        {title:"新用户订单", switch:"off", url:"http://risking.jd.com/showOne.action?queryVO.name=order&queryVO.rftype=6&queryVO.minute=1&queryVO.oneTypeDays=[today],[yesterday],[thedaybeforeyesterday]&queryVO.init=1&t=1466056783936",monitorFunc: "function (title, todayData, yesterdayData, thedaybeforeyesterdayData){ var lastMinuteFall = ((todayData[0] - todayData[1]) / todayData[1]).toFixed(2); if(lastMinuteFall <= -0.2 && todayData[0] > 1000){ return '[' + title + '] fall ' + lastMinuteFall + '!Last 2 minutes data：' + todayData[0] + ',' + todayData[1]; } return '';}"}
    ],
    intervalId : ''
}
//仅在指定网页都点亮按钮
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(tab.url.indexOf("risking.jd.com") >= 0){
        chrome.pageAction.show(tabId);
    }
});
$(function(){
    if(MONITOR_CONFIG_ORDER.intervalId == ''){ //如果是监控页面的起始请求，则开始自动监控
        MONITOR_CONFIG_ORDER.intervalId = setInterval(function(){
            orderMonitorByToday();
        }, 5000);//每分钟发起一次
    }
});

var today = '';
var yesterday = '';
var thedaybeforeyesterday = '';
/**
 * 按当天最近五分钟的数据的跌落情况来判断是否需要报警。
 * 因为前后两天的对比有的时候也不太客观，毕竟每天的活动也不尽一样。这个方法可以观察到曲线的骤然跌落
 */
function orderMonitorByToday(){
    checkDate();
    loadAndParseData();

    /**
     * 跨天时纠正数据
     */
    function checkDate(){
        if(new Date().format("yyyy-MM-dd") != today){//时间异常时重置
            if(today.length > 0){
                for(var i = 0; i < MONITOR_CONFIG_ORDER.data.length; i++) {
                    var dataItem = MONITOR_CONFIG_ORDER.data[i];
                    dataItem.url = dataItem.url.replace(today, "[today]").replace(yesterday, "[yesterday]").replace(thedaybeforeyesterday, "[thedaybeforeyesterday]");
                }
            }
            initDate();
        }
    }

    /**
     * 初始化时间
     */
    function initDate(){
        today = new Date().format("yyyy-MM-dd");
        yesterday = addDate(new Date(), -1).format("yyyy-MM-dd");
        thedaybeforeyesterday = addDate(new Date(), -2).format("yyyy-MM-dd");
        for(var i = 0; i < MONITOR_CONFIG_ORDER.data.length; i++) {
            var dataItem = MONITOR_CONFIG_ORDER.data[i];
            dataItem.url = dataItem.url.replace("[today]", today).replace("[yesterday]", yesterday).replace("[thedaybeforeyesterday]", thedaybeforeyesterday);
        }
    }

    /**
     * 读取数据
     */
    function loadAndParseData(){
        for(var i = 0; i < MONITOR_CONFIG_ORDER.data.length; i++ ){
            var dataItem = MONITOR_CONFIG_ORDER.data[i];
            if(dataItem.switch != 'on'){
                continue;
            }
            $.ajax({url: dataItem.url, cache: false, type: "GET", dataType: "JSON", async: false}).done(function(data) {
                var todayData = [];
                for(var i = data.todayList.length - 2; i >= 0; i--){//丢掉第一个不准的数据
                    todayData.push(data.todayList[i].c);
                }
                var yesterdayData = [];
                for(var i = data.yesterdayMap[yesterday].length - 2; i >= 0; i--){//丢掉第一个不准的数据
                    yesterdayData.push(data.yesterdayMap[yesterday][i].c);
                }
                var thedaybeforeyesterdayData = [];
                for(var i = data.yesterdayMap[thedaybeforeyesterday].length - 2; i >= 0; i--){//丢掉第一个不准的数据
                    thedaybeforeyesterdayData.push(data.yesterdayMap[thedaybeforeyesterday][i].c);
                }
                //console.log(eval("(function(){return new Date()})")());
                //var msg = eval("(" +　dataItem.monitorFunc + ")")(todayData, yesterdayData, thedaybeforeyesterdayData);
                //if(msg != undefined && msg.length > 0){
                sendToContent(dataItem.title, todayData, yesterdayData, thedaybeforeyesterdayData, dataItem.monitorFunc);
                //}
            });
        }
    }

    /**
     * 给前端发消息
     * @param msg
     */
    function sendToContent(title, todayData, yesterdayData, thedaybeforeyesterdayData, funcStr){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                title : title,
                todayData : todayData,
                yesterdayData : yesterdayData,
                thedaybeforeyesterdayData : thedaybeforeyesterdayData,
                funcStr : funcStr
            }, function(response) {
                console.log(JSON.stringify(response));
            });
        });
    }

}

