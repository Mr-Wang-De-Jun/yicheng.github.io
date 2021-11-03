// 当Jquery Mobile开始执行时，他就会在document对象上触发mobileinit 事件，所以你可以绑定别的行为来覆盖默认配置
$(function(){
    // 轮播图start
    $.ajax({
        url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        type:'get',
        typeData:'json',
        success:function(res){
            // 存放轮播图图片地址
            let arr = [];
            // console.log(res.message.length);
            $(res.message).each(function(index,data){
                arr.push(data.image_src)
            })
            // 根据图片个数添加小点个数
            for(let i = 0; i < arr.length; i++){
                $('.lunbo_ul').append('<li></li>')
            }
            // 默认设置第一个小点样式
            $('.lunbo_ul li:eq(0)').addClass('li_checked')
            // 调用定时器，进行图片轮播
            let number = 0;
            setInterval(() => {
                number++;
                if(number == 3){
                    number = 0
                }
                let img = new Image();
                img.src = arr[number];
                // console.log(img.src);
                // 加载图片，防止闪屏出现
                img.addEventListener('load',function(){
                    $('.lunbo')
                    .css({
                        background:`url(${img.src})`,
                        backgroundSize:'100% 100%'
                    })
                    // 改变小点的样式
                    $(`.lunbo_ul li:eq(${number})`)
                    .addClass('li_checked')
                    .siblings()
                    .removeClass('li_checked')
                })
            }, 3000);
        }
    })
    // 轮播图end
    
    // 导航栏数据start
    $.ajax({
        url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
        type:'get',
        typeData:'json',
        success:function(res){
            $(res.message).each(function(index,data){
                // // console.log(document.documentElement.clientWidth);
                // if(document.documentElement.clientWidth < 575){
                //     $('.nav_ul li a').eq(index).css({background:`url(${data.image_src}) no-repeat`,backgroundSize:'100% 100%'}).attr('name',`${data.name}`);
                // }else{
                    $('.nav_ul li a')
                    .eq(index)
                    .css({
                        background:`url(${data.image_src}) no-repeat`,
                        backgroundSize:'100% 100%'
                    })
                    .attr('name',`${data.name}`);
                // }
                
            })
        }
    })
    // 导航栏数据end

    // 内容区域start
    $.ajax({
        url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
        type:'get',
        typeData:'json',
        success:function(res){
            $(res.message).each(function(index,data){
                $('.main').append(`
                <div class="main_item">
                <a href="javascript:;" class="img_title"></a>
                <div class="img_content">
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                    <a href="javascript:;"></a>
                </div>
                </div>
                `)
                $(`.main_item:eq(${index}) .img_title`)
                .css({
                    background:`url(${data['floor_title'].image_src}) no-repeat`,
                    backgroundSize:'100% 100%'
                })
                .attr('name',`${data['floor_title'].name}`);

                
                for(let i = 0; i < data['product_list'].length; i++){
                    $(`.main_item:eq(${index}) .img_content a:eq(${i})`)
                    .css({
                        background:`url(${data['product_list'][i].image_src}) no-repeat`,
                        backgroundSize:'100% 100%'
                    })
                    .attr('name',`${data['product_list'][i].image_src}`);
                }
            })
        }
    })
    // 内容区域end
})