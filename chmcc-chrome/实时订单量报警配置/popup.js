$(function () {

    init();

    /**
     * 初始化页面
     */
    function init(){
        if(localStorage.orderMonitor != undefined && localStorage.orderMonitor.length > 0){
            chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data = JSON.parse(localStorage.orderMonitor);
        }
        refresh();

        ////保存修改
        //$("#saveBtn").click(function(){
        //    chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data = JSON.parse($("#content").html());
        //    refresh();
        //});
        //
        //重置
        $("#resetBtn").click(function(){
            localStorage.orderMonitor = JSON.stringify(chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER_BAK.data);
            refresh();
        });
    }

    /**
     * 刷新页面
     */
    function refresh(){
        var monitorConfigArray = chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data;
        var html = '';
        for(var i = 0; i < monitorConfigArray.length; i++){
            html += '<tr>';
            html += '    <td>监控项：</td>';
            html += '    <td>' + monitorConfigArray[i].title + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '    <td>状态：</td>';
            html += '    <td>';
            html += '        <select class="switchSelect" id="switch_id_' + i + '">';
            html += '            <option value="off" ' + (monitorConfigArray[i].switch != 'on' ? 'selected' : '') + '>关</option>';
            html += '            <option value="on" ' + (monitorConfigArray[i].switch == 'on' ? 'selected' : '') + '>开</option>';
            html += '        </select>';
            html += '        <span class="suc-info">保存成功</span>';
            html += '    </td>';
            html += '</tr>';
            html += '<tr>';
            html += '    <td colspan="2"><img src="help.png" class="icon icon-question-sign">自定义脚本(失去焦点时会自动保存)<span class="suc-info" id="content_suc_msg_id_' + i + '">保存成功</span></td>';
            html += '</tr>';
            html += '<tr class="help-tr">';
            html += '    <td colspan="2">';
            html += '        <textarea>';
            html += '报警逻辑函数。对原始数据进行筛选、处理，对于需要报警的数据返回报警信息；对于无需报警数据返回空串。\n';
            html += '参数：\n';
            html += '\t@param title 监控项标题\n';
            html += '\t@param todayData js数组，今天最近29分钟的数据（当前这1分钟不在里面）。[0]是距现在最近的数据\n';
            html += '\t@param yesterdayData 昨天的数据\n';
            html += '\t@param thedaybeforeyesterdayData 前天的数据\n';
            html += '\t@returns {*} 为空则认为一切正常；长度大于0的字符串，则把返回值为报警信息。\n';
            html += '        </textarea>';
            html += '    </td>';
            html += '</tr>';
            html += '<tr>';
            html += '    <td colspan="2">';
            //html += '        <div  id="contend_id_' + i + '" class="content" contenteditable="true">' + monitorConfigArray[i].monitorFunc + '</div>';
            html += '        <textarea  id="contend_id_' + i + '" class="content">' + monitorConfigArray[i].monitorFunc + '</textarea>';
            html += '    </td>';
            html += '</tr>';
        }
        $("table").html(html);

        //格式化代码
        $(".content").each(function(){
            $(this).val(js_beautify($(this).text(), 4, ' '));
        })

        /**
         * 显示/隐藏帮助信息
         */
        $(".icon-question-sign").click(function(){
            $(this).parent().parent().next().toggle(200);
        });

        /**
         * 开关状态变换
         */
        $(".switchSelect").change(function(){
            //alert(this.id);
            var index = Number($(this).attr("id").replace("switch_id_", ""));
            chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data[index].switch=$(this).val();
            localStorage.orderMonitor = JSON.stringify(chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data);
            refresh();
            $(".suc-info").hide();
            $("#switch_id_" + index).next().show(200);
        });

        /**
         * 脚本内容变换
         */
        $(".content").change(function(){
            //alert(this.id);
            var index = Number($(this).attr("id").replace("contend_id_", ""));
            chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data[index].monitorFunc=$(this).val();
            localStorage.orderMonitor = JSON.stringify(chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data);
            refresh();
            $(".suc-info").hide();
            $("#content_suc_msg_id_" + index).show(200);
        });
    }
});