/**
 * 主页快捷入口  CallBack 
 * tarStr:div-key
 * cnStr:font-key
 * arr:查询返回数据
 * id:meun菜单Id 
 * location:url路径
 * title:标题
 * returnData:传递数据
 * **/
var _callBack=function(tarStr,cntStr,arr,id,locationDetail,locationMore,_title,returnData){
	var st=[];
	var timeLimitLong;
	var timeLimit;
	var createTime;
	var createTimeLong;
	for(var i=0;i<arr.result.length;i++){
		st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');
		var title=arr.result[i].title;
		title=arr.result[i].title+'(' + arr.result[i].statusName+')';
		st.push('<style type="text/css"> .openItemDialogStyle{color: #38f;width: 100%;overflow: hidden;text-overflow: ellipsis;display: inline-block;}</style>');
	  	st.push('<div style="padding-bottom: 2px;"><nobr><a class = "openItemDialog openItemDialogStyle" data = '+i+' href="#" style="color:#38f;">'+title+'</a></nobr></div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+arr.result[i].business_no+'</div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+(arr.result[i].create_date).replace('T',' ')+'</div>');
		st.push('</div>');
		st.push('</div>');
		createTime = arr.result[i].create_date.toString();		
		if(createTime != '' && createTime != null){
			//createTimeLong =createTime.replace('T',' ');
			createTimeLong=Date.parse(new Date(createTime));			
			arr.result[i].create_date = createTimeLong;
		}
	}
  	if(arr.result.length > 0){
			st.push('<div>');
			st.push('<span class="showWorkItemMoreMyApp" style="width: 38px;height: 14px;background: url(../images/more.png) no-repeat center center;float:right;cursor:pointer;"></span>');
	  		st.push('</div>');
	}  
  	if(arr.result.length == 0){
			st.push('<div class="noresult">未找到结果</div>');
	}
  	$('.'+cntStr).html(arr.recordCount);
	$('.'+tarStr).empty();
	$('.'+tarStr).append(st.join(''));
	
   	/** 更多 **/
	_more('.'+tarStr+ " .showWorkItemMoreMyApp",id,locationMore,_title);	
	$('.'+tarStr+" .openItemDialog").on({
		click: function(e) {
			var idx = $(this).attr('data');
			var indexRow = arr.result[idx];			
			var timeLimit = indexRow.timeLimit;			
			var aaa=returnData(indexRow);			
			parent.UE.dialog({iconCloseComplete:false,title:'查看',height:'700',width:'950',url:"../.."+locationDetail,onComplete:function(data){
		  	}},returnData(indexRow));
	   	}
   });	  	

}

