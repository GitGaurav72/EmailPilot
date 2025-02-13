package com.novaedge.project.emailPilot.services;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotUserDao;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import com.novaedge.project.emailPilot.model.UserDetails;

@Service
public class TBNovaEmailPilotCustUserDetailsService {

	
	@Autowired
	private TBNovaEmailPilotUserDao TBNovaEmailPilotUserDao;
	
	
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		
		TBNovaEmailPilotUserEntity user = TBNovaEmailPilotUserDao.findByUserNameOrEmail(usernameOrEmail, usernameOrEmail);
		return new com.novaedge.project.emailPilot.model.User(user.getUserName(),user.getPassword(), user.getEmail(), new ArrayList<>());
	}

}
