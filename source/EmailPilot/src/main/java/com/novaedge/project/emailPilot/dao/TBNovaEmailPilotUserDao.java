package com.novaedge.project.emailPilot.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;

@Repository
public interface TBNovaEmailPilotUserDao extends JpaRepository<TBNovaEmailPilotUserEntity, String> {

	TBNovaEmailPilotUserEntity findByUserName(String username);
	TBNovaEmailPilotUserEntity findByUserNameOrEmail(String username,String email);

}
