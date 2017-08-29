package common.bo;

public interface SendMailBo {
	
	/**
	 * ÓÊ¼ş·¢ËÍ
	 */
	void sendMail(String subject, String content, String fromAddress, String[] toAddress);
}
