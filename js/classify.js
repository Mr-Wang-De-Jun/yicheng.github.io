$(function(){
    $.ajax({
        url:'https://api-hmugo-web.itheima.net/api/public/v1/categories',
        type:'get',
        typeData:'json',
        success:function(res){
            console.log(res);
            // 存放数据
            let arr = [];
            $(res.message).each(function(index,data){
                // console.log(res.message[index].cat_name);
                $('.main_left').append(`<span>${data.cat_name}</span>`)
                // 设置id,用于点击请求不同数据进行加载
                $('.main_left span').eq(index).attr("cat_id",data.cat_id)
                arr.push(data)
            })
            $('.main_left span').eq(0).addClass('span_color')

            // 设置默认显示的第一条数据
            // console.log(res.message[0].children);
            for(let i = 0; i < res.message[0].children.length; i++){
                // console.log(res.message[0]['children'][i].cat_name);
                // 右侧内容的标题
                let text_title = res.message[0]['children'][i].cat_name;
                // $(`.main_right .main_right_content:eq(${i}) p`).text(text_title)
                // console.log(res.message[0]['children'][i]['children']);
                // 插入标题与主体架构
                $('.main_right').append(`
                    <div class="main_right_content">
                        <p>${text_title}</p>
                        <div class="content_imgandtext">
                            <ul class="main_ul">
                            </ul>
                        </div>
                    </div>
                `)
                // 右侧标题下面的内容
                let text_content =  res.message[0]['children'][i]['children']
                for(let j = 0; j < text_content.length; j++){
                    // console.log(text_content[j]);
                    $(`.main_right .main_right_content:eq(${i}) .main_ul`).append(
                        `
                        <li>
                        <a href="javascript:;" cat_id="${text_content[j].cat_id}">
                            <img src="${text_content[j].cat_icon}" alt="商品图片">
                            <span>${text_content[j].cat_name}</span>
                        </a>
                        </li>
                        `
                    )
                }
            }

            // 点击右侧不同标题请求右侧显示不同数据
            $('.main_left').bind('click',function(e){
                let target = window.target || e.target;
                let content_data;
                if(target.nodeName == 'SPAN'){
                    $(target).addClass('span_color').siblings().removeClass('span_color')
                    let content_id = $(target).attr('cat_id');
                    // 循环找到数组中我所需要的数据,进行渲染处理
                    for(let i = 0; i < arr.length; i++){
                        if(arr[i].cat_id == content_id){
                            // console.log(arr);
                            // 找到需要的数据后赋值给外部声明的变量,然后break,防止多重循环嵌套,减少性能消耗
                            content_data = arr[i];
                            // 清空原有的所有数据
                            $('.main_right').empty()
                            break;
                        }
                    }
                }
                // console.log(content_data.children);
                // 开始渲染数据
                for(let i = 0; i < content_data.children.length; i++){
                    $('.main_right').append(`
                    <div class="main_right_content">
                        <p>${content_data.children[i].cat_name}</p>
                        <div class="content_imgandtext">
                            <ul class="main_ul">
                            </ul>
                        </div>
                    </div>
                    `)
                    // console.log(content_data['children'][i].children);
                    let content_dataLength = content_data['children'][i].children == undefined ? 0 : content_data['children'][i].children;
                    // console.log(content_dataLength);
                    for(let j = 0; j < content_dataLength.length; j++){
                        // console.log(text_content[j]);
                        $(`.main_right .main_right_content:eq(${i}) .main_ul`).append(
                            `
                            <li>
                            <a href="javascript:;" cat_id="${content_data.children[i].children[j].cat_id}">
                                <img src="${content_data.children[i].children[j].cat_icon}" alt="">
                                <span>${content_data.children[i].children[j].cat_name}</span>
                            </a>
                            </li>
                            `
                        )
                    }
                }
            })
            $(`.main_right`).bind('click',function(e){
                console.log(132);
                let target = window.target || e.target;
                let xiangqing_id;
                if(target.nodeName == 'IMG' || target.nodeName == 'SPAN'){
                    xiangqing_id = $(target).parent().attr('cat_id')
                    location.href = './shangpinliebiao.html';
                }
                if(target.nodeName == 'A'){
                    xiangqing_id = $(target).attr('cat_id')
                    location.href = './shangpinliebiao.html';
                }
                // console.log(xiangqing_id);
                // 设置cookie值1天后过期
                fun.setCookie('cat_id',xiangqing_id,1);
                
            })
        }
    })
})