/** 备用 Callback hibernate 包装 **/
var _callBack_Sub=function(tarStr,cntStr,arr,id,locationDetail,locationMore,_title,returnData){
	var st=[];
	var timeLimitLong;
	var timeLimit;
	var createTime;
	var createTimeLong;
	for(var i=0;i<arr.result.length;i++){
		st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');
		var title=arr.result[i].title;
		title=arr.result[i].title+'(' + arr.result[i].statusName+')';
		st.push('<style type="text/css"> .openItemDialogStyle{color: #38f;width: 100%;overflow: hidden;text-overflow: ellipsis;display: inline-block;}</style>');
	  	st.push('<div style="padding-bottom: 2px;"><nobr><a class = "openItemDialog openItemDialogStyle" data = '+i+' href="#" style="color:#38f;">'+title+'</a></nobr></div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+arr.result[i].businessNo+'</div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+(arr.result[i].createDate).replace('T',' ')+'</div>');
		st.push('</div>');
		st.push('</div>');
		createTime = arr.result[i].createDate;
		if(createTime != '' && createTime != null){
			createTimeLong=Date.parse(new Date(createTime));			
			arr.result[i].create_date = createTimeLong;
		}
	}
  	if(arr.result.length > 0){
			st.push('<div>');
			st.push('<span class="showWorkItemMoreMyApp" style="width: 38px;height: 14px;background: url(../images/more.png) no-repeat center center;float:right;cursor:pointer;"></span>');
	  		st.push('</div>');
	}  
  	if(arr.result.length == 0){
			st.push('<div class="noresult">未找到结果</div>');
	}
  	$('.'+cntStr).html(arr.recordCount);
	$('.'+tarStr).empty();
	$('.'+tarStr).append(st.join(''));
	
   	/** 更多 **/
	_more('.'+tarStr+ " .showWorkItemMoreMyApp",id,locationMore,_title);	
	$('.'+tarStr+" .openItemDialog").on({
		click: function(e) {
			var idx = $(this).attr('data');
			var indexRow= arr.result[idx];
			console.log(indexRow);
			parent.UE.dialog({iconCloseComplete:false,title:'查看',height:'700',width:'950',url:"../.."+locationDetail,onComplete:function(data){
		  	}},returnData(indexRow));
	   	}
   });	  	

}
/** 备用包装问题待办 **/
var _callBack_problem=function(tarStr,cntStr,arr,id,locationDetail,locationMore,_title,returnData){
	var st=[];
	var timeLimitLong;
	var timeLimit;
	var createTime;
	var createTimeLong;
	for(var i=0;i<arr.result.length;i++){
		st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');
		var title=arr.result[i].title;
		title=arr.result[i].title+'(' + arr.result[i].statusName+')';
		st.push('<style type="text/css"> .openItemDialogStyle{color: #38f;width: 100%;overflow: hidden;text-overflow: ellipsis;display: inline-block;}</style>');
	  	st.push('<div style="padding-bottom: 2px;"><nobr><a class = "openItemDialog openItemDialogStyle" data = '+i+' href="#" style="color:#38f;">'+title+'</a></nobr></div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+arr.result[i].business_no+'</div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+(arr.result[i].create_date).replace('T',' ')+'</div>');
		st.push('</div>');
		st.push('</div>');
		createTime = arr.result[i].create_date;
		if(createTime != '' && createTime != null){
			createTimeLong=Date.parse(new Date(createTime));			
			arr.result[i].create_date = createTimeLong;
		}
	}
  	if(arr.result.length > 0){
			st.push('<div>');
			st.push('<span class="showWorkItemMoreMyApp" style="width: 38px;height: 14px;background: url(../images/more.png) no-repeat center center;float:right;cursor:pointer;"></span>');
	  		st.push('</div>');
	}  
  	if(arr.result.length == 0){
			st.push('<div class="noresult">未找到结果</div>');
	}
  	$('.'+cntStr).html(arr.recordCount);
	$('.'+tarStr).empty();
	$('.'+tarStr).append(st.join(''));
	
   	/** 更多 **/
	_more('.'+tarStr+ " .showWorkItemMoreMyApp",id,locationMore,_title);	
	$('.'+tarStr+" .openItemDialog").on({
		click: function(e) {
			var idx = $(this).attr('data');
			var indexRow= arr.result[idx];
			if(indexRow.appURL == null || indexRow.appURL == "") {
				MessageBox.alert( {
					title : "提示信息",
					message : '数据发生错误，请检查相关流程模版是否正确！',
					onComplete : function() {
					}
				});
				return;
			}
			var logo = "state=";
			var title = "";
			var appURL = "../../" + indexRow.appURL;
			var state = appURL.substr(appURL.indexOf(logo) + logo.length, appURL.length);
			switch(state)
			{
				case "1":
				  title = "问题确认与指派";
				  break;
				case "2":
				   title = "问题分析并解决";
				  break;
				case "3":
				   title = "评估并验证解决方案";
				  break;
				case "4":
				   title = "确认解决方案";
				  break;
				case "5":
				   title = "问题回顾";
				  break;
				case "6":
				   title = "关闭问题";
				   break;
			}
			
			parent.UE.dialog({iconCloseComplete:false,title:title,height:'700',width:'950',url:appURL,onComplete:function(data){
		  	}},returnData(indexRow,state));
	   	}
   });	  	

}
/** 包装请求待办**/
var _callBack_Sub_request=function(tarStr,cntStr,arr,id,locationDetail,locationMore,_title,returnData){
	var st=[];
	var timeLimitLong;
	var timeLimit;
	var createTime;
	var createTimeLong;
	for(var i=0;i<arr.result.length;i++){
		st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');
		var title=arr.result[i].title;
		title=arr.result[i].title+'(' + arr.result[i].statusName+')';
		st.push('<style type="text/css"> .openItemDialogStyle{color: #38f;width: 100%;overflow: hidden;text-overflow: ellipsis;display: inline-block;}</style>');
	  	st.push('<div style="padding-bottom: 2px;"><nobr><a class = "openItemDialog openItemDialogStyle" data = '+i+' href="#" style="color:#38f;">'+title+'</a></nobr></div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+arr.result[i].businessNo+'</div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+(arr.result[i].createDate).replace('T',' ')+'</div>');
		st.push('</div>');
		st.push('</div>');
		createTime = arr.result[i].createDate;
		if(createTime != '' && createTime != null){
			createTimeLong = new Date(createTime.replace('T',' ')).getTime();
			arr.result[i].createDate = createTimeLong;
		}
	}
  	if(arr.result.length > 0){
			st.push('<div>');
			st.push('<span class="showWorkItemMoreMyApp" style="width: 38px;height: 14px;background: url(../images/more.png) no-repeat center center;float:right;cursor:pointer;"></span>');
	  		st.push('</div>');
	}  
  	if(arr.result.length == 0){
			st.push('<div class="noresult">未找到结果</div>');
	}
  	$('.'+cntStr).html(arr.recordCount);
	$('.'+tarStr).empty();
	$('.'+tarStr).append(st.join(''));
	
   	/** 更多 **/
	_more('.'+tarStr+ " .showWorkItemMoreMyApp",id,locationMore,_title);	
	$('.'+tarStr+" .openItemDialog").on({
		click: function(e) {
			var idx = $(this).attr('data');
			var indexRow= arr.result[idx];
			var _cflag;
			var _random='random_'+new Date().getTime();
			
			parent.UE.dialog(
					{
						iconCloseComplete:false,
						title:'处理服务请求',
						height:'700',
						width:'950',
						url:'../../itsm/service/ItsmServiceRequestHandle-view.jsp',
						onComplete:function(data){
						}
					},{
					selectRows : [returnData(indexRow)],
				    _cflag:"xx",
				    call:function(dlg,dc,typeName,catalogueIdName){
				      
					     parent.UE.dialog( {
							iconCloseComplete : false,
							title : '新增',
							height : '700',
							width : '950',
							url : '../../itsm/service/ItsmEventRegister-view.jsp',
							onComplete : function(data) {
							    dlg._dialog.setReturn("xxxxx");
                                dlg._dialog.close();
							}
			              },{
			                 '_random':_random,
			                 id :dc.getRowSet().primary[0].id,
							 flag :"Transfer",
							 title:dc.getRowSet().primary[0].title,
							 type:dc.getRowSet().primary[0].type,
							 typeName:typeName,
							 catalogueId:dc.getRowSet().primary[0].catalogueId,
							 catalogueIdName:catalogueIdName,
							 phone:dc.getRowSet().primary[0].phone,
							 description:dc.getRowSet().primary[0].description,
						     _cflag:"xx"
			                 
			              
			                 });
					    
				    }			
					}
			);
								
	   	}
   });	  	

}
/** 在线服务人员**/
var service_callBack=function(tarStr,cntStr,arr){
	var st=[];
	var _online=[];
	var length=arr.length;
	var f=0;
	for(var p=0;p<length;p++){
		if(arr[p].loginFlag !="0"){
			_online[_online.length]=arr[p];
		
		}
	}
	arr=_online;
	length=arr.length;
	for(var i=0;i<arr.length;i++){
		st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');		
		var title=arr[i].name;
		title=arr[i].name+'(' + arr[i].roleName+')';
		st.push('<style type="text/css"> .openItemDialogStyle{color: #38f;width: 100%;overflow: hidden;text-overflow: ellipsis;display: inline-block;}</style>');
	  	st.push('<div style="padding-bottom: 2px;"><nobr>'+title+'</nobr></div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+'办公电话:'+((arr[i].officeTelephone==null)?"暂无":arr[i].officeTelephone)+'</div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+'邮箱:'+((arr[i].email==undefined)?"暂无":arr[i].email)+'</div>');
		st.push('</div>');
		st.push('</div>');
		
	}
  	if(arr.length == 0){
			st.push('<div class="noresult">暂无在线人员</div>');
	}

	$('.'+tarStr+ " .showWorkItemMoreMyApp");
  	$('.'+cntStr).html(length);
	$('.'+tarStr).empty();
	$('.'+tarStr).append(st.join(''));
	
}

