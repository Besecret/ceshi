package serviceImpl;

import bean.User;
import bean.UserForm;
import dao.UserDao;
import service.UserManager;

import java.util.List;

import org.hibernate.HibernateException;

public class UserManagerImpl implements UserManager {

	private UserDao dao;

	public void setDao(UserDao dao) {
		this.dao = dao;
	}

	@Override
	public void regUser(UserForm userForm) throws HibernateException {
		User user = new User();
		user.setGender(userForm.getGender());
		user.setPassword(userForm.getPassword());
		user.setUserName(userForm.getUsername());

		// BeanUtils.copyProperties(userForm, user);
		dao.saveObject(user);
	}

	public List<?> queryAllData() {

		return (List<?>) dao.queryAllData();

	}

}
