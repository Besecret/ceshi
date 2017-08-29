package common.constants;

import java.io.File;
import java.util.*;

public class Mail {
	public Mail() {
		isHTML = false;
		priority = 0;
	}

	public void setFrom(String s) {
		from = s;
	}

	public String getFrom() {
		return from;
	}

	public void setReplyTo(String s) {
		replyTo = s;
	}

	public String getReplyTo() {
		return replyTo;
	}

	public void setTo(String s) {
		to = (new String[] { s });
	}

	public void setTo(String as[]) {
		to = as;
	}

	public String[] getTo() {
		return to;
	}

	public void setCc(String s) {
		cc = (new String[] { s });
	}

	public void setCc(String as[]) {
		cc = as;
	}

	public String[] getCc() {
		return cc;
	}

	public void setBcc(String s) {
		bcc = (new String[] { s });
	}

	public void setBcc(String as[]) {
		bcc = as;
	}

	public String[] getBcc() {
		return bcc;
	}

	public void setSentDate(Date date) {
		sentDate = date;
	}

	public Date getSentDate() {
		return sentDate;
	}

	public void setSubject(String s) {
		subject = s;
	}

	public String getSubject() {
		return subject;
	}

	public boolean isHTML() {
		return isHTML;
	}

	public void setHTML(boolean flag) {
		isHTML = flag;
	}

	public String getText() {
		return text;
	}

	public void setText(String s) {
		text = s;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int i) {
		priority = i;
	}

	public void addInline(String s, File file) {
		if (getContentIds() == null)
			contentIds = new ArrayList<String> ();
		if (getInlineFiles() == null)
			inlineFiles = new ArrayList<File> ();
		getContentIds().add(s);
		getInlineFiles().add(file);
	}

	public void addAttachMent(String s, File file) {
		if (getAttachNames() == null)
			attachNames = new ArrayList<String> ();
		if (getAttachFiles() == null)
			attachFiles = new ArrayList<File> ();
		getAttachNames().add(s);
		getAttachFiles().add(file);
	}

	public List<String> getContentIds() {
		return contentIds;
	}

	public List<File> getInlineFiles() {
		return inlineFiles;
	}

	public List<String> getAttachNames() {
		return attachNames;
	}

	public List<File> getAttachFiles() {
		return attachFiles;
	}

	private String from;
	private String replyTo;
	private String to[];
	private String cc[];
	private String bcc[];
	private Date sentDate;
	private String subject;
	private boolean isHTML;
	private String text;
	private int priority;
	private List<String> contentIds;
	private List<File> inlineFiles;
	private List<String> attachNames;
	private List<File> attachFiles;
}
