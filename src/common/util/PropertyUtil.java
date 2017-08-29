package common.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.EmbeddedValueResolverAware;
import org.springframework.util.StringValueResolver;

public class PropertyUtil extends PropertyPlaceholderConfigurer implements EmbeddedValueResolverAware {

	private static Map<String, Object> ctxPropertiesMap;

	private static StringValueResolver stringValueResolver;
	
	protected void processProperties(ConfigurableListableBeanFactory beanFactoryToProcess, Properties props)
			throws BeansException {
		super.processProperties(beanFactoryToProcess, props);
		ctxPropertiesMap = new HashMap<String, Object>();
		for (Object key : props.keySet()) {
			String keyStr = key.toString();
			String value = props.getProperty(keyStr);
			ctxPropertiesMap.put(keyStr, value);
		}
	}

	public static Object getContextProperty(String name) {
		return ctxPropertiesMap.get(name);
	}

	public static Object setContextProperty(String name, Object value) {
		return ctxPropertiesMap.put(name, value);
	}

	/**
	 * ʹ��EmbeddedValueResolverAware���������ļ�
	 * 
	 **/

	@Override
	public void setEmbeddedValueResolver(StringValueResolver resolver) {
		stringValueResolver= resolver; 
	}
	

	public  static String  getPropertiesValue(String key) {
        StringBuilder name = new StringBuilder("${").append(key).append("}");
        System.out.println(name.toString());
        return stringValueResolver.resolveStringValue(name.toString());
    }
}
