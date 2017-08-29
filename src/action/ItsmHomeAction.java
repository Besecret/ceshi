package action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import bo.ItsmServiceHomepageResourceBo;
import org.apache.struts2.ServletActionContext;

public class ItsmHomeAction {
	
	private List<?> resourceForUserIdList;	
	private ItsmServiceHomepageResourceBo itsmServiceHomepageResourceBo;
		
	public void setItsmServiceHomepageResourceBo(ItsmServiceHomepageResourceBo itsmServiceHomepageResourceBo) {
		this.itsmServiceHomepageResourceBo = itsmServiceHomepageResourceBo;
	}

	public List<?> getResourceForUserIdList() {
		return resourceForUserIdList;
	}

	public String getCurrentResourceForUserId() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String userId = request.getParameter("userId");
		resourceForUserIdList = this.itsmServiceHomepageResourceBo.queryCurrentResourceByUserId(userId);
		return "success";
	}
	
	public String getShortcuteFunction() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String userId = request.getParameter("userId");
		String pageId = request.getParameter("pageId");
		String sid = request.getParameter("sid");
		String theme = request.getParameter("theme");
		String rid = request.getParameter("rid");
		String sids = request.getParameter("sids");
		String rids = request.getParameter("rids");
		String orders = request.getParameter("orders");
		String height = request.getParameter("height");
		if(pageId.equals("1")){
			//shortcutList=itsmServiceShortcutBo.queryShortcutByUserId(userId);
		}else if(pageId.equals("2")){
			//shortcutList=itsmServiceShortcutBo.queryCurrentShortcutByUserId(userId);
		}
		return height;
		
		
	}
	
	
}
