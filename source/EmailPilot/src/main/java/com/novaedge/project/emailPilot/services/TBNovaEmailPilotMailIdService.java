package com.novaedge.project.emailPilot.services;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailId;
import com.novaedge.project.emailPilot.util.AESUtil;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotMailIdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TBNovaEmailPilotMailIdService {
    @Autowired
    private TBNovaEmailPilotMailIdRepository repository;

    public List<TBNovaEmailPilotMailId> getAllMailIds() {
        return repository.findAll();
    }

    public Optional<TBNovaEmailPilotMailId> getMailIdById(String id) {
        return repository.findById(id);
    }

    public TBNovaEmailPilotMailId saveMailId(TBNovaEmailPilotMailId mailId) throws Exception {
    	mailId.setmId(UUID.randomUUID().toString());
    	mailId.setMailId(AESUtil.encrypt(mailId.getMailId()));
        return repository.save(mailId);
    }

    public void deleteMailId(String id) {
        repository.deleteById(id);
    }
}