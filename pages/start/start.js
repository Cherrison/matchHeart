Page({
  data: {
    showTips: !1,
    binner: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558967529539&di=3daebd15ead106e35d8a40da7c3b9145&imgtype=0&src=http%3A%2F%2Fpic.downcc.com%2Fupload%2F2017-10%2F20171024143755542640.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558967529539&di=1c57cec0892cc49afffabc0c2db18baa&imgtype=0&src=http%3A%2F%2Fpic.downcc.com%2Fupload%2F2018-11%2F2018117175846653750.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558967529539&di=3daebd15ead106e35d8a40da7c3b9145&imgtype=0&src=http%3A%2F%2Fpic.downcc.com%2Fupload%2F2017-10%2F20171024143755542640.jpg"
    ]
  },
  onLoad: function () {

  },
  getUserInfo: function (t) {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  onShareAppMessage: function () {
    return {
      title: "这里是你心灵的港湾",
      path: "/pages/start/start"
    };
  }
});