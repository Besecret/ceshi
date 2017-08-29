package daoImpl;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.orm.hibernate5.HibernateCallback;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;

import common.constants.Constants;
import common.util.SqlConfigUtil;
import dao.ItsmServiceHomepageResourceDao;

public class ItsmServiceHomepageResourceDaoImpl extends HibernateDaoSupport implements ItsmServiceHomepageResourceDao{

	@Override
	public List<?> queryCurrentResourceByUserId(String userId) {

		return (List<?>) this.getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException {
				
				String sql=SqlConfigUtil.getSql(Constants.SQL_CONFIG, "ItsmServiceHomepageResourceDao.queryCurrentResourceByUserId");
				Query<?>  query=session.createNativeQuery(sql);
				query.setParameter(1, userId);
				return query.list();
			}
		});
		
		
		
		
	}

}
