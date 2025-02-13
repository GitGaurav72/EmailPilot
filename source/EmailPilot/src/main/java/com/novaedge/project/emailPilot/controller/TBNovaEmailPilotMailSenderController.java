package com.novaedge.project.emailPilot.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/mailSender")
public class TBNovaEmailPilotMailSenderController {
	
	public static String REDIRECT_URI = "http://localhost:8080/api/mailSender/oauth/callback";
	
	
	@Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String CLIENT_SECRET;
	
	
	@GetMapping("/authorize")
	public void authorize(HttpServletResponse response) throws IOException, java.io.IOException {
	    String authorizationUrl = new GoogleAuthorizationCodeRequestUrl(
	            CLIENT_ID,
	            REDIRECT_URI,
	            Collections.singleton("https://www.googleapis.com/auth/gmail.send")
	    )
	    .setAccessType("offline")
	    .build();
	    
	    response.sendRedirect(authorizationUrl);
	}


	@GetMapping("/oauth/callback")
	public String oauthCallback(@RequestParam("code") String authorizationCode) throws IOException, java.io.IOException {
	    GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
	            new NetHttpTransport(),
	            JacksonFactory.getDefaultInstance(),
	            CLIENT_ID,
	            CLIENT_SECRET,
	            authorizationCode,
	            REDIRECT_URI
	    ).execute();
	    
	    String accessToken = tokenResponse.getAccessToken();
	    String refreshToken = tokenResponse.getRefreshToken();
        
	    // Store tokens securely
	    // Redirect to success page
	    return "redirect:/success";
	}
		
	
	
}