/** 主页快捷入口 more **/
var _more =  function(selectObj,id,locationMore,_title){ 
  	$(selectObj).on({
      	  click: function(e) {
				var node = {};
				node.item = {};
				var data = {}
				var itemData = {
				  		attr1: null,
						attr2: null,
						id: id,
						image: "",
						isDefault: false,
						label: _title,
						leaf: true,
						location: locationMore,
						name: "1453376336108",
						parentId: "8a81852753c198020153c63075cb0023",
						rootId: "8a81852753c198020153c63075cb0023",
						title: _title
				};
				node.item.data = itemData;
				parent.window.unieap.clickMenuNode(node);
      	  }
	}) 
}

/** 事件待办 callback**/
var _append=function(tarStr,cntStr,arr){
	
	var st=[];
	var timeLimitLong;
  	var timeLimit;
  	var createTime;
	var createTimeLong;
	for(var i=0;i<arr.result.length;i++){
		st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');
		st.push('<style type="text/css"> .openItemDialogStyle{color: #38f;width: 100%;overflow: hidden;text-overflow: ellipsis;display: inline-block;}</style>');
	  	st.push('<div style="padding-bottom: 2px;"><nobr><a class = "openItemDialog openItemDialogStyle" data = '+i+' href="#" style="color:#38f;">'+arr.result[i].title+'</a></nobr></div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+arr.result[i].businessNo+'</div>');
		st.push('<div style="padding-bottom: 2px;color:#999;">'+(arr.result[i].createDate).replace('T',' ')+'</div>');
		st.push('</div>');
		timeLimit = arr.result[i].timeLimit;
		createTime = arr.result[i].createDate;
			if(timeLimit != '' && timeLimit != null){
				timeLimitLong = new Date(timeLimit.replace('T',' ')).getTime();
				arr.result[i].timeLimit = timeLimitLong;
			}
			if(createTime != '' && createTime != null){
			createTimeLong = new Date(createTime.replace('T',' ')).getTime();
			arr.result[i].createDate = createTimeLong;
		}
	}
	if(arr.result.length > 0){
		st.push('<div>');
		st.push('<span class="showWorkItemMore" style="width: 38px;height: 16px;background: url(../images/more.png) no-repeat center center;float:right;cursor:pointer;"></span>');
		st.push('</div>');
	}
	if(arr.result.length == 0){
		st.push('<div class="noresult">未找到结果</div>');
	}
	
	$('.'+cntStr).html(arr.recordCount);
	$('.'+tarStr).empty();
	$('.'+tarStr).append(st.join(''));
	
	//更多
	_more('.'+tarStr+ " .showWorkItemMore",'8a8185ee53f44e050153f455a9fe0004','/itsm/service/ItsmServiceWorkItem-view.jsp','事件处理');	
	//绑定弹出框事件	
	$('.'+tarStr+" .openItemDialog").on({
		click: function(e) {
			var idx = $(this).attr('data');
			var indexRow = arr.result[idx];
			if(indexRow.appURL == null || indexRow.appURL == "") {
				alert('数据发生错误，请检查相关流程模版是否正确！');
				return false;
			}			
			var logo = "state=";
			var inner = " ";
			var title = "";
			var appURL = "../../" + indexRow.appURL;
			var state = appURL.substr(appURL.indexOf(logo) + logo.length, appURL.length);
			switch(state)
			{
				case "0":
				  title = "服务台分析事件";
				  break;
				case "1":
				   title = "一线处理事件";
				  break;
				case "2":
				   title = "二线处理事件";
				  break;
				case "3":
				   title = "三线处理事件";
				  break;
				case "4":
				   title = "四线处理事件";
				  break;
				case "5":
				   title = "用户调查与反馈";
				   break;
				case "6":
				   title = "应急会议";
				  break;
				case "7":
				   title = "启动应急预案";
				  break;
				case "8":
				   title = "未启动应急预案";
				  break;
				case "9":
				   title = "重大事件确认";
				  break;
				case "10":
				   title = "上传分析报告";
				  break;
			}
			var addKnowledgeFun = function(refreshFun){
				var _random='random_'+new Date().getTime();
				parent.UE.dialog({iconCloseComplete:true,title:'转存知识库',max:false,height:'700',width:'1200',url:'../../itsm/service/ItsmServiceKnowledgeAddForEvent-view.jsp',onComplete:function(data){
					if(data=='ok'){//保存后关闭窗口
						UE.alt('添加成功');	
						refreshFun();				
					}
				}},{'_random':_random, 'row':indexRow});
			}
			parent.DialogUtil.showDialog({
				url : appURL,
				dialogData : {
					"row" : {data:indexRow},
					'islook':true,
					'state' : state,
					'addKnowledgeFun' : addKnowledgeFun
				},
				inner : inner,
				title : title,
				height: 700,
				width : 950,
				onComplete : function(data) {
					//代办
					myAppIncidentUndo();			
				},
				iconCloseComplete:true
			});
	   	}
   }); 
};
var _appendLook=function(tarStr,cntStr,arr){
  	var st=[];
  	var timeLimitLong;
  	var timeLimit;
  	var createTime;
  	var createTimeLong;
		for(var i=0;i<arr.result.length;i++){
			st.push('<div style="margin-bottom:1px;background:#fff;padding:5px;">');
			var title=arr.result[i].title;			
		    title=arr.result[i].title+'(' + arr.result[i].statusName+')';
	  		st.push('<div style="padding-bottom: 2px;"><a class = "openItemDialog" data = '+i+' href="#" style="color:#38f;">'+title+'</a></div>');
			st.push('<div style="padding-bottom: 2px;color:#999;">'+arr.result[i].businessNo+'</div>');
			st.push('<div style="padding-bottom: 2px;color:#999;">'+(arr.result[i].createDate).replace('T',' ')+'</div>');
			st.push('</div>');
			timeLimit = arr.result[i].timeLimit;
			createTime = arr.result[i].createDate;
			if(timeLimit != '' && timeLimit != null){
				timeLimitLong = new Date(timeLimit.replace('T',' ')).getTime();
				arr.result[i].timeLimit = timeLimitLong;
			}
			if(createTime != '' && createTime != null){
				createTimeLong = new Date(createTime.replace('T',' ')).getTime();
				arr.result[i].createDate = createTimeLong;
			}
		}
		if(arr.result.length > 0){
			st.push('<div>');			
			st.push('<span class="showWorkItemMore" style="width: 38px;height: 18px;background: url(../images/more.png) no-repeat center center;float:right;cursor:pointer;"></span>');			
	  		st.push('</div>');
		}  
		if(arr.result.length == 0){
			st.push('<div class="noresult">未找到结果</div>');
		}
		$('.'+cntStr).html(arr.recordCount);
		$('.'+tarStr).empty();
		$('.'+tarStr).append(st.join(''));
		_more('.'+tarStr+ " .showWorkItemMore",'8a8185ee53f44e050153f455a9fe0004','/itsm/service/ItsmServiceWorkItem-view.jsp','已办事件');
		//绑定弹出框事件
		$('.'+tarStr+" .openItemDialog").on({
			click: function(e) {
			var idx = $(this).attr('data');
			var indexRow = arr.result[idx];
			var timeLimit = indexRow.timeLimit;
			 parent.UE.dialog({iconCloseComplete:false,title:'查看',height:'700',width:'950',url:'../../itsm/service/ItsmEventRegisterReadOnly-view.jsp',onComplete:function(data){
		  	}},{'row':{data:indexRow},'islook':true});
	   	}
	   }) 
		
    };

/** 请求快捷入口**/

/**我的请求**/
var myAppRequest = function(key){	
	$.ajax({  
	     type : "post",  
	      url : parent.unieap.WEB_APP_NAME+'/itsm/service/queryServiceRequestbyId.action',  
	      data : {userId:parent.unieap.currentUserId},    
	      success : function(myAppList){
	    	  var id='8a81852c53f3b7640153f3bbe5930005';
	    	  var locationDetail='/itsm/service/ItsmServiceRequestHandle-view.jsp';
	    	  var locationMore='/itsm/service/ItsmServiceRequest-view.jsp';
	    	  var returnData=function(data){	
	    		  var datax={'data':data};
	    		  var _data=[];
	    		  _data[_data.length]=datax;
	    		  return {selectRows:_data,flag:'detail'};
	    	  }	  
	    	  _callBack_Sub('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,"我的请求",returnData);						
	      }  
	}); 		
} 

/** 我的请求待办 **/
var myAppRequestUndo = function(key){
    $.ajax({  
       type : "post",  
       url :  parent.unieap.WEB_APP_NAME+'/itsm/service/queryServiceRequestUndo.action',  
       data : {},    
       success : function(myAppList){   
    	   var id='8a81852c5419303e0154194a73050004';
    	   var locationDetail='/itsm/service/ItsmServiceRequestHandle-view.jsp';
    	   var locationMore='/itsm/service/ItsmServiceReception-view.jsp';
    	   var returnData=function(data){	  
    		   	
	    		  return {'data':data};
	       }	  
    	   _callBack_Sub_request('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'请求(待办)',returnData);						
       }  
    }); 		
} 

/** 我的请求已办 **/
var myAppRequestDo= function(key){
    $.ajax({  
      type : "post",  
      url : parent.unieap.WEB_APP_NAME+'/itsm/service/queryServiceRequestDo.action',  
      data : {},    
      success : function(myAppList){
    	  var id='8a81852c5419303e0154194a73050004';
    	  var locationDetail='/itsm/service/ItsmServiceRequestHandle-view.jsp';
    	  var locationMore='/itsm/service/ItsmServiceReception-view.jsp';
    	  var returnData=function(data){	    		  
    		  var datax={'data':data};
    		  var _data=[];
    		  _data[_data.length]=datax;
    		  return {selectRows:_data,flag:'detail'};
    	  }	  
    	  _callBack_Sub('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'请求(已办)',returnData);						
      }  
   }); 
} 

/**变更快捷入口**/

/**我的变更**/
var myAppChange = function(key){
    $.ajax({  
      type : "post",  
      url : parent.unieap.WEB_APP_NAME+'/itsm/change/queryServiceChangeById.action',  
      data : {userId:parent.unieap.currentUserId},    
      success : function(myAppList){ 
    	  var id='8a8185ee55b4a8920155b51aae320030';
    	  var locationDetail='/itsm/change/ItsmServiceChangeApprove-view.jsp';
   	      var locationMore='/itsm/change/ItsmServiceChangeBackground-view.jsp';
	   	  var returnData=function(data){	    		  
	   		  var _data={row:data,'readOnly':true};
	   		  return _data;
	 	  }	  
    	  _callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'我的变更',returnData);						
      }  
   }); 		
}       

/** 变更待办 **/ 
var myAppChangeUndo = function(key){
	$.ajax({  
	      type : "post",  
	      url : parent.unieap.WEB_APP_NAME+'/itsm/change/queryServiceChangeUndo.action',  
	      data : {},    
	      success : function(myAppList){  
	    	  var id='8a8185ee55bf49c10155bf4ac1320004';
	    	  var locationDetail='/itsm/change/ItsmServiceChangeApprove-view.jsp';
	    	  var locationMore='/itsm/change/ItsmServiceChangeWorkItem-view.jsp';
	    	  var returnData=function(data){	    		  
		   		  var _data={row:data,'fromPage':'handlePage','readOnly':'readOnly'};
		   		  return _data;
		 	  }	  
	    	  _callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'变更(待办)',returnData);					
	      }  
	}); 		
}  



/** 紧急变更待办 **/ 
var myAppChangeExigence = function(key){
	$.ajax({  
	     type : "post",  
	      url : parent.unieap.WEB_APP_NAME+'/itsm/change/queryServiceChangeExigence.action',  
	      data : {},    
	      success : function(myAppList){  
	    	  var id='8a8185ee55bf49c10155bf4ac1320004';
	    	  var locationDetail='/itsm/change/ItsmServiceChangeApprove-view.jsp';
	    	  var locationMore='/itsm/change/ItsmServiceChangeWorkItem-view.jsp';
	    	  var returnData=function(data){	    		  
	    		  var _data={row:data,'fromPage':'handlePage','readOnly':'readOnly'};
		   		  return _data;
		 	  }	  
	    	  _callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'紧急变更(待办)',returnData);				
	      }  
	}); 		
} 

/** 变更已办 **/
var myAppChangeDo = function(key){
	$.ajax({  
	     type : "post",  
	      url : parent.unieap.WEB_APP_NAME+'/itsm/change/queryServiceChangeDo.action',  
	      data : {},    
	      success : function(myAppList){
	    	  var id='8a8185ee55bf49c10155bf4ac1320004';
	    	  var locationDetail='/itsm/change/ItsmServiceChangeApprove-view.jsp';
	    	  var locationMore='/itsm/change/ItsmServiceChangeWorkItem-view.jsp';
	    	  var returnData=function(data){	    		  
		   		  var _data={row:data,'readOnly':true};
		   		  return _data;
		 	  }	  
	    	  _callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'变更(已办)',returnData);										
	      }  
	}); 		
}    

