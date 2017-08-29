package java_test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;


import common.bo.SendMailBo;
import common.util.BeanUtil;
import common.util.PropertyUtil;

public class Test {
	
	static Logger log =Logger.getLogger(Test.class);
	public Test(){
	}
	
	
	public static void main(String[] args) throws IOException, IOException {
//		JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();  
//        // 设定mail server  
//        senderImpl.setHost("smtp.neusoft.com");  
//        senderImpl.setPort(587);
//        // 建立邮件消息  
//        SimpleMailMessage mailMessage = new SimpleMailMessage();  
//        // 设置收件人，寄件人 用数组发送多个邮件  
//        // String[] array = new String[] {"sun111@163.com","sun222@sohu.com"};  
//        // mailMessage.setTo(array);  
//        mailMessage.setTo("xiefei@neusoft.com");  
//        mailMessage.setFrom("dong-wang_neu@neusoft.com");  
//        mailMessage.setSubject("测试简单文本邮件发送！");  
//        mailMessage.setText(" 测试我的简单邮件发送机制！！");  
//  
//        senderImpl.setUsername("dong-wang_neu"); // 根据自己的情况,设置username  
//        senderImpl.setPassword("abc,123."); // 根据自己的情况, 设置password  
//  
//        Properties prop = new Properties();  
//        prop.put(" mail.smtp.auth ", " true "); // 将这个参数设为true，让服务器进行认证,认证用户名和密码是否正确  
//        prop.put(" mail.smtp.timeout ", " 25000 ");  
//        senderImpl.setJavaMailProperties(prop);  
//        // 发送邮件  
//        senderImpl.send(mailMessage);  
//  
//        System.out.println(" 邮件发送成功.. ");  
//		SendMailBo sendMailBo = (SendMailBo) BeanUtil.getBean("common.bo.send");
//		sendMailBo.sendMail("cs", "xx", "测试默认地址", new String[]{"xiefei@neusoft.com"});
		
//		Properties p=new Properties();
//		p.load(new FileInputStream("E:\\project-1.8\\WebContent\\WEB-INF\\conf\\log4j.properties"));
//		String location="C:\\log\\test.log";
//		p.put("log4j.appender.I.File",location);
//		PropertyConfigurator.configure(p);
//		System.out.println(p);
//		//PropertyConfigurator.configure("E:\\project-1.8\\WebContent\\WEB-INF\\conf\\log4j.properties");
//		
//		String dynamicLog="123-4";
		
		
		//System.out.println(PropertyUtil.getContextProperty("hibernate.driverClass"));
		
		
	
		//log.debug ( "debug" ) ;  

		//log.info ( "info" ) ;  

		//log.warn ("warn" ) ;  

		//log.error ( "error" ) ;
		//System.out.println(System.getProperty("webapp.root"));
		
	}
}
