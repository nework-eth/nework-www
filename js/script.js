$(function() {

	//  锚点跳转
	$(document).on('click', 'header a', function() {
		var anchor = $(this).attr('href').substr(1);
		var headerHeight = $('header').height();
		var offsetTop = $('#' + anchor).offset().top;
		// $('header a[href="#'+anchor+'"]').addClass('active').siblings('a').removeClass('active');
		$('header .nav-panel').hide();
		$('html, body').animate({
			scrollTop: offsetTop - headerHeight
		}, 1000);
		return false;
	});

	//	菜单
	$('header .nav-btn').on('click', function() {
		$('header .nav-panel').show();
	});
	$('header .close').on('click', function() {
		$('header .nav-panel').hide();
	});

	//	设置首屏内容区高度
	function setFirstScene() {
		var height = $(window).height() > 680 ? $(window).height() : 680;
		$('#sect1').css('height', height + 'px');
		//	设置粒子元素
		$('#sect1').particleground({
			dotColor: '#202754',
			lineColor: '#202754'
		});
	}
	setFirstScene();
	$(window).on('resize', setFirstScene);

	function setSection5(content) {
		var length = $(content).find('li').length;
		var width = $(content).find('li').width();
		$(content).find('ul').css('width', width * length + 'px');
		$(content).mCustomScrollbar({
			axis: 'x'
		});
	}

	function setSection6() {
		var swiperItem = $('#sect6-mobile li');
		var swiperWidth = (swiperItem.outerWidth() + 15) * swiperItem.length;
		$('#sect6-mobile ul').css('width', swiperWidth + 'px');
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			slidesPerView: 'auto',
			paginationClickable: true
		});
	}

	//	滚动监听，添加动画
	//	动画元素
	var animateEles = $('.sect h2, .sect h3, .sect li img, .sect li h4, #sect1 p, #sect1 a, #sect2 .pic, #sect2 p, #sect3 p, #sect4 li,#sect4 p, #sect5-pc .content, #sect5-mobile li, #sect6-pc p, #sect6-mobile p, #sect7 p');

	function animate() {
		var scrollTop = $(window).scrollTop();
		animateEles.each(function(i, ele) {
			if ((scrollTop + $(window).height()) > ($(ele).offset().top + $(ele).height())) {
				$(ele).addClass('animate');
			}
		});
	}
	animate();

	$(window).on('scroll', function() {
		var scrollTop = $(window).scrollTop();
		//	设置页首样式
		if (scrollTop) {
			$('header').addClass('fixed');
		} else {
			$('header').removeClass('fixed');
		}
		animate();
	});

	//	设置第五部分 第七部分
	$(window).on('load', function() {
		setSection5('#sect5-pc .content.cn');
		setSection6();
	});

	//	切换语言
	$('header .lang').on('click', function() {
		var lang = $('header .lang');
		if (lang.hasClass('icon-en')) {
			lang.removeClass('icon-en').addClass('icon-cn');
			$('.cn').hide();
			$('.en').show();
			$('*').removeClass('animate');
			setSection5('#sect5-pc .content.en');
			setSection6();
		} else {
			lang.removeClass('icon-cn').addClass('icon-en');
			$('.en').hide();
			$('.cn').show();
			$('*').removeClass('animate');
			setSection5('#sect5-pc .content.cn');
			setSection6();
		}
		animate();
	});
})