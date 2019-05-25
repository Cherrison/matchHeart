const app = getApp();
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    headurl: getApp().globalData.HeadUrl,
    condition:'all',
    category:[
      'all',
      '抑郁',
      '自卑',
      '情感'
    ],
    datalist: [{
      name: "牟宏玮",
      tid: 19001,
      occu_info: {
        entryTime: 2,
        option: "国家二级心理咨询师"
      },
      service_type: "面询/远程",
      tags: "个人成长，抑郁，情感困惑，人生意义探索",
      pic_url: "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3761627809,1796684792&fm=85&s=E8F235C542D311D8443815A003007012",
      category:'抑郁'
    }, {
      name: "迟昊阳",
      tid: 19002,
      occu_info: {
        entryTime: 2,
        option: "国家一级心理咨询师"
      },
      service_type: "面询/远程",
      tags: "真诚、包容、启发",
        pic_url: "https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=409133432,2699647270&fm=202&mola=new&crop=v1",
      category: '自卑'
      }, {
        name: "宋秀",
        tid: 19003,
        occu_info: {
          entryTime: 3,
          option: "国家二级心理咨询师"
        },
        service_type: "面询/远程",
        tags: "包容、启发、引导、陪伴",
        pic_url:"https://t12.baidu.com/it/u=2690865287,281971506&fm=76",
        category: '情感'
      }
    ],
    scrollLeft: 0
  },
  methods: {
    tabSelect(e) {
      console.log('切换顶部导航栏到: '+e.currentTarget.dataset.id)
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
        var chgcondition = this.data.category[e.currentTarget.dataset.id];
        this.setData({
          condition: chgcondition
        })
    }
  },
  
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})