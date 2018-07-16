$(function(){
        var page = 1;
        var pageSize = 20;
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
        render();
        
        function render(){
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
                beforeSend:function(){
                   $('.loading').show();
                },
                success:function(info){
                    // console.log(info);
                    setTimeout(function(){
                        $('.loading').hide();
                        $('.product ul').html(template('tpl',info));
                    },500)
                   
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
        $('.sort_box li[data-type]').on('click',function(){
            // console.log('haha');
           if($(this).hasClass('active')){
             $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
           }else{
            $(this).addClass('active').siblings().removeClass('active');
            $('.sort_box li[data-type]').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
           }

           render();

          
        })

})