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
  }

}