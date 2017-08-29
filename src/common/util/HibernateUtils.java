package common.util;

import java.io.Serializable;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {
	private static SessionFactory sessionFactory;

	private HibernateUtils() {
	}

	static {
		/**
		 * configure()����Ϊ��Ĭ�ϲ���classesĿ¼��hibernate.cfg.xml
		 * configure("�ļ���")Ҳ�����ط�����������Ϊ�����ļ���
		 */
		sessionFactory = new Configuration().configure().buildSessionFactory();
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	/**
	 * �����ʹ��sessionFactory.getCurrentSession()�����Sessionʱ����Ҫ�������ļ������һ�䣺
	 * <!-- �������� ��ֹʹ��sessionFactory.getCurrentSession()ʱ����"org.hibernate.HibernateException: No CurrentSessionContext configured!"--> 
	 * <property name="hibernate.current_session_context_class">thread</property>
	 * @return
	 */
	public static Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}
	public static Session getNewSession() {
		return sessionFactory.openSession();
	}
	public static void add(Object entity) {
		Session s = null;
		Transaction tx = null;
		try {
			s = HibernateUtils.getNewSession();
			tx = s.beginTransaction();
			s.save(entity);
			tx.commit();
		} finally {
			if (s != null)
				s.close();
		}
	}

	public static void update(Object entity) {
		Session s = null;
		Transaction tx = null;
		try {
			s = HibernateUtils.getNewSession();
			tx = s.beginTransaction();
			s.update(entity);
			tx.commit();
		} finally {
			if (s != null)
				s.close();
		}
	}

	public static void delete(Object entity) {
		Session s = null;
		Transaction tx = null;
		try {
			s = HibernateUtils.getNewSession();
			tx = s.beginTransaction();
			s.delete(entity);
			tx.commit();
		} finally {
			if (s != null)
				s.close();
		}
	}

	public static Object get(Class clazz, Serializable id) {
		Session s = null;
		try {
			s = HibernateUtils.getNewSession();
			Object obj = s.get(clazz, id);
			return obj;
		} finally {
			if (s != null)
				s.close();
		}
	}
}
