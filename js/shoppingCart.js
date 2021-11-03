$(function(){
    // console.log(fun.getCookie('show_boolen'));
    if(fun.getCookie('show_boolen') != '没有该cookie'){
        console.log(123);
        $('.yes_login').css({display:'block'}).siblings().css({display:'none'})
    }else{
        console.log(456);
        $('.no_login').css({display:'block'}).siblings().css({display:'none'})
    }
})