package dao;

import java.util.List;

public interface ItsmServiceHomepageResourceDao {
	
	/**
	 * @description �����û���ѯ��ǰ�Ѿ���������ҳ����Դ
	 * @param userId
	 * @return List<?>
	 * @author dong_wang 2017-7-31
	 */
	List<?> queryCurrentResourceByUserId(String userId);

}
