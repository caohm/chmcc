/*! Copyright 2009-2016 Evernote Corporation. All rights reserved. */
!function(a){"function"==typeof define&&define.amd?define(a):this.GlobalUtils=a()}(function(){var a={};return a.NOTEBOOK_TYPE_PERSONAL=1,a.NOTEBOOK_TYPE_LINKED=2,a.NOTEBOOK_TYPE_BUSINESS=3,a.localize=function(b){var c=b.nodeName.toLowerCase();if("input"==c||"textarea"==c)switch(b.type){case"text":if(b.attributes.placeholder){var d=Browser.i18n.getMessage(b.attributes.placeholder.value);d&&(b.placeholder=d)}case"textarea":case"button":case"submit":case"search":if(b.attributes.placeholder){var d=Browser.i18n.getMessage(b.attributes.placeholder.value);d&&(b.placeholder=d)}if(b.attributes.message){var d=Browser.i18n.getMessage(b.attributes.message.value);d&&(b.value=d)}break;case"checkbox":case"password":case"hidden":case"radio":break;default:throw new Error("We need to localize the value of input elements.")}else if(b.attributes.message){var d=Browser.i18n.getMessage(b.attributes.message.value);d&&(b.innerHTML=d)}if(b.title){var e=Browser.i18n.getMessage(b.title);e&&(b.title=e)}for(var f=0;f<b.children.length;f++)a.localize(b.children[f])},a.escapeXML=function(a){return a.replace(/&|<|>|"|'/g,function(a){return"&"==a?"&amp;":"<"==a?"&lt;":">"==a?"&gt;":'"'==a?"&quot;":"'"==a?"&apos;":void 0})},a.unescapeXML=function(a){return a.replace(/&(amp|lt|gt|quot|apos);/g,function(a){return"&amp;"==a?"&":"&lt;"==a?"<":"&gt;"==a?">":"&quot;"==a?'"':"&apos;"==a?"'":void 0})},a.getNoteURI=function(a,b,c,d){return Browser.extension.getURL("js/main/generateUrlWithTempToken.html?baseUrl="+encodeURIComponent(a)+"&targetUrl="+encodeURIComponent("/shard/"+b.shardId+"/nl/"+c+"/"+b.noteGuid+"/"))},a.buildGoogleRegEx=function(){for(var a=[".com",".ad",".ae",".com.af",".com.ag",".com.ai",".am",".co.ao",".com.ar",".as",".at",".com.au",".az",".ba",".com.bd",".be",".bf",".bg",".com.bh",".bi",".bj",".com.bn",".com.bo",".com.br",".bs",".co.bw",".by",".com.bz",".ca",".cd",".cf",".cg",".ch",".ci",".co.ck",".cl",".cm",".cn",".com.co",".co.cr",".com.cu",".cv",".com.cy",".cz",".de",".dj",".dk",".dm",".com.do",".dz",".com.ec",".ee",".com.eg",".es",".com.et",".fi",".com.fj",".fm",".fr",".ga",".ge",".gg",".com.gh",".com.gi",".gl",".gm",".gp",".gr",".com.gt",".gy",".com.hk",".hn",".hr",".ht",".hu",".co.id",".ie",".co.il",".im",".co.in",".iq",".is",".it",".je",".com.jm",".jo",".co.jp",".co.ke",".com.kh",".ki",".kg",".co.kr",".com.kw",".kz",".la",".com.lb",".li",".lk",".co.ls",".lt",".lu",".lv",".com.ly",".co.ma",".md",".me",".mg",".mk",".ml",".mn",".ms",".com.mt",".mu",".mv",".mw",".com.mx",".com.my",".co.mz",".com.na",".com.nf",".com.ng",".com.ni",".ne",".nl",".no",".com.np",".nr",".nu",".co.nz",".com.om",".com.pa",".com.pe",".com.ph",".com.pk",".pl",".pn",".com.pr",".ps",".pt",".com.py",".com.qa",".ro",".ru",".rw",".com.sa",".com.sb",".sc",".se",".com.sg",".sh",".si",".sk",".com.sl",".sn",".so",".sm",".st",".com.sv",".td",".tg",".co.th",".com.tj",".tk",".tl",".tm",".tn",".to",".com.tr",".tt",".com.tw",".co.tz",".com.ua",".co.ug",".co.uk",".com.uy",".co.uz",".com.vc",".co.ve",".vg",".co.vi",".com.vn",".vu",".ws",".rs",".co.za",".co.zm",".co.zw",".cat"],b=0;b<a.length;b++)a[b]=a[b].replace(/\./g,"\\.");return new RegExp("^https?://www.google("+a.join("|")+")/","i")},a.removePunctuation=function(a){var b=["-","_","\u2013","\u2014","\u00b7"],c=["\\(","\\)","\\[","\\]","\\{","\\}","\u300a","\u300b","\uff08","\uff09","\u3010","\u3011","\u300c","\u300d","\u00bb"],d=["\\.","!",":",";",'"',"'",",","\\?","\u3002","\u3001","\uff01","\uff0c","\uff1a","\u2026","\u201c","\u201d"],e=["@","#","\\$","%","\\^","&","\\*","\\+","=","`","~","/","\\\\","\\|",">","<","\u25cf"],f=new RegExp(b.join("|")+"|"+c.join("|")+"|"+d.join("|")+"|"+e.join("|"),"g");return a.replace(f," ")},a.setupCache=function(a,b,c){return function(){function d(a,b,d){IDB.deleteGroup(a,b,"timestamp",IDBKeyRange.upperBound(new Date(new Date-c),!0),d,function(a){log.error(a)})}a.get=function(b,c,e,f){d(b,c+a.idbStoreSuffix,function(){IDB.get(b,c+a.idbStoreSuffix,e,function(a){f(a)},function(a){log.error(a)})})},a.add=function(c,e,f,g){d(c,e+a.idbStoreSuffix,function(){g.timestamp=new Date,IDB.set(c,e+a.idbStoreSuffix,f,g,function(){IDB.getGroup(c,e+a.idbStoreSuffix,null,null,function(d){if(d&&d.length>b){for(var f,g=0;g<d.length;g++)(!f||d[g].timestamp<f)&&(f=d[g].timestamp);IDB.deleteGroup(c,e+a.idbStoreSuffix,"timestamp",f,function(){})}})})},function(a){log.error(a)})}}},a.removeControlCharacters=function(a,b){return a?b?a.replace(/[\u0000-\u0008\u000B-\u001F\u007F\u0080-\u009F\u2028\u2029\uFFF0-\uFFFF]/g,""):a.replace(/[\u0000-\u001F\u007F\u0080-\u009F\u2028\u2029\uFFF0-\uFFFF]/g,""):a},a.createTitleAndLinkPortionOfUrlClipContent=function(a,b){var c=a?a:Browser.i18n.getMessage("quickNote_untitledNote"),d=document.createElement("div");d.style.whiteSpace="nowrap";var e=document.createElement("div");e.textContent=c,e.style.fontFamily="Helvetica, Arial, sans-serif",e.style.fontSize="14px",e.style.fontWeight="bold",e.style.color="#0C0C0C",e.style.overflowX="hidden",e.style.textOverflow="ellipsis",e.style.paddingBottom="9px",d.appendChild(e);var f=document.createElement("div");f.style.borderTop="1px solid #D8D8D8",f.style.height="0px",f.style.width="100%",d.appendChild(f);var g=document.createElement("div");g.style.display="inline-block",g.style.verticalAlign="top",g.style.margin="15px 0px 0px 0px",g.style.width="364px",d.appendChild(g);var h=document.createElement("div");h.style.fontFamily="Helvetica, Arial, sans-serif",h.style.fontSize="12px",h.style.color="#0C0C0C",h.style.display="block",g.appendChild(h);var i=document.createElement("a");return i.href=b,i.textContent=b,i.style.display="inline-block",i.style.textDecoration="none",i.style.whiteSpace="nowrap",i.style.overflow="hidden",i.style.textOverflow="ellipsis",i.style.color="#0C0C0C",i.style.width="345px",h.appendChild(i),{content:d,textPortion:g,link:h,url:i}},a.parseOperatingSystem=function(a){try{if(/Windows/i.test(a)){var b=/Windows NT (.+)/.exec(a)[1];switch(b){case"3.1":return"Windows NT 3.1";case"3.5":return"Windows NT 3.5";case"3.51":return"Windows NT 3.51";case"4.0":return"Windows NT 4.0";case"5.0":return"Windows 2000";case"5.01":return"Windows 2000 SP1";case"5.1":return"Windows XP";case"5.2":return"Windows XP x64";case"6.0":return"Windows Vista";case"6.1":return"Windows 7";case"6.2":return"Windows 8";case"6.3":return"Windows 8.1";default:return"Windows"}}else{if(/Mac OS X/i.test(a))return"Mac "+/OS X (.+)/.exec(a)[1].replace(/_/g,".");if(/CrOS/i.test(a))return"Chrome OS "+/CrOS (.+)/.exec(a)[1];if(/Linux/i.test(a))return a;if(/FreeBSD/i.test(a))return a}return null}catch(c){return null}},a.generateSystemInfo=function(){var b;b=SAFARI?"Safari "+/Version\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]:OPERA?"Opera "+/OPR\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]+"/"+/Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]:YANDEX?"Yandex "+/YaBrowser\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]+"/"+/Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]:EDGE?"Edge "+/Edge\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]+"/"+/Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1]:"Chrome "+/Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1];var c,d=new RegExp("\\((.+?)\\)","g"),e=d.exec(navigator.userAgent);a:for(;e;){for(var f=e[1].split(/;\s?/),g=0;g<f.length;g++){var c=a.parseOperatingSystem(f[g]);if(c)break a}e=d.exec(navigator.userAgent)}return c||(c="Unknown OS"),b||(b="Unknown browser"),{browser:b,os:c}},a.getPositionOfElementRelativeTo=function(a,b){for(var c=0,d=0,e=a;e&&e!==b;)c+=e.offsetLeft,d+=e.offsetTop,e=e.offsetParent;return{top:d,left:c}},a.getPositionTypeOfElement=function(a){for(var b=a;b;){if("fixed"===getComputedStyle(b).position)return!0;b=b.offsetParent}return!1},a.convertBytesToPrettyUnit=function(a){for(var b=["bytes","kB","MB","GB","TB"],c=0;c<b.length;c++)if(a/Math.pow(1024,c)<1){var d=Math.max(0,c-1);return parseFloat((a/Math.pow(1024,d)).toFixed(1))+b[d]}},a.runAsyncIfCondition=function(a,b,c){a?setTimeout(b,c):b()},a});