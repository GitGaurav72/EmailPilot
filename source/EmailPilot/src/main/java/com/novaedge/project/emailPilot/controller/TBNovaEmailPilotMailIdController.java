package com.novaedge.project.emailPilot.controller;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailId;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotMailIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mailids")
public class TBNovaEmailPilotMailIdController {
    @Autowired
    private TBNovaEmailPilotMailIdService service;

    @GetMapping
    public List<TBNovaEmailPilotMailId> getAllMailIds() {
        return service.getAllMailIds();
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<TBNovaEmailPilotMailId> getMailIdById(@PathVariable String id) {
        Optional<TBNovaEmailPilotMailId> mailId = service.getMailIdById(id);
        return mailId.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/usr/{usrId}")
    public ResponseEntity<List<TBNovaEmailPilotMailId>> getMailIdByuserId(@PathVariable String usrId) {
    	List<TBNovaEmailPilotMailId> mailId = service.getMailIdByUserId(usrId);

    	if (mailId.isEmpty()) {
    	    return ResponseEntity.notFound().build();
    	}

    	return ResponseEntity.ok(mailId);

    }
  
    @PostMapping
    public TBNovaEmailPilotMailId createMailId(@RequestBody TBNovaEmailPilotMailId mailId) throws Exception {
        return service.saveMailId(mailId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TBNovaEmailPilotMailId> updateMailId(@PathVariable String id, @RequestBody TBNovaEmailPilotMailId mailIdDetails) throws Exception {
        Optional<TBNovaEmailPilotMailId> mailId = service.getMailIdById(id);
        if (mailId.isPresent()) {
            TBNovaEmailPilotMailId updatedMailId = mailId.get();
            updatedMailId.setmId(mailIdDetails.getmId());
            updatedMailId.setMailId(mailIdDetails.getMailId());
            updatedMailId.setHrName(mailIdDetails.getHrName());
            updatedMailId.setCmpnyNm(mailIdDetails.getCmpnyNm());
            updatedMailId.setAddByUser(mailIdDetails.getAddByUser());
            updatedMailId.setAddTs(mailIdDetails.getAddTs());
            updatedMailId.setUpdtTs(mailIdDetails.getUpdtTs());
            return ResponseEntity.ok(service.saveMailId(updatedMailId));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMailId(@PathVariable String id) {
        Optional<TBNovaEmailPilotMailId> mailId = service.getMailIdById(id);
        if (mailId.isPresent()) {
            service.deleteMailId(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}