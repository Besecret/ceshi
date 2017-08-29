var infotipBrowserData = {
	id:"infotipBrowser",
	label:"消息浏览",
	location:"/techcomp/infotip/clientBrowser_entry.action"
}


$(function () {
	$('#search>form>button').click(function(event){
		event.preventDefault();
		event.stopPropagation();
	});
	
	$('#searchMenu').keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
		}
	});
	
//	 $.cookie('admin_leftbar_collapse', '');
	this.admin_leftbar_collapse = '';
	 $('body').on('click', 'ul.acc-menu a', function() {
		 	if($('body').hasClass('collapse-leftbar')){
		 		if($(this).closest('ul.acc-menu').hasClass("sidebar")){
		 			return;
		 		}
		 	}
	        var LIs = $(this).closest('ul.acc-menu').children('li');
	        var clickLi =  $(this).closest('li');
	        clickLi.addClass('clicked');
	        $.each( LIs, function(i) {
	            if( $(LIs[i]).hasClass('clicked') ) {
	                $(LIs[i]).removeClass('clicked');
	                return true;
	            }
	            if(this.admin_leftbar_collapse !== 'collapse-leftbar'|| $(this).parents('.acc-menu').length > 1) $(LIs[i]).find('ul.acc-menu:visible').slideToggle();
	            $(LIs[i]).removeClass('open');
	            var icon = $('>a>i',$(LIs[i]));
	            if(icon.hasClass('fa-folder-open')){
        			icon.removeClass('fa-folder-open');
        			icon.addClass('fa-folder');
        		}
	        });
	        if(!clickLi.hasClass('hasChild')){
		        $('.menuSelected',$('ul.acc-menu.sidebarMenu')).removeClass('menuSelected');
	        	$('>a>span',clickLi).addClass('menuSelected');
	        }
	        if($(this).siblings('ul.acc-menu:visible').length>0){
	        	$(this).closest('li').removeClass('open');
	        	if($(this).parent('.collectMenu')){
	        		var icon = $(this).children('i');
	        		if(icon.hasClass('fa-folder-open')){
	        			icon.removeClass('fa-folder-open');
	        			icon.addClass('fa-folder');
	        		}
	        	}
	        }
	        else{
	        	if($(this).parent('.collectMenu')){
	        		var icon = $(this).children('i');
	        		if($(this).closest('li>ul').children().length == 0){
	        			if($(this).closest('li').hasClass('open')){
	        				if(icon.hasClass('fa-folder-open')){
	    	        			icon.removeClass('fa-folder-open');
	    	        			icon.addClass('fa-folder');
	    	        		}
	        			}else{
	        				if(icon.hasClass('fa-folder')){
		        				icon.removeClass('fa-folder');
		        				icon.addClass('fa-folder-open');
		        			}
	        			}
	        		}else{
	        			if(icon.hasClass('fa-folder')){
	        				icon.removeClass('fa-folder');
	        				icon.addClass('fa-folder-open');
	        			}
	        		}
	        	}
	        	$(this).closest('li').addClass('open');
	        }
	            if(this.admin_leftbar_collapse !== 'collapse-leftbar'|| $(this).parents('.acc-menu').length > 1) $(this).siblings('ul.acc-menu').slideToggle({
	                duration: 200,
	                progress: function(){
	                    if ($(this).closest('li').is(":last-child")) { //only scroll down if last-child
	                        $("#sidebar").animate({ scrollTop: $("#sidebar").height()},0);
	                    }

	                },
	                complete: function(){
	                }
	            });
	    });
	 
    
	 
    var liHasUlChild = $('li').filter(function(){
        return $(this).find('ul.acc-menu').length;
    });
    $(liHasUlChild).addClass('hasChild');
    

