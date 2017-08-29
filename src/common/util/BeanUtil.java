package common.util;

import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

public class BeanUtil {
	   public BeanUtil()
	    {
	    }

	    public static Object getBean(String s)
	    {
	        if(isEmpty(s))
	        {
	            return null;
	        } else
	        {
	            WebApplicationContext webapplicationcontext = ContextLoader.getCurrentWebApplicationContext();
	            return webapplicationcontext.getBean(s);
	        }
	    }

	    private static boolean isEmpty(String s)
	    {
	        return s == null || s.trim().equals("");
	    }
	
}
