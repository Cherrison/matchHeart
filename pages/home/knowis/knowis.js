const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isCard: 0,
    showcnt:"0",//已加载的文章数
    articleList: [],
  },

tolower:function(e){
  console.log("上滑")
  this.getData()
},


getData:function(){
  var that = this
  wx.request({
    url: 'https://www.clearn.site/wxapi/getArticle.php',
    method:"POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      type:'title',
      id:that.data.showcnt,
      num:10
    },//此处传入showcnt标志已有的数据，加载已有数据编号后的数据

    success: function (res) {
      //此处处理数据中的tags，将其转换为json
      console.log(res)
      if (res.data == null){
        console.log("没有了...")
        return
      }
      if(res.data=="获取失败")
        return
      var cnt = that.data.showcnt + res.data.length
      that.data.articleList = that.data.articleList.concat(res.data)
      that.setData({
        articleList: that.data.articleList,
        showcnt: cnt
      })
    }
  })
},

  todetail:function(e){
    var articleId = e.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: '/pages/article-detail/article-detail?articleId='+articleId,
    })
  },

  onLoad: function (options) {
    this.getData()
  },

  back() {
    wx.navigateBack()
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
});