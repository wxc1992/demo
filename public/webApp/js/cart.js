$(function(){

    
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,
        callback: function () {
          //发送ajax请求，获取数据
          $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            success: function (info) {
              setTimeout(function () {
                console.log(info);
                //如果没登录，跳转登录页
                if (info.error) {
                  location.href = "login.html?retUrl=" + location.href;
                }

                //动态渲染页面
                $(".mui-table-view").html(template("tpl", { list: info }));

                //关闭下拉刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 1000);
            }
          })
        }
      }
    }
  });


  $(".mui-table-view").on("tap", ".btn_delete", function(){
    var id = $(this).data("id");
    mui.confirm("你是否要删除这件商品", "温馨提示", ["否", "是"], function(e){
      if(e.index === 1){
        $.ajax({
          type: 'get',
          url: '/cart/deleteCart',
          data: {
            id: id
          },
          success: function(info) {
            // console.log(info);
            if(info.success) {
              //下拉一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    })
  });
  $(".mui-table-view").on("change", ".ck", function(){
    var total = 0;
    $(".ck:checked").each(function(){
      //total +=  当前商品的数量  * 当前商品的价格
      var price = $(this).data("price");
      var num = $(this).data("num");

      total += price * num;
    });

    $(".total").text(total.toFixed(2));
    
  });


    //   编辑
    $(".mui-table-view").on("tap", ".btn_edit", function(){
        var data = this.dataset;
        console.log(data);

        mui.confirm('html', "编辑商品", ["确定","取消"], function(e){
            
        })
    })


})