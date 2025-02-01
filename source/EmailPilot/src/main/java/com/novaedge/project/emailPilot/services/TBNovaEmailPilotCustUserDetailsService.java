package com.novaedge.project.emailPilot.services;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotUserDao;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;

@Service
public class TBNovaEmailPilotCustUserDetailsService implements UserDetailsService{

	
	@Autowired
	private TBNovaEmailPilotUserDao TBNovaEmailPilotUserDao;
	
	@Override
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		
		TBNovaEmailPilotUserEntity user = TBNovaEmailPilotUserDao.findByUserNameOrEmail(usernameOrEmail, usernameOrEmail);
		return new org.springframework.security.core.userdetails.User(user.getUserName(),user.getPassword(), new ArrayList<>());
	}

}
