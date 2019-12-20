import data from './data'
const req = require('../../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region_options: data,
    region_value: [],
    serie_options: [],
    serie_value: [],
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
  on_region_open() {
    this.setData({ region_visible: true })
  },
  on_region_close() {
    this.setData({ region_visible: false })
  },
  on_region_change(e) {
    var _this = this;
    var region_title = e.detail.options.map((n) => n.label).join('/');
    _this.setData({ region_title: region_title });
    if (e.detail.done){
      req.post('/region_series', { region_title: region_title }).then((result) => {
        var result = result.data;
        console.log(result)
        _this.setData({ serie_options: result});
        
      });
    }
    console.log('on_region_change', e.detail)
  },


  on_serie_open() {
    this.setData({ serie_visible: true })
  },
  on_serie_close() {
    this.setData({ serie_visible: false })
  },
  on_serie_change(e) {
    console.log('onChange2', e.detail)
    this.setData({ serie_value: e.detail.value, serie_title: e.detail.done && e.detail.options.map((n) => n.label).join('/') })
  },
  onLoadOptions(e) {
    console.log('onLoadOptions', e.detail)
    const { value } = e.detail
    const serie_options = [...this.data.serie_options]

    wx.showLoading({ mask: true })

    setTimeout(() => {
      if (value[value.length - 1] === 'beijing') {
        serie_options.forEach((n) => {
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
        serie_options.forEach((n) => {
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

      this.setData({ serie_value: value, serie_options })
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

  onConfirm(e) {
    const { index, mode } = e.currentTarget.dataset
    this.setValue(e.detail, index, mode)
    console.log(`onConfirm${index}`, e.detail)
  },
  setValue(values, key, mode) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
      // [`displayValue${key}`]: values.displayValue.join(' '),
    })
  },

  onSwitchChange(e) {
    this.setData({ switch: e.detail.value })
  },

})