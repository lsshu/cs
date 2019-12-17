import data from './data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options1: data,
    value1: [],
    options2: [
      {
        value: 'beijing',
        label: '北京',
        isLeaf: false,
      },
      {
        value: 'hangzhou',
        label: '杭州',
        isLeaf: false,
      },
    ],
    value2: [],
    value4:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onOpen1() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    this.setData({ title1: e.detail.options.map((n) => n.label).join('/') })
    console.log('onChange1', e.detail)
  },
  onOpen2() {
    this.setData({ visible2: true })
  },
  onClose2() {
    this.setData({ visible2: false })
  },
  onChange2(e) {
    console.log('onChange2', e.detail)
    this.setData({ value2: e.detail.value, title2: e.detail.done && e.detail.options.map((n) => n.label).join('/') })
  },
  onLoadOptions(e) {
    console.log('onLoadOptions', e.detail)
    const { value } = e.detail
    const options2 = [...this.data.options2]

    wx.showLoading({ mask: true })

    setTimeout(() => {
      if (value[value.length - 1] === 'beijing') {
        options2.forEach((n) => {
          if (n.value === 'beijing') {
            n.children = [
              {
                value: 'baidu',
                label: '百度'
              },
              {
                value: 'sina',
                label: '新浪'
              },
            ]
          }
        })
      } else if (value[value.length - 1] === 'hangzhou') {
        options2.forEach((n) => {
          if (n.value === 'hangzhou') {
            n.children = [
              {
                value: 'ali',
                label: '阿里巴巴'
              },
              {
                value: '163',
                label: '网易'
              },
            ]
          }
        })
      }

      wx.hideLoading()

      this.setData({ value2: value, options2 })
    }, 1000)
  },

  
  onChange(field, e) {
    this.setData({
      [field]: e.detail.value
    })

    console.log('radio发生change事件，携带value值为：', e.detail)
  },
  onChange4(e) {
    this.onChange('value4', e)
  },
})