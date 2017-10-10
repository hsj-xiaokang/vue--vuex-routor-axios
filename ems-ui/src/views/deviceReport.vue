<template>
	<section class="chart-container">
		<el-row>
				  <el-button type="primary" size="small" v-on:click="today()">近一天</el-button>
				  <el-button type="primary" size="small" v-on:click="day7()">近7天</el-button>
				  <el-button type="primary" size="small" v-on:click="day30()">近30天</el-button>
				  <div class="pickTime_report pickTime_report_leftMargin">
					  <el-date-picker
							  v-model="value1"
							  type="datetime"
							  placeholder="选择日期时间">
					  </el-date-picker>
				  </div>
				  至
				  <div class="pickTime_report">
					  <el-date-picker
							  v-model="value2"
							  type="datetime"
							  placeholder="选择日期时间">
					  </el-date-picker>
				  </div>
			   <el-button type="primary" size="small" v-on:click="fiindButton()">查找</el-button>
		</el-row>
		<el-row v-loading="loading"
				element-loading-text="拼命加载中">
			<div id="main" style="height:620px;padding:10px;"></div>
		</el-row>
	</section>
</template>

<script>
    import echarts from 'echarts'
    import * as httpAxios from '../api/api';
    /**
	 * 设备报表页面
     * @author heshengjin
     * @date 2017-06-03
     */
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                value1:"",
                value2:"",
				dataAll:{
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['土壤温度','土壤湿度'],
                        left:'left'
                    },
                    title:{
                        text:'标题',
                        left:'center',
						subtext:""
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            splitLine:{show: true},//去除网格线
                            splitArea : {show : false},
                            type : 'category',
                            data : [
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月',
//                                '20170601月'
                            ],
                            //设置字体倾斜
                            axisLabel:{
//                                interval:0,
//                                rotate:90,//倾斜度 -90 至 90 默认为0
//                                margin:9,
                                show : false //坐标轴文本标签选项
                            },
                        }
                    ],
                    dataZoom : { //数据区域缩放，仅对直角坐标系适用
                        show : true,
                        realtime : true,//缩放变化是否实时显示
                        orient: 'horizontal', //布局方式，可选为：'horizontal' ,'vertical'
//                        x: 110,//水平安放位置，默认为根据grid参数适配px
//                        y : 330, //垂直安放
                        //width: 400,//指定宽度
                        height : 20,//指定高度
                        backgroundColor : '#cccccc',//  背景颜色
                        dataBackgroundColor : '#cccccc',//数据缩略背景颜色
                        fillerColor : '#99ccff',  //选择区域填充颜色
                        handleColor : '#0099cc', //控制手柄颜色
                        //xAxisIndex:[],
                        //yAxisIndex:[],
                        start : 0,//${start},默认显示区域
                        end : 100
                    },
                    yAxis : [
                        {
                            splitLine:{show: true},//去除网格线
                            type : 'value',
                            splitArea : {show : false}
                        }
                    ],
                    series : [
                        {
                            name:'土壤温度',
                            type:'line',
//                            symbol:'none',//拐点样式
                            symbolSize: 0,//拐点大小
                            smooth:true,
                            itemStyle : {
                                normal : {
                                    lineStyle:{
                                        width:1,//折线宽度
//                                        color:"#20a0ff"//折线颜色
                                    }
                                }
                            },
                            data:[
//                                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3
							]
                        },
                        {
                            name:'土壤湿度',
                            type:'line',//bar柱状图
//                            symbol:'none',//拐点样式
                            smooth:true,
                            symbolSize: 0,//拐点大小
                            itemStyle : {
                                normal : {
                                    lineStyle:{
                                        width:1,//折线宽度
//                                        color:"#c0ccda"//折线颜色
                                    }
                                }
                            },
                            data:[
//                                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2
							]
                        }
                    ]
                },
                params:{
                    deviceId:-1,
					begin:0,
					end:0,
				},
                myChart:null,
                loading:true,
            }
        },
        mounted: function () {
            console.log(">>>>>>>>>>>>>>>>>>>this.$route.params");
            var params = this.$route.params;
            console.log(params);

            this.myChart = echarts.init(document.getElementById('main'));
            var MydataAll = this.dataAll;
            this.params.deviceId = params.deviceId;//初始化deviceId
            var cd = new Date().getTime();
            this.params.begin = cd- (1*24*60*60*1000*15);
            this.params.end = cd ;//默认15天前到现在的数据

            //标题
            MydataAll.title.text = params.deviceName;
            MydataAll.title.subtext = new Date(this.params.begin).Format("yyyy-MM-dd hh:mm:ss") + " 至 "+new Date(this.params.end).Format("yyyy-MM-dd hh:mm:ss");
            httpAxios.getreportData(this.params).then( data => {
//                   NProgress.done();
                     if(data && data.data && data.data.data){
                         if(data.data != null && data.data != "" ){
                             if(data.data.data != null && data.data.data != "" && data.data.data.length >0){
                                 var ddd  = data.data.data;
//                                 console.log(ddd);
								 try {
                                    for(let d = 0;d < ddd.length;d++){
                                     MydataAll.xAxis[0].data.push(ddd[d].time);
                                     MydataAll.series[0].data.push(ddd[d].value0.toFixed(2));
                                     MydataAll.series[1].data.push(ddd[d].value1.toFixed(2));
                                  }
								 }catch (e){
								    console.log("土壤温湿度值空值");
								 }
                                 this.myChart.setOption(MydataAll);
                                 this.loading = false;
//                                 NProgress.done();
							 }else{
                                 this.loading = false;
                                 this.$message({
                                     message: "没有数据，请重新选择设备或者时间段",
                                     type: 'error'
                                 });
							 }
                         }else{
                             this.loading = false;
                             this.$message({
                                 message: "没有数据，请重新选择设备或者时间段",
                                 type: 'error'
                             });
                         }
					 }else{
                         this.loading = false;
                         this.$message({
                             message: "没有数据，请重新选择设备或者时间段",
                             type: 'error'
                         })
					 }
                }
            ).catch(function (response) {
                console.log(response);
                this.loading = false;
                this.$message({
                    message: "没有数据，请重新选择时间段",
                    type: 'error'
                });
            });


        },

        methods: {
            today(){
                this.loading = true;
//            console.log(">>>>>>>>>>today clicked");
               var t =  this.getBeforTimeANDcurrentTimeStamp(1);
                this.params.begin = t.BeforTimeStamp;
                this.params.end = t.currentTimeStamp;
                this.dataAll.title.subtext = new Date(this.params.begin).Format("yyyy-MM-dd hh:mm:ss") + " 至 "+new Date(this.params.end).Format("yyyy-MM-dd hh:mm:ss");
                this.getData();
			},
            day7(){
                this.loading = true;
//                console.log(">>>>>>>>>>day7 clicked");
                var t =  this.getBeforTimeANDcurrentTimeStamp(7);
                this.params.begin = t.BeforTimeStamp;
                this.params.end = t.currentTimeStamp;
                this.dataAll.title.subtext = new Date(this.params.begin).Format("yyyy-MM-dd hh:mm:ss") + " 至 "+new Date(this.params.end).Format("yyyy-MM-dd hh:mm:ss");
                this.getData();
			},
            day30(){
                this.loading = true;
//                console.log(">>>>>>>>>>day30 clicked");
                var t =  this.getBeforTimeANDcurrentTimeStamp(30);
                this.params.begin = t.BeforTimeStamp;
                this.params.end = t.currentTimeStamp;
                this.dataAll.title.subtext = new Date(this.params.begin).Format("yyyy-MM-dd hh:mm:ss") + " 至 "+new Date(this.params.end).Format("yyyy-MM-dd hh:mm:ss");
                this.getData();
            },
			fiindButton(){
//                console.log(">>>>>>>>>>v1 "+new Date(this.value1).getTime());
//                console.log(">>>>>>>>>>v2 "+new Date(this.value2).getTime());
				if(this.value1 === this.value2){
                    this.$message({
                        message: "请选择时间段",
                        type: 'error'
                    });
                    return;
				}
				var b = new Date(this.value1).getTime();
				var e = new Date(this.value2).getTime();
                var f = this.endTimeMoreStartime(b,e);
                if(f === -1){
                    this.$message({
                        message: "开始时间必须小于结束时间",
                        type: 'error'
                    });
                    return;
				}
                this.loading = true;
                this.params.begin = b;
                this.params.end = e;
                this.dataAll.title.subtext = new Date(this.params.begin).Format("yyyy-MM-dd hh:mm:ss") + " 至 "+new Date(this.params.end).Format("yyyy-MM-dd hh:mm:ss");
                this.getData();

            },
			getBeforTimeANDcurrentTimeStamp(beforeday){
			    var adayTimeStamp = 1*24*60*60*1000;//一天的毫秒数
				var currentTimeStamp = new Date().getTime();//当前的毫秒数
				var BeforTimeStamp = currentTimeStamp - adayTimeStamp * beforeday;
				return  {
				    currentTimeStamp:currentTimeStamp,
                    BeforTimeStamp:BeforTimeStamp,
				};
			},
			//判断时间结束不能小于开始  开始小于结束返回1，否则返回-1
			endTimeMoreStartime(statrt,end){
			    if(statrt < end){return 1;}
			    return -1;
			},
			//清空数据
			clearDATA(){
                this.dataAll.xAxis[0].data = [];
                this.dataAll.series[0].data = [];
                this.dataAll.series[1].data = [];
			},
			//调用数据
			getData(){
                this.dataAll.title.subtext = new Date(this.params.begin).Format("yyyy-MM-dd hh:mm:ss") + " 至 "+new Date(this.params.end).Format("yyyy-MM-dd hh:mm:ss");
                httpAxios.getreportData(this.params).then( data => {
//                   NProgress.done();
                        if(data && data.data && data.data.data){
                            if(data.data != null && data.data != "" ){
                                if(data.data.data != null && data.data.data != "" && data.data.data.length >0){
                                    var ddd  = data.data.data;
                                    this.clearDATA();//每次绘制清空数据
                                    try {
                                      for(let d = 0;d < ddd.length;d++){
                                        this.dataAll.xAxis[0].data.push(ddd[d].time);
                                        this.dataAll.series[0].data.push(ddd[d].value0.toFixed(2));
                                        this.dataAll.series[1].data.push(ddd[d].value1.toFixed(2));
                                      }
                                    }catch (e){
                                        console.log("土壤温湿度值空值");
                                    }
                                    this.myChart.setOption(this.dataAll);
                                    this.loading = false;
//                                 NProgress.done();
                                }else{
                                    this.loading = false;
                                    this.clearDATA();//每次绘制清空数据
                                    this.myChart.setOption(this.dataAll);
                                    this.$message({
                                        message: "没有数据，请重新选择设备或者时间段",
                                        type: 'error'
                                    });
                                }
                            }else{
                                this.loading = false;
                                this.clearDATA();//每次绘制清空数据
                                this.myChart.setOption(this.dataAll);
                                this.$message({
                                    message: "没有数据，请重新选择设备或者时间段",
                                    type: 'error'
                                });
                            }
                        }else{
                            this.loading = false;
                            this.clearDATA();//每次绘制清空数据
                            this.myChart.setOption(this.dataAll);
                            this.$message({
                                message: "没有数据，请重新选择设备或者时间段",
                                type: 'error'
                            })
                        }
                    }
                ).catch(function (response) {
                    this.loading = false;
                    console.log(response);
                    this.$message({
                        message: "网络错误",
                        type: 'error'
                    });
                });

            },

		}
    }

</script>

<style scoped>
	.chart-container {
		width: 100%;
		float: left;
	}
	.el-col {
		padding: 30px 20px;
	}
	.pickTime_report{
		display: inline-block;
	}
	.pickTime_report_leftMargin{
		margin-left: 13%;
	}
</style>