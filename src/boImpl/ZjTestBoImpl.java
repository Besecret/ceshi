package boImpl;

import java.util.List;

import javax.annotation.Resource;


import org.springframework.stereotype.Service;

import bo.ZjTestBo;
import dao.ZjTestDao;

@Service("zjTestBo")
public class ZjTestBoImpl implements ZjTestBo {
	
	@Resource(name="zjTestDao")
	private ZjTestDao zjTestDao;

	@Override
	public List<?> queryAllUser() {
		// TODO Auto-generated method stub
		return zjTestDao.queryAllUser();
	}

}
