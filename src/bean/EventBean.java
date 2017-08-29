package bean;

import commom.event.Event;

public class EventBean extends Event {

	private static final long serialVersionUID = 1L;
	
	private String eventType;
	
	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

}
