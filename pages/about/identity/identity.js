// pages/info/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  checkSubmit:function(e){
    var userid = e.detail.value;
    wx.showLoading({
      title: '正在验证',
    })

    wx.login({
      success: function (res) {
        console.log(res)
        if(res.code)
        wx.request({
          url: 'https://www.clearn.site/wxapi/wxlogin.php',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            username: userid.username,
            password: userid.password,
            code:res.code
          },
          success: function (res) {
            console.log(res)
            if (res.data.state == true) {
              wx.hideLoading()
              wx.showToast({
                title: '验证成功'
              })
              wx.switchTab({
                url: '/pages/about/home/home',
              })
              wx.setStorage({
                key: 'userIdentity',
                data: true
              })
              wx.setStorage({
                key: 'id',
                data: res.data.id
              })
              app.data.id = res.data.id
              app.globalData.userIdentity = true;
              console.log("验证成功!")
            }
            else {
              wx.hideLoading()
              wx.showToast({
                title: '验证失败',
                icon: "none"
              })
              wx.setStorage({
                key: 'userIdentity',
                data: false
              })
              app.globalData.userIdentity = false;
              console.log("验证失败!")
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  reqInfo() {
    // wx.request({
    //   url: 'http://jwgl.ouc.edu.cn/frame/desk/showLessonScheduleDetail.action',
    //   header: {
    //     "Accept": "text / plain, */*; q=0.01",
    //     "Accept-Encoding": "gzip, deflate",
    //     "Accept-Language": "zh-CN,zh;q=0.9,fr-FR;q=0.8,fr;q=0.7,zh-TW;q=0.6,en;q=0.5",
    //     "Connection": "keep-alive",
    //     "Content-Length": "6",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Cookie": "COMPANY_ID=10122; LOGIN=3137303930303232303330; ID=46777236696250733674773d; PASSWORD=6a503955594a756b424a633d; SCREEN_NAME=392f55786139635741344539562b45726433444b67513d3d; JSESSIONID=80D63B0F5BC2B6B95155F34CA5FA646C.kingo",
    //     "DNT": "1",
    //     "Host": "jwgl.ouc.edu.cn",
    //     "Origin": "http://jwgl.ouc.edu.cn",
    //     "Referer": "http://jwgl.ouc.edu.cn/frame/desk/showLessonSchedule4User.action",
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    //     "X-Requested-With": "XMLHttpRequest"
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     console.log(res.data);
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})