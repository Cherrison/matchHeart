const app = getApp();
Component({
  data: {
    usrinfo:null
  },
  methods: {
    onLoad(options) {
      let that = this;
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      this.setData({
        usrinfo: app.globalData.userInfo
      })
      wx.hideLoading()
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    tomyExpert(options){
      console.log("查看我的预约状态")
      wx.navigateTo({
        url: '/pages/about/status/status'
      })

    },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  }
})