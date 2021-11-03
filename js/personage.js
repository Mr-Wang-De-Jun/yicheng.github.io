$(function(){
    console.log(fun.getCookie('show_boolen'));
    if(fun.getCookie('show_boolen') != '没有该cookie'){
        console.log(123);
        $('.yes_login').css({display:'block'}).siblings().css({display:'none'})
    }else{
        console.log(456);
        $('.no_login').css({display:'block'}).siblings().css({display:'none'})
    }

    // 判断是否登录成功，改变margin-top的值
    if(fun.getCookie('show_boolen') != '没有该cookie'){
        $('.main').css({
            marginTop:0
        })
    }

    // 获取当前登录的用户的用户名并进行渲染
    $('.user_img p').text(fun.getCookie('userName'))

    // 昵称操作start
    $('.yonghu input').bind('focus',function(){
        $('.yonghu em').css({opacity:0})
    })
    $('.yonghu input').bind('blur',function(){
        if($('.yonghu input').val() == ''){
            $('.yonghu em').css({opacity:1})
        }
    })
    // 昵称操作end
    
    // 第一次输入密码操作start
    $('.mima input').bind('focus',function(){
        // $('.mima1 em').css('display','none')
        $('.mima em').css({opacity:0})
        $('.querenmima em').css({opacity:0})
    })
    $('.mima input').bind('blur',function(){
        if($('.mima input').val().length < 6){
            // $('.mima1 em').css('display','block')
            $('.mima em').css({opacity:1})
        }
    })
    // 第一次输入密码操作end
    
    // 第二次输入密码操作start
    $('.querenmima input').bind('focus',function(){
        // $('.mima1 em').css('display','none')
        $('.querenmima em').css({opacity:0})
    })
    $('.querenmima input').bind('blur',function(){
        if($('.querenmima input').val() != $('.mima input').val()){
            // $('.mima1 em').css('display','block')
            $('.querenmima em').css({opacity:1})
        }
    })
    // 第二次输入密码操作end
    
    // 电话号码操作start
    // /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    $('.phone input').bind('focus',function(){
        $('.phone em').css({opacity:0})
    })
    $('.phone input').bind('blur',function(){
        let rg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        if(!$('.phone input').val().match(rg)){
            $('.phone em').css({opacity:1})
        }
    })
    // 电话号码操作end
    
    // 验证码随机数start
    $('.yanzhengma .item_right').bind('click',function(){
        let yz = Math.floor(Math.random()*(9999-1000)+1000);
        $('.yanzhengma i').text(yz).css({color:'black'})
    })
    // 验证码随机数end
    
    // 验证码操作start
    $('.yanzhengma input').bind('blur',function(){
        if($('.yanzhengma i').text() != $('.yanzhengma input').val()){
            $('.yanzhengma i').text('验证码错误').css({color:'red'})
        }
    })
    // 验证码操作end
    
    // 点击注册按钮操作处理start
    $('form .regiest').bind('click',function(e){
        e.preventDefault();
        let userName = $('.yonghu input').val()
        // console.log(userName);
        let passWord1 = $('.mima input').val()
        let passWord2 = $('.querenmima input').val()
        // console.log(passWord1 +"  "+passWord2);
        let phone = $('.phone input').val();
        // console.log(phone); 
        let yanzhengm = $('.yanzhengma input').val() == $('.yanzhengma i').text() ? true : false;
        // console.log(yanzhengm);
        let rg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        if(userName != '' 
        && passWord1 == passWord2 
        && phone.match(rg) 
        && yanzhengm){
            fun.setCookie('userName',userName,1)
            fun.setCookie('passWord',passWord1,1)
            fun.setCookie('phone',phone,1)
            location.href = './login.html'
        }else{
            alert('请完善内容')
        }
    })
    // 点击注册按钮操作处理ned

    // 点击登录按钮操作处理start
    $('form .login').bind('click',function(e){
        e.preventDefault();
        location.href = './login.html'
    })
    // 点击登录按钮操作处理ned
    })