/** 我的问题快捷入口 **/

/**我的问题**/
var myAppProblem = function(key){
	$.ajax({  
	     type : "post",  
	      url :  parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/queryItsmServiceProblemById.action',  
	      data : {userId:parent.unieap.currentUserId},    
	      success : function(myAppList){ 
	    	   var locationMore='/itsm/service/ItsmProblemBackground-view.jsp';
	    	   var locationDetail='/itsm/service/ItsmProblemManager-view.jsp';
	    	   var id='8a8185e1550eb90f01550eba40a00004';
	    	   var returnData=function(data){	    		  
			   		  var _data={row:data,'readOnly':true,'fromBc':true};
			   		  return _data;
			   }	  
	    	   _callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'我的问题',returnData);					
	      }  
	}); 		
}

/** 我的问题待办 **/
var myAppProblemUndo = function(key){
	$.ajax({  
         type : "post",  
          url :  parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/queryItsmServiceProblemUndo.action',  
          data : {},    
          success : function(myAppList){  
        	  var id='8a8185ee5547780b015547819b070005';
        	  var locationDetail='/itsm/service/ItsmProblemManager-view.jsp';
        	  var locationMore='/itsm/service/ItsmServiceProblemWorkItem-view.jsp';
        	  var returnData=function(data,state){	    		  
		   		  var _data={row:data,fromPage:"handlePage",'state':state,readOnly:true};
		   		  return _data;
		      }	  
        	  _callBack_problem('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'问题(待办)',returnData);					
          }  
	}); 		
}   

/** 我的问题已办 **/
var myAppProblemDo = function(key){
	$.ajax({  
		type : "post",  
		url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/queryItsmServiceProblemDo.action',  
		data : {},    
		success : function(myAppList){  
			 var id='8a8185ee5547780b015547819b070005';
			 var locationDetail='/itsm/service/ItsmProblemManager-view.jsp';
       	     var locationMore='/itsm/service/ItsmServiceProblemWorkItem-view.jsp';
       	     var returnData=function(data){	    		  
		   		  var _data={row:data,'readOnly':true};
		   		  return _data;
		      }	  
       	    _callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'问题(已办)',returnData);								
		}  
	}); 		
}         
  
