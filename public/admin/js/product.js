
$(function(){
    var page=1;
    var pageSize = 5;
    var imgs = [];
    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info)
              $('tbody').html(template('tpl',info)) ;
              $('#userpage').bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:page,//当前页
                totalPages:Math.ceil(info.total/info.size),//总页数
                size:"small",//设置控件的大小，mini, small, normal,large
                itemTexts:function(type, p, current){
                    // console.log(type,p,current);
                    switch(type){
                        case 'first':
                            return '首页';
                        case 'prev':
                            return '上一页';
                        case 'next':
                            return '下一页';
                        case 'last':
                            return '尾页';
                        default:
                            return p;
                    }
                },
                tooltipTitles:function(type, p, current){
                    switch(type){
                        case 'first':
                            return '首页';
                        case 'prev':
                            return '上一页';
                        case 'next':
                            return '下一页';
                        case 'last':
                            return '尾页';
                        default:
                            return p;
                    }
                },
                useBootstrapTooltip:true,
                onPageClicked:function(event, originalEvent, type,p){
                    page = p;
                    render();
                }
            })
            }
        })
    }
    // 点击模态窗出先
    $('.btn-add').on('click',function(){
        $('#cate2Modal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:30,
            },
            success:function(info){
                $('.dropdown-menu').html(template('productlist',info));
            }
        })
    })
    // 校验表单bootstrapValidator
    $('#cate2form').bootstrapValidator({
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
       feedbackIcons: {
           valid: 'glyphicon glyphicon-ok',
           invalid: 'glyphicon glyphicon-remove',
           validating: 'glyphicon glyphicon-refresh'
       },
       fields: {
        brandId:{
            validators:{
                notEmpty:{
                    message:'请选择二级分类',
                }
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:'商品名称不能为空',
                }
            }
        },
        num:{
            validators:{
                notEmpty:{
                    message:'请输入商品库存',
                },
                regexp:{
                    regexp:/^[1-9]\d*$/,
                    message:'请输入合法库存',
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:'请输入商品描述',
                }
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message:'请输入商品尺码',
                },
                regexp:{
                    regexp:/^\d{2}-\d{2}$/,
                    message:'请输入正确的尺码比如36-44',
                }
            }
        },
        oldPrice:{
            validators:{
                notEmpty:{
                    message:'请输入商品原价',
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message:'请输入商品价格',
                }
            }
        },
        productLogo:{
            validators:{
                notEmpty:{
                    message:'请上传3张商品图片',
                }
            }
        },
       }
    })
    $('.dropdown-menu').on('click','a',function(){
        $('#cateid').val( $(this).data('id') );
        $('.catekind').text( $(this).text() );
        $('#cate2form').data("bootstrapValidator").updateStatus('brandId', 'VALID');
    })
    // 多文件上传
    $('#fileupload').fileupload({
        dataType:"json",
        done:function(e,data){
            // console.log(data.result);
            if(imgs.length==3){
                return false;
            }
            var imgObj = data.result;
            imgs.push(imgObj);
            console.log(imgs);
            $('<img src="'+data.result.picAddr+'" alt="" width="100">').appendTo($('.imgbox'));
            if(imgs.length ==3){
                $('#cate2form').data("bootstrapValidator").updateStatus('productLogo', 'VALID');
            }else{
                $('#cate2form').data("bootstrapValidator").updateStatus('productLogo', 'INVALID');
            }

        }
    })
    var validator = $("#cate2form").data('bootstrapValidator');  //获取表单校验实例

    $('#cate2form').on('success.form.bv', function (e) {
        e.preventDefault();
        var param =$('#cate2form').serialize();

            param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
            param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
            param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
            $.ajax({
                type:'post',
                url:'/product/addProduct',
                data:param,
                success:function(info){
                    console.log(info);
                    if(info.success){
                        $('#cate2Modal').modal('hide');
                        quxiao();
                    }
                }
            })
    })
    // 回复默认设置
    function quxiao(){
        $("#cate2form").data('bootstrapValidator').resetForm(true);
        $('.catekind').text('请选择二级分类');
        $('.imgbox').empty();
        imgs = [];
        page = 1;
        render();
    }
    $('.btn-quxiao').on('click',function(){
        quxiao();
    })

})