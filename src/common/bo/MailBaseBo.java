package common.bo;
import org.springframework.mail.MailSender;

import common.constants.Mail;
public interface  MailBaseBo {
	
    public abstract void sendMail(Mail mail);

    public abstract void sendMail(Mail mail, boolean flag);

    public abstract void sendMail(MailSender mailsender, Mail mail);

    public abstract void sendMail(MailSender mailsender, Mail mail, boolean flag);
	
}
