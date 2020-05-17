import Vue from 'vue'
import Vuex from 'vuex'
import tim from '../commen/tim/tim'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		isLogin: false,
		isSDKReady: false ,// TIM SDK 是否 ready
		
		conversationActive:{},	//聊天进行中的会话
		toUserId:'',			//聊天对象id
		conversationList:[],		//会话列表
		currentMessageList:[],			//消息列表
		
		
	},
    mutations: {
		//更新登录状态
		toggleIsLogin(state, isLogin) {
		  state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
		  state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//退出登录重置状态
		reset(state) {
			state.isLogin = false
			state.isSDKReady = false
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state,toUserId){
			state.conversationActive.conversationID = 'C2C'+toUserId
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state,conversationItem){
			state.conversationActive = Object.assign({}, conversationItem);
			state.toUserId = conversationItem.userProfile.userID
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state,newConversationList){
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
		  // 还没当前会话，则跳过
		  if (Array.isArray(data)) {
		    // 筛选出当前会话的消息
		    const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
		    state.currentMessageList = [...state.currentMessageList, ...result]
		  } else if (data.conversationID === state.conversationActive.conversationID) {
		    state.currentMessageList = [...state.currentMessageList, data]
		  }
		  console.log('1111')
		  	console.log( state.currentMessageList)
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state,data){
			console.log(data)
			if(data){
				state.currentMessageList = [...data,...state.currentMessageList]
			}
		},
	},
	
    actions: {
		
	}
})
export default store