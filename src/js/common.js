/**
 * Created by msc on 2017/2/28.
 */
 /**
 * 首页服务点击
 */
 
$(document).ready(function(){
    $('.service .left .item').on('click',function(){
		var index = $(this).index();
		$('.service .left .item').removeClass('act').eq(index).addClass('act');
		$('.service .right .right-item').addClass('hide').eq(index).removeClass('hide');
	})
    $(window).on('scroll',function(){
        var scrollTop = $(this).scrollTop();
        //console.log(scrollTop);
        if(scrollTop>300){
            $('.backtop').fadeIn(300);
        }else{
            $('.backtop').fadeOut(300);
        }
    })
    $('.backtop').on('click',function(){
        $("html,body").animate({scrollTop: '0px'},800)
    })
})
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}