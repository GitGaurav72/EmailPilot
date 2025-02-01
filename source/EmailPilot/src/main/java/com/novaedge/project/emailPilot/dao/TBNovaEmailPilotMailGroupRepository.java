package com.novaedge.project.emailPilot.dao;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TBNovaEmailPilotMailGroupRepository extends JpaRepository<TBNovaEmailPilotMailGroup, String> {
}