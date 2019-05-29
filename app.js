//app.js
const Towxml = require('/towxml/main');     // 引入towxml库
const bgManager = wx.getBackgroundAudioManager(); // 全局的播放器
App({
  data:{
    bgManager: bgManager,
    inner:"",
    src:"",
    isPlay:false,
    id:"3",
    name:"name",

  },
  towxml: new Towxml(),                    //创建towxml对象，供小程序页面使用
  setMusic: function (title, coverImgUrl, singer, epname, src) {
    bgManager.title = title
    bgManager.coverImgUrl = coverImgUrl
    bgManager.singer = singer
    bgManager.src = src
    bgManager.epname = epname
    this.data.src = src
    this.data.isPlay = false
  },
  playMusic: function (e) {
    bgManager.play()
    this.data.isPlay = true
  },
  setTime: function (time) {
    bgManager.seek(time)
  },

  getDuration: function () {
    return bgManager.duration
  },
  getCurrentTime: function () {
    return bgManager.currentTime
  },
  pauseMusic: function (e) {
    bgManager.pause()
    this.data.isPlay = false
  },
  
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          console.log('appjs用户信息', res.userInfo)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  onLaunch: function () {
    // 登录
    var that = this;
    wx.login({
      success: function (e) {
        that.globalData.code = e.code
      }
    })
    wx.getStorage({
      key: 'userIdentity',
      success: function(res) {
        that.globalData.userIdentity=res.data
      }
    })
    
    wx.getSystemInfo({
      success: e => {
        console.log(e);
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        console.log(custom)
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight*0.4;
        console.log(this.globalData.CustomBar);
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: null,
    userIdentity:false,
    HeadUrl: "https://www.cheery.pro",
    bgAudio: wx.getBackgroundAudioManager(),
    bgAudioState: {
      starttime: "00:00",
      endtime: "00:00",
      offset: 0,
      max: 0,
      playState: 0
    },
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  }
})