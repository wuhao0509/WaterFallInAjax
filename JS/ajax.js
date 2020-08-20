/**
 * 简单请求的ajax
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 * @param {*} isAsync 
 */
function ajax(method,url,data,callback,isAsync){
    
    // 创建xhr对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObjext('Microsoft.XMLHttp');
    }

    // 建立连接并发送信息
    if(method == 'GET'){
        xhr.open(method,url+"?"+data,isAsync);
        xhr.send();
    }else if(method == 'POST'){
        xhr.open(method,url,isAsync);
        // 简单请求的需要设置请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(data);
    }

    // 监听相应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                callback(JSON.parse(xhr.responseText));
            }
        }
    }

}