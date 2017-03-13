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
})
