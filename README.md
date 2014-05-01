slider - jQuery plugin
=======

`slider` is a  powerful slide show jquery plugin. just write less,do more.

 current version:**1.5.1**

###Changelog:
 * ~2013/04/02 : reconstruct the code.
 * ~2013/01/08 : initialization
 * ~2014/05/01:support mouseWheel, optimize effect: none/fade implementation

### Default config: ###
<table class="classtable" cellspacing="0">
	    <thead>
	      <tr>
	        <th width="14%">参数</th>
	        <th width="13%">默认值</th>
	        <th width="14%">类型</th>
	        <th width="59%">描述</th>
	      </tr>
	    </thead>
	    <tbody>
	    
	      <tr>
	        <td class="code">container</td>
	        <td class="code">'.slides-container'</td>
	        <td class="code">String</td>        
	        <td><p>slides 的 Dom容器<span class="code"></span>，设置</p></td>                    
	      </tr>    
	      <tr>
	        <td class="code">btnNext</td>
	        <td class="code">null</td>
	        <td class="code">String</td>        
	        <td><p>下一个，导航按钮（jquery selector）</p></td>                    
	      </tr>
	      <tr>
	        <td class="code">btnPrev</td>
	        <td class="code">null</td>
	        <td class="code">String</td>        
	        <td><p>上一个，导航按钮（jquery selector）</p>
	        </td>                    
	      </tr>
	      <tr>
	        <td class="code">paginationClass</td>
	        <td class="code">null</td>
	        <td class="code">String</td>        
	        <td>pagination parent Class</td>                    
	      </tr>
	      <tr>
	        <td class="code">current</td>
	        <td class="code">'current'</td>
	        <td class="code">String</td>        
	        <td>当前页，导航按钮高亮className，</td>                    
	      </tr>
	      <tr>
	        <td class="code">circular</td>
	        <td class="code">false</td>
	        <td class="code">Boolean</td>        
	        <td><p>循环滚动</p></td>                    
	      </tr>
	      <tr>
	        <td class="code">effect</td>
	        <td class="code">'default'</td>
	        <td class="code">String</td>        
	        <td><p>滑动效果，[none, default ,fade , easing:easeOutExpo ,easing:easeOutSine , ...]</p>
            <p>'none':没有切换效果,</p>
            <p>'default':默认切换效果,</p>
            <p>'fade':淡进淡出,</p>
            <p>'easing:easeOutExpo':easing 库效果，需要加载jquery.easing.js</p>
            <p>&nbsp;</p></td>                    
	      </tr>
	      <tr>
	        <td class="code">vertical</td>
	        <td class="code">false</td>
	        <td class="code">Boolean</td>        
	        <td>滑动的方向，默认水平方向</td>                    
	      </tr>            
	      <tr>
	        <td class="code">visible</td>
	        <td class="code">1</td>
	        <td class="code">Number</td>        
	        <td>可视个数</td>                    
	      </tr>       
	      <tr>
	        <td class="code">scroll</td>
	        <td class="code">1</td>
	        <td class="code">Number</td>        
	        <td>滚动个数<a href="#button_desc" class="red"></a></td>                    
	      </tr>
	      <tr>
	        <td class="code">fadeSpeed</td>
	        <td class="code">500</td>
	        <td class="code">Number</td>        
	        <td>淡入淡出速度</td>                            
	      </tr>      
	      <tr>
	        <td class="code">slideSpeed</td>
	        <td class="code">350</td>
	        <td class="code">Number</td>        
	        <td>滑动速度<a href="#button_desc" class="red"></a></td>                    
	      </tr>
	      <tr>
	        <td class="code">play</td>
	        <td class="code">0</td>
	        <td class="code">Number</td>        
	        <td>自动轮播必须设定,间隔毫秒</td>                    
	      </tr>            
	      <tr>
	        <td class="code">pause</td>
	        <td class="code">0</td>
	        <td class="code">Number</td>        
	        <td>自动轮播必须设定，轮播划过，移开暂停多少毫秒继续轮播</td>                    
	      </tr>       
	      <tr>
	        <td class="code">hoverPause</td>
	        <td class="code">false</td>
	        <td class="code">Boolean</td>        
	        <td>划过暂停</td>                    
	      </tr>       
	      <tr>
	        <td class="code">paginationEvent</td>
	        <td class="code">"click"</td>
	        <td class="code">String</td>        
	        <td>页面按钮导航事件，可选'hover'</td>                    
	      </tr>             
	      <tr>
	        <td class="code">start</td>
	        <td class="code">1</td>
	        <td class="code">Number</td>        
	        <td>初始化状态，默认第一个开始，静态样式应该同步，否则可能会出错</td>                    
	      </tr>
	      <tr>
	        <td class="code">mouseWheel</td>
	        <td class="code">false</td>
	        <td class="code">Boolean</td>        
	        <td>鼠标滚动事件</td>                    
	      </tr>        
	    </tbody>
	 </table>



### Html code: ###

    <div class="slider-outer">
    	<div class="slider-container"> <!-- position:relative;overflow:hidden; container：".slider-container" -->
    	<ul class="slider-list" style=""> <!-- position:absolute; "slider-list is write in code,in order to get the children( children() )"  -->
    	  <li><a href="#"><img src="images/buttom_0.jpg"></a></li>
    	  <li><a href="#"><img src="images/buttom_1.jpg"></a></li>
    	  <li><a href="#"><img src="images/buttom_2.jpg"></a></li>
    	  <li><a href="3"><img src="images/buttom_3.jpg"></a></li>
    	</ul>
    	<ul class="num">  <!-- pagination:".num" in order to get "li" children -->
    	  <li class="on"><a href="" title="">1</a></li>
    	  <li class=""><a href="" title="">2</a></li>
    	  <li class=""><a href="" title="">3</a></li>
    	  <li class=""><a href="" title="">4</a></li>
    	</ul>
    	 </div>
    	 <a href="javascript:;" class="next"></a> <!-- btnNext:".next"  -->
    	 <a href="javascript:;" class="prev"></a> <!-- btnPrev:".prev" -->
    </div>



###Demo:###

[https://icai.github.io/Jclibrary/ui/slider/demo.html](https://icai.github.io/Jclibrary/ui/slider/demo.html "slider demo")



###Author:###
by icai 

blog:`hi.baidu.com/tp100`

github: `github.com/icai`


###License:###

The MIT License (MIT)

Copyright (c) 2014 icai

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




