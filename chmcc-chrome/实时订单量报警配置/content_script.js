$(function(){
    console.log(eval("(function(){return new Date()})")());
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(JSON.stringify(request));
            var msg = '';
            try{
                msg = eval("(" +　request.funcStr + ")")(request.title, request.todayData, request.yesterdayData, request.thedaybeforeyesterdayData);
            } catch(e){
                console.error(e);
            }
            if(msg != undefined && msg.length > 0){
                notify(msg);
            }
        }
    );
});