setTimeout(function () {
    $(".ico-log").each(function () {
        var href = $(this).parent(0).attr("onclick");
        href = href.replace("XUI.deploy.tomcatlog(", "").replace(", true, 0 );", "").replace(",", "/");
        href = "http://deploy.jd.com/realtime/log/" + href + "?t=" + Math.random();
        $(this).parent(0).parent(0).prepend("<a target='_blank' href='" + href + "'><i class='ico-log'></i></a>");
        $(this).parent(0).css("display", "none");
    });
}, 5);