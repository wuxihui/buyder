import http from '@/unilts/http'
import {
    format
} from '@/algo/index'
import {
    accMul,
    accDiv
} from '@/algo/index'
export default {
    namespaced: true,
    state: {
        detailsList: [], //商品主体信息
        imgList: [], //商品图片
        imgBig: "", //第一张大图
        friGhts: "", //中国运费RMB
        chinaMoney: "", //中国运费越南盾钱
        prices: "", //中国商品单价RMB
        priceYueNanDun: "", //中国商品单价默认越南盾钱
        styleLists: "", //商品类型分类
        stylesValue: "", //商品类型的value值
        valueIds: "", //取出value对应的id的值
        quaTayOne: "", //默认数量
        urls: "", //头部input框链接
        IsOrShow: false, //弹框
        endQuatys: "", //变化的数量
        textArr: "", //选中的类型名称
        keyArr: "", //选中的类型编码
        endPrice: "", //变化后的价格越南盾
        chinaEndPrice: "", //变化后的价格的人民币
        bigImageUrl: "", //变化的大图
        isColor: 0, //变化的小图边框颜色
        thousand: false, //控制1688详情页的显示
        defaultPrices: [], //默认价格和起批量
        defaultYueNanDun: [], //默认越南盾钱
        styleKey: "", //选中类型的key值
        sizeMap: {}, //选中商品key值的变化
        batchPriceOne: 0, //1688默认第一个单价
        batchPriceYueNanDun: 0, //1688默认第一个越南盾单价
    },
    mutations: {
        DETAILSLIST(state, list) {
            state.detailsList = list
        }, //商品主体信息
        SETIMGLIST(state, imgs) {
            state.imgList = imgs
        }, //商品圖片
        SETIMGBIG(state, oneImg) {
            state.imgBig = oneImg
        }, //第一张大图
        SETFREIGHTS(state, fights) {
            state.friGhts = fights
        }, //运费
        SETCHINAMONEY(state, money) {
            state.chinaMoney = money
        }, //中国运费越南盾钱
        SETPRICES(state, chinaPrice) {
            state.prices = chinaPrice
        }, //中国商品单价RMB
        SETPRICEYUENANDUN(state, yueNanDuns) {
            state.priceYueNanDun = yueNanDuns
        }, //中国商品单价越南盾钱
        SETSTYLELISTS(state, styles) {
            state.styleLists = styles
        }, //商品类型分类    
        SETSTYLESVALUE(state, value) {
            state.stylesValue = value
        }, //商品类型的value值
        SETVALUEIDS(state, ids) {
            state.valueIds = ids
        }, //取出value对应的id的值
        SETDEFAULTQUATY(state, deFirsts) {
            state.quaTayOne = deFirsts
        }, //默认数量
        SETURLSLIST(state, urlEs) {
            state.urls = urlEs
        }, //头部input框链接
        SETISTANKUANG(state, bounces) {
            state.IsOrShow = bounces
        }, //弹框
        SETENDQUATYS(state, ends) {
            state.endQuatys = ends
        }, //变化的数量
        SETKEYARR(state, keys) {
            state.keyArr = keys
        }, //选中的类型编码
        SETTEXTARR(state, texts) {
            state.textArr = texts
        }, //选中的类型名称
        SETENDPRICES(state, prices) {
            state.endPrice = prices
        }, //变化后的价格越南盾
        SETCHINAENDPRICE(state, rmbPrices) {
            state.chinaEndPrice = rmbPrices
        }, //变化后的价格的人民币
        SETBIGIMAGGEURL(state, img) {
            state.bigImageUrl = img;
        }, //变化的大图
        SETISCOLOR(state, colors) {
            state.isColor = colors
        }, //变化的小图边框颜色
        SETTHOUSAND(state, six) {
            state.thousand = six
        }, //控制1688详情页的显示
        SETBATCHPRICES(state, batch) {
            state.defaultPrices = batch
        }, //默认价格和起批量
        SETDEFAULTYUENANDUN(state, nam) {
            state.defaultYueNanDun = nam
        }, //默认越南盾钱
        SETSTYLEKEY(state, key) {
            state.styleKey = key
        }, //1688选中类型的key值
        SETSIZEMAP(state, maps) {
            state.sizeMap = maps
        }, //选中商品key值的变化集合
        SETBATCHPRICEONE(state, prices) {
            state.batchPriceOne = prices
        }, //1688默认RMB第一个单价
        SETPRICESYUENANDUN(state, dongs) {
            state.batchPriceYueNanDun = dongs
        }, //1688默认第一个越南盾单价
    },
    actions: {
        //获取商品信息
        getDetailsList({
            commit
        }, payLoad) {
            http.get('/api/BuyChina/GetGoodsInfo?', {
                params: {
                    URL: payLoad.URL
                }
            }).then(res => {
                let resUrls = payLoad.URL
                //汇率
                //淘宝商品分类
                let resStyleEts = null;
                //全部淘宝信息
                let resNew = null;
                //商品类型分类的value值
                let resStyleValue = null;
                //默认数量
                let resDefault = null;
                //取出value对应的id的值
                let resValueId = null;
                //接口的主要数据，主体信息
                let resMain = null;
                //第一张大图
                let resBigImg = null;
                //图片集合
                let resImg = null;
                //默认价格或区间
                let resDefaultPrice = null;
                let resPrice = null;
                //判断是否为区间价，是区间加就处理
                let resIsInterval = [];
                let resIsIntervalOne = null;
                let resIsIntervalTwo = null;
                //越南盾钱的价格拼接
                let resIsIntervalTotal = 0;
                //运费处理
                let resFreight = null;
                let resFrights = []
                let resFrightsTwo = null;
                //运费越南盾钱
                let resYueNanDun = null;
                //控制1688详情页的显示与隐藏
                let resThoUnd = null;
                //1688默认价格和起批量
                let resBatchPrice = [];
                let resBatchPriceOne = 0; //默认RMB第一个单价
                let resBatchPriceYueOne = 0; //默认越南盾第一个单价
                let resBatchYueNanDun = [];
                //变化的规格集合
                let resSizeMap = {};
                let rate = payLoad.rate
                if (resUrls.indexOf("taobao.com") > -1) {
                    resThoUnd = false
                    //全部淘宝信息
                    resNew = JSON.parse(res.Data).data
                    //console.log(resNew)
                    //商品类型分类
                    resStyleEts = resNew.skuBase.props
                    //商品类型分类的value值
                    resStyleValue = resNew.skuBase.skus
                    //取出value对应的id的值
                    resValueId = resNew.apiStack[0].value.skuCore.sku2info
                    //默认数量
                    resDefault = resNew.apiStack[0].value.skuCore.sku2info[0].quantity
                    //console.log(resDefault);
                    //淘宝接口的主要数据，主体信息
                    resMain = resNew.item
                    //第一张大图
                    resBigImg = resMain.images[0]
                    //图片集合
                    resImg = resMain.images
                    //默认价格或区间
                    resDefaultPrice = resNew.apiStack[0].value
                    resPrice = resDefaultPrice.price.price.priceText
                    if (resPrice.indexOf("-") > -1) {
                        resIsInterval = resPrice.split("-")
                        resIsIntervalOne = accMul(resIsInterval[0].trim(), rate).toFixed(2)
                        resIsIntervalTwo = accMul(resIsInterval[1].trim(), rate).toFixed(2)
                        resIsIntervalTotal = format(resIsIntervalOne, 2) + "-" + format(resIsIntervalTwo, 2)
                        resPrice = format(resIsInterval[0].trim(), 2) + "-" + format(resIsInterval[1].trim(), 2)
                    } else {
                        resIsIntervalTotal = format(accMul(resPrice, rate), 2)
                        resPrice = format(resPrice, 2)
                    }
                    //运费处理
                    resFreight = resDefaultPrice.delivery.postage
                    resFrights = resFreight.split(":")
                    if (resFrights[1].indexOf("元") > -1) {
                        resFrightsTwo = resFrights[1].split('元')[0]
                    } else {
                        resFrightsTwo = resFrights[1].trim() === "免运费" ? "0.00" : resFrights[1].trim()
                    }
                    //运费越南盾钱
                    resYueNanDun = format(accMul(resFrightsTwo, rate), 2)
                } else if (resUrls.indexOf("tmall.com") > -1) {
                    resThoUnd = false;
                    //主要商品信息
                    resNew = JSON.parse(res.Data).data
                    //console.log(res.Data);
                    //主体信息
                    resMain = resNew.item
                    //第一张大图
                    resBigImg = resMain.images[0]
                    //图片集合
                    resImg = resMain.images
                    //默认价格或区间 
                    let resPriorityOne = resPriorityOne = resNew.apiStack[0].value.skuCore.sku2info[0].price.priceText;
                    if (resPriorityOne == '' || resPriorityOne == undefined || resPriorityOne == 0) {
                        resPriorityOne = resNew.apiStack[0].value.price.transmitPrice.priceText;
                    }
                    if (resPriorityOne == '' || resPriorityOne == undefined || resPriorityOne == 0) {
                        resPriorityOne = resNew.apiStack[0].value.price.price.priceText;
                    }
                    if (resPriorityOne == '' || resPriorityOne == undefined || resPriorityOne == 0) {
                        resPriorityOne = resNew.apiStack[0].value.price.subPrice.priceText;
                    }
                    if (resPriorityOne == '' || resPriorityOne == undefined || resPriorityOne == 0) {
                        resPriorityOne = resNew.apiStack[0].value.price.newExtraPrices[0].priceText;
                    }
                    if (resPriorityOne == '' || resPriorityOne == undefined || resPriorityOne == 0) {
                        resPriorityOne = resNew.apiStack[0].value.price.extraPrices[0].priceText;
                    }
                    let resPriority = resPriorityOne
                    resPrice = resPriority
                    //判断是否为区间价
                    if (resPrice.indexOf("-") > -1) {
                        resIsInterval = resPrice.split("-")
                        resIsIntervalOne = accMul(resIsInterval[0].trim(), rate).toFixed(2)
                        resIsIntervalTwo = accMul(resIsInterval[1].trim(), rate).toFixed(2)
                        resIsIntervalTotal = format(resIsIntervalOne, 2) + "-" + format(resIsIntervalTwo, 2)
                        resPrice = format(accMul(resIsInterval[0], 1), 2) + "-" + format(accMul(resIsInterval[1], 1), 2)
                    } else {
                        resIsIntervalTotal = format(accMul(resPrice.trim(), rate), 2)
                        resPrice = format(accMul(resPrice.trim(), 1), 2)
                    }
                    //运费处理
                    let resFritOne = resNew.apiStack[0].value.delivery.postage;
                    if (resFritOne.indexOf("快递") > -1) {
                        if (resFritOne.indexOf("快递包邮") > -1) {
                            resFreight = 0;
                            resFrightsTwo = "0.00";
                        } else {
                            resFreight = resFritOne.split(":")[1].trim()
                            resFrightsTwo = resFritOne.split(":")[1].trim()
                        }

                    } else {
                        if (Object.keys(resNew.mockData.delivery).length == 0) {
                            resFreight = 0;
                            resFrightsTwo = "0.00";
                        } else {
                            resFreight = accMul(resNew.mockData.delivery, rate);
                            resFrightsTwo = format(accMul(resNew.mockData.delivery, 1), 2)
                        }
                    }
                    //运费越南盾钱
                    resYueNanDun = format(accMul(resFreight, rate), 2)
                    //商品的类型
                    resStyleEts = resNew.skuBase.props
                    //console.log(resStyleEts);
                    //商品类型的value值
                    resStyleValue = resNew.skuBase.skus
                    //取出value对应的id的值
                    resValueId = resNew.apiStack[0].value.skuCore.sku2info
                    //默认数量
                    resDefault = resNew.apiStack[0].value.skuCore.sku2info[0].quantity
                    //console.log(resDefault);
                } else if (resUrls.indexOf("1688.com") > -1) {
                    resMain = JSON.parse(res.Data)
                    resThoUnd = true
                    //console.log(resMain);
                    //第一张大图
                    resBigImg = resMain.ImageUrl[0]
                    //图片集合
                    resImg = resMain.ImageUrl
                    //运费RMB
                    resFrightsTwo = resMain.CourierFee
                    //运费越南盾
                    resYueNanDun = format(accMul(resFrightsTwo, rate).toFixed(2), 2)
                    //默认价格以及起批量
                    resBatchPrice = resMain.gradient_price;
                    let resBatchYueNanDunOne = "";
                    let resBatchYueNanDunTwo = "";
                    let resBatchYueNanDunSplicing = "";
                    //默认价格越南盾
                    for (let i = 0; i < resBatchPrice.length; i++) {
                        if (resBatchPrice[i].price.indexOf("-") > -1) {
                            resBatchYueNanDunOne = accMul(resBatchPrice[i].price.split("-")[0], rate).toFixed(2);
                            resBatchYueNanDunTwo = accMul(resBatchPrice[i].price.split("-")[1], rate).toFixed(2);
                            resBatchYueNanDunSplicing = resBatchYueNanDunOne + "-" + resBatchYueNanDunTwo;
                            resBatchYueNanDun.push(resBatchYueNanDunSplicing);
                            resBatchPriceOne = resBatchPrice[i].price.split("-")[0];
                            resBatchPriceYueOne = accMul(resBatchPrice[i].price.split("-")[0], rate).toFixed(2);
                        }
                        if (resBatchPrice[i].price.indexOf("-") == -1) {
                            resBatchYueNanDun.push(accMul(resBatchPrice[i].price, rate).toFixed(2));
                            resBatchPriceOne = resBatchPrice[0].price;
                            resBatchPriceYueOne = accMul(resBatchPriceOne, rate).toFixed(2);
                        }
                    }
                    //商品规格  
                    resStyleValue = resMain.skuProps;
                    //默认总销售量
                    resDefault = resMain.totalCanBookCount;
                    //商品规格选择变化的集合
                    resSizeMap = resMain.skuMap;
                    //console.log(resSizeMap);
                }
                commit("DETAILSLIST", resMain) //商品主体信息
                commit("SETIMGLIST", resImg) //商品图片
                commit("SETFREIGHTS", resFrightsTwo) //运费RMB
                commit("SETPRICES", resPrice) //中国商品单价RMB
                commit("SETCHINAMONEY", resYueNanDun) //中国运费越南盾钱
                commit("SETIMGBIG", resBigImg) //第一张大图
                commit("SETPRICEYUENANDUN", resIsIntervalTotal) //中国商品单价越南盾钱
                commit("SETSTYLELISTS", resStyleEts) //商品类型分类
                commit("SETSTYLESVALUE", resStyleValue) //商品类型的value值
                commit("SETVALUEIDS", resValueId) //取出value对应的id的值
                commit("SETDEFAULTQUATY", resDefault) //默认数量
                commit("SETURLSLIST", resUrls) //头部链接
                commit("SETENDQUATYS", "") //清空变化的数量
                commit("SETKEYARR", "") //清空选中的编码
                commit("SETTEXTARR", "") //清空选中的商品名称
                commit("SETENDPRICES", "") //变化后的价格越南盾
                commit("SETCHINAENDPRICE", "") //变化后的价格的人民币
                commit("SETBIGIMAGGEURL", "") //变化的大图
                commit("SETISCOLOR", 0) //变化的小图边框颜色
                commit("SETTHOUSAND", resThoUnd) //控制1688详情页的显示
                commit("SETBATCHPRICES", resBatchPrice) //默认价格和起批量
                commit("SETDEFAULTYUENANDUN", resBatchYueNanDun) //默认越南盾钱
                commit("SETSTYLEKEY", "") //清空1688中类型的key值
                commit("SETSIZEMAP", resSizeMap) //选中商品key值的变化
                commit("SETBATCHPRICEONE", resBatchPriceOne) //1688默认第一个单价
                commit("SETPRICESYUENANDUN", resBatchPriceYueOne) //1688默认第一个越南盾单价
            })
        }

    },
    getters: {

    }

}