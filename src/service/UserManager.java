package service;

import java.util.List;

import bean.UserForm;

public interface UserManager {
	
	public void regUser(UserForm user); 
	
	public List<?> queryAllData();
	
	
}
