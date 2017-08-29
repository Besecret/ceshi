package common.eventImpl;

import commom.event.Event;
import commom.event.EventPublisher;
import common.util.BeanUtil;

public class CommonEventPublisher {

	private static final String EVENT_PUBLISHER = "eventPublisher";
	
	public static void eventPublisher(Event event) {
		EventPublisher publisher = (EventPublisher) BeanUtil
				.getBean(EVENT_PUBLISHER);
		publisher.publish(event);
	}
}
