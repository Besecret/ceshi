package dao;

import java.util.List;

public interface UserDao {
	public void saveObject(Object obj);

	public Object queryAllData();
	public List<?> queryAllUser();

}
