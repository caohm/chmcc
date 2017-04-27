$(function(){
    var currentUrl = window.location.href;
    if(currentUrl.indexOf("jsf.jd.com/iface/ins/search") >= 0){
        forJsfPage();
    } else if(currentUrl.indexOf("deploy.jd.com") >= 0){
        forDeployPage();
    } else {
        if(window.console){
            console.log("unsupport page")
        }
    }

    /**
     * deploy上线页服务
     * 为每台机器增加日志查询按钮及jsf实例查询页面按钮
     */
    function forDeployPage(){
        init();

        function init(){
            //初始化插件开关按钮
            var html = $($(".dropdown")[2]).html();
            html = '<a class="dropdown-toggle" data-toggle="dropdown" id="deployPluginSwitch" style="color: yellow;font-weight:bold;"><i class="icon-question-sign"></i>加载插件<span class="caret"></span></a>'
                + html;
            $($(".dropdown")[2]).replaceWith(html);

            //加载插件
            $("#deployPluginSwitch").click(function(){
                if($("#btn-deploy").length <= 0){
                    alert("仅“发布实例列表页”有效。");
                } else {
                    $(".deployPlugin").remove();
                    addPluginBtn();
                }
            });
        }

        /**
         * 增加页面按钮
         */
        function addPluginBtn(){
            $(".icon-folder-open").each(function(){
                var ipStr = $(this).parent().attr("onclick").replace("XUI.window.open('浏览","");
                ipStr = ipStr.substr(0, ipStr.indexOf("文件系统"));
                $(this).parent().parent().append("<a class='deployPlugin' style='color: blueviolet;font-weight:bold;' " +
                    "href='http://jsf.jd.com/iface/ins/search?pageIndex=1&pageSize=10&params%5BappName%5D=&params%5BinsKey%5D=" + ipStr + "&params%5BinsRoom%5D=&params%5BsafVer%5D=&totalPage=1' target='_blank'>jsf</a>");
            });

            $(".ico-log").each(function(){
                var param = $(this).parent().attr("onclick").replace("XUI.deploy.tomcatlog(","").replace(")","");
                var param1 = $.trim(param.split(",")[0]);
                var param2 = $.trim(param.split(",")[1]);

                $(this).parent().parent().append("<a class='deployPlugin' style='color: blueviolet;font-weight:bold;' " +
                    "href='http://deploy.jd.com/realtime/log/" + param1 + "/" + param2 + "?t=" + new Date().getMilliseconds() + "' target='_blank'>&nbsp;log</a>");

                $(this).parent().hide();
            });
        }
    }

    /**
     * jsf实例查询页（http://jsf.jd.com/iface/ins/search）辅助
     * 用于展示机器实际已经下线的接口数量
     */
    function forJsfPage(){
        init();

        function init(){
            //非精确查询不支持
            if($("[name='params[insKey]']").val() == ''){
                return;
            }

            //移动上下线按钮
            $("#checkboxAll").remove();
            $("#insTbody").find(":checkbox").hide();
            $("#updown").hide();

            $("#insTbody").find(":checkbox").each(function(){
                $(this).before('<button class="btn btn-warning jsfPlugin"><i class="icon-play icon-white"></i>上下线</button>');
            });
            $(".jsfPlugin").click(function(){
                $(this).next().attr("checked", true);
                $("#updown").click();
            });

            //修改列表标题
            $($("th")[5]).html('<a id="reloadJsfState" style="color: blueviolet;font-weight:bold;" href="javascript:void(0)">【刷新】</a>JSF节点状态');
            $($("th")[5]).css("color", "blueviolet");
            $($("th")[5]).css("font-weight", "bold");
            //刷新按钮监听
            $("#reloadJsfState").click(function(){
                reloadJsfState();
            });

            //页面重载时自动刷新数据
            reloadJsfState();
        }

        /**
         * 刷新jsf在线状态
         */
        function reloadJsfState(){
            $("[name=insServer]").each(function(){
                var jsfServerStr = $($(this).parent().parent().children()[2]).html();
                var serverState = getAllInterfaceState(jsfServerStr);

                var jsfInfo = "";
                if(serverState == undefined){
                    jsfInfo = "Error(001)";
                } else {
                    jsfInfo += "在线" + serverState.greenInterfaceArray.length;

                    var notGreenInterfaceArray = serverState.notGreenInterfaceArray;
                    if(notGreenInterfaceArray.length > 0){
                        jsfInfo += "(不在线<a href='javascript:alert(" + JSON.stringify(notGreenInterfaceArray) + ")'>" + notGreenInterfaceArray.length + "</a>)";
                    } else {
                        jsfInfo += "(不在线" + notGreenInterfaceArray.length + ")";
                    }
                }
                $($(this).parent().parent().children()[5]).html(jsfInfo);
            });
        }

        /**
         * 获取此实例下的jsf接口状态列表
         * @param jsfServerStr
         */
        function getAllInterfaceState(jsfServerStr){
            var res;
            $.ajax({url: "http://jsf.jd.com/iface/ins/server?insKey=" + jsfServerStr, cache: false, type: "GET", dataType: "JSON", async: false}).done(function(data) {
                if(data.code != 1){
                    res = undefined;
                } else {
                    var greenInterfaceArray = new Array();
                    var notGreenInterfaceArray = new Array();
                    var serversArray = data.content.servers;
                    for(var i = 0; i < serversArray.length; i++){
                        if(serversArray[i].optType == 1){
                            greenInterfaceArray.push(serversArray[i].interfaceName);
                        } else {
                            notGreenInterfaceArray.push(serversArray[i].interfaceName);
                        }

                    }
                    res = new Object();
                    res.greenInterfaceArray = greenInterfaceArray;
                    res.notGreenInterfaceArray = notGreenInterfaceArray;
                }
            });
            return res;
        }
    }
});