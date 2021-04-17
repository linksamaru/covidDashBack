/*
* @author: Marcos Martin Davila
*/
let req     = require('axios');
let http    = require('http');

let routes = require(SERVER_ROOT_PATH + '/config/routes');

class request{
    constructor(){ }

    async buildUpOptions(type,subtype,opt){
        //console.log(COLORS.FgGreen,opt,COLORS.Reset);
        if(Object.keys(opt).length > 0){
            if(opt.hasOwnProperty('queryPath')){
                let keys = Object.keys(opt.queryPath); opt.path = routes[type][subtype].path;
                keys.forEach((i) => { console.log(opt.path);
                    opt.path = opt.path.replace(new RegExp(':' + i, 'i'), opt.queryPath[i]);
                }); delete opt.queryPath;
            }
        } if(routes[type][subtype].hasOwnProperty('body')){ opt.json = true;
            opt.data = {}; routes[type][subtype].body.forEach((o) => { opt.data[o] = opt.body[o.toLowerCase()]; });
            console.log('data',opt.data);
        } if(routes[type][subtype].hasOwnProperty('filters') && opt.hasOwnProperty('params')){
            let keys = Object.keys(opt.params);
            keys.forEach((k) => {opt.params[k.toLowerCase()] = opt.params[k]; delete opt.params[k]; });
            routes[type][subtype].filters.forEach((o) => {
                if(opt.params[o] !== undefined){
                    if(isNaN(Number(opt.params[o]))){
                        if(o === 'keyword') opt.params[o] = '%' + opt.params[o] + '%';
                    } else opt.params[o] = Number(opt.params[o]);
                } });
        } return opt;
    }

    async doRequest(type,subtype,options){
        return new Promise(async (resolve,reject) => {
            try { options = await this.buildUpOptions(type,subtype,options);
                  console.log(COLORS.FgMagenta,'request options',JSON.stringify(options),COLORS.Reset);
                  let url = routes[type].base + ((options.path)? options.path: routes[type][subtype].path); console.log(url);
                  req[routes[type][subtype].action](url, options)
                      .then((res) => {
                          if(res.status / 100 >= 4){
                              console.error(type,url,res.status,http.STATUS_CODES[res.status]);
                              resolve({code: res.status, msg: res.data});
                          } else { if(type === 'HEAD') { resolve({code:res.status,headers:res.headers}); }
                          else { if(res.status === 404){ console.log(routes[type][subtype].action,url,options); }
                              resolve({code: res.status, msg:(res.data.hasOwnProperty('content'))?res.data.content: res.data}); } }
                      })
                      .catch((err) => {
                          if(err.response.status / 100 >= 4){
                              console.error(type,url,err.response.status,http.STATUS_CODES[err.response.status]);
                              console.error('request options',JSON.stringify(options));
                              resolve({code: err.response.status, msg: err.response.data}); }
                          else { console.error(err.response); reject({code: 500, msg: routes[type][subtype].action + ' ' + url + ' \n' + err.response.data}); }
                      });
            } catch (e) { console.error('Error in lib.request.doRequest',e); reject({code:500,msg:e}); }
        });
    }
} module.exports = request;
