package commom.event;

import org.springframework.context.ApplicationEvent;

public abstract class Event  extends ApplicationEvent {

	private static final long serialVersionUID = 1L;
	
	public Event() {		
		super(new Object());
	}
	
	public Event(Object obj){		
		super(obj);
	}
}
