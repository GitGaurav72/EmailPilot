package com.novaedge.project.emailPilot.services;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import com.novaedge.project.emailPilot.model.CustomUserDetails;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotUserDao;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import com.novaedge.project.emailPilot.model.User;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;


@Service
public class TBNovaEmailPilotCustUserDetailsService implements UserDetailsService  {

    @Autowired
    private TBNovaEmailPilotUserDao TBNovaEmailPilotUserDao;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        TBNovaEmailPilotUserEntity user = TBNovaEmailPilotUserDao.findByUserNameOrEmail(usernameOrEmail, usernameOrEmail);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail);
        }

        return new CustomUserDetails(
                user.getUserName(),
                user.getPassword(),
                user.getEmail() // Add roles/authorities if needed
        );
    }
}
