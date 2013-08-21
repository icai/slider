
/**
 * date：20130108 
 * author:caiguangsong
 *
 * last update:2013/04/02
 *
 * ~2013/04/02 : reconstruct the code
 * 
 */
;;(function($,undefined) {
	var instanceCount = 0;
	$.slider = function(obj, optss) {
		var opts = $.extend(true, {}, $.slider.defaults, optss);
		$.fn.slider.instance.$count++;
		$.fn.slider.instance['_$slicer'+ instanceCount++] = opts;
		return new $.slider.fn.init(obj, opts);
	}
	$.slider.fn = $.slider.prototype = {
		constructor: $.slider,
		init: function(obj, opts) {
			this.options = {};

			var fn = this;
			var op = this.options;
			    this.options.elem = $(obj),
				this.options.slider_lists = $('.slider-list', obj),
				this.options.lists = op.slider_lists.children(),
				this.options.total = op.slider_lists.children().size(),
				this.options.width = op.slider_lists.children().outerWidth(),
				this.options.height = op.slider_lists.children().outerHeight();

				$.extend(true, this.options, opts);

				this.options.currentClass = this.options.current, // current used
				this.options.start = opts.start - 1, //  view start form 1, but code 0; 
				this.options.next = 0,
				this.options.prev = 0,
				this.options.number = 0,
				this.options.current = 0,
				this.options.runFunc = {
					'none':'aniNone',
					'default':'aniEasing',
					'fade':'aniFade',
					'easing':'aniEasing'
				},
				this.options.clicked = 0;
				this.options.animCss = op.vertical ? "top" : "left",
				this.options.sizeCss = op.vertical ? "height" : "width";
				this.options.getVal = op.vertical ? op.height : op.width; // 赋值
				this._init();
				//console.log(this);
			return this;
		},
		_init:function(){
			var fn = this;
			var op = this.options;

			fn.checkSetting();
			op.circular && fn.circular(); //循环
			fn.vertical().bindEvent(); // 垂直
		},
		checkSetting:function(){
			var fn = this;
			var op = this.options;

			if(op.total < 2) {
				$.log && $.log("slider lists is less equal  to 2!");
				return;
			}
			if(op.start < 0) {
				op.start = 0;
			};
			if(op.start > op.total) {
				op.start = op.total - 1;
			};

			if(op.start) {
				op.current = op.start;  // 0
			};
			return this;
		},
		circular:function(){
			var fn = this;
			var op = this.options;

			op.slider_lists.prepend(op.lists.slice(op.total - op.visible).clone()).append(op.lists.slice(0, op.visible).clone());
			op.start += op.visible

			return this;
		},
		vertical:function(){
			var fn = this;
			var op = this.options;

			$(op.container, op.elem).css({ // slider container
				overflow: 'hidden',
				position: 'relative',
				width:op.vertical ? op.width : op.width * op.visible,
				height:op.vertical ? op.height * op.visible : op.height
			});

			var cirVal = op.circular ? 2 : 1;
			op.slider_lists.css({ // slider 列表
				position: 'absolute'
			}).css(op.animCss,- op.getVal * op.start); //设定开始值
			op.slider_lists.css(op.sizeCss,op.getVal * op.total * cirVal).children().css({
				float:op.vertical ? "none" : "left"
			})		

			return this;
		},
		play:function(){
			var fn = this;
			var op = this.options;
			if(op.play) {
			var	playInterval = setInterval(function() {
					fn.nextCtrl()
				}, op.play);
				op.elem.data('interval', playInterval);
			};
			return this;
		},
		stop:function(){
			var fn = this;
			var op = this.options;
			clearInterval(op.elem.data('interval'));

			return this;
		},
		pause:function(){
			var fn = this;
			var op = this.options;
			clearTimeout(op.elem.data('pause'));
			clearInterval(op.elem.data('interval'));
			var pauseTimeout = setTimeout(function() {
				clearTimeout(op.elem.data('pause'));
				playInterval = setInterval(function() {
					fn.nextCtrl()
				}, op.play);
				op.elem.data('interval', playInterval);
			}, op.pause);
			op.elem.data('pause', pauseTimeout);

			return this;
		},
		nextCtrl:function(){
			var fn = this;
			var op = this.options;

			op.prev = op.current;
			op.next = op.current + op.scroll;
			op.next =  op.next >= op.total ? op.next - op.total : op.next; // 
			op.current = op.next;

			fn.animate("next",op.current)

			return this;
		},
		prevCtrl:function(){
			var fn = this;
			var op = this.options;

			op.prev = op.current ;
			op.next = op.current - op.scroll;
			op.next = op.next < 0 ? op.total + op.next: op.next;
			op.current = op.next;
			fn.animate("prev",op.current)

			return this;
		},
		pageCtrl:function(){
			var fn = this;
			var op = this.options;

			op.next = parseInt(op.clicked, 10) * op.scroll; // new 
			op.prev = $(op.pagination + ' li.'+ op.currentClass +' a', op.elem).index() * scroll;  // old
			op.current = op.next;
			var temp;
			if(op.prev > op.next){
				temp = "next";
			}else{
				temp = "prev";
			}
			fn.animate(temp,op.current);

			return this;

		},
		animate:function(dir,num){

			var fn = this;
			var op = this.options;
			var easing;
			if(/^(easing):([\w]+)/.test(op.effect)){
				fn[ op.runFunc[RegExp.$1] ](num,dir,RegExp.$2);
			}else if(op.effect === 'default'){
				fn[ op.runFunc[op.effect] ](num,dir,'linear');
			}else{
				fn[ op.runFunc[op.effect] ](num,dir,easing);
			}

			if(op.pagination) {
				$(op.pagination + ' li', op.elem).removeClass(op.currentClass);
				$(op.pagination + ' li', op.elem).eq( Math.floor(num/op.scroll) ).addClass(op.currentClass);
			}
		},
		aniNone:function(num){
			var fn = this;
			var op = this.options;
				op.slider_lists.css({
					left:- op.width * num
				})
				op.callback(num);
		},
		aniFade:function(num){

			var fn = this;
			var op = this.options;

			// { left:- width * num }
			op.slider_lists.css(op.animCss, - op.getVal * num ).children(':eq(' + num + ')', op.elem).hide().fadeIn(op.fadeSpeed,function(){
				op.callback(num);

			})
		},
		aniEasing:function (num,dir,easing,step){
			var fn = this;
			var op = this.options;

			var param = {};
			var curr = num;
			if(op.circular) {
				if(dir == "next"){
					if(num < op.visible){
						op.slider_lists.css(op.animCss, -((op.visible + num - op.scroll) * op.getVal));
					}
				}else if(dir == "prev"){
					if(num >=  op.total - op.visible){
						op.slider_lists.css(op.animCss, -((op.visible + num + op.scroll) * op.getVal));  
					}
				}
				curr = num + op.visible;  // direction value
			}
			op.slider_lists.stop().animate(op.animCss == "left" ? {
					left: -(curr * op.getVal)
				} : {
					top: -(curr * op.getVal)
				},op.slideSpeed,easing,function() {
				op.callback(num);
			});
		},
		bindEvent: function() {
			var fn = this;
			var op = this.options;
			if(op.btnNext) $(op.btnNext, op.elem).click(function(e) {
				e.preventDefault();
				if(op.play) {
					fn.pause();
				};
				fn.nextCtrl();
			});
			if(op.btnPrev) $(op.btnPrev, op.elem).click(function(e) {
				e.preventDefault();
				if(op.play) {
					fn.pause();
				};
				fn.prevCtrl();
			});
			if(op.pagination) {
				$(op.pagination + ' li:eq(' + op.start + ')', op.elem).addClass(op.current);
				$(op.pagination + ' li', op.elem).bind(op.paginationEvent,function() {
					if(op.play) {
						fn.pause();
					};
					op.clicked = $(this).closest('li').index(); 
					if(op.current != op.clicked) {
						fn.pageCtrl();
					}
					return false;
				});
			}
			if(op.play) {
				playInterval = setInterval(function() {
					fn.nextCtrl()
				}, op.play);
				op.elem.data('interval', playInterval);
			};
			if(op.hoverPause && op.play) {
				op.slider_lists.children().bind('mouseover', function() {
					fn.stop();
				});
				op.slider_lists.children().bind('mouseleave', function() {
					fn.pause();
				});
			}
			return this;
		}
	}
	$.slider.fn.init.prototype = $.slider.fn;
	$.fn.slider = function(optss) {
		if(!this.length) {
			return this;
		}
		this.each(function(i,el) {
			$.slider(el,optss);
		});
		return this;
	};

	$.fn.slider.version = "1.0";
	$.fn.slider.instance = {
		$count:0
		
	};
	// default optss
	$.slider.defaults = {
		container: '.slides-container',
		btnNext: null, // Next 按钮
		btnPrev: null, // Next 按钮
		pagination:null,  // page按钮
		current:'current', 
		circular:false,
		effect:'default', // none|| default|| fade || easing:easeOutExpo || easing:easeOutSine || ...
		vertical:false, // horizontal 默认横向
		visible: 1, // 显示多少个
		scroll:1, //  切换个数（针对） haspagination ==  false && hasNextPrev == true
		fadeSpeed: 350, // 淡入速度
		slideSpeed: 350,  // 切换速度
		play: 0,  // 间隔时间
		pause: 0, //暂停时间
		hoverPause: false, // 划过是否停止
		paginationEvent:'click', // 由哪一个开始：待定参数
		start: 1, // 由哪一个开始：待定参数
		callback: function() {}
	};

})(jQuery);
