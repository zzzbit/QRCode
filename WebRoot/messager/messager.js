function bodyRec(){
var winWidth;var winHeight;
if (window.innerWidth)winWidth = window.innerWidth;else if ((document.body) && (document.body.clientWidth))  winWidth = document.body.clientWidth;if (window.innerHeight)winHeight = window.innerHeight;else if ((document.body) && (document.body.clientHeight))winHeight = document.body.clientHeight;if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){winHeight = document.documentElement.clientHeight;winWidth = document.documentElement.clientWidth;}  
return {w:winWidth,h:winHeight};
}
if(window.attachEvent){window.attachEvent('onresize',function(){if(messager.resize)messager_commom('')})}
else if(window.addEventListener){window.addEventListener('resize',function(){if(messager.resize)messager_commom('')},false)}
function closeMessager(c){
	messager.resize=false;
	document.body.removeChild(document.getElementById('d_messager_m'+c));
	document.body.removeChild(document.getElementById('d_messager_msg'+c));
}
function closeMessager_return(b,c){
	messager.resize=false;
	document.getElementById('d_messager_m'+c).style.display='none';
	document.getElementById('d_messager_msg'+c).style.display='none';
	messager.method(b);
}
var messager={count:0,index1:999999,index2:1000000,resize:false,method:function(){}}
function alert(m){
try{
	messager.resize=true;
	messager.count++;
	messager.index1++;
	messager.index2++;
	messager_commom("<div class='messager_title'>&nbsp;温馨提示</div><div class='img_alert'></div><font id='font_message_msg"+messager.count+"'>"+m+"</font><div style='padding:10px;text-align:right;'><input type='button' value='确定' onclick='closeMessager("+messager.count+")'/></div>");
}catch(e){
	confirm(e.description);
}
}
function confirm$(m,f){
	messager.resize=true;
	messager.count++;
	messager.index1++;
	messager.index2++;
	messager_commom("<div class='messager_title'>&nbsp;温馨提示</div><div class='img_help'></div><font id='font_message_msg"+messager.count+"'>"+m+"</font><div style='padding:10px;text-align:right;'><input type='button' value='确定' onclick='closeMessager_return(true,"+messager.count+")'/><input type='button' value='取消' onclick='closeMessager_return(false,"+messager.count+")'/></div>");
	messager.method=f;
}
function messager_commom(txt){
	var size=bodyRec();
	var doc=document.body;
	if(!doc)doc=document.documentElement;
	var newel=document.createElement('div');
	newel.id='d_messager_m'+messager.count;
	newel.className='d_messager_m';
	newel.style.zIndex=messager.index1;
	var d_messager_msg=document.createElement('div');
	d_messager_msg.id='d_messager_msg'+messager.count;
	d_messager_msg.className='d_messager_msg';
	d_messager_msg.style.zIndex=messager.index2;
	d_messager_msg.innerHTML=txt;
	doc.appendChild(newel);
	doc.appendChild(d_messager_msg);	
	var ho_m=document.getElementById('d_messager_m'+messager.count);
	var ho_t=document.getElementById('d_messager_msg'+messager.count);
	var ho_f=document.getElementById('font_message_msg'+messager.count);
	ho_m.style.display='block';
	ho_t.style.display='block';	
	ho_m.style.width=size.w+'px';
	ho_m.style.height=document.documentElement.scrollHeight+'px';
	var offwidth=ho_f.offsetWidth;
	if(offwidth<60)offwidth=60;else if(offwidth>900){offwidth=900;ho_t.style.overflow='auto';}else{}
	ho_t.style.width=offwidth+100+'px';
	var offHeight=ho_f.offsetHeight;
	if(offHeight<60)offHeight=60;else if(offHeight>500)offHeight=500;
	ho_t.style.left=size.w/2-ho_t.offsetWidth/2+'px';
	ho_t.style.top=(size.h/2-ho_t.offsetHeight/2+document.documentElement.scrollTop)+'px';
	ho_t.onmousedown = function (a) {//鼠标按下
                this.style.cursor = "move";
                var d = document;
                if (!a) a = window.event;
                var x = a.clientX - document.body.scrollLeft - ho_t.offsetLeft; //x=鼠标相对于网页的x坐标-网页被卷去的宽-待移动对象的左外边距
                var y = a.clientY - document.body.scrollTop - ho_t.offsetTop; //y=鼠标相对于网页的y左边-网页被卷去的高-待移动对象的左上边距
                d.onmousemove = function (a) {
                    if (!a) a = window.event;
                    ho_t.style.left = (a.clientX + document.body.scrollLeft - x)+'px';
                    ho_t.style.top = (a.clientY + document.body.scrollTop - y)+'px';
                }
                d.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    ho_t.style.cursor = "normal";
                }
     }
}