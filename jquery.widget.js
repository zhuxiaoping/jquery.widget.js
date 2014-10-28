/*!
 * jquery.widget.js https://github.com/zhuxiaoping/jquery.widget.js
 * by zhuxiaoping 
 * 2014-10-27 v1.3
*/

(function(window,$) {
	 $.Widget = function(options,element){
	 	   this.element = $(element);
	 	   this.defaults = {
					speed : 300,                /*滑出速度 ms*/
					width : window.document.body.clientWidth,   /*widget滑出距离*/
					noCloseClass : 'widget-noclose',  
					widgetBodyClass : '.widget-body',
					onClose : null,
					showRightToLeft:true
				};			 
			
			 this._init(options);
	 };
	 $.Widget.prototype = {
	     _init : function(options){
	     	   var instance = this;
	     	  instance.options = $.extend({}, instance.defaults, options || {});	     	 
	     },
	     _translate : function(el,speed,width,rightToLeft){     	 
	     	  var style = el[0].style;			
	     	  var width = rightToLeft ? '-'+ width : width;
						  style.webkitTransitionDuration =
					    style.MozTransitionDuration =
					    style.msTransitionDuration =
					    style.OTransitionDuration =
					    style.transitionDuration = speed + 'ms';
					    style.webkitTransform = 'translate('+ width + 'px,0)' + 'translateZ(0)';
					    style.msTransform =
					    style.MozTransform =
					    style.OTransform = 'translateX('+ width + 'px)';
	     },
	     open : function(){
	     	    var instance = this;
	     	    var el = instance.element;
	     	    var opts = instance.options;
	         	el.show();
						instance._translate(el,opts.speed,opts.width,opts.showRightToLeft);
					    el.unbind('click').bind('click',function(){
								if(el.hasClass(opts.noCloseClass)) return;
								    instance.close();
								    if(opts.onClose) opts.onClose(el);
							});
							el.find(opts.widgetBodyClass).unbind('click').click(function (event) {
						        event.stopPropagation();
						  });    
		     },
		     close : function(){
		     	  var instance = this;
	     	    var el = instance.element;
	     	    var opts = instance.options;
		     	  instance._translate(el,opts.speed,0,!opts.showRightToLeft);
					  //setTimeout(function(){el.hide();},opts.speed);
		     }	
		 };
	 $.fn.widget = function(options){		
	 	   var thisCall = typeof options;

        switch (thisCall) {

            // method 
            case 'string':
                var args = Array.prototype.slice.call(arguments, 1);

								this.each(function () {
									var instance = $.data(this, 'widget');
				
									if (!instance) {
										// not setup yet
										// return $.error('Method ' + options + ' cannot be called until Infinite Scroll is setup');
										return false;
									}
				
									if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
										// return $.error('No such method ' + options + ' for Infinite Scroll');
										return false;
									}
				
									// no errors!
									instance[options].apply(instance, args);
								});
				
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
				
				            break;
				
				        }

        return this;
	 };
})(window,jQuery);