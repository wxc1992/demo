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
        mui.confirm('你确认要删除这条历史记录么',['确定','取消'],function(e){
            if(e.index==1){
                localStorage.removeItem('seach_history');
                render();
            }
        },'div');
        
   })
   //点击单个删除
   $('.seach_content').on('click','.btn-delete',function(){

     mui.confirm('你确认要删除这条历史记录么',['确定','取消'],function(e){
        console.log(e.index);
        if(e.index==1){
            var arr = getHistory();
            var index = $(this).data('index');
            arr.splice(index,1);
            localStorage.setItem('seach_history',JSON.stringify(arr));
            render();
        }
     },'div');
        

   })
    //    搜索添加历史记录
   $('.seach_box button').on('click',function(){
       var value = $(this).prev().val().trim();
       $(this).prev().val('');
       if(value==''){
         mui.toast('没有搜索关键字哦',{ duration:'long', type:'div' }) 
            return false;
       }
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
      location.href = 'list.html?key='+value;

   })
})