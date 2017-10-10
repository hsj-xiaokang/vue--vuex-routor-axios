<template>
	<section >

		<div v-show="deviceCardShow ">
			<div>
				<div class="tipColor_in"></div>&nbsp;在线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<div class="tipColor_noIn"></div>&nbsp;离线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<div class="tipColor"></div>&nbsp;未知&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div>
			<el-row :gutter="10" class="ems_row">
				<div class="ems_p5_container">
					<div  class="mes_p5_card" v-for="(item,index) in deviceList" v-bind:class="{ 'mes_p5_card_in': item.status ===0,'mes_p5_card_noIn': item.status === -1}" v-if="index === 0">
						<div class="mes_p5_card_items"  >
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >在离线</span>-->
								<!--<span class="mes_p5_card_item_2" >{{item.status | statusFilter}}</span>-->
								<!--<span class="mes_p5_card_item_3" ><i class=""></i></span>-->
							<!--</div>-->
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >位置</span>-->
								<!--<span class="mes_p5_card_item_2" v-bind:title="item.location">{{item.location | stringFilter}}</span>-->
								<!--<span class="mes_p5_card_item_3" title="编辑位置" v-on:click="openSaveLocation(item.id,item.location)"><i class="el-icon-edit"></i></span>-->
							<!--</div>-->
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >设备</span>-->
								<!--<span class="mes_p5_card_item_2" v-bind:title="item.name">{{item.name | stringFilter}}</span>-->
								<!--<span class="mes_p5_card_item_3" title="编辑设备名字" v-on:click="openSaveDeviceName(item.id,item.name)"><i class="el-icon-edit"></i></span>-->
							<!--</div>-->
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >编号</span>-->
								<!--<span class="mes_p5_card_item_2" v-bind:title="item.id">{{item.id | numberPoint4(0) }}</span>-->
								<!--<span class="mes_p5_card_item_3"><i class=""></i></span>-->
							<!--</div>-->
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >温度</span>-->
								<!--<span class="mes_p5_card_item_2">{{item.value0 | numberPoint4}} ℃</span>-->
								<!--<span class="mes_p5_card_item_3"><i class=""></i></span>-->
							<!--</div>-->
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >湿度</span>-->
								<!--<span class="mes_p5_card_item_2">{{item.value1 | numberPoint4}} %</span>-->
								<!--<span class="mes_p5_card_item_3"><i class=""></i></span>-->
							<!--</div>-->
							<!--<div >-->
								<!--<span class="mes_p5_card_item_1" >时间</span>-->
								<!--<span class="mes_p5_card_item_2">{{item.time}}</span>-->
								<!--<span class="mes_p5_card_item_3"><i class=""></i></span>-->
							<!--</div>-->
							<!--<div></div>-->
							<!--<span class="mes_p5_card_item_delete" title="删除设备" v-on:click="openDeleteDevice(item.id)"><i class="el-icon-delete"></i></span>-->
							<span class="mes_p5_card_item_report" title="查看报表" v-on:click="godeviceReport(item.id,item.name)"><i class="fa fa-bar-chart"></i></span>
						</div>
					</div>
				</div>
			</el-row>
			<el-row>
				<div class="block">
					<el-pagination
							@current-change="handleCurrentChange"
							:current-page="currentPage"
					        :page-size="pageSize"
							layout="total, prev, pager, next"
							:total="total">
					</el-pagination>
				</div>
			</el-row>
		</div>
		<div >
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</section>

</template>

<script>
    /**
	 * 设备列表页面
     * @author heshengjin
     * @date 2017-06-03
     */
    //  import { requestLogin,getMenu } from '../api/api';
    import * as httpAxios from '../api/api';

    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                deviceCardShow:true,
                currentPage: 1,//默认第一页，不断更新当前页
                pageSize:100,//element默认100 const static 不能在程序中改变  程序写死计算前端分页pagesize为偶数，不然会错误
                total:0,
				deviceList:[],//用于展示for
				deviceListSource:[],//用于存储原始数据
