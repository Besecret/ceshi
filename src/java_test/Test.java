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
//        // �趨mail server  
//        senderImpl.setHost("smtp.neusoft.com");  
//        senderImpl.setPort(587);
//        // �����ʼ���Ϣ  
//        SimpleMailMessage mailMessage = new SimpleMailMessage();  
//        // �����ռ��ˣ��ļ��� �����鷢�Ͷ���ʼ�  
//        // String[] array = new String[] {"sun111@163.com","sun222@sohu.com"};  
//        // mailMessage.setTo(array);  
//        mailMessage.setTo("xiefei@neusoft.com");  
//        mailMessage.setFrom("dong-wang_neu@neusoft.com");  
//        mailMessage.setSubject("���Լ��ı��ʼ����ͣ�");  
//        mailMessage.setText(" �����ҵļ��ʼ����ͻ��ƣ���");  
//  
//        senderImpl.setUsername("dong-wang_neu"); // �����Լ������,����username  
//        senderImpl.setPassword("abc,123."); // �����Լ������, ����password  
//  
//        Properties prop = new Properties();  
//        prop.put(" mail.smtp.auth ", " true "); // �����������Ϊtrue���÷�����������֤,��֤�û����������Ƿ���ȷ  
//        prop.put(" mail.smtp.timeout ", " 25000 ");  
//        senderImpl.setJavaMailProperties(prop);  
//        // �����ʼ�  
//        senderImpl.send(mailMessage);  
//  
//        System.out.println(" �ʼ����ͳɹ�.. ");  
//		SendMailBo sendMailBo = (SendMailBo) BeanUtil.getBean("common.bo.send");
//		sendMailBo.sendMail("cs", "xx", "����Ĭ�ϵ�ַ", new String[]{"xiefei@neusoft.com"});
		
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
