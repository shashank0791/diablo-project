import request from 'superagent/lib/client';


export default {

  getEvents: (url) => {
    return new Promise((resolve, reject)=>{
      request
        .get(url)
        .end((error, response) => {
          if (error) reject(error);
          resolve(JSON.parse(response.text));
        })
    });
  },

  login: (url, userid, pwd) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userid === 'admin' && pwd === 'password1') {
          resolve(Math.random().toString(36).substring(7));
        } else {
          reject("something went wrong");
        }
      }, 0)
    })
  }

}
