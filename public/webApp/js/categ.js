$(function () {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function (info) {
            console.log(info);
            $('.left_box  .mui-scroll').html(template('toplist', info));
            console.log();
            var id = info.rows[0].id;
            second(id);
        }
    })
    
    function second(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $('.right_box ul').html(template('content',info));
            }
        })
    }

    // 点击渲染第二级分类
    $('.left_box').on('click','li',function(){
        $(this).addClass('current').siblings().removeClass('current');
        var id = $(this).data('id');
        second(id);
    })
   
})

