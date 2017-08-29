package common.util;

import java.util.Map;

public class SqlConfigUtil {
	
	public static String getSql(String configName, String sqlName, Map<String, String> map) {
		SqlConfig config = (SqlConfig) BeanUtil.getBean(configName);
		return config.getSql(sqlName, map);
	}
	
	public static String getSql(String configName, String sqlName) {
		return getSql(configName, sqlName, null);
	}
}
