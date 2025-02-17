package com.novaedge.project.emailPilot.controller;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotMailGroup;
import com.novaedge.project.emailPilot.model.ApiResponse;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotMailGroupService;

import io.jsonwebtoken.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
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
    
    
    @PostMapping("/upload/{fileType}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("fileType")  String fileType) throws java.io.IOException {
        try {
            // Process file content without saving
        	System.out.println("API Executed");
            String result = processFile(file);

            return ResponseEntity.ok("File processed successfully: " + result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File processing failed: " + e.getMessage());
        }
    }

    private String processFile(MultipartFile file) throws IOException, java.io.IOException {
        StringBuilder content = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Perform some operation on each line
                content.append(line.toUpperCase()).append("\n"); // Example: Convert to uppercase
            }
        }

        return content.toString();
    }
}