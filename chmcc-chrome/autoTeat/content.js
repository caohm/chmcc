/**
 * Created by caohongming on 2016/9/26.
 */
var links = document.getElementsByTagName('a');
var list = [];
var n, i, t;
n = links.length;
for (i = 0; i < n; i++) {
    t = links[i].href;
    if (!t) continue;
    if (t.toLowerCase().indexOf('javascript:') >= 0) continue;
    list.push(t);
    t = null;
}
console.log(list);
chrome.runtime.sendMessage({
    type: 'localtest-links',
    links: list
});
function trigger(element, eventType) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventType, true, true);
    element.dispatchEvent(event);
    event = null;
}
chrome.extension.onMessage.addListener(function (message, sender, response) {
    if (message.type !== 'localtest-fire') return;
    var buttons = document.getElementsByTagName('button');
    if (buttons.length > 0) {
        trigger(buttons[0], 'click');
    }
    buttons = null;
});


var script = document.createElement('script');
script.type = 'text/javascript';
// 将alert替换，直接将msg输出到console
script.textContent = 'window.nativeAlert=window.alert;window.alert=function(msg){console.log(msg);};';
// 将代码注入到当前页面中
(document.head || document.documentElement).appendChild(script);
// 可以让代码运行完后再把script从页面移除，不过这个就不很重要了
script = null;