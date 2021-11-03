$(function(){
    $('form .login_show').bind('click',function(e){
        e.preventDefault();
        let phone = $('.login_phone input').val();
        let passWord = $('.login_passWord input').val();
        // console.log(phone);
        if(phone == fun.getCookie('phone') && passWord == fun.getCookie('passWord')){
            fun.setCookie('show_boolen',true,1)
            location.href = './personage.html'
        }else{
            alert('账号或密码错误')
        }
    })
})