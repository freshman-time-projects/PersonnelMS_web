import React, { Component } from 'react';


import axios from 'axios'

const config = {
  // api: 'cn3647.88ip.org:81',
  api: '192.168.167.179:8081/iot-admin',
  version: 1.1,
  debug: 1,
}
const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  if (str.length === 0) {
    return '';
  }
  return '?' + str.join("&");
}

// 通过静态方法获得请求源
class NetWork extends Component {
  static _fetch(url, options) {
    return fetch(url, options);
  }
}

// 
const _send = (url, options) => {
  this._ok = () => {
  };
  this._er = () => {
  };
  this._cat = null;
  this._catch = () => {
  };
  this._finish = () => { };
  console.log('-----', options)
  NetWork._fetch(url, options)
    .then((response) => {
      console.log('response: ', response);
      return response.json();
    })
    .then((res) => {
      try {
        if (config.debug) {
          console.log('data: ', res, res.data, res.errmsg, res.errno);
        }
        if (res.errno != 0) {
          this._er(res.errno, res.errmsg, res.data || null);
        } else {
          this._ok(res.data, res.errmsg, res.errno);
        }
        this._finish()
      } catch (e) {
        this._catch(e);
      }
    }).then(() => {
      try {
        console.log('net work finish -----')
        
      } catch (e) {
        this._catch(e);
      }
    })
    .catch((error) => {
      console.log(error)
      if (this._cat) {
        this._cat(error);
      } else {
        Alert.alert('请检查网络')
      }
    });
  // 返回success
  this.ok = (cbok) => {
    if (cbok !== null) {
      this._ok = cbok;
    }
    return this;
  }
  // 返回fail
  this.er = (cber) => {
    if (cber !== null) {
      this._er = cber;
    }
    return this;
  }
  // 程序错误
  this.cat = (cbcat) => {
    if (cbcat !== null) {
      this._cat = cbcat;
    }
    return this;
  }
  // 逻辑错误
  this.catch = (cbcat) => {
    if (cbcat !== null) {
      this._catch = cbcat;
    }
    return this;
  }
  // 完成
  this.finish = (cbfin) => {
    if (cbfin !== null) {
      this._finish = cbfin;
    }
    return this;
  }
  return this;
}


// core ajax handler
export default (url, data = null, method = 'GET', options = {}) => {
    axios
      .post('/ac/login',values)
      .then((response) => {
        console.log("res",response);
        if (response.data.code === 0) {
          Feedback.toast.success("登录成功");
        } else {
          Feedback.toast.success("登录shibai");
        
        }
        console.log("login--:", response)
      })
      .catch((error) => {
        console.log(error);
      });
  // if (data === null) {
  //   data = {}
  // }
  // var defaultOptions = {
  //   method: method,
  //   headers: {
  //     'Accept': 'application/json'
  //   }
  // };

  // var options = Object.assign({}, defaultOptions, options);
  // var httpMethod = options['method'].toLocaleUpperCase();
  // var full_url = '';
  // if (httpMethod === 'GET') {
  //   full_url = config.api + url + serialize(data);
  // } else {
  //   // handle some to 'POST'
  //   full_url = config.api + url;
  // }
  // if (config.debug) {
  //   console.log('HTTP has finished %c' + httpMethod + ':  %chttp://' + full_url, 'color:red;', 'color:blue;');
  // }
  // options.url = full_url;
  // if (options['method'] != 'GET' && Object.keys(data).length > 0) {
  //   let formData = new FormData();
  //   for (let k in data) {
  //     formData.append(k, data[k]);
  //   }
  //   options.body = formData;
  // }

  // // todo support for https
  // return _send('http://' + options.url, options)
}