//3D资产项目中不需要左侧菜单栏展开，所以点击展开，关闭的时间也不需要响应。
    $("a#leftmenu-trigger").click(function () {
    	
    	$(".collectMenu").hide();
        if ((window.innerWidth)<768) {
        	showLeftbar(true);
        } else {
        	showLeftbar(false);
        }
    });
    
    $("#dropdown_userinfo").hover(function (event) {
    	event.stopPropagation();
    	$("#dropdown-menu-userinfo").show(); 
    });
    
    $('#dropdown_userinfo').mouseleave(function(event) {
		$("#dropdown-menu-userinfo").hide(); 
    	event.stopPropagation();
    });
    
    
    $("#__UNIEAP_INFOTIP_TIPSNUM_TD__").hover(function (event) {
    	event.stopPropagation();
    	$("#dropdown-messagelist").show();
    	var lis=$("#dropdown_menu_list li").length;
		
		for(var i=0;i<lis;i++){
			var pbtime=$($(".time")["+i+"]).attr("name");
			var retime=getDateDiff(pbtime);
			$($(".time")["+i+"]).empty();
			$($(".time")["+i+"]).text(retime);
		}
	
   });
    	
   
    
    $('#__UNIEAP_INFOTIP_TIPSNUM_TD__').mouseleave(function(event) {
		hideInfotipDropMenu();
    	event.stopPropagation();
    });
    
    $('#refreshInfotipBtn').click(function(event){
    	refreshInfoTip();
    	$('html').off('mouseout',hideInfotipDropMenu);
    	event.stopPropagation();
    });
    
    $('#appsheaderbardropdown').click(function(event) {
    	if($('span',this).text()!=0){
    		$('#headerbar').css('top',0);
    	}else{
    		event.stopPropagation();
    	}
    });

    $('#appsheaderbardropdown').click(function(event) {
      $('html').one('click',function() {
        $('#headerbar').css('top','-1000px');
      });

      event.stopPropagation();
    });
    
    
    $(window).resize(function(){
    	if ((window.innerWidth)<768) {
            $("body").removeClass("show-leftbar");
            
        }
    	resizeBodyH();
    	resizeBodyW();
	});
    
 // Keep search open on click
 // -------------------------------
 $('#search>a').click(function (event) {
     $('#search').toggleClass('keep-open');
     $('#search>a i').toggleClass("opacity-control");
     if(!$('#search').hasClass('keep-open')){
    	 $(".searchMenu").hide();
     }
 });

 $('#fixedheader').click(function(){
	 var toggle = $('.toggle-inner',this)
	 var left = toggle.css("margin-left");
	 if(left == "-30px"){
		 setMenuTabStyle(false);
	 }else{
		 setMenuTabStyle(true);
	 }
 });
 
 
 $('.leftbarMenuChildTabAll').click(function (event) {
	 $(this).addClass("active");
	 $('.leftbarMenuChildTabCollect').removeClass("active");
	 $(".collectMenu").hide();
	 event.preventDefault();
	 event.stopPropagation();
 });
 
 $('.leftbarMenuChildTabCollect').click(function (event) {
	 $(this).addClass("active");
//	 $('>i',this).addClass("active");
	 $('.leftbarMenuChildTabAll').removeClass("active");
//	 $('.leftbarMenuChildTabAll>i').removeClass("active");
	 var collectMenu = $(".collectMenu");
	 collectMenu.css({'top':'80px'});
	 if($('#collectMenuPane>ul').length == 0){
		 createCollectMenu();
	 }
	 collectMenu.show();
	 event.preventDefault();
	 event.stopPropagation();
 });


	$("#_allInfoTip_page_").bind("click",infotipBrowserData, $.proxy(function(event){
		var framePageContainer = unieap.byId("framePageContainer");
		var children = framePageContainer.getChildren();
		if (dojo.some(children, function(child) {
			if (child.pageId == "page_" + event.data.id) {
				pagePane = child;
				framePageContainer.selectChild(pagePane);
				if(clientBrowser){
					clientBrowser.refreshGrid();
				}
				return true;
			}
		})){
			return;
		}else{
			unieap.open(event.data.location,event.data.id,event.data.label);
		}
	}));
 
})


var hideInfotipDropMenu = function(){
	$("#dropdown-messagelist").hide(); 
}
 

function setMenuTabStyle(hide){
	 var fixedheader =$('#fixedheader');
	 var toggle = $('.toggle-inner',fixedheader);
	 var slide = $('.toggle-slide',fixedheader);
	 var framePageContainer = unieap.byId("framePageContainer");
	 try{
		 if(hide){
			 slide.removeClass("active");
//		 toggle.css({"margin-left":"-30px"});
			 toggle.animate({
				 marginLeft:"-30px" 
			 },"normal");
			 framePageContainer._setHideTitle(true);
			 $.cookie('menu-tab-title', 'hide-menu-tab-title',{path:unieap.WEB_APP_NAME});
		 }else{
			 slide.addClass("active");
//		 toggle.css({"margin-left":"0px"});
			 toggle.animate({
				 marginLeft:"0px" 
			 },"normal");
			 framePageContainer._setHideTitle(false);
			 $.cookie('menu-tab-title', 'show-menu-tab-title',{path:unieap.WEB_APP_NAME});
		 }
	 }catch(e){
		 console.log("TabShowError");
	 }
}

