
$(function(){

    var page = 1;
    var pageSize = 5;
   
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
                $('tbody').html(template('cate2tpl',info));
                $('#userpage').bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    var $form = $("form");
    // 渲染下拉选项框的列表
    $('.btn-add').on('click',function(){
        $('#cate2Modal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:30,
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html(template('cate2list',info));
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        var text = $(this).text();
        var id = $(this).data('id');
        $('#dropdownMenu>.catekind').text(text);
        $('#cateid').val(id);
        $form.data("bootstrapValidator").updateStatus('categoryId', 'VALID');
    })
    // 图片异步上传
    $("#fileupload").fileupload({
        dataType: "json",//指定响应的格式
        done: function (e, data) {//图片上传成功之后的回调函数
          //通过data.result.picAddr可以获取到图片上传后的路径
          console.log(data);
          console.log(data.result.picAddr);
    
          //设置给img_box中img的src属性
          $(".imgbox img").attr("src", data.result.picAddr);
    
          //把图片的地址赋值给brandLogo
          $("[name='brandLogo']").val(data.result.picAddr);
          $form.data("bootstrapValidator").updateStatus('brandLogo', 'VALID');
        }
      });
     //表单校验功能
   
    $form.bootstrapValidator({
        excluded: [],
         //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                notEmpty: {
                    message: "请选择一级分类"
                }
                }
            },
            brandName: {
                validators: {
                notEmpty: {
                    message: "请输入二级分类的名称"
                }
                }
            },
            brandLogo: {
                validators: {
                notEmpty: {
                    message: "请上传品牌图片"
                }
                }
            }
        }
    });


  $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            success:function(info){
                page=1;
                
                $('#cate2Modal').modal('hide');
                render();
                $form[0].reset();
                $form.data('bootstrapValidator').resetForm();
                $(".imgbox img").attr("src",'./images/none.png');
                $('#dropdownMenu>.catekind').text('请选择一级分类');
            }

        })
        
   })
})