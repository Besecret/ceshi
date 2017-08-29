package common.boImpl;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import common.bo.MailBaseBo;
import common.constants.Mail;

public class MailBaseBoImpl implements MailBaseBo {
	
	private JavaMailSender mailSender;
	
    public MailBaseBoImpl(){}

    
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}


	@Override
	public void sendMail(Mail mail) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendMail(Mail mail, boolean flag) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendMail(MailSender mailsender, Mail mail) {
		
		SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
		simpleMailMessage.setFrom(mail.getFrom());
		simpleMailMessage.setSubject(mail.getSubject());
		simpleMailMessage.setTo(mail.getTo());
		simpleMailMessage.setText(mail.getText());
		mailSender.send(simpleMailMessage);
		System.out.println("·¢ËÍÍê³É");
		
	}

	@Override
	public void sendMail(MailSender javaMailSender, Mail mail, boolean flag) {

       
	}

}
