/**
 * Created by hxsd on 2017/6/27.
 */

function load(m) {
    m=m||'home';
    router(m,$('#tabinner'));
}

//初始加载home模块
load('home');


$(function () {
    //home
    $('#m1').click(function () {
        $('#nav').children('li').removeClass();
        $(this).addClass('active');
        load('home');
        console.log('home')
    });
    //songlist
    $('#m2').click(function () {
        $('#nav').children('li').removeClass();
        $(this).addClass('active');
        load('songlist');
        console.log('songlist')
    });
    //other
    $('#m3').click(function () {
        $('#nav').children('li').removeClass();
        $(this).addClass('active');
        load('other');
        console.log('other')
    });
    $('#m4').click(function () {
        $('#nav').children('li').removeClass();
        $(this).addClass('active');
        load('hotsinger');
        console.log('hotsinger')
    })














})