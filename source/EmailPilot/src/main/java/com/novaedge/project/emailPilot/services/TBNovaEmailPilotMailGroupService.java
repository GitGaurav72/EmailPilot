package com.novaedge.project.emailPilot.services;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailGroup;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotMailGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TBNovaEmailPilotMailGroupService {
    @Autowired
    private TBNovaEmailPilotMailGroupRepository repository;

    public List<TBNovaEmailPilotMailGroup> getAllMailGroups() {
        return repository.findAll();
    }

    public Optional<TBNovaEmailPilotMailGroup> getMailGroupById(String id) {
        return repository.findById(id);
    }

    public TBNovaEmailPilotMailGroup saveMailGroup(TBNovaEmailPilotMailGroup mailGroup) {
    	mailGroup.setmGrpId(UUID.randomUUID().toString());
        return repository.save(mailGroup);
    }

    public void deleteMailGroup(String id) {
        repository.deleteById(id);
    }
}