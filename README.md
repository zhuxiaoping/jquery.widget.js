jquery.widget.js
================
  
简介
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
    * speed - 窗口滑出速度，单位ms，默认300ms
    * width - 窗口滑出距离，默认body的宽度
    * noCloseClass - class名称，widget包含此class，则点击不关闭，默认widget-noclose
    * widgetBodyClass - 内容主体class名称，默认widget-body
    * onClose - 窗口关闭后调
    * showRightToLeft - 窗口滑出方向，默认true，表示默认从右往左滑出
### Methods    
    * open  - $('.widget').widget('open');
    * close - $('.widget').widget('close');
###  效果如下
![github](https://github.com/zhuxiaoping/jquery.widget.js/blob/master/widget.gif "github")