function getHomePageForIconOnClick(){
	var framePageContainer = unieap.byId("framePageContainer");
		var children = framePageContainer.getChildren();
		for ( var i = 0, child = children[0]; child = children[i]; i++) {
			if (child.isHome) {
				framePageContainer.selectChild(child);
			}
		}
}


function getAllHelpForIconOnClick(){
	var helptipBtn = unieap.byId("unieap_helptip_button");
	if(helptipBtn && helptipBtn.cases && helptipBtn.cases.length>0){
		unieap.fireEvent(helptipBtn,helptipBtn._onButtonClick,[null]);
	}
}

function resizeBodyH(){
	var height = $('body').height() - 55;
	var sidebarHeight = $('body').height() - 145;
	var collectMenuHeight = $('body').height() - 135;
	var searchMenuHeight = $('body').height() - 95;
	$(".bodContent").css({'height':height});
	unieap.byId("framePageContainer").setHeight(height + "px");
	var childMenuContainerDiv = $('#childMenuContainerDiv');
	childMenuContainerDiv.css({'height':sidebarHeight});
	childMenuContainerDiv.slimscroll && $('#childMenuContainerDiv').slimscroll({
	  height: sidebarHeight + 'px',
	  color : '#666',
	});
	$('.collectMenu').css({'height':collectMenuHeight});
	$('.searchMenu').css({'height':searchMenuHeight});
}

function resizeBodyW(){
	var width = $('body').width() - $("#sidebar").width()-1;
	unieap.byId("framePageContainer").setWidth(width + "px");
	unieap.byId("framePageContainer").domNode.style.width = "";
}

function refreshInfoTip(){
	$('#dropdown_menu_list').empty();
	var waitLi = $("<li class='messagelist-forshort infotip_waitfor_li'></li>");
	var waitA = $("<a href='#'></a>");
	var waitText = $("<span class='infotip_waitfor_data'>正在加载数据...</span>");
	waitText.appendTo(waitA);
	waitA.appendTo(waitLi);
	waitLi.appendTo($('#dropdown_menu_list'));
	var dc = new unieap.ds.DataCenter();
	var parameters = "";
	var parameterTypes = "";
	var methodParameterTypes = "";
	dc.setParameter("_parameters", parameters);
	dc.setParameter("_parameterTypes", parameterTypes);
	// --过程调用--CommenMethod调用参数DC---BO方法部分
	dc.setParameter("_boId", "infotip_managementBO_bo");
	dc.setParameter("_methodName", "getInfotipDialogConfig");
	dc.setParameter("_methodParameterTypes", methodParameterTypes);
	// --过程调用--CommenMethod调用参数DC---请求URL
	var path = unieap.WEB_APP_NAME + "/techcomp/ria/commonProcessor!commonMethod.action";
		unieap.Action.requestData( {
			url : path + "?loginInfotipAction=true",
			sync : false,
			load : function(dc) {
				$(".infotip_waitfor_li",$("#dropdown_menu_list")).remove();
				enable = ("true" == dc.getParameter("enable"));
				// 设置右上角图标数字
//				$("#dropdown-messagelist").show(); 
				$.Set_UNIEAP_INFOTIP_TIPSNUM(dc.getParameter("unreadNum"));
			},
			error : function() {
			}
			}, dc,false);
	
}

dojo.addOnLoad(function(){
	resizeBodyH();
	resizeBodyW();
	if($.cookie('menu-tab-title') === 'hide-menu-tab-title') {
		setMenuTabStyle(true);
	}
});

//新消息闪烁标题
var infotipTimer = null;

function blinkTitleShow(){
	var step=0, _title = document.title,win = unieap.getTopWin();
  
    var timer = setInterval(function() {
        step++;
        if (step==3 && win.infotipTimer) {step=1};
        if (step==1 && win.infotipTimer) {document.title='【　　　】'+_title};
        if (step==2 && win.infotipTimer) {document.title='【新消息】'+_title};
                }, 500);
  
    return [timer, _title];
}

