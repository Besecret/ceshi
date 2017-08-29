package bo;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("zoo")
public class Zoo {
	/**
	 *(1)��@Resource ����û���κ����ݣ�Ĭ��ͨ�� name ����ȥƥ�� bean���Ҳ����ٰ� type ȥƥ��	 
 	 *(2)��ָ���� name ���� type �����ָ��������ȥƥ�� bean
	 *(3)��ָ���� name �� type �����ָ���� name �� type ȥƥ�� bean���κ�һ����ƥ�䶼������
	 *(4) @Autowired Ĭ�ϰ��� byType ��ʽ���� bean ƥ�䣬@Resource Ĭ�ϰ��� byName ��ʽ���� bean ƥ��
	 *(5) @Autowired �� Spring ��ע�⣬@Resource �� J2EE ��ע��
	 **/
	//@Autowired
	@Resource(name="tiger")
	private Tiger tiger;
	
	//@Autowired
	@Resource(type=Monkey.class)
	private Monkey monkey;

	public String toString() {
		return tiger + "\n" + monkey;
	}

}
