package com.novaedge.project.emailPilot.dao;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TBNovaEmailPilotMailContentRepository extends JpaRepository<TBNovaEmailPilotMailContent, String> {
}