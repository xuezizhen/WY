/**
 * Created by hxsd on 2017/6/26.
 */

//获取路径参数

function getUrlParams() {
    var params={};
    var arr=window.location.href.split("?");
    if ( arr.length == 2 ){
        var p=arr[1]
    }else {
        return params
    }

    var parr=p.split("&");

    for (var i=0;i<parr.length;i++){
        var kv=parr[i].split("=");
        params[kv[0]]=kv[1];
    }
    return params
}

//获取模块名
function getM() {
    var url=window.location.href;
    var arr=url.split('#');
    if (arr.length!=2) return false;
    var p=arr[1].split('?');
    return p[0];
}




//加载模块函数
function router(m,container) {
    container=container || $('#share');
    $.ajax({
        url:"views/"+ m +".html",
        success:function (data) {
            container.html(data)
        }
    });
    loadJs(m)
}


//自动加载该模块的js文件
function loadJs(m) {
    $.ajax({
        url:"js/"+ m +".js",
    })
}



$(function () {
    //首次加载--打开欢迎页,2次以上打开是tab模块

    //localStorage.count=undefined

    if(!localStorage.count){ localStorage.count=0 }
    localStorage.count++;

    if ( localStorage.count==1 ) {

        router('hello')
    }else {
        router('tab'); //直接调用函数
        router('audio',$('#global'));
    }
});


