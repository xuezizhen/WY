/**
 * Created by hxsd on 2017/6/28.
 */

/* var musicControler={
 play:function (music) {
 var state=$('#music_state');
 state.html('歌曲正在加载中');
 $.ajax({
 url:'json/1.mp3',
 success:function (data) {

 state.html('歌曲已经加载成功');
 var audio=$('#audio').get(0);  //将jq对象转换成js对象 get(0)
 audio.src='json/1.mp3';
 audio.play();
 $('#btn').addClass('play');
 $('#btn').click(function () {
 if($(this).hasClass('play')){
 audio.pause();
 $(this).removeClass('play');
 $(this).addClass('pause');
 }else{
 audio.play();
 $(this).removeClass('pause');
 $(this).addClass('play');
 }
 })

 }
 });
 var name=$('#music_name');
    name.html(music.name)
 }
 };*/
var musicControler={
    server: "http://musicapi.duapp.com/api.php",
    play:function (music) {
        var state=$('#music_state');
        state.html('歌曲正在加载中');
        $.ajax({
            url:this.server+"?type=url&id="+music.id,
            success:function (data) {
                console.log(data.data[0].url);
                state.html('歌曲已经加载成功');
                var audio=$('#audio').get(0);  //将jq对象转换成js对象 get(0)
                audio.src=data.data[0].url;
                audio.play();
                $('#btn').addClass('play');
                $('#btn').click(function () {
                    if($(this).hasClass('play')){
                        audio.pause();
                        $(this).removeClass('play');
                        $(this).addClass('pause');
                    }else{
                        audio.play();
                        $(this).removeClass('pause');
                        $(this).addClass('play');
                    }
                })

            }
        });
        var name=$('#music_name');
        name.html(music.name)
    }
};

