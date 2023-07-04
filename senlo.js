/*
 senlo
 0 12 * * * senlo.js
* */

const axios = require('axios')

const signinURL = 'https://www.senlo.co/wp-content/themes/modown/action/user.php'

function sign_in(access_token) {
  return axios(signinURL, {
    method: 'POST',
    data: 'action=user.checkin',
    headers: {
      'cookie': 'PHPSESSID=' + access_token,
      'accept': "application/json, text/javascript, */*; q=0.01",
      'accept-language': "zh-CN,zh;q=0.9",
      'content-type': "application/x-www-form-urlencoded; charset=UTF-8",
      'sec-ch-ua': "\"Chromium\";v=\"103\", \".Not/A)Brand\";v=\"99\"",
      'sec-ch-ua-mobile': "?0",
      'sec-ch-ua-platform': "\"Windows\"",
      'sec-fetch-dest': "empty",
      'sec-fetch-mode': "cors",
      'sec-fetch-site': "same-origin",
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      'x-requested-with': "XMLHttpRequest",
      'origin': 'https://www.senlo.co',
      'referer': 'https://www.senlo.co/user-2',
      'referrer-Policy': "strict-origin-when-cross-origin"
    }
  })
    .then(d => d.data)
    .then(data => {
      if (data.error != 0) {
        console.error(data)
        return '签到失败'
      }
      return '签到成功'
    })
    .catch(e => {
      console.error(e.message)
      return '签到失败'
    })
}


!(async () => {
  const access_token = process.env.senloAccessToken || ''

  try {
      const sendMessage = await sign_in(access_token)
      console.log(sendMessage)
  } catch (e) {
      console.log(e)
  }

})()
