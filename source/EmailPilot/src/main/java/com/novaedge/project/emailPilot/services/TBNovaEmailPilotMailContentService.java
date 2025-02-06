package com.novaedge.project.emailPilot.services;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailContent;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotMailContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TBNovaEmailPilotMailContentService {
    @Autowired
    private TBNovaEmailPilotMailContentRepository repository;

    public List<TBNovaEmailPilotMailContent> getAllMailContents() {
        return repository.findAll();
    }

    public Optional<TBNovaEmailPilotMailContent> getMailContentById(String id) {
        return repository.findById(id);
    }

    public TBNovaEmailPilotMailContent saveMailContent(TBNovaEmailPilotMailContent mailContent) {
    	mailContent.setMlCntntId(UUID.randomUUID().toString());
        return repository.save(mailContent);
    }

    public void deleteMailContent(String id) {
        repository.deleteById(id);
    }

	public List<TBNovaEmailPilotMailContent> getMailContentByUserId(String userId) {
		
		return repository.getByAddByUser(userId);
	}
}