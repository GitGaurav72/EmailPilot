package com.novaedge.project.emailPilot.dao;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailId;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TBNovaEmailPilotMailIdRepository extends JpaRepository<TBNovaEmailPilotMailId, String> {

	List<TBNovaEmailPilotMailId> getByAddByUser(String usrId);
}