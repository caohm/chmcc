//if(document.URL.indexOf("file:")==-1)
  //  alert("Please go to extensions and enable 'Allow access to file URLs' before using File Manager");  
var playlist = new Array();
var index=0;
chrome.storage.local.get('files', function (result) {
	playlist=result.files;
	console.log(playlist);
});
if(document.getElementsByTagName('video').length>0){
	setUpPlaylist();
}
  if((document.URL.indexOf(".jpg")==document.URL.indexOf("?previous")-4)||(document.URL.indexOf(".JPG")==document.URL.indexOf("?previous")-4)||(document.URL.indexOf(".png")==document.URL.indexOf("?previous")-4)||(document.URL.indexOf(".PNG")==document.URL.indexOf("?previous")-4)||(document.URL.indexOf(".GIF")==document.URL.indexOf("?previous")-4)||(document.URL.indexOf(".gif")==document.URL.indexOf("?previous")-4)){
   //alert(document.URL.substring(document.URL.indexOf("?next=;")+7,document.URL.length-2));
    document.documentElement.innerHTML+="<a style='padding-left:200px;font-family:Cambria;background-color: #C5DBEF;color:#4B96D2; float:right;position:absolute;'href='"+document.URL.substring(0,document.URL.indexOf("?"))+"?x'>No slideshow</a>";
    document.documentElement.innerHTML+="<a style='padding-left:120px;font-family:Cambria;background-color: #C5DBEF;color:#4B96D2;float:right;position:absolute;' href='"+document.URL.substring(document.URL.indexOf("?next=;")+7,document.URL.length-1)+"?previous=;"+document.URL+";\"'>Next</a>";
    document.documentElement.innerHTML+="<a style='font-family:Cambria;background-color: #C5DBEF;color:#4B96D2;float:right;position:absolute;' href='"+document.URL.substring(document.URL.indexOf("?previous=;")+11,document.URL.indexOf(";?next"))+"?next=;"+document.URL+"\"'>Previous</a>";
    document.documentElement.innerHTML+="<br/><br/><br/><br/>"
}
if(document.documentElement.innerHTML.indexOf("function addRow(name, url, isdir, size, date_modified) {")!=-1){
    var text=(document.getElementById("header").innerHTML).replace("Index of ", "");
    var locs = text.split("\/");
    document.getElementById("header").innerHTML="";
    for(var i=1;i<locs.length-1;i++){
    var link="";
    for(var j=1;j<=i-1;j++){
    link+=locs[j]+"/";
    }
    link+=locs[i];
    document.getElementById("header").innerHTML+="<a href='file:///"+link+"'>/"+locs[i]+"</a>";

    }
    var table=document.getElementById("table");
    table.rows[0].cells[0].className="tops1";
    table.rows[0].cells[1].className="tops2";
    table.rows[0].cells[2].className="tops3";
    table.rows[0].outerHTML="<br/><br/>"+table.rows[0].outerHTML+"<br/><br/>";
    table.rows[0].cells[0].onclick=function(){sortByName()};
    table.rows[0].cells[1].onclick=function(){sortBySize()};
    table.rows[0].cells[2].onclick=function(){sortByDate()};

    init();
}
function setUpPlaylist(){
	console.log("setting up");
	var video = document.getElementsByTagName('video')[0];
	    video.addEventListener('ended',myHandler,false);
    function myHandler(e) {
		console.log("HERE");
		chrome.storage.local.get('files', function (result) {
				playlist=result.files;
				console.log(playlist);
		});
		index=-1;
		for(var i=0;i<playlist.length;i++){
			console.log(document.URL+":"+playlist[i].replace(/ /g,"%20"));
			if(document.URL.indexOf(playlist[i].replace(/ /g,"%20"))!=-1)
				index=i;
		}
		if((index==-1)||(index==playlist.length-1))
			return;
		index++;   
		window.location.href=playlist[index];//document.URL.substring(document.URL.indexOf("?next=;")+7,document.URL.length-1);
		if(!e) { e = window.event;}
    }

	video.onended = function(e) {
		console.log("ENDED");
  		/*Do things here!*/
		if(true){
		}  		
	}
}

