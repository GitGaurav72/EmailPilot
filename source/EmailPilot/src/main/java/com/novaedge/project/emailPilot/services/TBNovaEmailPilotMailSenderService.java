package com.novaedge.project.emailPilot.services;

import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.Properties;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

import io.jsonwebtoken.io.IOException;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

public class TBNovaEmailPilotMailSenderService {
	
	
	private static String ACCESS_TOKEN = "";

	public void sendEmail(String to, String subject, String bodyText) throws Exception {
	    NetHttpTransport HTTP_TRANSPORT = new NetHttpTransport();
	    JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

	    // Build Credential Object
	    GoogleCredential credential = new GoogleCredential().setAccessToken(ACCESS_TOKEN);

	    // Build Gmail Service
	    Gmail service = new Gmail.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
	            .setApplicationName("EmailPilot")
	            .build();

	    // Create Email
	    MimeMessage email = createEmail(to, "me", subject, bodyText);
	    Message message = createMessageWithEmail(email);

	    // Send Email
	    service.users().messages().send("me", message).execute();
	}

	public MimeMessage createEmail(String to, String from, String subject, String bodyText) throws MessagingException {
	    Properties props = new Properties();
	    Session session = Session.getDefaultInstance(props, null);

	    MimeMessage email = new MimeMessage(session);
	    email.setFrom(new InternetAddress(from));
	    email.addRecipient(jakarta.mail.Message.RecipientType.TO, new InternetAddress(to));
	    email.setSubject(subject);
	    email.setText(bodyText);
	    return email;
	}

	public Message createMessageWithEmail(MimeMessage email) throws MessagingException, IOException, java.io.IOException {
	    ByteArrayOutputStream buffer = new ByteArrayOutputStream();
	    email.writeTo(buffer);
	    byte[] bytes = buffer.toByteArray();
	    String encodedEmail = Base64.getUrlEncoder().encodeToString(bytes);
	    Message message = new Message();
	    message.setRaw(encodedEmail);
	    return message;
	}

}
