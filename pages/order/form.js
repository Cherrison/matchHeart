// pages/order/form.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:"",
    time:"",
    teacher:"宋秀",
    info:{},
  },
  back() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data)
    this.setData({
      day:options.day,
      time:options.time
    })
  },

  submit:function(e){
    var that = this

    console.log(app.globalData.userInfo)

    wx.request({
      url: 'https://www.clearn.site/wxapi/date.php',
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type:'send',
        info:JSON.stringify(that.data.info),
        teacher:that.data.teacher,
        day:that.data.day,
        time:that.data.time,
        stuid:app.data.id,
        name:app.data.name
      },
      success:function(res){
        console.log(res)
        if(res.data == 'success')
          wx.showToast({
            title: '预约成功'
          })
        else if(res.data == '已预约')
          wx.showToast({
            title: '已存在预约',
          })
      }
    })
  },

  change:function(e){
    console.log(e.detail.value, e.target.dataset.index)
    var tmp = this.data.info
    tmp[e.target.dataset.index] = e.detail.value
    this.setData({
      info:tmp
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})