function blinkTitleClear(timerArr){
	if(timerArr) {
        clearInterval(timerArr[0]); 
        document.title = timerArr[1];
    };
}

var showLeftbar = function(isShow){
	if(isShow){
		$("body").toggleClass("show-leftbar");
	}else{
		 $("body").toggleClass("collapse-leftbar");
         if($("body").hasClass("collapse-leftbar")){
         	$("#childMenuContainerDiv").css({
         		"overflow":"visible"
         	});
         	$(".slimScrollDiv").css({
         		"overflow":"visible"
         	});
         }else{
         	$("#childMenuContainerDiv").css({
         		"overflow":"hidden"
         	});
         	$(".slimScrollDiv").css({
         		"overflow":"hidden"
         	});
         }
         $(".searchMenu").css({"display":"none"});
         resizeBodyW();
         //Sets Cookie for Toggle
         
         if(this.admin_leftbar_collapse !== 'collapse-leftbar') {
         	this.admin_leftbar_collapse = "";
         	$(".open").removeClass('open');
     		var icon = $('.collectMenu>li>a>i');
     		if(icon.hasClass('fa-folder-open')){
     			icon.removeClass('fa-folder-open');
     			icon.addClass('fa-folder');
     		}
         	$('ul.acc-menu').css({'visibility':'','display':''});
         } else {
             $.each($('.acc-menu'), function() {
                 if($(this).css('display') == 'none')
                     $(this).css('display', '');
             });
             
             $('ul.acc-menu:first ul.acc-menu').css('visibility', 'hidden');
             this.admin_leftbar_collapse= 'collapse-leftbar';
         }
	}
}

/////////////////////////////////换肤功能///////////////////////////////////
var _hideStyleDropMenu = function(){
	$("#dropdown-stylelist").hide(); 
}

function changeStyle(win,value,isIframe){
	if(!win.unieap) return;
	var dc = win.document;
	var upStyle = win.dojo.query("#upStyle")[0],
		upxStyle = win.dojo.query("#upxStyle")[0];
	var head = dc.getElementsByTagName("head")[0] || dc.documentElement;
	var isUniEAP = (!isIframe && win.unieap&&win.unieap.loader)?true:false;
	//修改unieap下面样式
	if(upStyle && upStyle.parentNode){
		if(isUniEAP) win.unieap.loader.setLoadedResources(upStyle.href,0);
		upStyle.parentNode.removeChild(upStyle);
  		if(win.dojo.query("#upStyle")[0]){
  			upStyle = win.dojo.query("#upStyle")[0];
  			upStyle.parentNode.removeChild(upStyle);
  		}
  		var upnewHref = unieap.WEB_APP_NAME + "/techcomp/ria/unieap/themes/" + value + "/css/unieap.css";
  		var uplink = dojo.create("link",{id:'upStyle', rel:'stylesheet', type:'text/css'});
  		head.insertBefore(uplink,win.dojo.query("#styleChangeAttachPoint")[0]);
  		uplink.href=upnewHref;
  		if(isUniEAP) win.unieap.loader.setLoadedResources(upnewHref,1);
	}
	//修改unieapx下面样式
	if(upxStyle && upxStyle.parentNode){
		if(isUniEAP) win.unieap.loader.setLoadedResources(upxStyle.href,0);
		upxStyle.parentNode.removeChild(upxStyle);
		if(win.dojo.query("#upxStyle")[0]){
  			upxStyle = win.dojo.query("#upxStyle")[0];
  			upxStyle.parentNode.removeChild(upxStyle);
  		}
		var upxnewHref = unieap.WEB_APP_NAME + "/techcomp/ria/unieapx/themes/" + value + "/css/unieapx.css";
		var upxlink = dojo.create("link",{id:'upxStyle', rel:'stylesheet', type:'text/css'});
  		head.insertBefore(upxlink,win.dojo.query("#styleChangeAttachPoint")[0]);
  		//upxlink.href=upxnewHref+"?time="+new Date();
  		upxlink.href=upxnewHref;
  		if(isUniEAP) win.unieap.loader.setLoadedResources(upxnewHref,1);
	}
}
//保存皮肤样式
function _saveSkin(value){
	var url=unieap.WEB_APP_NAME+ "/techcomp/ria/commonProcessor!commonMethod.action?t=" + new Date().getTime();
	var dc=new unieap.ds.DataCenter();
	dc.setParameter("_boId", "ria_skinBO_bo");
	dc.setParameter("_methodName", "setSkin");
	dc.setParameter("_methodParameterTypes", "java.lang.String,java.lang.String");
	dc.setParameter("appName", unieap.appName);
	dc.setParameter("skinValue", value);
	dc.setParameter("_parameters", "appName,skinValue");
	dc.setParameter("_parameterTypes", "string,string");
	unieap.Action.requestData({
		url:url,
		sync:false,
		load:function(dc){
			$.cookie(unieap.userAccount+"_defaultSkin", value, { expires: 7 ,path:unieap.WEB_APP_NAME});
		}
	},dc,false);//fasle表示不显示loading
}

