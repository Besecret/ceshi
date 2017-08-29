<%@ page contentType="text/html; charset=UTF-8"%>

<%
	String appName = request.getContextPath();
	String currentUserId = "admin";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="icon/font-awesome-4.7.0/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="jqui/jquery-ui-1.12.0.custom/jquery-ui.min.css" />
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="jqui/jquery-ui-1.12.0.custom/jquery-ui.min.js"></script>
		<script type="text/javascript" src="data/shortcut.js"></script>
		<script type="text/javascript">
			var CURRENT_USERID='<%=currentUserId %>';
			var APP_NAME='<%=appName %>';
			var RESOURCE_ARR=[];
			var EDIT_FLAG=false;
			$(function(){
				Array.prototype.contains=function(needle){
				  for(i in this){
				    if (this[i] == needle) return true;
				  }
				  return false;
				};
				var resize=function(){
					var h=$(window).height();
					var w=$(window).width();
					$('.meContent').css({'height':h-100});
				};
				var msg=function(text){
					$('.meMsg p').html(text);
					$('.meMsg').show();
					setTimeout(function(){						
						$('.meMsg p').html('');
						$('.meMsg').hide();
					},3000);
				};
				var addMain=function(key,theme,text,style){
						if(style=="1"){
							eval(key+"('"+key+"')");
							var ims ='<li data-rel-key="'+key+'-'+style+'"><div class="meMainItem'+(theme?' '+theme:'')+' '+key+'" data-use-theme="'+(theme?theme:'')+'">';
							ims+='<font class="titleStyle">'+text+'</font>';
							ims+='<font class="fontStyle font'+key+'">0</font>';
							ims+='<div class="divlistStyle divlist'+key+'"></div>';
							ims+='</div></li>';
						}else{
							var ims ='<li data-rel-key="'+key+'-'+style+'"><div class="meMainItem'+(theme?' '+theme:'')+'" data-use-theme="'+(theme?theme:'')+'">';
							ims+='<font class="titleStyle" title='+"点击新增"+text+'>'+text+'</font>';	
							ims+='<font class="fontStyle font'+key+'"><i class="fa fa-plus-dongdd fa-dongdd-add"></i></font>';
							ims+='<div class="divlistStyle divlist'+key+'"></div>';
							ims+='</div></li>';

						}
															
						var im=$(ims);
						im.insertBefore('.meMain ul li.isLast');
						
						$('.meMain ul li div.meMainItem').off().on({
							
							mouseenter:function(e){
								var _flag=$(this).parent().attr('data-rel-key');
								_flag=_flag.substring(_flag.length-1,_flag.length);								
								if(!EDIT_FLAG&&(_flag!="0")){
									if($(this).parent().attr('data-rel-key')=="service_online-1"){
										
										$('.service_online').css({'overflow':'auto'});
									}
									
										$(this).find('.fontStyle').hide();
										$(this).find('.titleStyle').hide();
										$(this).find('.divlistStyle').show();
										$(this).stop().animate({height:325},250);

									
								
									
									
								}
							},
							mouseleave:function(e){
								var _flag=$(this).parent().attr('data-rel-key');
								_flag=_flag.substring(_flag.length-1,_flag.length);	
								if(!EDIT_FLAG&&(_flag!="0")){
									if($(this).parent().attr('data-rel-key')=="service_online-1"){
										
										$('.service_online').css({'overflow':'hidden'});
									}
								
										$(this).find('.divlistStyle').hide();
										$(this).find('.fontStyle').show();	
										$(this).find('.titleStyle').show();							
										$(this).stop().animate({height:80},250);
								
								}
							},
							click:function(e){
								var _flag=$(this).parent().attr('data-rel-key');
								_flag=_flag.substring(_flag.length-1,_flag.length);			
								if(!EDIT_FLAG&&(_flag!="1")){
									
									var data=$(this).parent().attr('data-rel-key');
									data=data.substring(0,data.length-2);
									eval(data+"('"+data+"')");
								}	
							}	
							
						});
					
				};
				var delMain=function(key){
					$('.meMain ul li[data-rel-key="'+key+'"]').remove();
				};
				var regWindowCloseEvent=function(win){
					win.find('.fa-bao-del').on({
						click:function(e){
							var a=$(this).parent().parent();
							var b=a.attr('data-rel-opt');
							addOrDelRescource(7,b);							
							$(this).parent().parent().remove();
							eachSaveResourceOrder();
						}
					});
					win.find('.fa-bao-high').on({
						click:function(e){
							var a=$(this).parent().parent();
							var b=a.attr('data-rel-opt');
							var c=a.find('.meContentBody');
							if(c.attr('data-height')){
								$('.meSelectHighLast input').val(c.attr('data-height'));
								$('.meSelectHigh ul li').each(function(){
									if($(this).attr('data-rel-height')==c.attr('data-height')){
										$(this).addClass('isSelected');										
									}else{
										$(this).removeClass('isSelected');
									}
								});
							}							
							$('.meSelectHigh ul li').off().on({
								click:function(e2){
									c.attr('data-height',$(this).html()).height(parseInt($(this).html()));
									updateRescourceHeight(b,$(this).html());
									$('.meFullDiv').hide();
									$('.meSelectHigh').hide();
								}
							});
							$('.meSelectHighClose').off().on({
								click:function(e2){
									$('.meFullDiv').hide();
									$('.meSelectHigh').hide();
								}
							});	
							$('.meSelectHighLast input').off().on({
								blur:function(e2){
									if($(this).val()!=''){
										c.attr('data-height',$(this).val()).height(parseInt($(this).val()));
										updateRescourceHeight(b,$(this).val());
										$('.meFullDiv').hide();
										$('.meSelectHigh').hide();
									}
								}
							});	
							$('.meSelectHighLast').off().on({
								click:function(e2){
									e2.stopPropagation();
								}
							});		
							$('.meFullDiv').css({'z-index':1110}).show();						
							$('.meSelectHigh').css({top:e.clientY,left:e.clientX-330}).show();
						}
					});
				};
				var initDataShortcutEvent=function(){
					$('.meSelect ul.meItem li').on({
						click:function(e){
							if($(this).hasClass('isSelected')) {
								$(this).removeClass('isSelected');
								delMain($(this).attr('data-key'));
								addOrDelShort(3,$(this).attr('data-key'));
								eachSaveShortOrder();
							}else{
								if($('.meSelect ul.meItem li.isSelected').length<6){
									$(this).addClass('isSelected');
									var _temp=$(this).attr('data-key');
									var _temp_1=_temp.substring(0,_temp.length-2);
									var _temp_2=_temp.substring(_temp.length-1,_temp.length);
									addMain(_temp_1,$(this).attr('data-theme'),$(this).find('font').html(),_temp_2);	
									addOrDelShort(4,$(this).attr('data-key'),$(this).attr('data-theme'));
									eachSaveShortOrder();								 
								}else{
									msg('最多只能选择6个！');
								}
							}
						}
					});
					$('.meSelect ul.meItem li span').on({
						click:function(e){
							var current=$(this);
							$('.meSelectColor').css({top:e.clientY-230,left:e.clientX-140}).show();
							$('.meSelectColor ul li').off().on({
								click:function(ev){
									var color='#'+$(this).attr('data-color');
									var theme=$(this).attr('data-theme');
									current.parent().attr('data-theme',theme);									
									current.parent().hasClass('isSelected') && $('.meMain ul li[data-rel-key="'+current.parent().attr('data-key')+'"]').find('.meMainItem').attr('class','meMainItem '+theme);
									current.css({background:color});
									updateShort(current.parent().attr('data-key'),theme);
									$('.meSelectColor').hide();
								}
							});
							e.stopPropagation();
						}
					});
				};
				var createWindow=function(opt,url,alt,height){
					if(!height || height==null || height=='') height=240;
					var tempArr=['<div class="isFloat" data-rel-opt="'+opt+'">'];
					tempArr.push('	<div class="meBar">');
					tempArr.push('		<span class="meBarTitle">'+alt+'</span>');
					tempArr.push('		<i class="fa fa-trash-o fa-bao-del"></i><i class="fa fa-arrows-v fa-bao-high"></i>');
					tempArr.push('	</div>');
					//'+APP_NAME+url+'
					tempArr.push('	<div class="meContentBody" data-height="'+height+'" style="height:'+height+'px"><iframe src="'+APP_NAME+url+'" frameborder="0"></iframe></div>');
					tempArr.push('</div>');
					var winObj=$(tempArr.join('')); 

					var a1=$('.isFloatColunm01').height();
					var b1=$('.isFloatColunm02').height();
					var c1=$('.isFloatColunm03').height()-278+1;

					var ff='01';
					
					if(a1==b1 && a1==c1){
						ff='01';
					}else if(a1>b1 && b1<=c1){
						ff='02';
					}else if(a1>b1 && b1>c1){
						ff='03';
					}else if(a1<b1 && a1<=c1){
						ff='01';
					}else if(a1<b1 && a1>c1){
						ff='03';
					}else if(a1==b1 && a1>c1){
						ff='03';
					}else if(a1==b1 && a1<=c1){
						ff='01';
					} 

					//console.log(a1+'#'+b1+'#'+c1+'#'+ff);

					winObj.insertBefore($('.isFloatColunm'+ff+'Inner'));
								
					regWindowCloseEvent(winObj);
				};
				var addOrDelShort=function(pageId,key,theme){
					if(!theme) theme='isColor';
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?theme='+theme+'&sid='+key+'&pageId='+pageId+'&userId='+CURRENT_USERID,function(data){});
				};
				var updateShort=function(key,theme){
					if(!theme) theme='isColor';
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?theme='+theme+'&sid='+key+'&pageId=5&userId='+CURRENT_USERID,function(data){});
				};
				var updateShortOrder=function(sids,orders){
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?orders='+orders+'&sids='+sids+'&pageId=6&userId='+CURRENT_USERID,function(data){});
				};
				var addOrDelRescource=function(pageId,rid){
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?rid='+rid+'&pageId='+pageId+'&userId='+CURRENT_USERID,function(data){});
				};
				var updateRescourceOrder=function(rids,orders){
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?orders='+orders+'&rids='+rids+'&pageId=9&userId='+CURRENT_USERID,function(data){});
				};
				var updateRescourceHeight=function(rid,height){
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?height='+height+'&rid='+rid+'&pageId=a1&userId='+CURRENT_USERID,function(data){});
				};
				var eachSaveShortOrder=function(){
					var a=[],b=[];
					$('.meMain ul li').each(function(i){
						var key=$(this).attr('data-rel-key');
						if(key){
							a.push(key);
							b.push(i);
						}
					})
					updateShortOrder(a.join(','),b.join(','));
				};
				var eachSaveResourceOrder=function(){
					var a=[],b=[];
					/*$('.meContent .isFloat').each(function(i){
						var key=$(this).attr('data-rel-opt');
						if(key){
							a.push(key);
							b.push(i);
						}
					});*/
					var c0=[],order=0;;
					var c1=$('.isFloatColunm01 .isFloat').size();
					var c2=$('.isFloatColunm02 .isFloat').size();
					var c3=$('.isFloatColunm03 .isFloat').size();
					c0.push(c1);
					c0.push(c2);
					c0.push(c3);
					c0.sort(function(a,b){return b-a;});										
					for(var i=0;i<c0[0];i++){
						var aaa=$('.isFloatColunm01 .isFloat')[i];
						var bbb=$('.isFloatColunm02 .isFloat')[i];
						var ccc=$('.isFloatColunm03 .isFloat')[i];
						if(aaa && $(aaa).attr('data-rel-opt')){
							order++;
							b.push(order);
							a.push($(aaa).attr('data-rel-opt'));
						}
						if(bbb && $(bbb).attr('data-rel-opt')){
							order++;
							b.push(order);
							a.push($(bbb).attr('data-rel-opt'));
						}
						if(ccc && $(ccc).attr('data-rel-opt')){
							order++;
							b.push(order);
							a.push($(ccc).attr('data-rel-opt'));
						}
					}
					updateRescourceOrder(a.join(','),b.join(','));
				};
				var init=function(){
					$('.meMain ul').sortable({
						items: 'li:not(.isLast)',
						axis: 'x',
						cursor: 'move',
						delay:250,
						stop:function(e,ui){
							eachSaveShortOrder();
						}
					});
					$('.meContent').sortable({
						items: 'div.isFloat:not(.isFloatLast)',						
						cursor: 'move',
						delay:250,
						stop:function(e,ui){
							eachSaveResourceOrder();
						}
					});
					$('.meContentBodyButton').on({
						click:function(e){
							$('.meFullDiv').css({'z-index':1005}).show();
							var ex=[];
							$('.isFloat').each(function(){
								if($(this).attr('data-rel-opt')){
									ex.push($(this).attr('data-rel-opt'));
								}
							});							
							var b=[],dataR=RESOURCE_ARR;
							for(var i=0;i<dataR.length;i++){
								var str='';
								if(ex.contains(dataR[i].resource_id)){
									str='【已添加】';
								}
								b.push('<option data-opt="'+dataR[i].resource_id+'" data-url="'+dataR[i].url+'" data-alt="'+dataR[i].name+'">'+dataR[i].name+str+'</option>');
							}
							$('.meSelectIsSelect').empty().append(b.join(''));
							$('.meSelectWindow').show();
						}
					});
					$('.meSelectCloseWindow').on({
						click:function(e){
							$('.meFullDiv').css({'z-index':997}).hide();
							$('.meSelectWindow').hide();
						}
					});
					$('.meMain ul li.isLast').on({
						click:function(e){
							EDIT_FLAG=true;
							$('.meFullDiv').css({'z-index':997}).show();
							$('.meSelect').show();
						}
					});	
					$('.meSelectClose').on({
						click:function(e){
							EDIT_FLAG=false;
							$('.meFullDiv').hide();
							$('.meSelect').hide();
							$('.meSelectColor').hide();
						
						}
					});	
					$('.meSelectColorClose').on({
						click:function(e){
							$('.meSelectColor').hide();
						}
					});					
					$('.meSelectIsP span').on({
						click:function(e){
							var optObject=$('.meSelectIsSelect option:selected');
							var opt=optObject.attr('data-opt');
							var url=optObject.attr('data-url');
							var alt=optObject.attr('data-alt');
							if(opt){
								var len=$('.isFloat[data-rel-opt="'+opt+'"]').length;
								if(len==0){
									addOrDelRescource(8,opt);
									createWindow(opt,url,alt);									
									eachSaveResourceOrder();
									$('.meSelectCloseWindow').click();
								}else{
									msg('已存在，不要重复添加！');
								}
							}
						}
					});					
				};
				
				var initData=function(){	
					//当前				
					$.post(" <%=appName%>/getCurrentResourceForUserId.action?userId="+CURRENT_USERID,function(data){
						if(data.length>0){
							for(var i=0;i<data.length;i++){
								createWindow(data[i].resource_id,data[i].url,data[i].name,data[i].height);								
							}
						}
						//可选
						$.post('/framework/itsm/itsmhomepage/getResourceForRole.action?userId='+CURRENT_USERID,function(dataR){
							RESOURCE_ARR=dataR;
							/*var b=[];
							for(var i=0;i<dataR.length;i++){
								b.push('<option data-opt="'+dataR[i].resource_id+'" data-url="'+dataR[i].url+'" data-alt="'+dataR[i].name+'">'+dataR[i].name+'</option>');
							}
							$('.meSelectIsSelect').append(b.join(''));*/
						});
					});
					//当前
					$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?pageId=2&userId='+CURRENT_USERID,function(data){						
						var m2=[];
						if(data.length>0){							
							for(var i=0;i<data.length;i++){
								if(i>=6) break;
								m2.push(data[i].shortcut_id);
								addMain(data[i].shortcut_id,data[i].color,data[i].name,data[i].style);		
							}
						}
						//可选
						$.post('/framework/itsm/itsmhomepage/getShortcuteFunction.action?pageId=1&userId='+CURRENT_USERID,function(dataR){
							if(dataR.length>0){
								var a=[],b={};
								for(var i=0;i<dataR.length;i++){
									!b[dataR[i].tid]&&(b[dataR[i].tid]=[]);
									b[dataR[i].tid].push(dataR[i]);									
								}
								for(var c in b){
									if(b[c].length>0){
										a.push('<div>');
										a.push('	<p style="font-size:15px;font-weight:bold;">'+b[c][0].tname+'</p>');
										a.push('	<ul class="meItem">');
										for(var j=0;j<b[c].length;j++){
											a.push('	<li data-key="'+b[c][j].ksid+"-"+b[c][j].style+'"'+(m2.contains(b[c][j].ksid)?' class="isSelected"':'')+' data-theme="'+b[c][j].color+'"><font>'+b[c][j].sname+'</font><span class="isColor '+b[c][j].color+'"></span></li>');
										}
										a.push('	</ul>');
										a.push('</div>');
										a.push('<hr style="border:1px solid #ddd;"/>');
									}
								}
								$('.meSelect').append(a.join(''));
								initDataShortcutEvent();
							}
						});
					});
				};				
				$(window).resize(function() {
					resize();
				});
				setTimeout(function(){resize()},200);
				init();	
				initData();	
			});
		</script>
		<style type="text/css">
			.meBody{margin:0;padding:0;font: 12px Tahoma, Arial;background:#f0f0f0;  overflow: hidden;}
  			
  			.meMain{  position: fixed;  left: 0;  top: 0;  z-index: 1000;  width: 100%;}
  			.meMain ul{  padding: 0;  margin: 0; overflow: hidden; list-style-type: none;}
  			.meMain ul li{  float:left;width:15%;box-sizing: border-box;}
  			.meMain ul li.isLast{width:10%;cursor:pointer;}
  			.meMainItem,
  			.meMainItemLast{padding:5px;text-align:center;  overflow: hidden;  height: 80px;border:1px solid #ddd;  margin: 5px;background:#EF4820;}  			
  			.meMainItemLast{background:#fff;}
  			
  			.fa-bao-add{font-size: 50px;color: #ddd;padding-top: 15px;}
  			.fa-dongdd-add{color: #ddd;}
  			.fa-bao-add-max{font-size: 100px;color: #ddd;  margin-top: 70px;}
  			.fa-bao-del{float:right;  font-size: 16px;  color: #ddd;  padding: 0 5px;cursor:pointer;}
  			.fa-bao-high{float:right;  font-size: 16px;  color: #ddd;  padding: 0 5px;cursor:pointer;}
  			.fa-bao-del:hover,
  			.fa-bao-high:hover,
  			.fa-bao-add:hover,
  			.fa-bao-add-max:hover{color: #999;}
  			.fontStyle{font-size: 35px;  padding: 20px; text-shadow: 1px 1px 5px #000;  color: #fff; display: inline-block;cursor: pointer;}
  			.divlistStyle{text-align:left;display:none;}
  			.titleStyle{font-size: 15px;  font-weight: bold;color: #fff;} 			
  			.noresult{  text-align: center;  font-size: 14px;  color: #fff;  padding: 40px 0 0 0;  font-weight: bold;}
  			
  			.meSelect,.meSelectWindow{  position: fixed;  bottom: 0;  left: 0;  width: 100%;  height: 300px;  overflow-y: auto;  box-sizing: border-box;padding:5px;
  						background: #fff;display:none;  box-shadow: 0 0 10px #000;z-index:998;}
  			.meSelectWindow{z-index: 1008;}
  			.meSelect ul{padding: 0; width: 85%; margin: 0; overflow: hidden; list-style-type: none;}
  			.meSelect ul li{  width: 80px;float:left; text-align: center; position: relative; padding: 5px 40px;  border: 1px solid #959595;  margin: 5px 10px;cursor:pointer;}
  			.meSelect ul li span{  display: inline-block;    width: 20px;  height: 100%;  position: absolute;  right: 0;  top: 0;}
  			.isColor{background: #EF4820;}
  			.meSelect ul li:hover{border:1px solid #38f;}
  			.meSelect ul li.isSelected{background:#DDD9D9;}
  			
  			.meSelectColor div.meSelectColorClose,
  			.meSelectHigh div.meSelectHighClose,
  			.meSelect div.meSelectClose,
  			.meSelectWindow div.meSelectCloseWindow{ position: fixed;  right: 10px; font-size: 30px;  color: #999;  padding: 10px 20px;cursor:pointer;}
  			
  			.meSelectHigh div.meSelectHighClose,
  			.meSelectColor div.meSelectColorClose{position:absolute;right:5px;  top: 0;font-size: 22px;padding:0;}
  			
  			.meMsg{ width: 200px;  background: #eee;  border: 1px solid #f00;  font-weight: bold;  color: #38f;  text-align: center;  box-shadow: 0 0 10px #f00;  border-radius: 5px;
  					position: fixed;  bottom: 10px;  left: 50%;  margin-left: -100px;display:none;z-index:9999;}
  			.meMsg p{margin:5px;}
  			
  			.meContent{overflow: auto;height:400px;margin-top: 100px;}
  			.meContent .isFloat{padding:5px;box-sizing: border-box;position: relative;}
  			.meContent .isFloat div.meContentBody{  font-size: 0;border: 1px solid #ddd;background:#fff; height: 100%;  height: 240px;  padding: 0;}
  			.meContent .isFloat div.meContentBody iframe{width: 100%;  height: 100%; border:0;}
  			.meContent .isFloat div.meContentBodyButton{  text-align: center;cursor:pointer;}
  			.meContent .isFloat div.meBar{padding: 5px;  background: #fff;  border: 1px solid #ddd;  border-bottom: 0;}
  			.meContent .isFloat div.meBarLast span,
  			.meContent .isFloat div.meBarLast i{visibility: hidden;}
  			
  			.meFullDiv{width:100%;height:100%;z-index:997;position: fixed; display:none; top: 0;  left: 0;filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5;background: #000;}
  			
  			.meSelectIsP{text-align:center;}
  			.meSelectIsP p{  font-size: 20px;  padding: 5px;}
  			.meSelectIsP span{  display: inline-block; cursor:pointer; padding: 2px 40px;  background: #38f;  color: #fff;  border: 1px solid #126AE7;}
  			.meSelectIsP span:hover{background: #1B6CDD;}
  			.meSelectIsSelect{  font-size: 16px;  width: 400px; outline: none;  border: 2px solid #38f;}
  			
  			.meSelectColor{display:none;z-index: 999;padding: 20px 15px;position: fixed; background: #fff;border: 1px solid #ddd;  box-shadow: 0 0 10px #000;  border-radius: 5px;}
  			.meSelectColor ul{padding: 0;  margin: 0; overflow: hidden; list-style-type: none;}
  			.meSelectColor ul li{  float: left;  padding: 5px 10px;  border: 1px solid #959595;  margin: 5px 10px;  text-align: center;  cursor: pointer;  width: 100px;}  
  			.meCo01{background:#EF4820;}
  			.meCo02{background:#FD9731;}
  			.meCo03{background:#ECCB36;}
  			.meCo04{background:#07BE9C;}
  			.meCo05{background:#3E95C3;}
  			.meCo06{background:#3DA556;}
  			.meCo07{background:#398FE2;}
  			.meCo08{background:#E239CD;}
  			.meCo09{background:#E23980;}
  			.meCo10{background:#6378BA;} 	
  			
  			.meSelectHigh{display:none; position: fixed;border: 1px solid #ccc;  padding: 20px 15px;  top: 0;z-index: 1111;background: #fff;  left: 0;}		
  			.meSelectHigh ul{padding: 0;  margin: 0; overflow: hidden; list-style-type: none;    width: 305px;}
  			.meSelectHigh ul li{float:left;    width: 50px;  text-align: center; position: relative; padding: 5px 40px;  border: 1px solid #959595;  margin: 5px 10px;cursor:pointer;}
  			.meSelectHigh ul li:hover{border:1px solid #38f;}
  			.meSelectHigh ul li.isSelected{background:#DDD9D9;}
  			
  			.meSelectHigh ul li.meSelectHighLast{width:202px;}
  			.meSelectHigh ul li.meSelectHighLast input{outline:none;  border: 1px solid #38f;  padding: 2px 5px;}
  			
  			.isFloatColunm{width:33px;width:33.33%;float: left;min-height: 1px;}
		</style>
	</head>
	<body class="meBody">
		<div class="meMain">
			<ul>
				<li class="isLast">
					<div class="meMainItemLast">
						<i class="fa fa-plus fa-bao-add"></i>
					</div>
				</li>
			</ul>
		</div>	
		<div class="meContent">	
			<div class="isFloatColunm isFloatColunm01">
				<span class="isFloatColunm01Inner"></span>	
			</div>
			<div class="isFloatColunm isFloatColunm02">
				<span class="isFloatColunm02Inner"></span>
			</div>
			<div class="isFloatColunm isFloatColunm03">	
				<span class="isFloatColunm03Inner"></span>
				<div class="isFloat isFloatLast">					
					<div class="meBar meBarLast">
						<span class="meBarTitle">页面管理</span>
						<i class="fa fa-trash-o fa-bao-del"></i>
					</div>
					<div class="meContentBody meContentBodyButton">
						<i class="fa fa-plus fa-bao-add-max"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="meFullDiv"></div>
		<div class="meSelectWindow">
			<div class="meSelectCloseWindow"><i class="fa fa-close"></i></div>
			<div class="meSelectIsP">
				<p>请选择要添加的页面</p>
				<p>
					<select class="meSelectIsSelect" size="6"></select>
				</p>
				<p><span>添加</span></p>
			</div>
		</div>
		<div class="meSelect">
			<div class="meSelectClose"><i class="fa fa-close"></i></div>			
		</div>
		<div class="meSelectHigh">
			<div class="meSelectHighClose"><i class="fa fa-close"></i></div>
			<div>
				<ul>
					<li data-rel-height="200">200</li>
					<li data-rel-height="300">300</li>
					<li data-rel-height="400">400</li>
					<li data-rel-height="500">500</li>
					<li data-rel-height="600">600</li>
					<li data-rel-height="700">700</li>
					<li data-rel-height="800">800</li>
					<li data-rel-height="900">900</li>
					<li class="meSelectHighLast">其它：<input type="text" class="meSelectHighInput"/></li>
				</ul>
			</div>			
		</div>
		<div class="meSelectColor">
			<div class="meSelectColorClose"><i class="fa fa-close"></i></div>
			<ul>
				<li class="meCo01" data-theme="meCo01" data-color="EF4820">#EF4820</li>
				<li class="meCo02" data-theme="meCo02" data-color="FD9731">#FD9731</li>				
			</ul>
			<ul>				
				<li class="meCo03" data-theme="meCo03" data-color="ECCB36">#ECCB36</li>
				<li class="meCo04" data-theme="meCo04" data-color="07BE9C">#07BE9C</li>
			</ul>
			<ul>
				<li class="meCo05" data-theme="meCo05" data-color="3E95C3">#3E95C3</li>
				<li class="meCo06" data-theme="meCo06" data-color="3DA556">#3DA556</li>
			</ul>
			<ul>
				<li class="meCo07" data-theme="meCo07" data-color="398FE2">#398FE2</li>
				<li class="meCo08" data-theme="meCo08" data-color="E239CD">#E239CD</li>
			</ul>
			<ul>
				<li class="meCo09" data-theme="meCo09" data-color="E23980">#E23980</li>
				<li class="meCo10" data-theme="meCo10" data-color="6378BA">#6378BA</li>
			</ul>
		</div>
		<div class="meMsg"><p></p></div>
	</body>
</html>
