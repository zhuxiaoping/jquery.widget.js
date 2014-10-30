jquery.widget.js
================
  
Introduction
-----------------------------------
  手机端简单widget
### Usage
    <div class="widget" style="display:none;">
	 		   <div class="widget-body">
	 		          <p style="padding:20px 0;text-align:center;">点我不会关闭，点击其他区域关闭</p>
	 		   </div>	
 		</div>
### Initial
    $('.widget').widget();
### Options
    * container - widget页面所在容器dom对象,默认body
    * speed - widget页面滑出速度，单位ms，默认300ms
    * distance - widget页面滑出距离，默认body的宽度
    * clickClose - 点击widget页面是否关闭，默认false
    * widgetBodyClass - widget页面内容主体class名称，默认widget-body
    * onShow - widget页面open后调
    * onClose - widget页面close后调
    * direction - widget页面open方向，left，表示默认从右往左滑出
    * left - widget页面初始位置
    * touch - 是否支持触屏事件移动，默认false
### Methods    
    * open  - $('.widget').widget('open');
    * close - $('.widget').widget('close');
    * isShow - $('.widget').widget('isShow'); - 返回widget页面是否open,值为true或false
###  效果如下
![github](https://github.com/zhuxiaoping/jquery.widget.js/blob/master/widget.gif "github")
