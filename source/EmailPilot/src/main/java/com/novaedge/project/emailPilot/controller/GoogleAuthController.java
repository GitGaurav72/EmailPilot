package com.novaedge.project.emailPilot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotUserDao;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotCustUserDetailsService;
import com.novaedge.project.emailPilot.util.AESUtil;
import com.novaedge.project.emailPilot.util.JwtUtil;
import com.novaedge.project.emailPilot.util.StringUtil;

import java.util.*;

@RestController
@RequestMapping("/auth/google")
public class GoogleAuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
	private TBNovaEmailPilotUserDao tBNovaEmailPilotUserDao;

    @Autowired
    private TBNovaEmailPilotCustUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TBNovaEmailPilotUserDao userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestBody Map<String, String> code) {
        try {
            String tokenEndpoint = "https://oauth2.googleapis.com/token";
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            System.out.println(code.get("code"));
            params.add("code", code.get("code"));
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", "http://localhost:4200/auth/callback");
            params.add("grant_type", "authorization_code");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenEndpoint, request, Map.class);
            String idToken = (String) tokenResponse.getBody().get("id_token"); 
            String userInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
            ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);
            if (userInfoResponse.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> userInfo = userInfoResponse.getBody();
                String email = (String) userInfo.get("email");
                UserDetails userDetails = null;
                try{
                    userDetails = userDetailsService.loadUserByUsername(AESUtil.encrypt(email));
                }catch (Exception e){
                    TBNovaEmailPilotUserEntity user = new TBNovaEmailPilotUserEntity();
                    user.setId(UUID.randomUUID().toString());
                    user.setFirstName((String) userInfo.get("given_name"));
                    user.setLastName((String) userInfo.get("family_name"));
                    user.setEmail(AESUtil.encrypt(email));
                    user.setUserName(StringUtil.generateRandomId(email));
                    user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                    userRepository.save(user);
                }
                String jwtToken = jwtUtil.generateToken(AESUtil.encrypt(email));
                TBNovaEmailPilotUserEntity usr = tBNovaEmailPilotUserDao.findByUserNameOrEmail(AESUtil.encrypt(email),AESUtil.encrypt(email));
                Map<String, Object> response = new HashMap<>();
                response.put("token", jwtToken);
                response.put("userId", usr.getId());
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}

/*

https://accounts.google.com/o/oauth2/auth?
client_id=YOUR_CLIENT_ID
    &redirect_uri=YOUR_REDIRECT_URI
    &response_type=code
    &scope=email profile
    &access_type=offline
    &prompt=consent

*/