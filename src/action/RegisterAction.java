package action;
import java.util.List;
import com.opensymphony.xwork2.ActionSupport;  
import bean.UserForm;
import service.UserManager;
public class RegisterAction  extends ActionSupport{

	private static final long serialVersionUID = 1L;
	
	private UserForm user;  
	  
    private UserManager userManager;  
    
    private List<?>  list;
  
    public UserForm getUser() {  
        return user;  
    }  
  
    public void setUser(UserForm user) {  
        this.user = user;  
    }  
  
    public UserManager getUserManager() {  
        return userManager;  
    }  
  
    public void setUserManager(UserManager userManager) {  
        this.userManager = userManager;  
    }  
  
    
    public List<?> getList() {
		return list;
	}

	public String base() {  
    	 try {  
             userManager.regUser(user);  
             return SUCCESS;  
   
         } catch (Exception e) {  
             e.printStackTrace();  
             return ERROR;  
         }  
    }  
	
    public String queryAllData(){
   
         list= userManager.queryAllData();
    	 return SUCCESS;  
    }
    
    
    
}
