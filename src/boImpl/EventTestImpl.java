package boImpl;

import bean.EventBean;
import bo.EventTest;
import common.eventImpl.CommonEventPublisher;

public class EventTestImpl implements EventTest {

	@Override
	public void testEvent() {
		
		EventBean event=new EventBean();		
		event.setEventType("o-ne");
		CommonEventPublisher.eventPublisher(event); 
		
	}

}