//添加皮肤列表
function appendStyleList(skinStore){
	var rowSet = skinStore.getRowSet();
	var count = 0;
	rowSet.forEach(function(row){
		var name = row.getItemValue('name'),
			icon = row.getItemValue('icon'),
			value = row.getItemValue('value'),
			isCorner = row.getItemValue('isCorner');
		var liHtml = $("<li class='external'></li>"),
			aHtml = $("<a href='#' style='font-size:14px'></a>"),
			divHtml = $("<div class='fa'></div>");
		//皮肤名称
		aHtml[0].innerHTML = name;
		//存储皮肤value，用于标记当前皮肤
		aHtml[0].skinValue = value;
		if(count % 2 == 0){
			aHtml.css({"background-color":"#F3F6F7"});
		}
		count++;
		//添加icon背景
		divHtml.css({"background":icon});
		//是否圆角显示icon
		if(isCorner) {
			divHtml.addClass("fillet");
		}
		//添加icon样例
		divHtml.addClass("icon");
		
		//绑定点击事件
		liHtml.bind("click",value, $.proxy(function(event){
			_hideStyleDropMenu();
			changeStyle(unieap.getTopWin(),value);
			_saveSkin(value);
			var iframes = $("iframe");
			for(var i=0,len = iframes.length ; i<len ; i++){
				changeStyle(iframes[i].contentWindow,value,true);
			}
		}));
		aHtml.appendTo(liHtml);
		divHtml.appendTo(aHtml);
		liHtml.appendTo($("#dropdown-stylelist"));
		
	});
	$("#__UNIEAP_STYLE_NUM__").html(count);
}
dojo.addOnLoad(function(){
	$("#__UNIEAP_STYLE__").hover(function (event) {
		event.stopPropagation();
		$("#dropdown-stylelist").show();
		var currentSkin = $.cookie?$.cookie(unieap.userAccount+"_defaultSkin"):"";
		if(currentSkin){
			var currentSkinHtml = $("#currentSkinHtml_up");
			if(currentSkinHtml)
				currentSkinHtml.remove();
			currentSkinHtml = $("<div id='currentSkinHtml_up' class='up_current_skin'><i style='color:green' class='fa icon-ok-sign'></i></div>"); 
			var aHtmls = $("#dropdown-stylelist li a");
			for(var i = 0,len = aHtmls.length; i<len; i++){
				if(currentSkin == aHtmls[i].skinValue){
					currentSkinHtml.appendTo(aHtmls[i]);
					break;
				}
			}
			//currentSkinHtml.appendTo(liHtml);
		}
	});
	
	$('#__UNIEAP_STYLE__').mouseleave(function(event) {
		_hideStyleDropMenu();
		event.stopPropagation();
	});
	//添加皮肤列表
	var defaultPath = unieap.appPath + "/menu/source/images/";
	//name(在页面中显示的皮肤名称)   icon(皮肤的图标或缩略图可以是色值或者图片)  isCorner(是否圆角，建议色值采用圆角)  
	var skinStore = new unieap.ds.DataStore('skin_store', [
//	  		          	{value: 'mdp',name: '美的',icon:'#E0DFDF',isCorner:true},
//	  		          	{value: 'gainsboro1',name: '灰色风格',icon:"url(" + defaultPath+"Apple.png" + ")",isCorner:false},
//	  		          	{value: 'blueexpand',name: '经典淡蓝',icon:'#75b9e6',isCorner:true},
	  		          	{value: 'gainsboro',name: '优雅爵士',icon:'#E0DFDF',isCorner:true}
  		            ]);
	appendStyleList(skinStore);
	
	//设置默认左侧菜单栏不展开。
	showLeftbar(false);
});