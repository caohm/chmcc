function Map() {
	var myArrays = new Array();
	//添加键值，如果键重复则替换值
	this.put = function(key, value) {
		var v = this.get(key);
		if (v == null) {
			var len = myArrays.length;
			myArrays[len] = {Key: key, Value: value};
		} else {
			for (var i = 0; i < myArrays.length; i++) {
				if (myArrays[i].Key == key) {
					myArrays[i].Value = value;
				}
			}
		}
	},
	//根据键获取值
	this.get = function(key) {
		for (var i = 0; i < myArrays.length; i++) {
			if (myArrays[i].Key == key) {
				return myArrays[i].Value;
			}
		}
		return null;
	},
	//删除某一项
	this.drop = function(key) {
		var dropIndex = -1;
		for (var i = 0; i < myArrays.length; i++) {
			if (myArrays[i].Key == key) {
				dropIndex = i;
			}
        }
            if (dropIndex == -1) {
                return;
            }
            for (var i = dropIndex; i < myArrays.length - 1; i++) {
                myArrays[i] = myArrays[i + 1];
            }
            myArrays.length--;
        },
        //以split分隔符返回值字符串
        this.toString = function(split) {
            var str = "";
            if (myArrays.length > 1) {
                for (var i = 0; i < myArrays.length - 1; i++) {
                    str += myArrays[i].Value + split;
                }
                if (str != "") {
                    str += myArrays[myArrays.length - 1].Value;
                }
            } else if (myArrays.length == 1) {
                str = myArrays[0].Value;
            }
            return str;
        },
        //以json格式返回键值对字符串，应配合json.js使用
        this.toJSONString = function() {
            var json = (myArrays.length > 0) ? '{"myArray":[' : "";
            for (var i = 0; i < myArrays.length; i++) {
                json += '{"Key":"' + myArrays[i].Key + '","Value":"' + myArrays[i].Value + '"},';
            }
            if (myArrays.length > 0) {
                json = json.substring(0, json.length - 1);
                json += ']}';
            }
            return json;
        },
        //以数组形式返回键列表
        this.getKeySets = function() {
            var newArray = new Array();
            for (var i = 0; i < myArrays.length; i++) {
                newArray[i] = myArrays[i].Key;
            }
            return newArray;
        },
        //以数组形式返回值列表
        this.getValues = function() {
            var newArray = new Array();
            for (var i = 0; i < myArrays.length; i++) {
                newArray[i] = myArrays[i].Value;
            }
            return newArray;
        }
        this.sortByValue = function() {
        	myArrays.sort(function(a, b){
        		return b.Value - a.Value;
        	});
        }
}