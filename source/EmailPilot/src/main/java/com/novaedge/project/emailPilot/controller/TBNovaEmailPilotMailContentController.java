package com.novaedge.project.emailPilot.controller;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailContent;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotMailContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mailcontent")
public class TBNovaEmailPilotMailContentController {
    @Autowired
    private TBNovaEmailPilotMailContentService service;

    @GetMapping
    public List<TBNovaEmailPilotMailContent> getAllMailContents() {
        return service.getAllMailContents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TBNovaEmailPilotMailContent> getMailContentById(@PathVariable String id) {
        Optional<TBNovaEmailPilotMailContent> mailContent = service.getMailContentById(id);
        return mailContent.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public TBNovaEmailPilotMailContent createMailContent(@RequestBody TBNovaEmailPilotMailContent mailContent) {
        return service.saveMailContent(mailContent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TBNovaEmailPilotMailContent> updateMailContent(@PathVariable String id, @RequestBody TBNovaEmailPilotMailContent mailContentDetails) {
        Optional<TBNovaEmailPilotMailContent> mailContent = service.getMailContentById(id);
        if (mailContent.isPresent()) {
            TBNovaEmailPilotMailContent updatedMailContent = mailContent.get();
            updatedMailContent.setMlCntntId(mailContentDetails.getMlCntntId());
            updatedMailContent.setMlCntnt(mailContentDetails.getMlCntnt());
            updatedMailContent.setAddByUser(mailContentDetails.getAddByUser());
            updatedMailContent.setAddToGrp(mailContentDetails.getAddToGrp());
            updatedMailContent.setHeading(mailContentDetails.getHeading());
            updatedMailContent.setSubject(mailContentDetails.getSubject());
            updatedMailContent.setFile(mailContentDetails.getFile());
            updatedMailContent.setCc(mailContentDetails.getCc());
            updatedMailContent.setBcc(mailContentDetails.getBcc());
            updatedMailContent.setAddTm(mailContentDetails.getAddTm());
            updatedMailContent.setUptTm(mailContentDetails.getUptTm());
            return ResponseEntity.ok(service.saveMailContent(updatedMailContent));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMailContent(@PathVariable String id) {
        Optional<TBNovaEmailPilotMailContent> mailContent = service.getMailContentById(id);
        if (mailContent.isPresent()) {
            service.deleteMailContent(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}