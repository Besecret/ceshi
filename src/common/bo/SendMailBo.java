package common.bo;

public interface SendMailBo {
	
	/**
	 * �ʼ�����
	 */
	void sendMail(String subject, String content, String fromAddress, String[] toAddress);
}
