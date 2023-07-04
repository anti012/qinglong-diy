/*
 一亩三分地
 0 8 * * * 1point3acres.js
* */
const $ = new Env('一亩三分地');
const notify = $.isNode() ? require('./sendNotify') : '';

const axios = require('axios')

const signinURL = 'https://api.1point3acres.com/api/users/checkin'

function sign_in(access_token) {
  return axios(signinURL, {
    method: 'POST',
    data: JSON.stringify({
      "qdxq": "kx",
      "todaysay": "开心，"
    }), 
    headers: {
      'Authorization': access_token,
      'accept': '*/*', 
      'content-type': 'application/json', 
      'device-id': '6baee3b0-b59d-11ed-8b81-edd193580df9', 
      'user-agent': '%E4%B8%80%E4%BA%A9%E4%B8%89%E5%88%86%E5%9C%B0/2 CFNetwork/1404.0.5 Darwin/22.3.0', 
      'accept-language': 'zh-CN,zh-Hans;q=0.9', 
    }
  })
    .then(d => d.data)
    .then(data => {
        return data.msg
    })
    .catch(e => {
      console.error(e.message)
    })
}


!(async () => {
  const access_token = process.env.Onepoint3acresAccessToken || ''

  try {
      const sendMessage = await sign_in(access_token)
      console.log(sendMessage)
  } catch (e) {
      console.log(e)
  }

})()


function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }
