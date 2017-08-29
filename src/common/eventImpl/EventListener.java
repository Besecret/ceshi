package common.eventImpl;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;

import bean.EventBean;


public class EventListener implements ApplicationListener {


	@Override
	public void onApplicationEvent(ApplicationEvent arg0) {
		
		if (arg0 instanceof EventBean) {
			
			EventBean bean=(EventBean) arg0;
			System.out.println(bean.getEventType());
		}
	}

}
