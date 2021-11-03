var fun = {
    // 设置cookie
    setCookie:function (name,value,time){
        var expTime = new Date();
        expTime.setTime(expTime.getTime()+(time*24*60*60*1000));
        var expires = "expires="+expTime.toGMTString();
        document.cookie = name+"="+value+";"+expires;
    },

    // 获取cookie
    getCookie:function (name){
        var cook_name = name + "=";
        var a = document.cookie.split(';')
        for(let i = 0; i < a.length; i++){
            var b = a[i].trim();
            if(b.indexOf(cook_name) == 0){
                return b.substring(cook_name.length,b.length);
            }
        }
        return "没有该cookie";
    }
}