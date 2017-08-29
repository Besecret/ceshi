package common.util;

import java.util.Map;

public class SqlConfig {

	private Map<String, String> sqlMap;

	public SqlConfig(Map<String, String> sqlMap) {

		this.sqlMap = sqlMap;
	}
	
	public String getSql(String sqlName, Map<String, String> map) {
		String sql = sqlMap.get(sqlName);
		if (map == null)
			return sql;

		for (String key : map.keySet()) {
			sql = sql.replace("$[" + key + "]", map.get(key));
		}
		return sql;
	}
	
	
}
