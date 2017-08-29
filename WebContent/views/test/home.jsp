<%@ page contentType="text/html; charset=UTF-8"%>
<%
	String appName = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+appName+"/";

%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<title></title>
		<script type="text/javascript" src="/jquery-3.2.1.min.js"></script> 
		
		<script type="text/javascript">

			$(function(){ 
				setTimeout(function(){
					$('.meIframeWindow').parent().css({overflow:'hidden'});
				},200);
			});
			
		</script>
		
		<style type="text/css">
			.meBodyWindow{padding:0;margin:0;}
			.meIframeWindow{border:0;width:100%;height:100%;}
		</style>
		
	</head>
	<body class="meBodyWindow">
		
		
	</body>
</html>
