<template>
	<view>
		
		<view class="list-box" v-if="conversationList.length>0">
			<view class="item-box" v-for="(item,index) in conversationList" :key="index" @click="toRoom(item)">
					<view class="item-img">
						<img :src="item.user.img" alt="">
					</view>
					<view class="item-text"> 
						<view class="item-user">
							{{item.user.user}}
						</view>
						<view class="item-text-info">
							{{item.conversation.lastMessage.messageForShow}}
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js'
	export default {
		name: 'record',
		data() {
			return {
				conversationList: [],
				userList: userList
			}
		},
		methods: {
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					console.log('0000000000000000000000')
					console.log(conversationList[0])
					
					if (conversationList.length) {
						this.getUserInfo(conversationList)
					}else{
						uni.navigateTo({
							url:'./room'
						})
					}
					
				}).catch((err) => {
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
				});
			},
			//根据消息列表请求聊天对象的用户信息
			getUserInfo(conversationList) {
				
				conversationList.forEach(item => {
					userList.forEach(item1 => {
						if (item.toAccount == item1.userId) {
							let obj = {}
							obj.conversation = item
							obj.user = item1
							this.conversationList.push(JSON.parse(JSON.stringify(obj)))
						}
					})
				})
				console.log(this.conversationList)
			},
			toRoom(item){
				uni.setStorageSync('TIMInfo',JSON.stringify(item))
				uni.navigateTo({
					url:'./room' 
				})
			}

		},
		onLoad() {
			uni.setStorageSync('TIMInfo','')
			this.getConversationList()
		}
	}
</script>

<style scoped lange="scss">
	.list-box{
		width: 94%;
		margin: 0 auto;
	}
	.item-box{
		width: auto;
		height: 100rpx;
		padding: 20rpx;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}
	.item-img{
		float: left;
		margin-top: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.item-img img{
		width: 60rpx;
		height: 60rpx;
	}
	
	.item-text{
		margin-left: 80rpx;
		width:auto ;
		height: 100rpx;
		color: #666;
		font-size: 28rpx;
	}
	.item-user{
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		color: 333;
		font-size: 32rpx;
		
	}
	.item-text-info{
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		color: #666;
		font-szie:24rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
