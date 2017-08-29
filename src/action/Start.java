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
	        
	        		User c1 = (User) s1.get(User.class, 1); // �����ݿ��м�������  
	        System.out.println(c1.getUserName());//��ʱ�Żᷢ��SQL���  
	        s1.getTransaction().commit();  
	        s1.close(); // �ر�session�����һ������  
	  
	        Session s2 = HibernateUtils.getCurrentSession();  
	        s2.beginTransaction();  
	        User c2 = (User) s2.get(User.class, 1); // ��Ϊ���˶�������Ĵ��ڣ�ֱ�ӴӶ���������ȡ������  
	        System.out.println(c2.getUserName());  
	  
	         
	         
	  
	        s2.getTransaction().commit();  
	        s2.close();  
	
		 **/
		/**
		 * �ַ��������,�ַ����������Ե�request����
		 * HttpServletRequest request = ServletActionContext.getRequest();
		 * HttpServletResponse response = ServletActionContext.getResponse();
		 **/
		
		
		
		/**
		 * ��ǰ�����ռ����
		 * 	System.out.println(System.getProperty("webapp.root"));
		 * 
		 **/
	
		/**
		 * �ʼ�����
		 *SendMailBo sendMailBo = (SendMailBo) BeanUtil.getBean("common.bo.send");
		 *sendMailBo.sendMail("cs", "xx", "����Ĭ�ϵ�ַ", new String[]{"xiefei@neusoft.com"});
		 */
		
		/**
		 * �¼������߲���
		 * event.testEvent();
		 * 
		 **/
		
		
		/**
		 *  properties �ļ���ȡ����  �̳� PropertyPlaceholderConfigurer
		 *  �˹���Ҫ��application-coomon.xml ����bean
		 *  PropertyUtil.getContextProperty("hibernate.driverClass");
		 **/
		
		/** ��ȡproperty
		 * 	ʵ��EmbeddedValueResolverAware
		 *  propertyUtil.getPropertiesValue("hibernate.driverClass");
		 */
		
		//PropertyUtil.getPropertiesValue("hibernate.driverClass");
		return "success";
	}
}