/** 发布快捷入口**/

/** 发布待办 **/
var myAppReleaseUndo = function(key){
	$.ajax({  
		type : "post",  
		url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/queryItsmServiceReleaseUndo.action',  
		data : {},    
		success : function(myAppList){  
			 var id='8a8185ee56103d54015610537dbc000d';
       	     var locationDetail='/itsm/change/ItsmServiceReleaseManager-view.jsp';
       	     var locationMore='/itsm/change/ItsmServiceReleaseWorkItem-view.jsp';
	       	  var returnData=function(data){	    		  
		   		  var _data={fromPage:"handlePage","row":data,readOnly:true};
		   		  return _data;
		      }	  
			_callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'发布待办',returnData);					
		}  
	}); 		
} 

/** 发布已办 **/
var myAppReleaseDo = function(key){
	$.ajax({  
		type : "post",  
		url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/queryItsmServiceReleaseDo.action',  
		data : {},    
		success : function(myAppList){  
			 var id='8a8185ee56103d54015610537dbc000d';
			 var locationDetail='/itsm/change/ItsmServiceReleaseManager-view.jsp';
			 var locationMore='/itsm/change/ItsmServiceReleaseWorkItem-view.jsp';
	       	  var returnData=function(data){	    		  
		   		  var _data={"row":data,readOnly:true};
		   		  return _data;
		      }	  
	       	_callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'发布已办',returnData);									
		}  
	}); 				
}

