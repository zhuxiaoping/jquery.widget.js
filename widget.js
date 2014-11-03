/*!
 * jquery.widget.js https://github.com/zhuxiaoping/jquery.widget.js
 * by zhuxiaoping 
 * 2014-10-27 v1.3
*/

(function() {
	var tranPrefix = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
		(/trident/i).test(navigator.userAgent) ? 'ms' :
		'opera' in window ? 'O' : '';
	 Widget = function(element,options){
	 	   this.element = element;
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
	 Widget.prototype = {
	     _init : function(options){
	     	  var instance = this;	     	 
	     	  var opts = instance.options = $.extend({}, instance.defaults, options || {});	
	     	  if(!opts.container) return alert('container not be null'),!1;    	  	     	  
	     	  if(opts.direction == 'left' || opts.direction == 'right'){
	     	  	  opts.container.style.overflowX = 'hidden';
	     	  	  opts.container.style.overflowY = 'auto'
	     	      instance.distance =  typeof opts.distance == 'undefined'? opts.container.clientWidth : opts.distance;
	     	      var x = instance.nowX = instance.initX = typeof opts.left == 'undefined'? (opts.direction == 'left' ? instance.distance : -instance.distance) : opts.left;	     	      
	     	      var style = instance.element.style;
		          style[tranPrefix+'Transform'] = 'translate('+ x + 'px,0)';		  
					    
					    if(opts.touch && ('ontouchstart' in window)){
						    instance.element.addEventListener("touchstart",instance, false);
						    instance.element.addEventListener("touchend", instance, false);
						    instance.element.addEventListener("touchmove", instance, false);
					    }
	     	  }else{	     	  	     	 
	     	         alert('direction is not left or right');
	     	  }   
	     },
	     _translate : function(element,speed,x){     
	     	  this.nowX = x;	 
	     	  var style = element.style;		
					style[tranPrefix+'TransitionDuration'] = speed + 'ms'; 
					style[tranPrefix+'Transform'] = 'translate('+ x + 'px,0)';
	     },
	     open : function(){
	     	    var instance = this;
	     	    var el = instance.element;
	     	    var opts = instance.options;
	         	el.style.display = 'block';  
	         	var x = opts.direction == 'left' ? instance.initX - instance.distance : instance.initX + instance.distance;
						instance._translate(el,opts.speed,x);
						if(opts.onShow)opts.onShow.call(el);
						instance.status = 'opened';
						if(!opts.clickClose)return;
				    instance._bind(el,'click',function(){						
							    instance.close();
						});
						var elBody = el.getElementsByClassName(opts.widgetBodyClass);
							if(opts.widgetBodyClass && elBody.length > 0){	
								elBody = elBody[0];				
								instance._bind(elBody,'click',function (event) {
							        event.stopPropagation();
							  });  
						} 						
		     },
		     close : function(){
		     	  var instance = this;
		     	  instance.status = 'closed';
	     	    var el = instance.element;
	     	    var opts = instance.options;
		     	  instance._translate(el,opts.speed,instance.initX);
		     	  if(opts.onClose) opts.onClose.call(el);
		     },
		     _moveto : function(x){
		     		 x = x > this.distance ? this.distance : (x < this.initX ? this.initX : x);						         
		     	   this._translate(this.element,100,x);
		     },
		     isShow: function(){
		     	   return this.status == 'opened';
		     },
		     handleEvent : function(event) {
		     	    var instance = this;	     	    
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
					}	,
					_bind: function (el,type,callback) {
						el.addEventListener(type, callback, false);
					},
				
					_unbind: function (el,type,callback) {
						el.removeEventListener(type, callback, false);
					},
		 };
	 
if (typeof exports !== 'undefined') exports.Widget = Widget;
else window.Widget = Widget;
})();