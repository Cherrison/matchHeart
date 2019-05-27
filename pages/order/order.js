// pages/orderTime/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    calendar: [
      { "week": "星期一", "date": "2019-5-27" },
      { "week": "星期二", "date": "2019-5-28" },
      { "week": "星期三", "date": "2019-5-29" },
      { "week": "星期四", "date": "2019-5-30" },
      { "week": "星期五", "date": "2019-5-30" }
    ],
    width: 0,
    currentIndex: 0,
    currentTime: 0,
    can: "可约",
    timeArr: [
      { "time": "8:00-10:00", "status": "可约" },
      { "time": "8:00-10:00", "status": "可约" },
      { "time": "8:00-10:00", "status": "可约" },
      { "time": "8:00-10:00", "status": "可约" },
      { "time": "8:00-10:00", "status": "可约" },
      { "time": "10:00-12:00", "status": "可约" },
      { "time": "10:00-12:00", "status": "可约" },
      { "time": "10:00-12:00", "status": "可约" },
      { "time": "10:00-12:00", "status": "可约" },
      { "time": "10:00-12:00", "status": "可约" },
      { "time": "13:00-15:00", "status": "可约" },
      { "time": "13:00-15:00", "status": "可约" },
      { "time": "13:00-15:00", "status": "可约" },
      { "time": "13:00-15:00", "status": "可约" },
      { "time": "13:00-15:00", "status": "可约" },
      { "time": "15:00-17:00", "status": "可约" },
      { "time": "15:00-17:00", "status": "可约" },
      { "time": "15:00-17:00", "status": "可约" },
      { "time": "15:00-17:00", "status": "可约" },
      { "time": "15:00-17:00", "status": "可约" }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.clearn.site/wxapi/date.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        type: 'getdate'
      },
      success: function (res) {
        console.log(res)
        var week = ['日', '一', '二', '三', '四', '五', '六']
        var tmp = []
        console.log(res.data)
        var len = res.data.length
        for (let i = 0; i < res.data[len - 1][0].length; i++) {
          if (res.data[len - 1][0][i] != 0 && res.data[len - 1][0][i] != 6){
            var t = {}
            t['week'] = ('星期' + week[res.data[len - 1][0][i]])
            t['date'] = (res.data[len - 1][1][i])
            t['num'] = res.data[len - 1][0][i]
            tmp.push(t)
          }
        }
        that.setData({
          calendar:tmp
        })
        tmp['yuyue'] = []
        for(let i = 0; i < 7;i++){//初始化数组
          tmp['yuyue'][i] = [0,0,0,0]
        }
        for (let i = 0; i < len - 1; i++) {         //此处将服务器发送过来的日期装载
          if(res.data[i].date.split(" ")[1] == "08:00:00")
            tmp['yuyue'][res.data[i].week][0]++
          else if (res.data[i].date.split(" ")[1] == "10:00:00")
            tmp['yuyue'][res.data[i].week][1]++
          else if (res.data[i].date.split(" ")[1] == "13:00:00")
            tmp['yuyue'][res.data[i].week][2]++
          else if (res.data[i].date.split(" ")[1] == "15:00:00")
            tmp['yuyue'][res.data[i].week][3]++
        }
        var t = that.data.timeArr
        var tn = tmp[0].num
        for(let i = 0;i < 20;i++){                  //此处更新时段的预约情况
          if (tmp['yuyue'][i % 5 + 1][parseInt(i / 5)] >= 6){
            t[(i % 5 + 6 - 1 * tn) % 5 + parseInt(i / 5)*5].status = "约满"
          }
          else{
            t[(i % 5 + 6 - 1 * tn) % 5 + parseInt(i / 5)*5].status = "可约"
          }
        }
        that.setData({
          timeArr:t
        })
        console.log(t)
        console.log(tmp)
      }
    })
    that.setData({
      width: 186 * parseInt(that.data.calendar.length - 4 <= 7 ? that.data.calendar.length : 7)
    })
  },



  showModal(e) {
    if(this.data.timeArr[this.data.currentTime].status == "约满")
      return
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },



  hideModal(e) {
    console.log(e.currentTarget.dataset.chose)
    var that = this
    if (e.currentTarget.dataset.chose=='confirm'){
      console.log("在线填写信息")
      wx: wx.navigateTo({
        url: '/pages/order/form?&day=' + that.data.currentTime % 4 + '&time='+ parseInt(that.data.currentTime / 4)
      })
    }
   else{
      console.log("现场填写信息")
    }
    this.setData({
      modalName: null
    })
  }, back() {
    wx.navigateBack()
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
  },
  select: function (event) {
    //为上半部分的点击事件
    /*this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
    console.log(event.currentTarget.dataset.date)*/
  },
  selectTime: function (event) {
    //为下半部分的点击事件
    this.setData({
      currentTime: event.currentTarget.dataset.tindex
    })
    console.log(event.currentTarget.dataset.time)
  }
})