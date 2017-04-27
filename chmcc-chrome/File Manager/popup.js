var files=new Array();

$(document).ready(function() {
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	document.querySelector("#clearButton").onclick=clear;
	populate();
});
function populate(){
	 chrome.storage.local.get('files', function (result) {
        console.log(result);
        if(result.files==undefined) return;
        for(var i=0;i<result.files.length;i++){
        	document.getElementById("fileTable").innerHTML+="<tr><td>"+result.files[i]+"</td></tr>";
       }
    });
}

function addItem(fname){
	  		  console.log("adding to "+files);
	  		  console.log(files);
	  		  files[files.length]=fname;
	  		  	  console.log("file:");
	  console.log(files);
	  			  document.getElementById("fileTable").innerHTML+="<tr><td>"+fname+"</td></tr>";
}

 function handleFileSelect(evt) {
	 chrome.storage.local.get('files', function (result) {
	  	if(result.files!=undefined)
	  		files=result.files;
	  	console.log(files);
		    var selectedFiles = evt.target.files; // FileList object

		    // files is a FileList of File objects. List some properties.
		    var output = [];
		    for (var i = 0, f; f = selectedFiles[i]; i++) {
		      //output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
		        //          f.size, ' bytes, last modified: ',
		          //        f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
		            //      '</li>');
		          addItem(f.name);
		    }
		    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
		    upload();
	});
  }

function clear(){
	  chrome.storage.local.clear();
	  document.getElementById("fileTable").innerHTML="";
}
function upload(){
		  chrome.storage.local.set({'files': files},function() {
			  	  chrome.storage.local.get('files', function (result) {
			  	  });
		});
}
