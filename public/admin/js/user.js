
$(function(){


    var page = 1;
    var pagesize = 5;
    var id;
    var isDelete;
    render();
    function render(){
        console.log('haha');
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pagesize
            },
            success:function(info){
                console.log(info);
                $('tbody').html(template('tpl',info));
                $("#userpage").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                        page = p;
                        render();
                    }
                  });
                  
            }
        })
    }

    $('tbody').on('click','button',function(){
        $('#userModal').modal('show');
        id=$(this).parent().data('id');
        isDelete = $(this).hasClass('btn-success')?1:0;
    })

    $('.btn-sure').on('click',function(){
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
                $('#userModal').modal('hide');
                render();
            }
        })
    })


})