﻿//加
export function accAdd(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (accMul(a, e) + accMul(b, e)) / e;
}
//减
export function accSub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (accMul(a, e) - accMul(b, e)) / e;
}
//乘
export function accMul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//除
export function accDiv(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), accMul(c / d, Math.pow(10, f - e));
}
// 深拷贝
export function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                result[key] = deepCopy(obj[key]); //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
// 每三个数字用逗号隔开
export function format(s, n) { 
    n = n > 0 && n <= 20 ? n : 2; 
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
    var t = ""; 
    for (var i = 0; i < l.length; i++) { 
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
    } 
    return t.split("").reverse().join("") + "." + r; 
    }


