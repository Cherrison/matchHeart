// pages/testPage/testDetail/testDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:[],
    title:"抑郁自测量",
    select:{},
    score:[],
    current:0,
    result:0,
    show:false
  },

  select:function(e){
    console.log(e)
    this.data.select[e.target.dataset.id] = e.detail.value
    if(e.target.dataset.id == this.data.score.length - 1){
      var len = this.data.score.length
      var num = 0
      for (let i = 0; i < len;i++){
        num = num + 1 * this.data.score[i][this.data.select[i]]
      }
      this.setData({
        result:num,
        show:true
      })
    }
  },

  next:function(e){
    var data = this.data
    if (!data.select[e.target.dataset.id]){
      wx.showToast({
        title: '请先选择',
        icon:'none'
      })
      return
    }
    if(data.current < data.test.length - 1)
    this.setData({
      current:data.current + 1 * 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.clearn.site/wxapi/getTest.php',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type: "gettitle",
        title:"抑郁自测量"
      },
      success: function (res) {
        console.log(res)
        var len = res.data.length
        for(let i = 0;i < len;i++){
          res.data[i][1] = JSON.parse(res.data[i][1])
        }
        var tmp = []
        for(let i = 0;i < len;i++){
          tmp.push(JSON.parse(res.data[i][2]))
        }
        console.log(res)
        that.setData({
          test: res.data,
          score:tmp
        })
      },
      fail: function (res) {
        console.log(res)
      }
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