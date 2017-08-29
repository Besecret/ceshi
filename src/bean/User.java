package bean;

public class User {
	
	  private String userId;

	    /**
	     * userName
	     */
	    private String userName;

	    /**
	     * password
	     */
	    private String password;

	    /**
	     * gender
	     */
	    private Integer gender;

	    public void setUserId(String userId) {
	        this.userId = userId;
	    }

	    public String getUserId() {
	        return userId;
	    }

	    public void setUserName(String userName) {
	        this.userName = userName;
	    }

	    public String getUserName() {
	        return userName;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setGender(Integer gender) {
	        this.gender = gender;
	    }

	    public Integer getGender() {
	        return gender;
	    }
}
