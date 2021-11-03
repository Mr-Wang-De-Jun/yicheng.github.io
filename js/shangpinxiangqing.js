$(function(){
    $.ajax({
        url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id='+fun.getCookie('goods_id'),
        type:'get',
        typeData:'json',
        success:function(data){
            $('.price').text(`￥${data.message.goods_price}`)
            $('.introduction_left').text(data.message.goods_name)
            $('.image_particulars').append(data.message.goods_introduce)
            // 添加小点
            for(let i = 0; i < data.message.pics.length; i++){
                i == 0 ? $('.lunbo ul').append('<li class="li_checked"></li>') : $('.lunbo ul').append('<li></li>'); 
            }
            // $('.lunbo ul li').eq(0).addClass('li_checked');

            console.log(data);
            let lunbo_number = 0;
            setInterval(() => {
                if(lunbo_number == data.message.pics.length){
                    lunbo_number = 0;
                }

                // 设置小点的样式跟随轮播图发生改变
                $('.lunbo ul li').eq(lunbo_number).addClass('li_checked').siblings().removeClass('li_checked');

                // console.log(lunbo_number);
                $('.lunbo').
                css({
                    background:`url(${data.message.pics[lunbo_number].pics_mid_url})`,
                    backgroundSize:'100% 100%'
                });
                lunbo_number++;
            }, 3000);
            // 设置轮播图下面的小点一直在正中间显示
            $('.lunbo ul').css({marginLeft:`-${data.message.pics.length*10}px`})
        }
    })
})