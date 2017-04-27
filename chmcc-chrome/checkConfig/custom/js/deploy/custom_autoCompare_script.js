/**
 * Created by caohongming on 2016/10/14.
 */
if ($(".breadcrumb a:last").html().indexOf("配置文件") >= 0) {
    console.log("from custom_autoCompare_script.js");
// $(".modal .modal-footer button").attr("onclick", "").on("click", function () {
//     var form = $(saveConfig);
    var checkConfigDelDiff = function (cid, aid, file, encid, encoding, packageType) {
        var params = new Object();
        params["filePath"] = file;
        params["encId"] = encid;
        params["encoding"] = encoding;
        params["packageType"] = packageType;
        params["groupId"] = $("#groupId").val();
        var url = "/" + aid + "/config/del-" + cid;
        $.ajax({
            url: "http://deploy.jd.com" + url + ".json", data: params, dataType: "json", success: function (json) {
                if (json && json.code == "success") {
                    XUI.window.open(file + '与版本包对比', url + ".html", params, {
                        width: 1000
                    }, "POST");
                } else {
                    console.log("获取失败请手动比较");
                }
            }
        });
    };

    var compareLast = function (cur) {
        var onclick = $(cur).next().next().next().attr("onclick");
        var match = onclick.match(/^XUI.config.del\('(.*)','(.*)','(.*)','(.*)','(.*)','(.*)'\)$/);
        // XUI.config.del('8584298','6274','WEB-INF/classes/spring/order-other.xml','194628','UTF-8','0')
        if (match) {
            checkConfigDelDiff(match[1], match[2], match[3], match[4], match[5], match[6]);
        }
        // $.ajax({
        //     type: "POST",
        //     url: match[1],
        //     data: {
        //         encoding: match[2] || "UTF-8",
        //         sourceFile: match[3],
        //         history: true
        //     },
        //     cache: false,
        //     async: false,
        //     success: function (result) {
        //         // eval($(result).find("table tbody tr:last td:last div a:eq(1)").attr("onclick"));
        //         var match2 = $(result).find("table tbody tr:last td:last div a:eq(1)").attr("onclick").match(/^XUI\.window\.openPostWindow\('(.*)',\{(.*)\},'(.*)'\)/);
        //         debugger;
        //         $.ajax({
        //             type: "POST",
        //             url: match2[1],
        //             data: "{" + match2[2] + "}",
        //             cache: false,
        //             async: false,
        //             success: function (result) {
        //                 var port = chrome.extension.connect({
        //                     name: 'compare'
        //                 });
        //                 port.postMessage("{" + match2[2] + "}");
        //                 port.onMessage.addListener(function (res) {
        //                     debugger;
        //                     console.log(res);
        //                 });
        //
        //                 // var temp_form = document.createElement("form");
        //                 // temp_form.action = URL;
        //                 // temp_form.target = "_blank";
        //                 // temp_form.method = "post";
        //                 // temp_form.style.display = "none";
        //                 // for (var item in PARAMTERS) {
        //                 //     var opt = document.createElement("textarea");
        //                 //     opt.name = PARAMTERS[item].name;
        //                 //     opt.value = PARAMTERS[item].value;
        //                 //     temp_form.appendChild(opt);
        //                 // }
        //                 // document.body.appendChild(temp_form);
        //                 // //提交数据
        //                 // temp_form.submit();
        //
        //                 // var iframe = document.createElement("iframe");
        //                 // iframe.src = 'about:blank';
        //                 // iframe.style.width = "100%";
        //                 // iframe.style.height = "100%";
        //                 // document.body.appendChild(iframe);
        //                 // iframe.contentWindow.document.write(result);
        //
        //                 // try {
        //                 //     var openWin = window.open('about:blank', "_blank");
        //                 //     openWin.document.write(result);
        //                 // } catch (e) {
        //                 //     var openWin = window.open('about:blank');
        //                 //     openWin.document.write(result);
        //                 // }
        //
        //             },
        //             failure: function (result) {
        //                 console.log(result);
        //             }
        //         });
        //     },
        //     failure: function (result) {
        //         console.log(result);
        //     }
        // });
    };

    $("table tbody tr td[class='textC'] div  ").each(function () {
        $(this).prepend("<a class=\"btn btn-mini\" onclick=\"compareLast(this)\">比对</a>");
        // var match = $(this).parent().find("ul li:first a:first").attr("onclick").match(/^XUI.config.history\('(.*)','(.*)','(.*)'\)$/);
        // if (match && match[3] == form.find("input[name='name']").val()) {
        // form.submit();
        // }
    });
// })
// ;
}

