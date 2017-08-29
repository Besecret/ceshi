package bo;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("zoo")
public class Zoo {
	/**
	 *(1)、@Resource 后面没有任何内容，默认通过 name 属性去匹配 bean，找不到再按 type 去匹配	 
 	 *(2)、指定了 name 或者 type 则根据指定的类型去匹配 bean
	 *(3)、指定了 name 和 type 则根据指定的 name 和 type 去匹配 bean，任何一个不匹配都将报错
	 *(4) @Autowired 默认按照 byType 方式进行 bean 匹配，@Resource 默认按照 byName 方式进行 bean 匹配
	 *(5) @Autowired 是 Spring 的注解，@Resource 是 J2EE 的注解
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
