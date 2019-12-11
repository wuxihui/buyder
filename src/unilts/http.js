
import axios from 'axios'
import { Loading, Message } from 'element-ui';
import "@/md5/jQuery.md5";
import { stringify } from 'querystring'
import { ak, sk, CountryCode} from "@/entry/index";

const http = axios.create()
let loading = null;

//http.defaults.baseURL = 'http://webapi.buyder.com/' 
http.defaults.baseURL = 'http://120.79.24.165:8080/'

http.defaults.timeout = 10000
http.interceptors.request.use(function (config) {
	// 加载动画显示
    loading = Loading.service({
      lock: true,
      text: 'Loading',
    });

    // 添加api校验参数
    let tt = Math.round(new Date().getTime() / 1000);
    let params = {
        tt: tt,
        ak: ak,
        sk: $.md5(ak + tt + sk),
        CountryCode: CountryCode
      };

    // 当url已经有参数时： url + & + api检验参数
    config.url = ((config.url.indexOf('=') == -1) ? config.url : config.url + '&') + stringify(params);

    return config;
  }, function (error) {
  	// 加载动画隐藏
  	loading && loading.close();

    // Do something with request error
    return Promise.reject(error);
  });


http.interceptors.response.use(response => {
	// 加载动画隐藏
	loading && loading.close();

    let res = response.data
   if(res.Status === 200) {
       return res;
   } else {
   		// 错误信息
	   	Message({
          type: 'error',
          message: res.Msg
        });
      return false;
   }
}, error => {
	// 加载动画隐藏
	loading && loading.close();

    Message({
          type: 'error',
          message: error.Msg
        });
})

export default http