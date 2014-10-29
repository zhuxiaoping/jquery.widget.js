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
					container : window.document.body,
					speed : 300,                /*滑出速度 ms*/
					distance : window.document.body.clientWidth,   /*widget滑出距离*/
					clickClose : false,  
					widgetBodyClass : '.widget-body',
					onClose : undefined,
					direction:'left',
					left:undefined
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
	     	    console.log(instance.distance)
	     	    var x = instance.x = typeof opts.left == 'undefined'? (opts.direction == 'left' ? instance.distance : -instance.distance) : opts.left;
	     	      var style = instance.element[0].style;
		          style.webkitTransform = 'translate('+ x + 'px,0)' + 'translateZ(0)';
					    style.msTransform =
					    style.MozTransform =
					    style.OTransform = 'translateX('+ x + 'px)';   
	     	  }else{	     	  	     	 
	     	         alert('direction is not left or right');
	     	  }   
	     },
	     _translate : function(el,speed,x){     	 
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
	         	var x = opts.direction == 'left' ? instance.x - instance.distance : instance.x + instance.distance;
						instance._translate(el,opts.speed,x);
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
		     	  instance._translate(el,opts.speed,instance.x);
		     	  if(opts.onClose) opts.onClose(el);
		     },
		     isShow: function(){
		     	   return this.status == 'opened';
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