
var myChart = echarts.init(document.getElementById('left_chart'));
var myChart2 = echarts.init(document.getElementById('right_chart'));
 // 指定图表的配置项和数据
 var option = {
    title: {
        text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
        data:['数量','用户量']
    },
    xAxis: {
        data: ["1","2","3","4","5","6"]
    },
    yAxis: {},
    series: [{
        name: '数量',
        type: 'bar',
        data: [123333, 223332, 33333, 55555, 88888, 99999]
    },
    {
        name: '用户量',
        type: 'line',
        data: [11331, 233322, 44444, 66666, 55555, 7000]
    }]
};
var option2 ={
    title : {
        text: '热门品牌销售',
        subtext: '2018年7月11',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','香奈儿','Gucci']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'香奈儿'},
                {value:1548, name:'Gucci'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart2.setOption(option2);