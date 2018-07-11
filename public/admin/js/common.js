$(function(){
    
    $(document).ajaxStart(function(){
        NProgress.start();
    })

    $(document).ajaxStop(function(){
        NProgress.done();
    })

    // 点击头部左边的icon菜单收回 
    $('.left_toggle').click(function(){
        $('body').toggleClass('active');
        $('.left_menu').toggleClass('active');
    })
    $('.second').prev().on('click',function(){
       $(this).next().slideToggle()
    })
    $('.logout').on('click',function(){
        $('#myModal').modal('show');
    })
    $('.exit').on('click',function(){
        $.get('/employee/employeeLogout',function(info){
            console.log(info);
            if(info){
                location.href = 'login.html'
            }
        })
    })

})