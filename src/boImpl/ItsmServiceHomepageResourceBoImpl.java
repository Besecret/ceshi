package boImpl;

import java.util.List;

import bo.ItsmServiceHomepageResourceBo;
import dao.ItsmServiceHomepageResourceDao;

public class ItsmServiceHomepageResourceBoImpl implements ItsmServiceHomepageResourceBo {

	private ItsmServiceHomepageResourceDao itsmServiceHomepageResourceDao;
		
	public void setItsmServiceHomepageResourceDao(ItsmServiceHomepageResourceDao itsmServiceHomepageResourceDao) {
		this.itsmServiceHomepageResourceDao = itsmServiceHomepageResourceDao;
	}

	@Override
	public List<?> queryCurrentResourceByUserId(String userId) {
		
		return this.itsmServiceHomepageResourceDao.queryCurrentResourceByUserId(userId);
	}

}
