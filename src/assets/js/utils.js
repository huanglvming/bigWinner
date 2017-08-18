const utils = {
	urlPrefix: 'https://apinyx.chuangshangapp.com',
    // urlPrefix: 'https://devapi2.chuangshangapp.com', 
    // urlPrefix: 'http://192.168.66.111:8081/nyx-api', 
	photoPrefix: 'https://avatar2.chuangshangapp.com/', 
	ticket: '',
	request: function(paras) { //获取url参数
		var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        let j = 0;
        for (let i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof(returnValue) == "undefined") {
            return "";
        } else {
        	var index = returnValue.indexOf("#");
        	if(index>0){
        		returnValue = returnValue.substring(0,index);
        	}
            return returnValue;
        }
	},
}

export default utils;