(function() {
  function e() {
    $("#notification").fadeIn("5").delay("2000").fadeOut("5");
    localStorage.setItem("defaultFolder", $("#defaultFolder").val());
    if ($("#optOpenFiles").is(":checked")) {
      localStorage.setItem("optOpenFiles", "yes");
    } else {
      localStorage.setItem("optOpenFiles", "no");
    }
    if ($("#optOpenFolders").is(":checked")) {
      localStorage.setItem("optOpenFolders", "yes");
    } else {
      localStorage.setItem("optOpenFolders", "no");
    }
    if ($("#optThreads").is(":checked")) {
      localStorage.setItem("optThreads", "yes");
    } else {
      localStorage.setItem("optThreads", "no");
    }
    if ($("#optOptOut").is(":checked")) {
      localStorage.setItem("optOptOut", "yes");
      localStorage.setItem("optout", "1");
      chrome.extension.sendMessage({
        cmd: "opt-out"
      });
    } else {
      localStorage.setItem("optOptOut", "no");
      localStorage.setItem("optout", "0");
    }
  }
  function t() {
    $("#btnSave").on("click", function() {
      e();
    });
  }
  $(document).ready(function() {
    t();
    $(".i18n_text").each(function() {
      var e = $(this).attr("i18n_text");
      $(this).text(chrome.i18n.getMessage(e));
    });
    $(".i18n_value").each(function() {
      var e = $(this).attr("i18n_value");
      $(this).val(chrome.i18n.getMessage(e));
    });
    $("#defaultFolder").val(localStorage.getItem("defaultFolder"));
    if (localStorage.getItem("optOpenFiles") === "yes") {
      $("#optOpenFiles").attr("checked", true);
    } else {
      $("#optOpenFiles").removeAttr("checked");
    }
    if (localStorage.getItem("optOpenFolders") === "yes") {
      $("#optOpenFolders").attr("checked", true);
    } else {
      $("#optOpenFolders").removeAttr("checked");
    }
    if (localStorage.getItem("optThreads") === "yes") {
      $("#optThreads").attr("checked", true);
    } else {
      $("#optThreads").removeAttr("checked");
    }
    if (localStorage.getItem("optOptOut") === "yes") {
      $("#optOptOut").attr("checked", true);
    } else {
      $("#optOptOut").removeAttr("checked");
    }
    if (localStorage.getItem("new") === "true") {
      $("#version").text(localStorage.getItem("version"));
      $("#update").show();
      localStorage.setItem("new", "false");
    }
  });
})();