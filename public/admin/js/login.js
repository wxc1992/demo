$(function(){
    $('form').bootstrapValidator({
         //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            username:{
                validators: {
                    //不能为空
                    notEmpty: {
                      message: '用户名不能为空'
                    },
                    
                }
            },
            password:{
                validators: {
                    //不能为空
                    notEmpty: {
                      message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                      min: 6,
                      max: 12,
                      message: '密码长度必须在6到12之间'
                    },
                    
                  }
            },
        }
    })

    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        console.log($('form').serialize());
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            success:function(data){
               if(data.error==1001){
                alert('密码错误');
               }
               if(data.error==1000){
                alert('用户名不存在');
               }
               if(data.success){
                 location.href = 'index.html'
               }

            }
        })
    })

})