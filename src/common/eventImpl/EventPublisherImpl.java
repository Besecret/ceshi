package common.eventImpl;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import commom.event.Event;
import commom.event.EventPublisher;

public class EventPublisherImpl implements EventPublisher, ApplicationContextAware {
	private ApplicationContext context;

	public void setApplicationContext(ApplicationContext applicationcontext) throws BeansException {
		context = applicationcontext;
	}

	@Override
	public void publish(Event event) {

		context.publishEvent(event);

	}

}
