package com.novaedge.project.emailPilot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import com.novaedge.project.emailPilot.model.AuthRequest;
import com.novaedge.project.emailPilot.model.AuthResponse;
import com.novaedge.project.emailPilot.model.TBNovaEmailPilotUserReqModel;
import com.novaedge.project.emailPilot.model.TBNovaEmailPilotUserRespModel;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotUserService;
import com.novaedge.project.emailPilot.util.JwtUtil;

@RestController
@RequestMapping("/api")
public class TBNovaEmailPilotLogInController {

	@Autowired
    private TBNovaEmailPilotUserService tBNovaEmailPilotUserService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> TBNovaEmailPilotLogInByUserId(@RequestBody AuthRequest authRequest) throws Exception {
		
		  try {

		        authenticationManager.authenticate(
		                new UsernamePasswordAuthenticationToken(authRequest.getUsernameOrEmail(), authRequest.getPassword()));
		    } catch (Exception ex) {
		        throw new Exception("Invalid Credentials");
		    }

		    // Generate the JWT token
		    JwtUtil jwtUtil = new JwtUtil();
		    String token = jwtUtil.generateToken(authRequest.getUsernameOrEmail());
		    TBNovaEmailPilotUserEntity usr = tBNovaEmailPilotUserService.getUsrByUsrNm(authRequest.getUsernameOrEmail());

		    // Return the token wrapped in an AuthResponse object as JSON
		    return ResponseEntity.ok(new AuthResponse(token, usr.getId(), usr.getFirstName(),usr.getLastName(), usr.getUserName(), usr.getEmail()));
		
	}
	
	@PostMapping("/signout")
	public TBNovaEmailPilotUserRespModel TBNovaEmailPilotSignoutByUserId(@RequestBody TBNovaEmailPilotUserReqModel TBNovaEmailPilotUserReqModel) {
		
		 return null;
	}
	
	@PostMapping("/register")
	public TBNovaEmailPilotUserEntity TBNovaEmailPilotRegister(@RequestBody TBNovaEmailPilotUserEntity TBNovaEmailPilotUserEntity) throws Exception {
		return tBNovaEmailPilotUserService.TBNovaEmailPilotRegisterUser(TBNovaEmailPilotUserEntity);
	}
	
}