/**重大发布待办 **/
var myAppImportantReleaseDo = function(key){
	$.ajax({  
		type : "post",  
		url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/queryItsmServiceImportantReleaseUndo.action',  
		data : {},    
		success : function(myAppList){  
			 var id='8a8185ee56103d54015610537dbc000d';
			 var locationDetail='/itsm/change/ItsmServiceReleaseManager-view.jsp';
			 var locationMore='/itsm/change/ItsmServiceReleaseWorkItem-view.jsp';
	       	  var returnData=function(data){	    		  
	       		  var _data={fromPage:"handlePage","row":data,readOnly:true};
		   		  return _data;
		      }	  
	       	_callBack('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'重大发布已办',returnData);												
		}  
	}); 				
}

/**我的事件快捷入口**/

/**我的事件申请 **/
var myAppIncident = function(key){

	$.ajax({  
	     type : "post",  
	      url : parent.unieap.WEB_APP_NAME+'/itsm/service/queryItsmServiceIncidentHomePage.action',  
	      data : {pageNumber:1,pageSize:5},    
	      success : function(myAppList){ 
	    	  var id='8a8185ee53f3d0180153f3e554910004';
	    	  var locationDetail='/itsm/service/ItsmEventRegisterReadOnly-view.jsp';
	    	  var locationMore='/itsm/service/ItsmEventRegisterMain-view.jsp';  
	    	  var returnData=function(row){	    		
	    		  var data={'row':{data:row},'islook':true};	  
	    		  return data;
	    	  }	  
	    	  _callBack_Sub('divlist'+key,'font'+key,myAppList,id,locationDetail,locationMore,'事件登记',returnData);						
	      }  
	}); 
} 


/** 我的事件待办 **/
var myAppIncidentUndo = function(key) {
  	$.ajax({  
          type : "post",  
          url :  parent.unieap.WEB_APP_NAME+'/itsm/service/queryWorkItemInfo.action', 
          data : {procId:'F9219756-88B2-1486-7E13-EE8A1104A7E0,EB3E1887-3855-390F-B7D2-7A52CA45D1FA',state:'2',type:5,pageNumber:1,pageSize:5},  
          success : function(dataWorkFlowItem){	
        	  _append('divlist'+key,'font'+key,dataWorkFlowItem);
          }  
    }); 
}

/** 我的事件已办 **/
var myAppIncidentDo = function(key){
	$.ajax({  
         type : "post",  
          url : parent.unieap.WEB_APP_NAME+'/itsm/service/queryWorkItemInfo.action',  
          data : {procId:'F9219756-88B2-1486-7E13-EE8A1104A7E0,EB3E1887-3855-390F-B7D2-7A52CA45D1FA',state:'48',type:5,pageNumber:1,pageSize:5},  			         
          success : function(dataWorkFlowItemDone){  			        	  
        	  _appendLook('divlist'+key,'font'+key,dataWorkFlowItemDone);						
          }  
	}); 
}

/** 重大事件**/
var myAppIncidentImportant = function(key) {
	$.ajax({  
        type : "post",  
        url :  parent.unieap.WEB_APP_NAME+'/itsm/service/queryWorkItemInfo.action',  
        data : {procId:'F9219756-88B2-1486-7E13-EE8A1104A7E0,EB3E1887-3855-390F-B7D2-7A52CA45D1FA',important:'1',state:'2',type:5,pageNumber:1,pageSize:5},  
        success : function(dataWorkFlowItem){
        	_append('divlist'+key,'font'+key,dataWorkFlowItem);		
        }  
   }); 
}

/** 紧急事件**/
var myAppIncidentUrgency = function(key) {
	$.ajax({  
        type : "post",  
        url : parent.unieap.WEB_APP_NAME+'/itsm/service/queryWorkItemInfo.action',  
        data : {procId:'F9219756-88B2-1486-7E13-EE8A1104A7E0,EB3E1887-3855-390F-B7D2-7A52CA45D1FA',priorityName:'1级,2级',state:'2',type:5,pageNumber:1,pageSize:5},  
        success : function(dataWorkFlowItemUrgency){
        	_append('divlist'+key,'font'+key,dataWorkFlowItemUrgency);	
        }  
	}); 
}
/** 首页新增样式**/

/** 标签-请求 **/
var button_request=function(){
	var tempId=new Date().getTime();
	parent.UE.dialog(
				{
					iconCloseComplete:true,
					title:'添加服务请求',
					height:'700',
					width:'900',
					url:'../../itsm/service/ItsmServiceRequestManager-view.jsp',
					onComplete:function(data){
						if(data=="ok"){							
						}else{
						  /** 删除废弃附件**/
							$.ajax({  
						        type : "post",  
						        url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/deleteRequestAttachmentById.action',  
						        data : {id:tempId},  
						        success : function(dataWorkFlowItemUrgency){					       
						        }  
							}); 
						}
					}
				},{_xflag:'add',tempId:tempId}
	);
}
/** 标签-事件**/
var button_event=function(){
	var _random='random_'+new Date().getTime();
	parent.UE.dialog(
			{
				iconCloseComplete:true,
				title:'新增',
				height:'700',
				width:'950',
				url:'../../itsm/service/ItsmEventRegister-view.jsp',
				onComplete:function(data){
					if(data=='ok'){
						
					}else{						
						$.ajax({  
					        type : "post",  
					        url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/deleteItsmServiceIncidentAttachmentByRequestId.action',  
					        data : {'_random':_random},  
					        success : function(dataWorkFlowItemUrgency){					       
					        }  
						}); 
					}
				}
			},{'_random':_random,flag : "addFlag"}
	);	
}

/** 标签-问题**/
var button_problem=function(){
	var tempPid=new Date().getTime()+'random';
	parent.UE.dialog(
			{
				iconCloseComplete:true,
				title:'新增',
				height:'700',
				width:'950',
				url:'../../itsm/service/ItsmProblemManager-view.jsp',
				onComplete:function(data){					
					if(data=='ok'){
						
					}else{
						$.ajax({  
					        type : "post",  
					        url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/deleteItsmServiceProblemtAttachmentByProblemKey.action',  
					        data : {'tempPid':tempPid},  
					        success : function(dataWorkFlowItemUrgency){					       
					        }  
						}); 
					}
				}
			},{'tempPid':tempPid}
	);	
}

/** 标签-变更**/
var button_change=function(){
	var tempPid=new Date().getTime()+'random';
	parent.UE.dialog(
		{
			iconCloseComplete:true,
			title:'新增',
			height:'700',
			width:'950',
			url:'../../itsm/change/ItsmServiceChangeManager-view.jsp',
			onComplete:function(data){
				if(data && data.s && data.s=='ok'){
				}else{
					$.ajax({  
				        type : "post",  
				        url : parent.unieap.WEB_APP_NAME+'/itsm/itsmhomepage/deleteItsmServiceChangeAttachmentByChangeKey.action',  
				        data : {'tempPid':tempPid},  
				        success : function(dataWorkFlowItemUrgency){					       
				        }  
					}); 	
				}
			}
		},{'tempPid':tempPid,'flag':'add'}
	);
}
/** 在线客服 **/
var service_online=function(key){
	$.ajax({  
        type : "post",  
        url : parent.unieap.WEB_APP_NAME+'/itsm/service/queryServiceMan.action',  
        data : {},  
        success : function(data){	
        	service_callBack('divlist'+key,'font'+key,data);
        }  
	}); 	
}

var schedualResult = function(){
	//容易把浏览器搞死...
//	this.findParentObj = function(param, object_name){
//		var jsObject = param[object_name];
//		if(!jsObject) return arguments.callee(param['parent'], object_name);
//		else 		  return jsObject;
//	}
//	this.unieap = this.findParentObj(window, 'unieap');
	this.unieap = window.parent.unieap;
	this.unieap.clickMenuNode({
		item : {
			data : {
					id : '8a8185ee5b5adc0e015b5add4f9a0004',
					label: '个人排班信息',
					location: '/itsm/schedual/mockup/personal-index.jsp',
					title: '个人排班信息'
			}
		}
	});
}


