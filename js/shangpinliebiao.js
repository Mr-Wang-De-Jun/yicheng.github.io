$(function(){
    // https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=6
    $.ajax({
        url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid='+fun.getCookie('cat_id'),
        type:'get',
        typeData:'json',
        error:function(rep){
            console.log('数据请求失败，请连接网络');
        },
        success:function(res){
            // console.log(fun.getCookie('cat_id'));
            setData();
            function setData(){
                $(res.message.goods).each(function(index,data){
                    let img_src = data.goods_small_logo == '' ? './images/2.jpg' : data.goods_small_logo
                    $('.main ul').append(`
                    <a href="./shangpinxiangqing.html" goods_id = "${data.goods_id}">
                    <li>
                    <img src="${img_src}" alt="图片丢失">
                    <div>
                        <p>${data.goods_name}</p>
                        <span><em>￥</em>${data.goods_price}</span>
                    </div>
                    </li>
                    </a>
                    `)
                })
            }

            $('.nav span').bind('click',function(){
                switch($(this).text()){
                    case '综合':
                        $(this).addClass('span_bottom').siblings().removeClass('span_bottom')
                        $('.main ul').empty()
                        setData();
                        break;
                    case '销量':
                        $(this).addClass('span_bottom').siblings().removeClass('span_bottom')
                        $('.main ul').empty()
                        $('.main ul').html('暂无销量数据')
                        break;
                    case '价格':
                        $(this).addClass('span_bottom').siblings().removeClass('span_bottom')
                        $('.main ul').empty()
                        $('.main ul').html('暂无价格数据')
                        break;
                    default:
                        console.log('未知错误');
                }
            })

            // 点击商品跳转商品详情页面,传递cookie值
            $('.main ul a').bind('click',function(){
                // console.log($(this).attr('goods_id'));
                fun.setCookie('goods_id',$(this).attr('goods_id'),1)
            })
        }
    })
})