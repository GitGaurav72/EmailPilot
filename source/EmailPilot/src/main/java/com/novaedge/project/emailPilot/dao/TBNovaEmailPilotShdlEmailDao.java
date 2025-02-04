package com.novaedge.project.emailPilot.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotShdlEmail;

// Repository Interface
@Repository
public interface TBNovaEmailPilotShdlEmailDao extends JpaRepository<TBNovaEmailPilotShdlEmail, String> {
    List<TBNovaEmailPilotShdlEmail> findByUserId(String userId);
    List<TBNovaEmailPilotShdlEmail> findByGrpId(String grpId);
}