$(function(){

    init();

    /**
     * 初始化页面
     */
    function init(){
        //对每个node增加选框，用于控制监控哪些项
        $(".text3").next().prepend("<input type='checkbox'class='text3-monitor-check'/>");
        //根据历史情况初始化监控项
        var selectedNodeStr = localStorage.rgyMonitorSelectedNode == undefined ? "" : localStorage.rgyMonitorSelectedNode;
        if(selectedNodeStr.length > 0){
            $(".text3").each(function(){
                if(selectedNodeStr.indexOf("#" + $(this).parent().attr("id") + "#") >= 0){
                    $(this).parent().find(".text3-monitor-check").attr("checked", "checked");
                }
            });
        }

        //增加对监控类别的选择
        $(".navbar-nav").after("<div id='monitorTypeContainer'></div>");
        //加载历史配置
        var selectedTypeStr = localStorage.rgyMonitorSelectedType == undefined ? "" : localStorage.rgyMonitorSelectedType;
        if(selectedTypeStr.length > 0){
            $("#monitorTypeContainer").html(selectedTypeStr);
        } else {
            $("#monitorTypeContainer").html("监控类别：<input type='checkbox' class='monitor_type' id='monitorTypeR' data-color='red' checked='checked'/>红 " +
                "<input type='checkbox' class='monitor_type' id='monitorTypeY' data-color='orange'/>黄 " +
                "<input type='checkbox' class='monitor_type' id='monitorTypeG' data-color='green'/>绿");
            localStorage.rgyMonitorSelectedType = $("#monitorTypeContainer").html();
        }
        $(".monitor_type").change(function(){
            $(".monitor_type").each(function(){
                if($(this).is(":checked")){
                    $(this).attr("checked", "checked");
                } else {
                    $(this).removeAttr("checked");
                }
            });
            localStorage.rgyMonitorSelectedType = $("#monitorTypeContainer").html();
        });

        //监测。因为页面定时刷新，所以此处无需定时监测，等页面刷新后检查一次就行了
        monitor();
    }

    /**
     * 检查红色节点并报警。对于未选中的节点不报警
     */
    function monitor(){
        $(".monitor_type").each(function(){
            if(!$(this).is(":checked")){//不检测的类型
                return;
            }
            var color = $(this).attr("data-color");
            if($("."+color).length <= 0){//未出现的类型
                return;
            }
            $("." + color).each(function(){
                var mainTitle = getMainTitle(this);
                var subTitle = getSubTitle(this);
                if(mainTitle.length > 0 && subTitle.length > 0){
                    notify(color + "!" + mainTitle + "->" + subTitle);
                }
            });
        });
    }

    /**
     * 将修改持久化
     */
    $(".text3-monitor-check").click(function(){
        var selectedNodeStr = "#";
        $(".text3-monitor-check:checked").each(function (){
            selectedNodeStr += $(this).parent().parent().attr("id") + "#";
        });
        localStorage.rgyMonitorSelectedNode = selectedNodeStr;
        //配置修改后执行监测
        monitor();
    });
});