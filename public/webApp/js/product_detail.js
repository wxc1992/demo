$(function(){
    var id = location.search.split('=')[1];
    console.log(id);

    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function(info){
            console.log(info);
            $('.mui-scroll').html(template('tpl',info));
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
               interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            $('.size_box span').on('click',function(){
                $(this).addClass('active').siblings().removeClass('active');
            })
            mui('.mui-numbox').numbox();
            
        }
    })

    //添加购物车
    
    $('.btn_add_cart').on('click',function(){
        var size = $('.size_box span.active').text();
        console.log(size);
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        var num = $('.mui-numbox-input').val();
       
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车", "继续浏览"], function (e) {
                      if(e.index == 0){
                        location.href = "cart.html";
                      }
                    });
                  }
                if(info.error){
                    mui.toast('亲，您还没登录呢');
                    setTimeout(() => {
                          location.href = 'login.html?prev='+location.href;  
                    }, 1000);
                }
            }
        })
    })



})