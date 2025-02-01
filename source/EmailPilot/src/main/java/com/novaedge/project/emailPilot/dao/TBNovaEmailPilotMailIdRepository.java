package com.novaedge.project.emailPilot.dao;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TBNovaEmailPilotMailIdRepository extends JpaRepository<TBNovaEmailPilotMailId, String> {
}