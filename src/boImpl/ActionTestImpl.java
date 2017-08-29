package boImpl;

import java.util.List;
import bo.ActionTest;
import dao.UserDao;

public class ActionTestImpl implements ActionTest {
	
	private UserDao userDao;
	
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	@Override
	public Object queryAllData() {
		return	userDao.queryAllData();
	}

	@Override
	public List<?> queryAllUser() {
		// TODO Auto-generated method stub
		return userDao.queryAllUser();
	}
	


}
