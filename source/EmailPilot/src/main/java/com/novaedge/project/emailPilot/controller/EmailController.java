package com.novaedge.project.emailPilot.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.novaedge.project.emailPilot.model.EmailRequest;
import com.novaedge.project.emailPilot.services.GmailService;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotMailSenderService;

@RestController
@RequestMapping("/api")
public class EmailController {
	
//	@Autowired
//	private GmailService gmailService;
	
	@Autowired
	private TBNovaEmailPilotMailSenderService gmailService;
	
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
        	gmailService.sendEmail(
                emailRequest.getAccessToken(),
                emailRequest.getToEmail(),
                emailRequest.getSubject(),
                emailRequest.getBody()
            );
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
}

