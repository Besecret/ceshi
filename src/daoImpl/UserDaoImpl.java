package daoImpl;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.orm.hibernate5.HibernateCallback;
//import org.hibernate.Session;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import bean.User;
import common.constants.Constants;
import common.util.SqlConfigUtil;
import dao.UserDao;

public class UserDaoImpl extends HibernateDaoSupport implements UserDao {  
	  
	
    @Override  
    public void saveObject(Object obj) throws HibernateException { 

     	this.getHibernateTemplate().save(obj);
     	
 
    }

	@Override
	public Object queryAllData() {
	
		return this.getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException {
				
				String sql=SqlConfigUtil.getSql(Constants.SQL_CONFIG, "UserDaoImpl.queryAllData");
				Query<?> query = session.createQuery(sql).setCacheable(true);		
				Query<?> query2 = session.createQuery(sql).setCacheable(true);
				query2.list();
				return query.list();
			}
		});
		
	}

	@Override
	public List<?> queryAllUser() {
		String sql="from User ";
		String sql2="from User ";	
		Session session = getHibernateTemplate().getSessionFactory().openSession();
		Query<?> query = session.createQuery(sql).setCacheable(true);
		Query<?> query2 = session.createQuery(sql2).setCacheable(true);
		query2.list();
		return query.list();
		
	}  
  
} 
