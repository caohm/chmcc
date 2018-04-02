
document.addEventListener('DOMContentLoaded', function () {
    var data = chrome.extension.getBackgroundPage().pageData;
    var dom = document.getElementById('result');
    var html = '';
    var n, i;
    n = data.links.length;
    for (i = 0; i < n; i++) {
        html += '<div><a href=\'' + data.links[i] + '\'>' + data.links[i] + '</a></div>';
    }
    dom.innerHTML = html;

    dom = document.getElementById('fire');
    dom.addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {type: 'localtest-fire'},
                function (response) {
                });
        });
    });
    html = null;
    dom = null;
    data = null;
});