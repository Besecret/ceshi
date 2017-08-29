package common.boImpl;

import common.bo.MailBaseBo;
import common.bo.SendMailBo;
import common.constants.Mail;

import java.util.Map;

import org.springframework.mail.javamail.JavaMailSenderImpl;

public class SendMailBoImpl implements SendMailBo {

	JavaMailSenderImpl mailSender;
	private MailBaseBo mailBo;
	private String defaultFromAddress;
	private String defaultText;
	private String host;
	private int port;
	private String username;
	private String password;
	private Map<String, String> emailModel;
	private String eventOutTimeText;

	public void setMailSender(JavaMailSenderImpl mailSender) {
		this.mailSender = mailSender;
	}

	public void setMailBo(MailBaseBo mailBo) {
		this.mailBo = mailBo;
	}

	public void setDefaultFromAddress(String defaultFromAddress) {
		this.defaultFromAddress = defaultFromAddress;
	}

	public void setDefaultText(String defaultText) {
		this.defaultText = defaultText;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEmailModel(Map<String, String> emailModel) {
		this.emailModel = emailModel;
	}

	public void setEventOutTimeText(String eventOutTimeText) {
		this.eventOutTimeText = eventOutTimeText;
	}

	private void buildMailSender() {
		mailSender.setHost(host);
		mailSender.setPort(port);
		mailSender.setUsername(username);
		mailSender.setPassword(password);
	}

	@Override
	public void sendMail(String subject, String content, String fromAddress, String[] toAddress) {
		buildMailSender();
		Mail mail = new Mail();
		mail.setFrom(defaultFromAddress);
		mail.setTo(toAddress);
		mail.setText(content);
		mail.setSubject(subject);
		mail.setPriority(1);
		mail.setHTML(true);		
		mailBo.sendMail(mailSender, mail);
	}

}