function init(){
    var images=new Array();
    for (var i=1;i<table.rows.length;i++){
        var acell=null;
        var cell=null;
        for(var j=0;j<table.rows[i].cells.length;j++){
            if(j==0){
                cell=table.rows[i].cells[j];
                cell.setAttribute("id", ("cell"+i+":"+j));
                acell=document.getElementById("cell"+i+":"+j).parentNode;
                if((acell.innerHTML.indexOf(".jpg")!=-1)||(acell.innerHTML.indexOf(".JPG")!=-1)||(acell.innerHTML.indexOf(".png")!=-1)||(acell.innerHTML.indexOf(".PNG")!=-1)||(acell.innerHTML.indexOf(".gif")!=-1)||(acell.innerHTML.indexOf(".GIF")!=-1)){
                    //acell.innerHTML.getElementsByTagName("a").href+="?x";
                    images[images.length]=acell.innerHTML.substring(acell.innerHTML.indexOf("href=\"")+6,acell.innerHTML.indexOf("href=\"")+6+acell.innerHTML.substring(acell.innerHTML.indexOf("href=\"")+6,acell.innerHTML.length).indexOf("\""));
                }
                acell.onclick= function(){window.location.href=(this.childNodes[0].innerHTML.substring((this.childNodes[0].innerHTML.indexOf('href="')+9),(this.childNodes[0].innerHTML.indexOf('">')))).replace("e:///","");};
            	/*if((acell.innerHTML.indexOf(".mp4")!=-1)||(acell.innerHTML.indexOf(".mov")!=-1)||(acell.innerHTML.indexOf(".avi")!=-1)){
	            	acell.onmouseover=function(e){
	            		var target = e.target || e.srcElement;
	            		if(target.innerHTML.indexOf("(Add to playlist)")==-1)
	            			target.innerHTML=target.innerHTML.substring(0,target.innerHTML.indexOf("</a>")+4)+"	<a href='"+document.documentElement.innerHTML+"?"+target.innerHTML.substring(target.innerHTML.indexOf("<a")+2,target.innerHTML.indexOf("</a>"))+"'>(Add to playlist)</a>"+target.innerHTML.substring(target.innerHTML.indexOf("</a>")+4);
	            			console.log(target.innerHTML);
	            	};
	            acell.onmouseout=function(e){
	            		var target = e.target || e.srcElement;
	            		if(target.innerHTML.indexOf("(Add to playlist)")!=-1)
	            			target.innerHTML=target.innerHTML.substring(0,target.innerHTML.indexOf("</a>")+4)+target.innerHTML.substring(target.innerHTML.indexOf("(Add to playlist)")+21);
	            	};
            }*/
            }
            table.rows[i].cells[j].className="column"+j;
        }
    }
    //set images
            var previous="";

        for (var i=table.rows.length-1;i>0;i--){
        var acell=null;
        for(var j=0;j<table.rows[i].cells.length;j++){
            if(j==0){
                acell=document.getElementById("cell"+i+":"+j).parentNode;
                if((acell.innerHTML.indexOf(".jpg")!=-1)||(acell.innerHTML.indexOf(".JPG")!=-1)||(acell.innerHTML.indexOf(".png")!=-1)||(acell.innerHTML.indexOf(".PNG")!=-1)||(acell.innerHTML.indexOf(".gif")!=-1)||(acell.innerHTML.indexOf(".GIF")!=-1)){
                    //acell.innerHTML.getElementsByTagName("a").href+="?x";
                    //images[images.length]=acell.innerHTML.substring(acell.innerHTML.indexOf("href=\""),acell.innerHTML.indexOf("href=\"")+acell.innerHTML.substring(acell.innerHTML.indexOf("href=\""),acell.innerHTML.length).indexOf("\""));
                    //alert(acell.innerHTML.substring(0,acell.innerHTML.indexOf("href=\"")+6+acell.innerHTML.substring(acell.innerHTML.indexOf("href=\"")+6,acell.innerHTML.length).indexOf("\"")+1));
                    var inside=acell.innerHTML.indexOf("href=\"")+6+acell.innerHTML.substring(acell.innerHTML.indexOf("href=\"")+6,acell.innerHTML.length).indexOf("\"");

                    //alert(acell.innerHTML.substring(0,inside).replace(re,"'"));
                    //alert(previous);
                    acell.innerHTML=acell.innerHTML.substring(0,inside)+"?previous=;;?next=;"+previous+";\""+acell.innerHTML.substring(inside+1,acell.innerHTML.length);
                    //alert(acell.innerHTML);
                    previous=images[(i+2)%(images.length-1)]+"?previous=;"+images[(i+1)%(images.length-1)]+";?next=;"+previous+";";
                    //alert(previous);
                }
            }
        }
    }
}
if(document.documentElement.innerHTML.indexOf("function addRow(name, url, isdir, size, date_modified) {")!=-1){
    var named=true;
    var sized=false;
    var dated=false;
    var ran=false;
    var dirs = new Array();
    var files = new Array();
    var filesSize = new Array();
    var filesSize2 = new Array();
    var datesDir = new Array();
    var datesFile = new Array();
    for(var i=0;i<table.rows.length;i++){
    if(table.rows[i].cells[0].childNodes[0].className=="icon dir"){
        dirs[dirs.length]=table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"));
        datesDir[datesDir.length]=new Date(table.rows[i].cells[2].innerHTML);
    }
    else if(table.rows[i].cells[0].childNodes[0].className=="icon file"){
    files[files.length]=table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"));
    datesFile[datesFile.length]=new Date(table.rows[i].cells[2].innerHTML);
    filesSize[filesSize.length]=table.rows[i].cells[1].innerHTML;
    if(filesSize[filesSize.length-1].substring(filesSize[filesSize.length-1].length-2, filesSize[filesSize.length-1].length-1)==' '){
    filesSize[filesSize.length-1]=filesSize[filesSize.length-1].substring(0, filesSize[filesSize.length-1].length-2);
    }
    else if(filesSize[filesSize.length-1].substring(filesSize[filesSize.length-1].length-2, filesSize[filesSize.length-1].length-1)=='k'){
    filesSize[filesSize.length-1]=(filesSize[filesSize.length-1].substring(0, filesSize[filesSize.length-1].length-3))*1024;
    }
    else if(filesSize[filesSize.length-1].substring(filesSize[filesSize.length-1].length-2, filesSize[filesSize.length-1].length-1)=='M'){
    filesSize[filesSize.length-1]=(filesSize[filesSize.length-1].substring(0, filesSize[filesSize.length-1].length-3))*1048576;
    }
    else if(filesSize[filesSize.length-1].substring(filesSize[filesSize.length-1].length-2, filesSize[filesSize.length-1].length-1)=='G'){
    filesSize[filesSize.length-1]=(filesSize[filesSize.length-1].substring(0, filesSize[filesSize.length-1].length-3))*1073741824;
    }
    }

    }
    removeAmericanDates();
    if(document.URL.indexOf(".html")<document.URL.length-4){
    document.getElementsByTagName("style")[0].innerHTML+="tr:hover{\
background-color:#EBF3FC;\
border-top: 1px solid #BAD5F1;\
border-left: 1px solid #BAD5F1;\
border-right: 1px solid #BAD5F1;\
}\
tr{\
cursor:pointer;\
border: 0px solid black;\
}\
body{\
font-family: Cambria;\
}\
.tops1 {\
border-top:1px solid #D6E5F5;\
border-right: 1px solid #D6E5F5;\
background-color:white;\
position:fixed;\
width:980px;\
}\
.tops1:hover{\
background-color: #C5DBEF;\
border-top: 1px solid #BAD5F1;\
border-left: 1px solid #BAD5F1;\
border-right: 1px solid #BAD5F1;\
}\
.tops2 {\
border-top:1px solid #D6E5F5;\
border-right: 1px solid #D6E5F5;\
background-color:white;\
position:fixed;\
right:253px;\
width:100px;\
}\
.tops2:hover{\
background-color: #C5DBEF;\
border-top: 1px solid #BAD5F1;\
border-left: 1px solid #BAD5F1;\
border-right: 1px solid #BAD5F1;\
}\
.tops3 {\
border-top:1px solid #D6E5F5;\
border-right: 1px solid #D6E5F5;\
background-color:white;\
position:fixed;\
right:0%;\
width:250px\
}\
.tops3:hover{\
background-color: #C5DBEF;\
border-top: 1px solid #BAD5F1;\
border-left: 1px solid #BAD5F1;\
border-right: 1px solid #BAD5F1;\
}\
#header{\
background-color: #C5DBEF;\
padding: 0px 5px 0px 0px;\
margin: 0px 0px 0px 0px;\
position:fixed;\
width:100%;\
}\
#header a{\
border: 1px solid #4B96D2;\
padding: 0px 5px 0px 0px;\
text-decoration: none;\
}\
#header a:hover{\
background-color: #BAD5F1;\
}\
.column0{\
width:980px;\
}\
.column1{\
width:100px;\
}\
.column2{\
width:250px\
}"
    //sheet.insertRule('strong { color: red; }', sheet.cssRules.length);
  }
 
}
function sortByName(){
if(named){
/*
for (var j=2;j<table.rows.length-1;j++){
    for (var i=2;i<table.rows.length-1;i++){
        var cell1 =table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"));
        var cell2 =table.rows[i+1].cells[0].innerHTML.substring(table.rows[i+1].cells[0].innerHTML.indexOf(">")+1,table.rows[i+1].cells[0].innerHTML.indexOf("</"));
        if(cell1>cell2){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[i+1].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[i+1].innerHTML=newrow;
        }
    }
}*/
files.sort(caseInsensitiveSort).reverse();
dirs.sort(caseInsensitiveSort).reverse();
for (var j=0;j<dirs.length-1;j++){
for(var i=2;i<dirs.length+2;i++){
if(dirs[j]==table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"))){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[j+2].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[j+2].innerHTML=newrow;
            i=dirs.length+1;
}
}
}
for (var j=0;j<files.length;j++){
for(var i=dirs.length+2;i<files.length+dirs.length+2;i++){
if(files[j]==table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"))){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[dirs.length+j+2].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[j+2+dirs.length].innerHTML=newrow;
            i=files.length+dirs.length+1;
}
}
}
named=false;
}
else{/*
for (var j=2;j<table.rows.length-1;j++){
    for (var i=2;i<table.rows.length-1;i++){
        var cell1 =table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"));
        var cell2 =table.rows[i+1].cells[0].innerHTML.substring(table.rows[i+1].cells[0].innerHTML.indexOf(">")+1,table.rows[i+1].cells[0].innerHTML.indexOf("</"));
        if(cell1<cell2){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[i+1].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[i+1].innerHTML=newrow;
        }
    }
}}*/
files.sort(caseInsensitiveSort);
dirs.sort(caseInsensitiveSort);
for (var j=0;j<dirs.length-1;j++){
for(var i=2;i<dirs.length+2;i++){
if(dirs[j]==table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"))){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[j+2].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[j+2].innerHTML=newrow;
                        i=dirs.length+1;
}
}
}
for (var j=0;j<files.length;j++){
for(var i=dirs.length+2;i<files.length+dirs.length+2;i++){
if(files[j]==table.rows[i].cells[0].innerHTML.substring(table.rows[i].cells[0].innerHTML.indexOf(">")+1,table.rows[i].cells[0].innerHTML.indexOf("</"))){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[dirs.length+j+2].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[j+2+dirs.length].innerHTML=newrow;
            i=files.length+dirs.length+1;
}
}
}

named=true;
}
init();
}
function sortBySize(){
if(sized){
filesSize.sort(sortNumber).reverse();
turnToBytes();
for (var j=0;j<filesSize2.length;j++){
for(var i=dirs.length+2;i<files.length+dirs.length+2;i++){
if(filesSize2[j]==table.rows[i].cells[1].innerHTML){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[dirs.length+j+2].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[j+2+dirs.length].innerHTML=newrow;
            i=filesSize2.length+dirs.length+1;
}
}
}
sized=false;
}
else{
filesSize.sort(sortNumber);
turnToBytes();
for (var j=0;j<filesSize2.length;j++){
for(var i=dirs.length+2;i<files.length+dirs.length+2;i++){
if(filesSize2[j]==table.rows[i].cells[1].innerHTML){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[dirs.length+j+2].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[j+2+dirs.length].innerHTML=newrow; 
            i=filesSize2.length+dirs.length+1;
}
}
}
sized=true;
}
}
function sortByDate(){
if(dated){
datesDir.reverse();
datesFile.reverse();
for (var j=0;j<datesDir.length;j++){
for(var i=2;i<table.rows.length;i++){
if(datesDir[j]==table.rows[i].cells[2].innerHTML){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[2+j].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[2+j].innerHTML=newrow; 
            i=table.rows.length;
}
}
}
for (var j=0;j<datesFile.length;j++){
for(var i=2+dirs.length;i<table.rows.length;i++){
if(datesFile[j]==table.rows[i].cells[2].innerHTML){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[2+j+dirs.length].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[2+j+dirs.length].innerHTML=newrow; 
            i=table.rows.length;
}
}
}
dated=false;
}
else{
if(!ran){
datesDir.sort(sortDates);
datesFile.sort(sortDates);
formatDates();
}
else{
datesDir.reverse();
datesFile.reverse();
}
for (var j=0;j<datesDir.length;j++){
for(var i=2;i<dirs.length+2;i++){
if(datesDir[j]==table.rows[i].cells[2].innerHTML){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[2+j].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[2+j].innerHTML=newrow; 
            i=dirs.length+2;
}
}
}
for (var j=0;j<datesFile.length;j++){
for(var i=2+dirs.length;i<table.rows.length;i++){
if(datesFile[j]==table.rows[i].cells[2].innerHTML){
            var newrow=table.rows[i].innerHTML;
            var newrow2=table.rows[2+j+dirs.length].innerHTML;
            table.rows[i].innerHTML=newrow2;
            table.rows[2+j+dirs.length].innerHTML=newrow; 
            i=table.rows.length;
}
}
}
dated=true;
if(!ran){
ran=true;
sortByDate();
sortByDate();

}
}
}
function turnToBytes(){
for(var i=0;i<files.length;i++){
if((filesSize[i]/1073741824)>1){
filesSize2[i]=filesSize[i]/1073741824 +" GB";
}
else if((filesSize[i]/1048576)>1){
filesSize2[i]=filesSize[i]/1048576+" MB";
}
else if((filesSize[i]/1024)>1){
if(((filesSize[i]/1024)%1==0)&&((filesSize[i]/1024)<100)){
filesSize2[i]=filesSize[i]/1024 +".0 kB";
}
else{
filesSize2[i]=filesSize[i]/1024 +" kB";
}
}
else{
filesSize2[i]=filesSize[i] +" B";
}
}
}
function formatDates(){
for(var i=0;i<datesDir.length;i++){
var year =datesDir[i].getFullYear()+"";
var hours=datesDir[i].getHours();
if(hours>12){
hours=hours-12;
datesDir[i]=datesDir[i].getDate()+"/"+(parseInt(datesDir[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesDir[i].getMinutes()+":"+datesDir[i].getSeconds()+" PM";
}
else{
datesDir[i]=datesDir[i].getDate()+"/"+(parseInt(datesDir[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesDir[i].getMinutes()+":"+datesDir[i].getSeconds()+" AM";
}
}
for(var i=0;i<datesFile.length;i++){
var year =datesFile[i].getFullYear()+"";
var hours=datesFile[i].getHours();
if(hours>12){
hours=hours-12;
datesFile[i]=datesFile[i].getDate()+"/"+(parseInt(datesFile[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesFile[i].getMinutes()+":"+datesFile[i].getSeconds()+" PM";
}
else{
datesFile[i]=datesFile[i].getDate()+"/"+(parseInt(datesFile[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesFile[i].getMinutes()+":"+datesFile[i].getSeconds()+" AM";
}
}
}

function removeAmericanDates(){
for(var i=0;i<datesDir.length;i++){
var year =datesDir[i].getFullYear()+"";
var hours=datesDir[i].getHours();
if(hours>12){
hours=hours-12;
table.rows[i+2].cells[2].innerHTML=datesDir[i].getDate()+"/"+(parseInt(datesDir[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesDir[i].getMinutes()+":"+datesDir[i].getSeconds()+" PM";
}
else{
table.rows[i+2].cells[2].innerHTML=datesDir[i].getDate()+"/"+(parseInt(datesDir[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesDir[i].getMinutes()+":"+datesDir[i].getSeconds()+" AM";
}
}
for(var i=0;i<datesFile.length;i++){
var year =datesFile[i].getFullYear()+"";
var hours=datesFile[i].getHours();
if(hours>12){
hours=hours-12;
table.rows[dirs.length+i+2].cells[2].innerHTML=datesFile[i].getDate()+"/"+(parseInt(datesFile[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesFile[i].getMinutes()+":"+datesFile[i].getSeconds()+" PM";
}
else{
table.rows[dirs.length+i+2].cells[2].innerHTML=datesFile[i].getDate()+"/"+(parseInt(datesFile[i].getMonth())+1).toString()+"/"+year.substring(2,4)+" "+hours+":"+datesFile[i].getMinutes()+":"+datesFile[i].getSeconds()+" AM";
}
}
}
function caseInsensitiveSort(a, b) 
{ 
   var ret = 0;
   a = a.toLowerCase();b = b.toLowerCase();
   if(a > b) 
      ret = 1;
   if(a < b) 
      ret = -1; 
   return ret;
}
function sortNumber(a,b) {
    return a - b;
}
function sortDates(date1, date2) {
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
};


