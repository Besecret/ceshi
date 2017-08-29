package cxf;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import bean.User;

public class HelloWorldClient {
	
	public static void main(String[] args) {  
        
		Resource resource= new FileSystemResource("D:\\eclipse\\1.8\\WebContent\\WEB-INF\\conf\\applicationContext-cxf.xml");     
        BeanFactory factory= new XmlBeanFactory(resource );
		//ApplicationContext factory = new ClassPathXmlApplicationContext("/");  
        HelloWorld client = (HelloWorld)factory.getBean("client");    
        User user = new User();  
        user.setUserName("马克思");  
        user.setPassword("怀念马克思");  
        System.out.println(client.sayHiToUser(user));  
          
    }  
}
