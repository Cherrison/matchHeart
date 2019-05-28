const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showTips: !1,
    binner: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558967529539&di=3daebd15ead106e35d8a40da7c3b9145&imgtype=0&src=http%3A%2F%2Fpic.downcc.com%2Fupload%2F2017-10%2F20171024143755542640.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558967529539&di=1c57cec0892cc49afffabc0c2db18baa&imgtype=0&src=http%3A%2F%2Fpic.downcc.com%2Fupload%2F2018-11%2F2018117175846653750.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558967529539&di=3daebd15ead106e35d8a40da7c3b9145&imgtype=0&src=http%3A%2F%2Fpic.downcc.com%2Fupload%2F2017-10%2F20171024143755542640.jpg"
    ]
  },
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })
  },

  getUserInfo: function(e) {
    console.log("button",e.detail.userInfo)
    if (e.detail.userInfo) {
      var that = this
      app.getUserInfo(function(usercb) {
        that.setData({
          userinfo: usercb
        })
        console.log("yes:",that.data.userinfo)
      })
      wx.switchTab({
        url: '/pages/home/home'
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '获取授权才能更好的体验小程序的功能哦!',
      })
    }
  },

  onShareAppMessage: function() {
    return {
      title: "这里是你心灵的港湾",
      path: "/pages/start/start"
    };
  }
});