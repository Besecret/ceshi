var _currentNodeOfSingleFrame, _currentNodesOfSingleFrame;
var menuCount = 0;
var maxHeight = 0;
var maxMenu = 0;
var searchMenuData = [];
var _currentSelectedPageId;//add
var _currentSelectedPageTitle;//add
var _favoriteMenuIds = [];//add 
var _currentClickNode;//add
//var infotipBrowserData = null;
function onAfterCloseChild(container) {
	if (container.getChildren().length == 0) {
		_currentNodeOfSingleFrame = null;
	}
}
// 保存当前的viewContext
// 1.清空当前的发布订阅。
function _saveCurrentViewContext(viewContext) {
	// 首先清空之前topics
	delete viewContext.topics;
	// 如果当前viewContext的topic缓存为null的话在解除订阅之前，首先缓存topic
	var topics = viewContext.topics = {};
	dojo
			.forEach(
					viewContext.instances,
					function(elem) {
						var _scribeHandles = window[elem[0]]._scribeHandles, contextTopic;
						if (topics[elem[0]] == null) {
							contextTopic = topics[elem[0]] = {};
						}
						if (_scribeHandles != null && _scribeHandles.length > 0) {
							_scribeHandles.reverse();
							while (_scribeHandles.length > 0) {
								var handle = _scribeHandles.pop();
								var topic = handle[0], listenerIndex = handle[1], f = (dojo._topics || dojo.global)[topic];
								if (!contextTopic[topic]) {
									contextTopic[topic] = [];
								}
								if (f && f._listeners && listenerIndex--) {
									contextTopic[topic]
											.push(f._listeners[listenerIndex]);
								}
								unieap.unsubscribe(handle);
							}
						}
					});
}
// 还原当前的viewContext
// 1.重新绑定当前页面发布订阅。
function _restoreCurrentViewContext(viewContext) {
	if (viewContext.topics != null) {
		var topics = viewContext.topics;
		for ( var context in topics) {
			var contextTopic = topics[context], _scribeHandles = window[context]._scribeHandles
			for ( var topic in contextTopic) {
				var listeners = contextTopic[topic];
				if (listeners != null && listeners.length > 0) {
					for ( var index = 0; index < listeners.length; index++) {
						_scribeHandles.push(unieap.subscribe(topic,
								listeners[index]));
					}
				}
			}
		}
	}
}
function onSelectNavigatorPane(/* Widget */page) {
	if (typeof (_currentNodeOfSingleFrame) !== "undefined"
			&& _currentNodeOfSingleFrame != null
			&& _currentNodeOfSingleFrame.id != page.id) {
//		var navigatorContainer = _currentNodeOfSingleFrame.getParentContainer();
//		// 非单帧情况不用走
//		if (typeof (navigatorContainer) != "undefined"
//				&& navigatorContainer != null
//				&& navigatorContainer.getChildren().length > 0) {
//			// 解除发布订阅之前页面的发布订阅
			var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
			if (viewContext) {
				_saveCurrentViewContext(viewContext);
			}
//		}
	}
	// 该数组为了存在XDialog的时候使用，记录当前的选中Tab页，以及弹出的多个Dialog
	// 能切换Tab页的时候，XDialog肯定已经关闭了,_currentNodesOfSingleFrame[0]记录当前选中的Tab页
	_currentNodesOfSingleFrame = [];
	_currentNodesOfSingleFrame.push(page);
	_currentNodeOfSingleFrame = page;
//	var navigatorContainer = _currentNodeOfSingleFrame.getParentContainer();
//	if (typeof (navigatorContainer) != "undefined") {
//		// 非单帧情况不用走
//		if (typeof (navigatorContainer) != "undefined"
//				&& navigatorContainer != null
//				&& navigatorContainer.getChildren().length > 0) {
			var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
			// 如果viewContext不存在，那么说明这个tab页刚打开
			if (viewContext) {
				_restoreCurrentViewContext(viewContext);
			}
//		}  
//	}
}
dojo.addOnLoad(function() {
			var appDeskTop = {
				id : unieap.appPath + "-" + "DeskTop",
				path : unieap.appPath + "/itsmhomepage/menu/home.jsp",
				label : "主页"
				//label : "桌面"
//				label : RIA_UNIEAPX_I18N.menu.desktop
			}, maxPage = 10, frameMenuContainer = unieap
					.byId("frameMenuContainer"), framePageContainer = unieap
					.byId("framePageContainer");
			navigatorContainerList = [];

			function loadMenus() {
				unieap.Action
						.requestData(
								{
									url : (unieap.WEB_APP_NAME + "/menuNavigatorProcessor!getRootMenusByAppId.action"),
									parameters : {
										appId : unieap.appName
									},
									load : function(dc) {
										try {
											dataCenter.addDataStore(dc
													.getDataStore("appTree"));
													
													
													
//											var tree = unieap.byId("collectMenuTree");
//											var root = tree.getRootNode();
//											tree.getBinding().setDataStore(root,dataCenter.getDataStore("appTree"));
											createMenuList();
											// createMyMenuList();
										} catch (e) {
										}
									}
								}, null, false);
			}
			
			// 加载收藏菜单 ，目的是判断导航上的星号标志 是否收藏 add  xiexq
			function loadFavoriteMenus(){
				unieap.Action.requestData( {
								url : (unieap.WEB_APP_NAME + "/menuProcessor!getMenuFavoriteTree.action"),
								sync : true,
								load : function(dc) {
									if (dc && dc.declaredClass == "unieap.ds.DataCenter"&& dc.getCode() >= 0) {
//								    	globalDataCenter.addDataStore("favoriteMenuDs",dc.getSingleDataStore());
								    	var ds = dc.getSingleDataStore();
								    	if(!ds){
								    		return;
								    	}
								    	var rowSet = ds.getRowSet();
								    	var row;
								    		for(var i = 0; i < rowSet.getRowCount();i++){
								    			row =rowSet.getRow(i);
								    			if(row.getItemValue("menuId")!= null){
								    				_favoriteMenuIds.push(row.getItemValue("menuId"));
								    			}
								    	}
								    }				
								}
							});
			}
			
			//针对手风琴的默认显示
			function showDefaultPane(pane){
				setTimeout(function() {
					if (pane.selected) frameMenuContainer.selectChild(pane);
				}, 0)
			}
			
			function createMenuList() {
				var store = dataCenter.getDataStore("appTree");
				var leftBar = $("#sidebar");
				store
						.getRowSet()
						.forEach(
								function(row, index) {
									if(unieap.bootstrapMenu){
										var li = $("<li></li>");
										var a = $("<a></a>");
										var icon = $("<div class=\"unieap_menu unieap_menu_icon\"></div>");
										var styleMenu = row.getItemValue("image");
										var title= $("<span>"+row.getItemValue("label") +"</span>");
										var num= $("<span class=\"badge badge-primary\"></span>");
										if(styleMenu){
											icon.addClass(styleMenu);
	//										num.addClass(styleMenu["num"]);
										}
										icon.appendTo(a);
										title.appendTo(a);
	//									num.appendTo(a);
										a.appendTo(li);
										li.appendTo(leftBar);
										var countMenu = store.getRowSet().getRowCount();
										maxHeight = $('.bodContent').height() - $('.navbar').height() -50-countMenu*29;
										maxMenu = maxHeight/25;
										createMenuTree(row,li);
									}else{
										var accordPane = new unieap.layout.AccordionPane(
											{
												title : row
														.getItemValue("label"),
												selected:row.getItemValue("isDefault"),
												iconClass : row
														.getItemValue("logoClass") || 'u-ngt-logo',
												onSelected : createAccordPaneMenuTree(row),
												onShow: showDefaultPane
											});
										var image = row.getItemValue("image");
										frameMenuContainer.addChild(accordPane);
										if (image!=null)
											accordPane.setIcon(unieap.WEB_APP_NAME+image);
										}
								});
			}
			
			function createAccordPaneMenuTree(row){
				var id = row.getItemValue("id");
				var rootID = row.getItemValue("rootId");
				var isDefault = row.getItemValue("isDefault");
				return function() {
					var menuPane = this;
					if (globalDataCenter.getDataStore(id)) {
						// 已经有这样的store
						var tree = unieap.byId(id);
						var ds = globalDataCenter.getDataStore(id);
						var rootNode = tree.getRootNode();
						var childNodes;
						
						if (rootNode){
							defaultMenuClick(tree,rootNode);
						}
					} else {
						unieap.Action
								.requestData( {
									url : (unieap.WEB_APP_NAME + "/menuNavigatorProcessor!getAllDescendantMenusById.action"),
									parameters : {
										parentId : id,
										appId : unieap.appName
									},
									load : function(dc) {
										globalDataCenter.addDataStore(dc
												.getDataStore(id));
										var tree = new unieap.tree.Tree( {
											binding : {
												'leaf' : 'leaf',
												'store' : dc.getDataStore(id),
												'label' : 'label',
												'parent' : 'parentId',
												query : {
													name : 'parentId',
													relation : '=',
													value : rootID
												}
											},
											id : id,
											getIconStyle:getIconStyle,
											onClick : clickMenuNode
										});
										menuPane.containerNode
												.appendChild(tree.domNode);
										
										var ds = globalDataCenter.getDataStore(id);
										var rootNode = tree.getRootNode();
										var childNodes;
										
										if (rootNode&&isDefault){
											defaultMenuClick(tree,rootNode);
										}
									}
								});
					}
				}
			}
			
			function createMenuTree(row,li) {
				var rowData = row.getData();
				rowData.icon = "unieap_search_menu unieap_menu_icon " + rowData.image;
				rowData.open = true;
				searchMenuData.push(row.getData());
				
				var _self = this;
				var id = row.getItemValue("id");
				var rootID = row.getItemValue("rootId");
				var isDefault = row.getItemValue("isDefault");
				var menuPane = this;
				if (globalDataCenter.getDataStore(id)) {
					// 已经有这样的store
					var ds = globalDataCenter.getDataStore(id);
					createMenuFor1(ds,li,id,_self)
				} else {
					unieap.Action
							.requestData( {
								url : (unieap.WEB_APP_NAME + "/menuNavigatorProcessor!getAllDescendantMenusById.action"),
								parameters : {
									parentId : id,
									sync:false,
									appId : unieap.appName
								},
								load : function(dc) {
									globalDataCenter.addDataStore(dc
											.getDataStore(id));
									var ds = dc.getDataStore(id);
									createMenuFor1(ds,li,id,_self);
								}
							});
				}
			}
			
			function createMenuFor1(ds,li,id,_self){
				var count = ds.getRowSet().getRowCount();
//				$(".badge",li).html(count);
				var treeData = ds.getRowSet().generateTreeSet({id:"id",parent:"parentId",label:"label",leaf:"leaf",root:id});
				var menuData = null;
				dojo.forEach(_self.searchMenuData,function(menuDataTemp){
					if(id == menuDataTemp.id){
						menuData = menuDataTemp;
						menuData.branch = [];
					}
				});
//				if(_self.maxHeight >0 && _self.maxMenu && _self.maxMenu<count){
//					createMenuFor2(menuData,treeData,li,_self.maxHeight);
//				}else{
//					createMenuFor2(menuData,treeData,li);
//				}
				createMenuFor2(menuData,treeData,li);
				_self.menuCount ++;
				if(_self.menuCount == menuCount){
				    var liHasUlChild = $('li').filter(function(){
				        return $(this).find('ul.acc-menu').length;
				    });
				    $(liHasUlChild).addClass('hasChild');
				}
			}
			
			function bindDropdownMenuClick(linkNode,data){
				linkNode.bind("click",data, $.proxy(function(event){
					var node = {};
				  	node.item = {};
				  	var data = {}
				  	node.item.data = event.data;
					clickMenuNode(node);
				}));
			}
			
			function bindInfotipBrowserClick(linkNode,childData){
				var data = dojo.clone(childData);
				linkNode.bind("click",data, $.proxy(function(event){
					
					var currenti=$(this).find("i");
					currenti.empty();
					if(linkNode[0].id != "_allInfoTip_page_"){							//点击时去掉原有样式，再插入一个新img图标进去
						var imageMenu=$("<img src='" + unieap.WEB_APP_NAME+"/techcomp/menu/source/images/email_open.png' style='float:right;'>");
						imageMenu.appendTo(currenti);
					}
					
					var selectId =  this.name;
					var topWin = unieap.getTopWin();
					var children = framePageContainer.getChildren();
					if (dojo.some(children, function(child) {
						if (child.pageId == "page_" + event.data.id) {
							pagePane = child;
							framePageContainer.selectChild(pagePane);
							if(topWin.clientBrowser){
								if(linkNode[0].id == "_allInfoTip_page_"){
									topWin.clientBrowser.refreshGrid();
								}else{
									topWin.clientBrowser.selectInfotip(selectId);
								}
							}
							return true;
						}
					})){
						return;
					}else{
						if(event.data && event.data.location){
							event.data.location = event.data.location+ "?infotipID=" + this.name;
						}
						var node = {};
					  	node.item = {};
					  	var data = {}
					  	node.item.data = event.data;
						clickMenuNode(node);
					}
				}));
			}
			
			function createMenuFor2(menuData,data,li,height){
				var ul = $("<ul class=\"acc-menu\"></ul>");
				if(height){
					ul.css({'height':height});
				}
				dojo.forEach(data.children,function(child){
					var childData = child.data;
					if(child.children && child.children.length>0){
						childData.open = true;
						childData.branch = [];
					}
					menuData.branch.push(childData);
					var liMenu = $("<li></li>");
					var aMenu = $("<a></a>");
					var labelMenu = $("<span>" + child.data.label +"</span>");
					labelMenu.appendTo(aMenu);
					aMenu.appendTo(liMenu);
					liMenu.appendTo(ul);
					if(child.data.leaf){
						aMenu.bind("click",child.data, $.proxy(function(event){
							var node = {};
						  	node.item = {};
						  	var data = {}
						  	node.item.data = event.data;
							clickMenuNode(node);
						}));
					}else{
						createMenuFor2(childData,child,liMenu);
					}
				});
				ul.appendTo(li);
			}
			
			//菜单节点图标样式
			function getIconStyle(item,opened,isExpandable){
				var image = item.data.image;
				if (image!=null&&image!='')
					return {backgroundImage: "url('"+unieap.WEB_APP_NAME+image+"')"};
				return false;
			}
			
			//菜单默认显示
			function defaultMenuClick(tree,parentNode){
				var childNodes = parentNode.getChildren();
				var childNode;
				for (var i=0;i<childNodes.length;i++){
					childNode = childNodes[i];
					if (childNode.getData().isDefault){
						if (childNode.isLeaf()){
							tree.setCurrentNode(childNode);
							tree.onClick(childNode);
						}
						else{
							tree.expandNode(childNode);
							defaultMenuClick(tree,childNode);
						}
					}
				}
			}
			
			// //创建自定义菜单
			// function createMyMenuList(){
			// frameMenuContainer.addChild(new unieap.layout.AccordionPane({
			// title: "单帧XHR加载页面",
			// iconClass: 'u-ngt-logo',
			// onSelected: function(){
			// var menuPane = this;
			// if(dataCenter.getDataStore("MyMenuList")){
			// //已经有这样的store
			// }else{
			// var ds = new unieap.ds.DataStore('MyMenuList',[{
			// parentID :'',leaf:true,label:'V4
			// view模型',id:'20111227v4',location:'/ria33demo/pages/xhrsamples/etbgk/etbgk-view.jsp'
			// }])
			// dataCenter.addDataStore(ds);
			// var tree = new unieap.tree.Tree({
			// binding:{
			// 'leaf':'leaf',
			// 'store':dataCenter.getDataStore("MyMenuList"),
			// 'label':'label',
			// 'parent':'parentID',
			// query:{name:'parentID',relation:'=',value:''}
			// },
			// onClick:clickMenuNode
			// });
			// menuPane.containerNode.appendChild(tree.domNode);
			// }
			// }
			// }));
			// }

			function onSelectTabPane(/* Widget */page) {
				
				_currentSelectedPageTitle= page.title;//add
				_currentSelectedPageId = page.pageId;//add
				if (typeof (_currentNodeOfSingleFrame) !== "undefined"
						&& _currentNodeOfSingleFrame != null
						&& _currentNodeOfSingleFrame.id != page.id) {
//					var navigatorContainer = _currentNodeOfSingleFrame.NavigatorContainer;
//					// 非单帧情况不用走
//					if (typeof (navigatorContainer) != "undefined"
//							&& navigatorContainer != null
//							&& navigatorContainer.getChildren().length > 0) {
						// 解除发布订阅之前页面的发布订阅
						var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
						if (viewContext) {
							_saveCurrentViewContext(viewContext);
						}
//					}
				}
				// 该数组为了存在XDialog的时候使用，记录当前的选中Tab页，以及弹出的多个Dialog
				// 能切换Tab页的时候，XDialog肯定已经关闭了,_currentNodesOfSingleFrame[0]记录当前选中的Tab页
				_currentNodesOfSingleFrame = [];
				_currentNodesOfSingleFrame.push(page);
				_currentNodeOfSingleFrame = page;
//				if (typeof (_currentNodeOfSingleFrame.NavigatorContainer) != "undefined") {
//					var navigatorContainer = _currentNodeOfSingleFrame.NavigatorContainer;
//					// 非单帧情况不用走
//					if (typeof (navigatorContainer) != "undefined"
//							&& navigatorContainer != null
//							&& navigatorContainer.getChildren().length > 0) {
						var viewContext = viewContextHolder[_currentNodeOfSingleFrame.id];
						// 如果viewContext不存在，那么说明这个tab页刚打开
						if (viewContext) {
							_restoreCurrentViewContext(viewContext);
						}
//					}
//				}
				dojo.forEach(navigatorContainerList, function(
						navigatorContainer) {
					navigatorContainer.hide();
				}, this);
				if(page.NavigatorContainer){
					page.NavigatorContainer.show();
			        onSelectNavigatorPane(page.NavigatorContainer.getSelectedTab());
			    }
			}
			// 判断当前节点是否已经收藏， add xiexq
			function isCollectMenuNode(node) {
		    	var data = node.item.data;
		    	var clickedMenuId = data["id"];
		    	for(var i = 0; i < _favoriteMenuIds.length; i++){
		    		if(clickedMenuId == _favoriteMenuIds[i]){
		    			return true;
		    		}
		    	}
		    	return false;
			}
			function clickMenuNode(node) {
				_currentClickNode = node;
				var data = node.item.data;
				var id = data["id"];
				if (framePageContainer.getChildren().length >= maxPage) {
					if(framePageContainer.hideTitle){
						var closePane = framePageContainer.getChildren()[0];
						if(closePane.isHome){
							framePageContainer.tablist.onCloseButtonClick(framePageContainer.getChildren()[1]);
						}else{
							framePageContainer.tablist.onCloseButtonClick(closePane);
						}
					}else{
						//判断超出打开最大菜单数的是不是已经打开的菜单，如果是的话不提示，跳到相应菜单。
						var children = framePageContainer.getChildren();
						if (dojo.some(children, function(child) {
							if (child.pageId == "page_" + id) {
								pagePane = child;
								framePageContainer.selectChild(pagePane);
								return true;
							}
						})){
							return;
						}else{
							MessageBox.alert( {
								//message : "打开菜单超过最大数！"
								message : RIA_UNIEAPX_I18N.menu.theMenuNumOverMax
							});
							return;
						}	
					}
				} 
				var time = new Date();
				beginTime = time.getTime();
				var menuPath = data["location"];
				var method = data["method"];
				if (!menuPath || menuPath == "null") {
					return;
				}
				;

				var pagePane = null;
				var children = framePageContainer.getChildren();
				if (dojo.some(children, function(child) {
					if (child.pageId == "page_" + id) {
						pagePane = child;
						framePageContainer.selectChild(pagePane);
						// pagePane.NavigatorContainer.show();
						return true;
					}
				}))
					return;
				var menuFlag = false;
				if (!pagePane) {
					pagePane = new unieap.layout.ContentPane( {
						title : data["label"],
						onClose : closeFun,
						onShow : onSelectTabPane,
						closable : true
					})
					pagePane.pageId = "page_" + id;
					menuFlag = true;
				}
				var url;
				if (menuPath.indexOf("http://")==0||menuPath.indexOf("https://")==0)
					url = menuPath;
				else
					url = unieap.WEB_APP_NAME + menuPath;
				var re = /(iframe\s*=\s*true\s*($|&))/ig;
				var r = menuPath.search(re);
				// 非单帧
				if (r != -1) {
					pagePane.href = url;
				}
				framePageContainer.addChild(pagePane);

				// 单帧
				if (r == -1) {
					UNIEAP_WIDGET_CONTEXT = "page_" + id;

					// ///////////////////////////
					dojo.require("unieapx.layout.NavigatorPane");
					dojo.require("unieapx.layout.NavigatorContainer");
					var navigatorContainer = new unieapx.layout.NavigatorContainer(
							{					
								id : "navigatorContainer" + data["id"],
								isCollectMenu:isCollectMenuNode(node),
								style : {
									height : '100%',
									width : '100%'
								}
							})
					navigatorContainer.placeAt(pagePane.containerNode, 'first')
							.startup();
					pagePane.navigatorContainerId = navigatorContainer.id;

					var navigatorPane = new unieapx.layout.NavigatorPane( {
						title : data["label"],
						onShow : onSelectNavigatorPane,
						href : url + (menuPath.indexOf("?") == -1 ? "?unieapMenuId=" + data["id"]: "&unieapMenuId=" + data["id"])
					// closable : true
							})
					navigatorContainer.addChild(navigatorPane);

					unieap.loader.load( {
						node : navigatorPane.containerNode,
						url : url + (menuPath.indexOf("?") == -1 ? "?unieapMenuId=" + data["id"]: "&unieapMenuId=" + data["id"]),
						method:method,
						_afterPageLoad:afterPageLoad
					});
					navigatorContainerList.push(navigatorContainer);
					pagePane.NavigatorContainer = navigatorContainer;
				}
				// unieap.loader.load({
				// node : pagePane.containerNode,
				// url : unieap.WEB_APP_NAME + menuPath
				// });
				if (menuFlag) {
					bindMenu(pagePane.controlButton.id);
				}
			}
			
			function afterPageLoad(){
				if(_favoriteMenuIds.length == 0){//菜单收藏，_favoriteMenuIds存储已经收藏过的菜单ID，只在第一次点击菜单时执行一次加载
					loadFavoriteMenus();// add 
				}
				// add 
				unieap.getCurrentNavigatorContainer().collectMenuStar(isCollectMenuNode(_currentClickNode));// 设置收藏图标的颜色
				
				var helptipBtn = unieap.byId("unieap_helptip_button");
				if(helptipBtn){
					var page = framePageContainer.getSelectedTab();
					helptipBtn.getAllCaseByMenuId(page.pageId.substring(5),function(cases){
						var helptip = dojo.byId("__UNIEAP_HELP__");
						if(cases){
							page.cases = cases;
							var size = cases.length;
							if(helptip){
								helptip.innerHTML = size;
							}
							helptipBtn.setDisabled(false);
						}else{
							helptip.innerHTML = "0";
							helptipBtn.setDisabled(true);
						}
					});
				}
			}

			var menuInstance;

			function bindMenu(domNode) {
				if (menuInstance) {
					menuInstance.bindDomNode(domNode);
				} else {
					dojo.require("unieap.menu.Menu");
					menuInstance = new unieap.menu.Menu({
						isSystemMenu:true
					});
					var item = new unieap.menu.MenuItem(
							{
								//label : "关闭当前",
								label : RIA_UNIEAPX_I18N.menu.closeCurrent,
								onClick : function() {
									var currentPane = framePageContainer.selectedChildWidget;
									menuInstance
											.unBindDomNode(currentPane.controlButton.id);
									framePageContainer.closeChild(currentPane);
								}
							});
					menuInstance.addChild(item);
					item = new unieap.menu.MenuItem(
							{
								//label : "关闭其他",
								label : RIA_UNIEAPX_I18N.menu.closeOther,
								onClick : function() {
									var children = framePageContainer
											.getChildren();
									var currentPane = framePageContainer.selectedChildWidget;
									for ( var i = 0, child = children[0]; child = children[i]; i++) {
										if (child != currentPane && !child.isHome) {
											menuInstance
													.unBindDomNode(child.controlButton.id);
											framePageContainer
													.closeChild(child);
										}
									}
								}
							});
					menuInstance.addChild(item);
					item = new unieap.menu.MenuItem(
							{
								//label : "关闭所有",
								label : RIA_UNIEAPX_I18N.menu.closeAll,
								onClick : function() {
									var children = framePageContainer
											.getChildren();
									for ( var i = 0, child = children[0]; child = children[i]; i++) {
										if(!child.isHome){
											menuInstance
											.unBindDomNode(child.controlButton.id);
											framePageContainer.closeChild(child);
										}
									}
								}
							});
					menuInstance.addChild(item);
					menuInstance.startup();
					menuInstance.bindDomNode(domNode);
				}
			}

			function addMyDeskTop() {
				var appPage = new unieap.layout.ContentPane( {
					title : appDeskTop.label,
					isHome:true
				});
				framePageContainer.addChild(appPage);
				var re = /(iframe\s*=\s*true\s*($|&))/ig;
				var r = appDeskTop.path.search(re);
				// 非单帧
				if (r != -1) {
					appPage.setHref(appDeskTop.path);
				}else{
					setTimeout(function() {
						UNIEAP_WIDGET_CONTEXT = "page_" + appPage.id;
						unieap.loader.load( {
							node : appPage.containerNode,
							url : appDeskTop.path
						});
					}, 1000);
				}
			}

			function updataNavigatorContainerList() {
				var tempList = [];
				while (navigatorContainerList.length > 0) {
					var navigaer = navigatorContainerList.shift();
					if (navigaer.domNode)
						tempList.push(navigaer);
				}
				while (tempList.length > 0) {
					navigatorContainerList.push(tempList.shift());
				}
			}

			function closeFun(tab, pane) {
				if(menuInstance){
					menuInstance.unBindDomNode(pane.controlButton.id);
				}
				// 菜单导航
				var isNavigator = pane.NavigatorContainer;
				if (isNavigator) {
					var children = pane.NavigatorContainer.getChildren();
					dojo.forEach(children, function(navigatorPane) {
						unieap.destroyWidgets(navigatorPane.containerNode);
						unieap.destroyDialogAndMenu(navigatorPane);
					});
					var closedChildren = pane.NavigatorContainer.closedNavigatorList;
					dojo.forEach(closedChildren, function(navigatorPane) {
						unieap.destroyWidgets(navigatorPane.containerNode);
						unieap.destroyDialogAndMenu(navigatorPane);
					});
				}
				var node = this.containerNode;
				unieap.destroyWidgets(node);
				unieap.destroyDialogAndMenu(pane);
				unieap.clearHelpSubscribe && unieap.clearHelpSubscribe(pane);
				if (isNavigator) {
					unieap.destroyWidget(pane.NavigatorContainer.id);
					updataNavigatorContainerList();
				}
				delete pane;
				if(tab.children && tab.children.length == 1){//add
					_currentSelectedPageId = null;	
				}
				return true;
			}
			
			if(!unieap.clickMenuNode){
				unieap.clickMenuNode = clickMenuNode;
			}
			loadMenus();
			//loadFavoriteMenus();// add by xiexq

			addMyDeskTop(); //在这个环境下 wwf框架存在问题
		});