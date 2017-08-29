package bo;

import java.util.List;

public interface ItsmServiceHomepageResourceBo {
	
	/**
	 * @description 根据用户查询当前已经设置在首页的资源
	 * @param userId
	 * @return List<?>
	 * @author dong_wang 2017-7-31
	 */
	List<?> queryCurrentResourceByUserId(String userId);

}
