package com.novaedge.project.emailPilot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotShdlEmail;
import com.novaedge.project.emailPilot.model.ApiResponse;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotShdlEmailService;

// Controller
@RestController
@RequestMapping("/api/scheduled-emails")
public class TBNovaEmailPilotShdlEmailController {

	@Autowired
    private TBNovaEmailPilotShdlEmailService service;



    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<TBNovaEmailPilotShdlEmail>>> findByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.findByUserId(userId));
    }

    @GetMapping("/group/{grpId}")
    public ResponseEntity<ApiResponse<List<TBNovaEmailPilotShdlEmail>>> findByGrpId(@PathVariable String grpId) {
        return ResponseEntity.ok(service.findByGrpId(grpId));
    }
    
    @PostMapping("/shdlmail")
    public  ResponseEntity<ApiResponse<TBNovaEmailPilotShdlEmail>> create( @RequestBody TBNovaEmailPilotShdlEmail entity){
    	 return ResponseEntity.ok(service.create(entity));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TBNovaEmailPilotShdlEmail>> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findShdlMailId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TBNovaEmailPilotShdlEmail>> update(
            @PathVariable String id, 
            @RequestBody TBNovaEmailPilotShdlEmail entity) {
        return ResponseEntity.ok(service.update(id, entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteById(@PathVariable String id) {
        return ResponseEntity.ok(service.deleteById(id));
    }
}