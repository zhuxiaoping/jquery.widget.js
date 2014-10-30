/*!
 * jquery.widget.js https://github.com/zhuxiaoping/jquery.widget.js
 * by zhuxiaoping 
 * 2014-10-27 v1.3
*/

(function(window,$) {
	 $.Widget = function(options,element){
	 	   this.element = $(element);
	 	   this.status = 'closed';
	 	   this.defaults = {
					container : window.document.body,  /*widget所在容器dom对象*/
					speed : 300,                /*滑出速度 ms*/
					distance : window.document.body.clientWidth,   /*widget滑动距离*/
					clickClose : false,        /*点击是否关闭*/
					widgetBodyClass : '.widget-body',
					onClose : undefined,
					onShow : undefined,
					direction:'left',   /*初始方向,open方法方向*/
					left:undefined,    /*初始位置*/
					touch:false,       /*是否支持滑动*/
				};			 		
			 this._init(options);
	 };
	 $.Widget.prototype = {
	     _init : function(options){
	     	  var instance = this;	     	 
	     	  var opts = instance.options = $.extend({}, instance.defaults, options || {});	
	     	  if(!opts.container) return alert('container not be null'),!1;    	  	     	  
	     	  if(opts.direction == 'left' || opts.direction == 'right'){
	     	  	  opts.container.style.overflowX = 'hidden';
	     	  	  opts.container.style.overflowY = 'auto'
	     	      instance.distance =  typeof opts.distance == 'undefined'? opts.container.clientWidth : opts.distance;
	     	      var x = instance.nowX = instance.initX = typeof opts.left == 'undefined'? (opts.direction == 'left' ? instance.distance : -instance.distance) : opts.left;	     	      
	     	      var style = instance.element[0].style;
		          style.webkitTransform = 'translate('+ x + 'px,0)' + 'translateZ(0)';
					    style.msTransform =
					    style.MozTransform =
					    style.OTransform = 'translateX('+ x + 'px)';   
					    
					    if(opts.touch){
						    instance.element[0].addEventListener("touchstart",instance._handleTouchEvent, false);
						    instance.element[0].addEventListener("touchend", instance._handleTouchEvent, false);
						    instance.element[0].addEventListener("touchmove", instance._handleTouchEvent, false);
					    }
	     	  }else{	     	  	     	 
	     	         alert('direction is not left or right');
	     	  }   
	     },
	     _translate : function(el,speed,x){     
	     	  this.nowX = x;	 
	     	  var style = el[0].style;		
						  style.webkitTransitionDuration =
					    style.MozTransitionDuration =
					    style.msTransitionDuration =
					    style.OTransitionDuration =
					    style.transitionDuration = speed + 'ms';
					    style.webkitTransform = 'translate('+ x + 'px,0)' + 'translateZ(0)';
					    style.msTransform =
					    style.MozTransform =
					    style.OTransform = 'translateX('+ x + 'px)';
	     },
	     open : function(){
	     	    var instance = this;
	     	    var el = instance.element;
	     	    var opts = instance.options;
	         	el.show();  
	         	var x = opts.direction == 'left' ? instance.initX - instance.distance : instance.initX + instance.distance;
						instance._translate(el,opts.speed,x);
						if(opts.onShow)opts.onShow.call(el[0]);
						instance.status = 'opened';
						if(!opts.clickClose)return;
				    el.unbind('click').bind('click',function(){						
							    instance.close();
						});
						if(opts.widgetBodyClass)
						el.find(opts.widgetBodyClass).unbind('click').click(function (event) {
					        event.stopPropagation();
					  });   						
		     },
		     close : function(){
		     	  var instance = this;
		     	  instance.status = 'closed';
	     	    var el = instance.element;
	     	    var opts = instance.options;
		     	  instance._translate(el,opts.speed,instance.initX);
		     	  if(opts.onClose) opts.onClose.call(el[0]);
		     },
		     _moveto : function(x){
		     		 x = x > this.distance ? this.distance : (x < this.initX ? this.initX : x);						         
		     	   this._translate(this.element,100,x);
		     },
		     isShow: function(){
		     	   return this.status == 'opened';
		     },
		     _handleTouchEvent : function(event) {
		     	    var instance = $(this).data('widget');	     	    
					    if (event.touches.length == 1) {
					        switch (event.type) {
					            case "touchstart":          
									         instance.touchStartX = event.touches[0].pageX;
									         instance.touchNowX = instance.nowX;
					                break;
					            case "touchend":          
					                break;
					            case "touchmove":
					                event.preventDefault(); //阻止滚动	
					                 var movex = event.touches[0].pageX - instance.touchStartX;	
									         instance._moveto(instance.touchNowX+movex);
					                break;
					        }
					    }
					}	
		 };
	 $.fn.widget = function(options){		
	 	   var thisCall = typeof options;

        switch (thisCall) {

            // method 
            case 'string':
                if(this.length > 1)return;
                var args = Array.prototype.slice.call(arguments, 1);                								
									var instance = $.data(this[0], 'widget');			
									if (!instance) {										
										return false;
									}				
									if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {									
										return false;
									}
									return instance[options].apply(instance, args);
												
				            break;
				
				            // creation 
				            case 'object':
				
				                this.each(function () {
				
				                var instance = $.data(this, 'widget');
				
				                if (instance) {
				
				                    // update options of current instance
				                    instance.update(options);
				
				                } else {
				
				                    // initialize new instance
				                    instance = new $.Widget(options, this);
				
				                    // don't attach if instantiation failed
				                    if (!instance.failed) {
				                        $.data(this, 'widget', instance);
				                    }
				
				                }
				
				            });
				            return this;
				            break;
				
				        }

        
	 };
})(window,jQuery);