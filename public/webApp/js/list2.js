$(function(){
    var page = 1;
    var pageSize = 4;
    // 获取搜索栏里面的参数 并且解码,然后截取？以后的参数
    function getSeachValue(){
        var obj = {};
        var seacValue = decodeURI(location.search).slice(1);
        var arr = seacValue.split('&');

        // console.log(arr);
        arr.forEach(function(item,i,arr){
            // console.log(item);
            var key = item.split('=')[0];
            var val = item.split('=')[1];
            obj[key] = val;
        })
        return  obj;
    }

    
    var obj = getSeachValue();
    console.log(obj);
    mui.init({
        pullRefresh : {
        container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: true,//可选,默认false.首次加载自动下拉刷新一次
            callback :function(){
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                page = 1;
                render(function(info){
                    console.log(info);
                    setTimeout(function(){
                        $('.product ul').html(template('tpl',info));
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh(true);
                         //重置上拉加载功能，保证上拉加载功能在下拉刷新之后能继续的使用
                        mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    },1000)
                   
                
                })

            }
        },
        up:{
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            callback :function(){
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                page ++;
                render(function(info){

                    setTimeout(function(){
                        $('.product ul').append(template('tpl',info));
                       mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(info.data.length === 0);
                    },1000)
                   
                
                })

            }
        }
        }
    });
    
    function render(callback){
       $('.seach_box input').val(obj.key);
        var param = {
            page:page,
            pageSize:pageSize,
            proName:obj.key
        };
        var active = $('.sort_box li.active');

        if(active.length >0){
            var type = active.data('type');
            console.log(type);
            param[type] = active.find('i').hasClass('fa-angle-down')?'2':'1';
        }
        console.log(param);
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:param,
            success:function(info){
                callback(info);
            }
        })
    }

    // 点击搜索渲染
    $('.seach_box button').on('click',function(){
        var seacV = $(this).prev().val().trim();
        if(seacV==''){
            location.href = 'list.html';
        }else{
            location.href = 'list.html?key='+seacV;
        }
    })

    // 点击排序
    $('.sort_box li[data-type]').on('tap','',function(){
        // console.log('haha');
       if($(this).hasClass('active')){
         $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
       }else{
        $(this).addClass('active').siblings().removeClass('active');
        $('.sort_box li[data-type]').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
       }

        //只需要使用代码 执行一次下拉刷新即可
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

      
    })

})