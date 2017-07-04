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
        console.log(music)
        var $li=$(li);
        $li.find(".music").html(music.name);
        $li.find(".singerlist").html(music.ar[0].name);

        if(isSave(music.id)) {
            $li.find("span").removeClass().addClass('yes')
        }else {  $li.find("span").removeClass().addClass('no') }

        $li.appendTo($musiclist);
        $li.data('music',music).click(function () {

            //console.log($(this.data('music')))
            musicControler.play($(this).data('music'));
        });
        $li.find('span').data('music',music).click(function (e) {
            e.stopPropagation();
            var music=$(this).data('music');
            console.log($(this).data('music').id);
            if ( localStorage.collection ) {
                var list=JSON.parse(localStorage.collection);

                console.log('缓存存在');
                //当前音乐是否被收藏
                if ( isSave(music.id) ) {
                    //修改对象数据并保存到缓存中
                    list[music.id]=undefined;
                    //修改视图中的数据;
                    $(this).removeClass().addClass('no')
                }else {
                    //修改数据对象
                    list[music.id]={ 'name':music.name,"artist":music.ar[0].name,isSave:true };
                    //修改视图数据
                    $(this).removeClass().addClass('yes')
                }
            }
            else {
                localStorage.collection={};
                var list=localStorage.collection;
                list[music.id]={ 'name':music.name,"artist":music.ar[0].name,isSave:true };
                console.log('第一次');
                $(this).removeClass().addClass('yes')
            }
            //更新缓存信息
            localStorage.collection=JSON.stringify(list);



        });


        $li.find('.save').data('music',music).click(function () {


                var music=$(this).data('music');
                var clist=JSON.parse(localStorage.clist);
                music.isSave=true;
                clist[music.id]=music;
                localStorage.clist=JSON.stringify(clist);

        })
    }
});


//歌曲是否被收藏
/*
        localStorage.collection= {
            '123':{ name:'...',artist:'...',isSave:true },
            '456':{ name:'...',artist:'...',isSave:true },
            '789':{ name:'...',artist:'...',isSave:true }
        }
*/
function isSave(id) {
    //判断收藏列表对象是否存在
    if(localStorage.collection){ var list=JSON.parse(localStorage.collection); }
    else { return false; }
    //判断收藏列表对象中是否存在指定音乐id对应的数据
    //在数据中查找isSave  true/false
    if(list[id]&&list[id].isSave) { return true }
    else { return false }
}

