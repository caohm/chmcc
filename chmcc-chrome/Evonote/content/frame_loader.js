/*! Copyright 2009-2016 Evernote Corporation. All rights reserved. */
function countSerializableFrames(){for(var a=document.getElementsByTagName("iframe"),b=0,c=0;c<a.length;c++)a[c].dataset&&a[c].dataset.en_id&&b++;return b}function completedFrameCount(){var a=0;for(var b in frameData)a++;return a}if(window==window.parent){var frameData={},completed=!1,addedEventListeners=!1,timeout,serializeFrames=function(a,b){function c(){completed||(log.warn("Some frames seem stuck, continuing with what we've got."),completed=!0,a(frameData))}return 0==countSerializableFrames()?void a(null):(addedEventListeners||(window.addEventListener("message",function(b){b&&b.data&&b.data.name&&"EN_serialized"==b.data.name?(frameData[b.data.id]=b.data.data,clearTimeout(timeout),completed||(completedFrameCount()==countSerializableFrames()?(completed=!0,a(frameData)):timeout=setTimeout(c,2e3))):b&&b.data&&b.data.name&&"main_getTextResource"==b.data.name&&Browser.sendToExtension({name:"main_getTextResource",href:b.data.href})},!1),addedEventListeners=!0),frameData={},completed=!1,timeout=setTimeout(c,2e3),void Browser.sendToExtension({name:"bounce",message:{name:"startSerialize",config:b}}))};Browser.addMessageHandlers({content_textResource:function(a,b,c){window.postMessage(a,"*")}})}else Browser.addMessageHandlers({startSerialize:function(a,b,c){JSON.serialize&&(script=document.createElement("script"),script.type="text/javascript",script.textContent="var config = "+JSON.serialize(a.config)+"; serializeFrame();",document.head.appendChild(script))}},!0);var addedScripts=!1;Browser.addMessageHandlers({insertSerializationScripts:function(a,b,c){if(window!=window.parent&&(addedScripts||(document.head&&!document.querySelector("script[src='"+Browser.extension.getURL("js/GlobalUtils.js")+"']")&&(d=document.createElement("script"),d.type="text/javascript",d.src=Browser.extension.getURL("js/GlobalUtils.js"),document.head.appendChild(d)),document.head&&!document.querySelector("script[src='"+Browser.extension.getURL("content/HtmlSerializer.js")+"']")&&(d=document.createElement("script"),d.type="text/javascript",d.src=Browser.extension.getURL("content/HtmlSerializer.js"),document.head.appendChild(d)))),!addedScripts&&document.head&&!document.querySelector("script[src='"+Browser.extension.getURL("content/frame.js")+"']")){var d=document.createElement("script");d.type="text/javascript",d.src=Browser.extension.getURL("content/frame.js"),document.head.appendChild(d),addedScripts=!0}}},!0);