//				clickReportTimeDeviceName:""//点击报表查看时候的设备名字
            };
        },

        mounted(){//2.0mounted 相当于1.0的ready;也就是当准备好

            var user = {
                id: 1,
                username: 'admin',
                password: '123456',
                vatar:'../../static/user.png'
            };
            this.$store.getters.getState.user = JSON.stringify(user);
            sessionStorage.setItem('user', JSON.stringify(user));


            var str = this.$router.history.current.path;
            if($.trim("/deviceCard") == $.trim(str)){//jquery去除两边空格
                this.deviceCardShow = true;
            }
            if(str.lastIndexOf("/deviceCard/deviceReport") > -1){
                this.deviceCardShow = false;
            }

            //请求设备列表项
            httpAxios.getDeviceList().then( data => {
//                   NProgress.done();
                    let { statusText, status } = data;
                    if (status !== 200) {
                        this.$message({
                            message: statusText,
                            type: 'error'
                        });
                    } else if(status === 200){
                        if(data && data.data && data.data.data){
                            var d = data.data.data;
                            this.total = d.length;
                            this.deviceListSource = d;
                            if(d.length > this.pageSize){
                                this.deviceList = d.slice(0,this.pageSize);
							}else{
                                this.deviceList = d;
							}
						}else{
                            this.$message({
                                message: "没有设备",
                                type: 'error'
                            });
						}
                    }
                }
			).catch(function (response) {
                console.log(response);
            });


           function  getDList(){
                httpAxios.getDeviceList().then( data => {
//                    NProgress.done();
                        let { statusText, status } = data;
                        if (status !== 200) {
                            this.$message({
                                message: statusText,
                                type: 'error'
                            });
                        } else if(status === 200){
                            if(data && data.data && data.data.data){
                                var d = data.data.data;
                                this.total = d.length;
                                this.deviceListSource = d;
                                if(d.length > this.pageSize){
                                    this.handleCurrentChange(this.currentPage);
                                }else{
                                    this.currentPage = 1;
                                    this.deviceList = d;
                                }
                            }else{
                                this.$message({
                                    message: "没有设备",
                                    type: 'error'
                                });
                            }
                        }
                    }
                ).catch(function (response) {
                    console.log(response);
                });
            }
            //定时的刷新设备   定时执行
            setInterval(getDList,1000 * 40);//1000*60 = 1秒钟 * 60 = 1分钟

        },


        updated(){
            var str = this.$router.history.current.path;
            if($.trim("/deviceCard") == $.trim(str)){//jquery去除两边空格
                this.deviceCardShow = true;
			}
            if(str.lastIndexOf("/deviceCard/deviceReport") > -1){
                this.deviceCardShow = false;
			}
            },

        destroyed() {
            console.group('destroyed 销毁完成状态===============》');
//            clearInterval(getDList);
        },

        methods: {
            godeviceReport(deviceId,deviceName){
                if(deviceName === null || deviceName === undefined || deviceName ===""){deviceName = "该设备没有名字"}
                this.$router.push({ path: '/deviceCard/deviceReport/'+deviceId+"/"+deviceName});
			},
            handleCurrentChange(val) {
                //自己算页数  处理删除之后页码少了
                var pageSUM = this.total / this.pageSize;
                pageSUM = Math.floor(pageSUM);
                if(this.total % this.pageSize !== 0){
                     pageSUM += 1;
				}
				console.log(`deviceCard.vue>>>>>>>>>>>总页: ${pageSUM}`);
                if(val > pageSUM){
                    val = pageSUM;
				}
                console.log(`deviceCard.vue>>>>>>>>>>>当前页: ${val}`);
                this.currentPage = val;
                var cp = this.currentPage;
                console.log(`deviceCard.vue>>>>>>>>>>>当前页: `+cp);
                var ps = this.pageSize;
                var cpage = (val-1)*ps;
                this.deviceList = this.deviceListSource.slice(cpage,cpage+ps);
            },

            //请求设备列表项
            getDeviceList(){
                httpAxios.getDeviceList().then( data => {
//                    NProgress.done();
                        let { statusText, status } = data;
                        if (status !== 200) {
                            this.$message({
                                message: statusText,
                                type: 'error'
                            });
                        } else if(status === 200){
                            if(data && data.data && data.data.data){
                                var d = data.data.data;
                                this.total = d.length;
                                this.deviceListSource = d;
                                if(d.length > this.pageSize){
                                    this.handleCurrentChange(this.currentPage);
                                }else{
                                    this.currentPage = 1;
                                    this.deviceList = d;
                                }
                            }else{
                                this.$message({
                                    message: "没有设备",
                                    type: 'error'
                                });
                            }
                        }
                    }
                ).catch(function (response) {
                    console.log(response);
                });
			},


            //修改位置弹框
            openSaveLocation(deviceId,location) {
                this.$prompt('请输入设备位置', '修改设备位置', {
                    inputValue:location,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern:/^[\u4E00-\u9FA5\uF900-\uFA2D\w\-]+$/,
                    inputErrorMessage: '请输入位置,中文英文数字等，文字之间不能够含有空格'
                }).then(({ value }) => {
                    console.log(">>>>deviceId:"+deviceId +" "+value);
                    var params ={
                        id:deviceId,
                        location:value
                    };
                    httpAxios.setLocation(params).then( data => {
//                     NProgress.done();
                        if(data.err === 0){
                            this.$message({
                                type: 'success',
                                message: '修改位置成功 '
                            });
                            this.getDeviceList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            //修改名称弹框
            openSaveDeviceName(deviceId,name) {
                this.$prompt('请输入设备名称', '修改设备名称', {
                    inputValue:name,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern:/^[\u4E00-\u9FA5\uF900-\uFA2D\w\-]+$/,
                    inputErrorMessage: '请输入名称,中文英文数字等，文字之间不能够含有空格'
                }).then(({ value }) => {
                    console.log(">>>>deviceId:"+deviceId +" "+value);
                    var params ={
                        id:deviceId,
                        name:value
                    };
                    httpAxios.setDeviceName(params).then( data => {
//                     NProgress.done();
                        if(data.err === 0){
                            this.$message({
                                type: 'success',
                                message: '修改名称成功 '
                            });
                            this.getDeviceList();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

			//删除设备
			openDeleteDevice(deviceId){
                    this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(">>>>deviceId:"+deviceId );
                        httpAxios.deleteDeviceById(deviceId).then( data => {
//                              NProgress.done();
							    console.log(data);
                                this.$message({
                                    type: 'success',
                                    message: '删除成功 '
                                });
                                this.getDeviceList();
                            }
                        ).catch(function (response) {
                            this.$message({
                                type: 'success',
                                message: '删除失败 '
                            });
                            console.log(response);
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
			},
        }

    }

</script>

<style lang="scss" scoped>
	.ems_row{
		background-color: transparent;
		/*height: 200px;*/
	}
	/*未知*/
	.tipColor{
		display: inline-block;
		width: 10px;
		height: 10px;
		background-color:#a6e1ec ;
	}
	/*在线*/
	.tipColor_in{
		display: inline-block;
		width: 10px;
		height: 10px;
		background-color:#20a0ff ;
	}
	/*离线*/
	.tipColor_noIn{
		display: inline-block;
		width: 10px;
		height: 10px;
		background-color:#c0ccda ;
	}
	.ems_p5_container{
		margin-left: 1%;
		margin-right: 1%;
		margin-bottom: 1%;
		margin-top: 1%;
		/*border: 1px transparent solid;*/
		background-color:transparent;
	}
	/*未知*/
	.mes_p5_card{
		width: 240px;
		height: 158px;
		background-color: #a6e1ec;
		/*background-color: #c0ccda;*/
		border-radius: 5px;
		display: inline-block;
		margin-left: 10px;
		margin-bottom: 20px;
	}
	/*在线*/
	.mes_p5_card_in{
		width: 240px;
		height: 158px;
		background-color: #20a0ff;
		/*background-color: #c0ccda;*/
		border-radius: 5px;
		display: inline-block;
		margin-left: 10px;
		margin-bottom: 20px;
	}
	/*离线*/
	.mes_p5_card_noIn{
		width: 240px;
		height: 158px;
		/*background-color: #20a0ff;*/
		background-color: #c0ccda;
		border-radius: 5px;
		display: inline-block;
		margin-left: 10px;
		margin-bottom: 20px;
	}
	.mes_p5_card_item_1{
		display: inline-block;
		margin-left: 1%;
		width: 20%;
	}
	.mes_p5_card_item_2{
		display: inline-block;
		margin-left: 1%;
		width: 60%;
	}
	.mes_p5_card_item_3{
		display: inline-block;
		margin-left: 1%;
		width: 13%;
		cursor: pointer
	}
	.mes_p5_card_items{
		margin-top: 13px;
		margin-left: 8px;
		position: relative;
	}
	.mes_p5_card_item_delete{
		position:absolute;
		right: 5px;
		cursor: pointer
	}
	.mes_p5_card_item_report{
		position:absolute;
		right: 45px;
		cursor: pointer
	}
</style>

<!--<template>-->
	<!--<div @mouseover="ovv()" @mouseout="outt()">-->
		<!--设备列表-->
	<!--</div>-->

<!--</template>-->

<!--<script>-->
    <!--import { mapGetters } from 'vuex'-->
    <!--import { mapActions } from 'vuex'-->

    <!--export default {-->
        <!--methods:{-->
            <!--ovv:function () {-->
                <!--console.log("ovv");-->
            <!--},-->
            <!--outt:function () {-->
                <!--console.log("outt");-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->