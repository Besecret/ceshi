package daoImpl;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import dao.ZjTestDao;

@Repository(value = "zjTestDao")
public class ZjTestDaoImpl extends HibernateDaoSupport implements ZjTestDao {

	@Resource
	public void setSessionFactory0(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}

	@Override
	public List<?> queryAllUser() {
		String sql = "from User ";
		return this.getHibernateTemplate().find(sql);
	}

}
