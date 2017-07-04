/**
 * Created by hxsd on 2017/6/28.
 */

$("#prev").click(function () {
    router('tab'); //直接调用函数
});
function playList(id,callback) {
    $.ajax({
        //url:"json/playlist.json",
        url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
        success:function (data) {
            callback(data.playlist)
        }
    });
}
//获取专辑的ID
var params=getUrlParams();
playList(params.id,function (data) {
    var $musiclist=$(".musiclist");
    var li=$("#musicItem").html();
    for(var i=0;i<data.tracks.length;i++){
        var music=data.tracks[i];
        var $li=$(li);
        $li.find(".music").html(music.name);
        $li.find(".singerlist").html(music.ar[0].name);
        $li.appendTo($musiclist);
        $li.data('music',music).click(function () {
            //console.log($(this.data('music')))
            musicControler.play($(this).data('music'));
        });
    }
});


