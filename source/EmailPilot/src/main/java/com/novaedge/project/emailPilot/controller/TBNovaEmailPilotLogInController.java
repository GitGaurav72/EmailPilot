package com.novaedge.project.emailPilot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotUserDao;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import com.novaedge.project.emailPilot.model.ApiResponse;
import com.novaedge.project.emailPilot.model.AuthRequest;
import com.novaedge.project.emailPilot.model.AuthResponse;
import com.novaedge.project.emailPilot.model.TBNovaEmailPilotUserReqModel;
import com.novaedge.project.emailPilot.model.TBNovaEmailPilotUserRespModel;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotUserService;
import com.novaedge.project.emailPilot.util.AESUtil;
import com.novaedge.project.emailPilot.util.JwtUtil;
import com.novaedge.project.emailPilot.util.StringUtil;

@RestController
@RequestMapping("/api")
public class TBNovaEmailPilotLogInController {

	@Autowired
    private TBNovaEmailPilotUserService tBNovaEmailPilotUserService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TBNovaEmailPilotUserDao tBNovaEmailPilotUserDao;
	
	@PostMapping(value = "/login",produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<AuthResponse>> TBNovaEmailPilotLogInByUserId(@RequestBody AuthRequest authRequest) throws Exception {
			
		  try {
			  
			  if(StringUtil.isValid(authRequest.getUsernameOrEmail())){
				  authRequest.setUsernameOrEmail(AESUtil.encrypt(authRequest.getUsernameOrEmail()));
			  }
		        authenticationManager.authenticate(
		                new UsernamePasswordAuthenticationToken(authRequest.getUsernameOrEmail(), authRequest.getPassword()));
		    } catch (Exception ex) {
		    	
		    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(false, "Invalid credentials", null));
		    }

		    // Generate the JWT token
		    JwtUtil jwtUtil = new JwtUtil();
		    String token = jwtUtil.generateToken(authRequest.getUsernameOrEmail());
		    TBNovaEmailPilotUserEntity usr = tBNovaEmailPilotUserDao.findByUserNameOrEmail(authRequest.getUsernameOrEmail(),authRequest.getUsernameOrEmail());

		    // Return the token wrapped in an AuthResponse object as JSON
		    return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", new AuthResponse(token, usr.getId(), usr.getFirstName(),usr.getLastName(), usr.getUserName(), usr.getEmail())));
		
	}
	
	@PostMapping("/signout")
	public TBNovaEmailPilotUserRespModel TBNovaEmailPilotSignoutByUserId(@RequestBody TBNovaEmailPilotUserReqModel TBNovaEmailPilotUserReqModel) {
		
		 return null;
	}
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<TBNovaEmailPilotUserEntity>> TBNovaEmailPilotRegister(@RequestBody TBNovaEmailPilotUserEntity TBNovaEmailPilotUserEntity) throws Exception {
		return ResponseEntity.ok(new ApiResponse<> (true , "User Created",  tBNovaEmailPilotUserService.TBNovaEmailPilotRegisterUser(TBNovaEmailPilotUserEntity)));
	}
	
}
