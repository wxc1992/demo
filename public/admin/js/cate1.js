
$(function(){
    var page = 1;
    var pageSize = 5;

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $('tbody').html(template('cate1',info));
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
    $('#Addform').bootstrapValidator({
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'分类名不能为空'
                    }
                }
            }
        }
    })
    $('.btn-add').on('click',function(){
        $('#AddModal').modal('show');
    })

    $('#Addform').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('#Addform').serialize(),
            success:function(info){
                page=1;
                render();
                $('#AddModal').modal('hide');
                // $('#Addform').data('bootstrapValidator').resetForm();
                $('#Addform')[0].reset();
            }
        })
    })
})