$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
           $('.mui-media').html(template('tpl',info));
        }
    })

    $('.login_out').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href="login.html";
                }
            }
        })
    })
})