<%@ page contentType="text/html; charset=UTF-8"%>
<%
	String appName = request.getContextPath();
%>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href= "<%=appName%>/views/menu/icon/font-awesome-4.7.0/css/font-awesome.min.css" />
		<!-- 
		<script type="text/javascript" src="js/jquery.min.js"></script> -->
		<script type="text/javascript">
			var APP_NAME='<%=appName %>';
			
			/*var resize=function(){
				var h=$(window).height();
				var w=$(window).width();
				$('#meTable').css({'width':w,'height':h});
			};*/
			$(function(){ 
				/*$(window).resize(function() {
					resize();
				});
				setTimeout(function(){resize()},200);*/
				setTimeout(function(){
					$('.meIframeWindow').parent().css({overflow:'hidden'});
				},200);
			});
			console.log(URL);
		</script>
		<style type="text/css">
			.meBodyWindow{padding:0;margin:0;}
			.meIframeWindow{border:0;width:100%;height:100%;}
		</style>
		
	</head>
	<body class="meBodyWindow">
		<iframe class="meIframeWindow" src="<%=appName%>/views/menu/homeBody.jsp"></iframe>
	</body>
</html>
