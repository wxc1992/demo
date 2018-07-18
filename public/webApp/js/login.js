$(function(){
    $('.btn_login').on('click',function(){
        console.log('haha');
        var username = $("[name='username']").val().trim();
        var password = $("[name='password']").val().trim();
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password,
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    var getUrl = location.search;
                    var url=getUrl.replace('?prev=','');
                    if(getUrl.indexOf('?prev=')!== -1){
                        location.href = url;
                    }else{
                        location.href = 'user.html';
                    }
                }
            }
        })
    })
})