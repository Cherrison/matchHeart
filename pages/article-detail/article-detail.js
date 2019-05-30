//pages/index.js

const app = getApp();
Page({
  data: {
    //article将用来存储towxml数据
    article: {},
    themepic:[
      "/images/btn/moon--current.png",
      "/images/btn/sun--default.png"
      ],
    currentTheme:1,
    title:"文章详情页",
    loadProgress: 0
  },
  onLoad: function (options) {
    const _ts = this;
    console.log(options)
    this.loadProgress()
    wx.request({
      url: 'https://www.clearn.site/wxapi/getArticle.php',
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type:'content',
        id:options.articleId
      },
      success:function(res){
        console.log(res)
        let data = app.towxml.toJson(
          res.data[0].content,               // `markdown`或`html`文本内容
          'markdown'              // `markdown`或`html`
        )
        data = app.towxml.initData(data, {
          base: 'https://xxx.com/',    // 需要解析的内容中相对路径的资源`base`地址
          app: _ts                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
        });

        //设置数据
        _ts.setData({
          article: data
        })
      }
    })
  },
  loadProgress() {
    this.setData({
      loadProgress: this.data.loadProgress + 10
    })
    if (this.data.loadProgress < 100) {
      setTimeout(() => {
        this.loadProgress();
      }, 100)
    } else {
      this.setData({
        loadProgress: 0
      })
    }
  },
  changeTheme:function(){
    var themechange="article.theme";
    if(this.data.currentTheme==1){
      this.setData({
        currentTheme: 0,
        [themechange]:'dark'
      })
    }else{
      this.setData({
        currentTheme: 1,
        [themechange]: 'light'
      })
    }
  },
  back() {
    wx.navigateBack()
  },
})
