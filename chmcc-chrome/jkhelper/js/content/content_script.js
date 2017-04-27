var jkhelper = {};
chrome.storage.local.get(function (itmes) {
    jkhelper.autoSyncGroups = itmes.autoSyncGroups;
    jkhelper.autoSyncGroupsUrl = itmes.autoSyncGroupsUrl;
    jkhelper.useCustomGroup = itmes.useCustomGroup;
    jkhelper.autoBigArea = itmes.autoBigArea;
    jkhelper.setInterval = itmes.setInterval||20000;
    jkhelper.setIntervalTimes = itmes.setIntervalTimes||3;
    // jkhelper.currentGroup = '23';
    jkhelper.autoStart = itmes.autoStart||false;
    // jkhelper.groups = itmes.settings_groups || [];
    // if (jkhelper.autoSyncGroups) {
    //     jkhelper.groups = itmes.settings_groups;
    //     for (var i = 0; i < jkhelper.groups.length; i++) {
    //         var groupName = jkhelper.groups[i];
    //         jkhelper[groupName] = itmes[groupName];
    //     }
    // }
    // if (jkhelper.autoBigArea) {
    //     $('.main-header').css('display', 'none');
    //     $('.main-sidebar').css('display', 'none');
    //     $('.toolbar').css('display', 'none').next().css('display', 'none');
    //     $('.content-wrapper').css('margin-left', '0px');
    //     $('#table ').css('width', '100%');
    //     $('.main-footer').css('display', 'none');
    //     $('select[name=\'table_length\']').append('<option value=\'200\'>200</option>');
    //     // $('.wrapper').css('display', 'none');
    // }

    // var el = document.createElement('div');
    // el.id = 'jkhelper';
    // el.style.top = "10px";
    // el.style.right = "10px";
    // el.style.height = "25px";
    // el.style.width = "50px";
    // el.style.background = "#eeeeee";
    // el.style.border = "1px solid #FFFFFF";
    // el.style.position = "absolute";
    // el.style.borderRadius = "25%";
    // el.style.textAlign = "center";
    // var icon = document.createElement('div');
    // // icon.onmouseover = function () {
    // //     var header = document.getElementById("jkhelper_header");
    // //     header.style.display = "block";
    // // };
    // // icon.onmouseout = function () {
    // //     var header = document.getElementById("jkhelper_header");
    // //     header.style.display = "none";
    // // };
    // icon.onclick = function () {
    //     var header = document.getElementById("jkhelper_header");
    //     var dispaly = header.style.display;
    //     if (dispaly && dispaly == "none") {
    //         header.style.display = "block";
    //     } else {
    //         header.style.display = "none";
    //     }
    // };
    // icon.innerHTML = "helper";
    // var header = document.createElement('div');
    // header.id = "jkhelper_header";
    // header.style.position = "relative";
    // header.style.height = "30px";
    // header.style.width = "500px";
    // header.style.border = "1px solid rgb(78, 187, 95)";
    // header.style.top = "-25px";
    // header.style.right = "500px";
    // header.style.display = "none";
    // var html = "";
    // for (var i = 0; i < jkhelper.groups.length; i++) {
    //     var groupName = jkhelper.groups[i];
    //     html += "<input type='checkbox' name='group' value='" + groupName + "' onclick=\"$('input[name=group]').each(function () { $(this)[0].checked= false; }); $(this)[0].checked = true; jkhelper.currentGrpupIPsTrans($(this).val());\">" + groupName + "<br>";
    //
    // }
    // header.innerHTML = html;
    // el.appendChild(icon);
    // el.appendChild(header);
    // document.body.appendChild(el);

    // var data = GlobalUtils.componentizeUrl(window.location.href);
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // var textContent = " var jkhelper={}; jkhelper.groups=\"" + jkhelper.groups + "\"; jkhelper.startCalc=" + jkhelper.autoStart + ";";
    // for (var i = 0; i < jkhelper.groups.length; i++) {
    //     var groupName = jkhelper.groups[i];
    //     textContent = textContent + " jkhelper[\"" + groupName + "\"] = \"" + jkhelper[groupName] + "\";";
    // }
    // textContent = textContent + " var db = openDatabase(\"jkhelper\", \"\", \"this is jkhelper\", 102400);" +
    //     "jkhelper.currentGrpupIPsTrans = function (name) { jkhelper.currentGrpupIPs= jkhelper[name].split(','); };" +
    //     "jkhelper.arrAverageNum = function (arr) { var sum = 0; for (var i = 0; i < arr.length; i++) { sum += arr[i]; } return (sum / arr.length * 100) / 100; };" +
    //     " jkhelper.calc = function (array) { var res = {}; res.avg = jkhelper.arrAverageNum(array).toFixed(8); res.max = Math.max.apply(null, array); return res; }; " +
    //     "jkhelper.initCalclate = function () { jkhelper.calclate = { cpu: [], mem: [], ioin: [], ioout: [], load5: [], tcp: [], count: 0 }; }; " +
    //     "if (" + jkhelper.useCustomGroup + ") { jkhelper.tablename = \"mjdos_" + jkhelper.currentGroup + "\"; } else { jkhelper.tablename = \"mjdos_" + data.path.replace("/gresource/", "") + "\"; }; " +
    //     "jkhelper.initdb = function () { db.transaction(function (tx) { tx.executeSql(\"CREATE TABLE IF NOT EXISTS  \" + jkhelper.tablename + \" (date TEXT,cpu_max TEXT,cpu_avg TEXT,mem_max TEXT,mem_avg TEXT,ioi_max TEXT,ioi_avg TEXT,ioo_max TEXT,ioo_avg TEXT,load_max TEXT,load_avg TEXT,tcp_max TEXT,tcp_avg TEXT)\", []); } ); }; " +
    //     "jkhelper.dropdb = function () { db.transaction(function (tx) { tx.executeSql(\"DROP TABLE   \" + jkhelper.tablename + \" \", []); } ); };" +
    //     " jkhelper.getAllData = function () { db.transaction(function (tx) { tx.executeSql(\"SELECT * FROM   \" + jkhelper.tablename + \" \", [], function (tx, rs) { for (var i = 0; i < rs.rows.length; i++) { var bean = rs.rows.item(i); console.log(\" date \" + bean.date.replace(\"GMT+0800 (中国标准时间)\", \"\") + \" cpu_max \" + bean.cpu_max + \" cpu_avg \" + bean.cpu_avg + \" mem_max \" + bean.mem_max + \" mem_avg \" + bean.mem_avg + \" ioi_max \" + bean.ioi_max + \" ioi_avg \" + bean.ioi_avg + \" ioo_max \" + bean.ioo_max + \" ioo_avg \" + bean.ioo_avg + \" load_max \" + bean.load_max + \" load_avg \" + bean.load_avg + \" tcp_max \" + bean.tcp_max + \" tcp_avg \" + bean.tcp_avg); } }); } ); }; " +
    //     "jkhelper.addData = function (date, cpu_max, cpu_avg, mem_max, mem_avg, ioi_max, ioi_avg, ioo_max, ioo_avg, load_max, load_avg, tcp_max, tcp_avg) { db.transaction(function (tx) { tx.executeSql(\"INSERT INTO   \" + jkhelper.tablename + \"  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)\", [date, cpu_max, cpu_avg, mem_max, mem_avg, ioi_max, ioi_avg, ioo_max, ioo_avg, load_max, load_avg, tcp_max, tcp_avg], function (tx, rs) {  }, function (tx, error) { console.log(error.source + \"::\" + error.message); }); } ); }; jkhelper.initdb(); jkhelper.initCalclate(); " +
    //     "jkhelper.timeout = setInterval(function () {" +
    //     " if(jkhelper.startCalc){" +
    //     " jkhelper.calclate.count++; " +
    //     "$(\"select[name='table_length']\").val(\"200\").trigger(\"change\"); " +
    //     "$(\"table tbody tr\").each(function () { " +
    //     " if (" + jkhelper.useCustomGroup + " && jkhelper.currentGrpupIPs.indexOf($($($(this).children()[1]).children()[0]).text()) == -1) { " +
    //     "$(this).removeData();" +
    //     " } else { " +
    //     " var ip= $(this).find('td:eq(1) a:eq(0)').text(); " +
    //     " var cpu= Number($(this).find('td:eq(3) span:eq(0)').text()); " +
    //     " var mem= Number($(this).find('td:eq(4) span:eq(1)').text()); " +
    //     " var ioin= Number($(this).find('td:eq(5) span:eq(1)').text()); " +
    //     " var ioout= Number($(this).find('td:eq(5) span:eq(3)').text()); " +
    //     " var load5= Number($(this).find('td:eq(6) span:eq(3)').text()); " +
    //     " var tcp= Number($(this).find('td:eq(7) span:eq(0)').text()); " +
    //     " if(cpu>80||mem>80){" +
    //     " if(cpu>90||mem>90){console.log('-------------------------警告：IP:'+ip+' 超出警戒值90！ cpu:'+cpu+' mem:'+mem+'-----------------------------')}else{  " +
    //     "}} " +
    //     "jkhelper.calclate.cpu.push(cpu); " +
    //     "jkhelper.calclate.mem.push(mem); " +
    //     "jkhelper.calclate.ioin.push(ioin); " +
    //     "jkhelper.calclate.ioout.push(ioout); " +
    //     "jkhelper.calclate.load5.push(load5); " +
    //     "jkhelper.calclate.tcp.push(tcp); " +
    //     " }" +
    //     "}); " +
    //     "if (jkhelper.calclate.count >= " + jkhelper.setIntervalTimes + ") { " +
    //     "jkhelper.calclate.count = 0; " +
    //     "var cpub = jkhelper.calc(jkhelper.calclate.cpu);" +
    //     " var memb = jkhelper.calc(jkhelper.calclate.mem); " +
    //     "var ioinb = jkhelper.calc(jkhelper.calclate.ioin);" +
    //     " var iooutb = jkhelper.calc(jkhelper.calclate.ioout); " +
    //     "var load5b = jkhelper.calc(jkhelper.calclate.load5); " +
    //     "var tcpb = jkhelper.calc(jkhelper.calclate.tcp); " +
    //     "console.log(\" cpu.max: \" + cpub.max + \" cpu.avg: \" + cpub.avg + \" mem.max: \" + memb.max + \" mem.avg: \" + memb.avg + \" ioin.max: \" + ioinb.max + \" ioin.avg: \" + ioinb.avg + \" ioout.max: \" + iooutb.max + \" ioout.avg: \" + iooutb.avg + \" load5.max: \" + load5b.max + \" load5.avg: \" + load5b.avg + \" tcp.max: \" + tcpb.max + \" tcp.avg: \" + tcpb.avg);" +
    //     " jkhelper.addData(new Date(), cpub.max, cpub.avg, memb.max, memb.avg, ioinb.max, ioinb.avg, iooutb.max, iooutb.avg, load5b.max, load5b.avg, tcpb.max, tcpb.avg); " +
    //     "jkhelper.initCalclate();" +
    //     " } " +
    //     " } " +
    //     " }," + jkhelper.setInterval + "); ";
    // script.textContent = textContent;
    // (document.head || document.documentElement).appendChild(script);
    // script = null;
});

