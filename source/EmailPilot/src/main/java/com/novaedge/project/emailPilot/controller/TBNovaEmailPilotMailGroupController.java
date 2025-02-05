package com.novaedge.project.emailPilot.controller;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailGroup;
import com.novaedge.project.emailPilot.model.ApiResponse;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotMailGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mailgroups")
public class TBNovaEmailPilotMailGroupController {
    @Autowired
    private TBNovaEmailPilotMailGroupService service;

    @GetMapping
    public List<TBNovaEmailPilotMailGroup> getAllMailGroups() {
        return service.getAllMailGroups();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TBNovaEmailPilotMailGroup> getMailGroupById(@PathVariable String id) {
        Optional<TBNovaEmailPilotMailGroup> mailGroup = service.getMailGroupById(id);
        return mailGroup.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping("/usrid/{usrid}")
    public ResponseEntity<List<TBNovaEmailPilotMailGroup>> getMailuserId(@PathVariable String usrid) {
        List<TBNovaEmailPilotMailGroup> mailGroup = service.getMailGroupbyUserid(usrid);
        return ResponseEntity.ok(mailGroup);
    }

    @PostMapping
    public TBNovaEmailPilotMailGroup createMailGroup(@RequestBody TBNovaEmailPilotMailGroup mailGroup) {
        return service.saveMailGroup(mailGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TBNovaEmailPilotMailGroup> updateMailGroup(@PathVariable String id, @RequestBody TBNovaEmailPilotMailGroup mailGroupDetails) {
        Optional<TBNovaEmailPilotMailGroup> mailGroup = service.getMailGroupById(id);
        if (mailGroup.isPresent()) {
            TBNovaEmailPilotMailGroup updatedMailGroup = mailGroup.get();
            updatedMailGroup.setmGrpId(mailGroupDetails.getmGrpId());
            updatedMailGroup.setmGrpNm(mailGroupDetails.getmGrpNm());
            updatedMailGroup.setAdedUsr(mailGroupDetails.getAdedUsr());
            updatedMailGroup.setAddTs(mailGroupDetails.getAddTs());
            updatedMailGroup.setUpdtTs(mailGroupDetails.getUpdtTs());
            return ResponseEntity.ok(service.saveMailGroup(updatedMailGroup));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMailGroup(@PathVariable String id) {
        Optional<TBNovaEmailPilotMailGroup> mailGroup = service.getMailGroupById(id);
        if (mailGroup.isPresent()) {
            service.deleteMailGroup(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}