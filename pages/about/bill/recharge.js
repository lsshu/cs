import { $wuxForm } from '../../../dist/index';
const req = require('../../../utils/request.js');
Page({
  data: {
    items: [
      { value: '5', label: '5元' },
      { value: '10', label: '10元' },
      { value: '20', label: '20元' },
      { value: '50', label: '50元' },
      { value: '100', label: '100元' },
    ],
    value: '5',
    checked: false,
    loading: false,
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
    })
  },
  onSubmit(e) {
    this.setData({ loading: true });
    var sessionOpenid = wx.getStorageSync('sessionOpenid') || {};
    try {
      if (sessionOpenid.data) {
        var total_fee = this.data.value;
        req.post('/payment/recharge', { openid: sessionOpenid.data.openid, total_fee: total_fee }).then((result) => {
          var result = result.data.data;

          result.success = this.PaymentSuccess,
            result.fail = this.PaymentFail,
            wx.requestPayment(result);
        });
      }
    } catch (e) {

    }
  },
  PaymentSuccess(res) {
    console.log(res);
    this.setData({ loading: false });
  },
  PaymentFail(res) {
    console.log(res);
    this.setData({ loading: false });
  }
})