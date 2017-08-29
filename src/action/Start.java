package action;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.stereotype.Service;

import bo.ActionTest;
import bo.EventTest;
import bo.ZjTestBo;
import bo.Zoo;
import boImpl.ZjTestBoImpl;
import common.bo.SendMailBo;
import common.boImpl.SendMailBoImpl;
import common.util.BeanUtil;
import common.util.HibernateUtils;
import common.util.PropertyUtil;

import com.opensymphony.xwork2.ActionSupport;

import bean.User;

public class Start extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private List<?> rs;
	private ActionTest actionTest;
	private EventTest event;
	private PropertyUtil propertyUtil;
	//@Autowired
	@Resource(name="zoo")
	private Zoo zoo;
	
	@Resource(name="zjTestBo")

	//@Autowired
	private ZjTestBo zjTestBo;
	
	public List<?> getRs() {
		return rs;
	}
		
	public void setEvent(EventTest event) {
		this.event = event;
	}

	public ActionTest getActionTest() {
		return actionTest;
	}


	public void setActionTest(ActionTest actionTest) {
		this.actionTest = actionTest;
	}


	public String login() {
		return "success";
	}
	
	
	
//	public String returnRs() {
//
//		rs = new ArrayList<String>();
//		rs.add("string1");
//		rs.add("string2");
//
//		return "success";
//	}



	public void setPropertyUtil(PropertyUtil propertyUtil) {
		this.propertyUtil = propertyUtil;
	}

	public String testRs() throws IOException{
			
		//String out= zoo.toString();
		//System.out.print(out);
		//rs=(List<?>) actionTest.queryAllData();
		rs=zjTestBo.queryAllUser();
		  //  Session s1 = HibernateUtils.getCurrentSession();  
		    /**
	        s1.beginTransaction();  
	        
	        		User c1 = (User) s1.get(User.class, 1); // 从数据库中加载数据  
	        System.out.println(c1.getUserName());//此时才会发出SQL语句  
	        s1.getTransaction().commit();  
	        s1.close(); // 关闭session级别的一级缓存  
	  
	        Session s2 = HibernateUtils.getCurrentSession();  
	        s2.beginTransaction();  
	        User c2 = (User) s2.get(User.class, 1); // 因为有了二级缓存的存在，直接从二级缓存中取出即可  
	        System.out.println(c2.getUserName());  
	  
	         
	         
	  
	        s2.getTransaction().commit();  
	        s2.close();  
	
		 **/
		/**
		 * 字符编码测试,字符编码监控所以的request请求。
		 * HttpServletRequest request = ServletActionContext.getRequest();
		 * HttpServletResponse response = ServletActionContext.getResponse();
		 **/
		
		
		
		/**
		 * 当前工作空间测试
		 * 	System.out.println(System.getProperty("webapp.root"));
		 * 
		 **/
	
		/**
		 * 邮件测试
		 *SendMailBo sendMailBo = (SendMailBo) BeanUtil.getBean("common.bo.send");
		 *sendMailBo.sendMail("cs", "xx", "测试默认地址", new String[]{"xiefei@neusoft.com"});
		 */
		
		/**
		 * 事件发布者测试
		 * event.testEvent();
		 * 
		 **/
		
		
		/**
		 *  properties 文件获取测试  继承 PropertyPlaceholderConfigurer
		 *  此功能要在application-coomon.xml 声明bean
		 *  PropertyUtil.getContextProperty("hibernate.driverClass");
		 **/
		
		/** 获取property
		 * 	实现EmbeddedValueResolverAware
		 *  propertyUtil.getPropertiesValue("hibernate.driverClass");
		 */
		
		//PropertyUtil.getPropertiesValue("hibernate.driverClass");
		return "success";
	}
}
