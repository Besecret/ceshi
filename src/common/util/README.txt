/**
 * common.util 
 * 工具包类 
 **/


/**
 * 在web环境下，Spring的ApplicationContext是容器管理的（
 * 不仅管理been，还有properties属性文件
 **/

/**BeanUtil 读取xml文件**/

	WebApplicationContext webapplicationcontext = ContextLoader.getCurrentWebApplicationContext();
	return webapplicationcontext.getBean(beanName);

/**
 * PropertyUtil 读取properties 文件
 * (1) 继承 PropertyPlaceholderConfigurer
 * (2) 实现 EmbeddedValueResolverAware
 */



