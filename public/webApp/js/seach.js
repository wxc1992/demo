$(function(){
    // var arr = ['1','2','3','4','5'];
    // localStorage.setItem('seach_history',JSON.stringify(arr));
    render();
    function getHistory(){
        var data = localStorage.getItem('seach_history');
            data = JSON.parse(data) || [];
           return data;
    }

    function render(){
        var arr = getHistory();
        $('.seach_content').html(template('tpl',{list:arr}));
    }
    $('.seach_content').on('click','.clear_his',function(){
        localStorage.removeItem('seach_history');
        render();
   })
   //点击单个删除
   $('.seach_content').on('click','.btn-delete',function(){
        var arr = getHistory();
        var index = $(this).data('index');
        arr.splice(index,1);
        localStorage.setItem('seach_history',JSON.stringify(arr));
        render();

   })
    //    搜索添加历史记录
   $('.seach_box button').on('click',function(){
       var value = $(this).prev().val().trim();
       var arr = getHistory();
       var index = arr.indexOf(value);
       if(index!==-1){
        arr.splice(index,1);
        }
       if(arr.length>9){
            arr.pop(); 
       }
       arr.unshift(value);
       console.log(arr);
       localStorage.setItem('seach_history',JSON.stringify(arr));
       render();

   })
})