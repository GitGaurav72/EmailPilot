package com.novaedge.project.emailPilot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import com.novaedge.project.emailPilot.services.TBNovaEmailPilotUserService;

@RestController
@RequestMapping("/api/user")
public class TBNovaEmailPilotUserController {

    @Autowired
    private TBNovaEmailPilotUserService TBNovaEmailPilotUserService;

    /**
     * Fetch user details by ID.
     *
     * @param id The ID of the user.
     * @return The user entity or null if not found.
     */
    @GetMapping("/detail/{id}")
    public TBNovaEmailPilotUserEntity TBNovaEmailPilotGetUserById(@PathVariable String id) {
        return TBNovaEmailPilotUserService.TBNovaEmailPilotGetUserById(id);
    }

    /**
     * Fetch all user details.
     *
     * @return A list of all user entities.
     */
    @GetMapping("/all/user")
    public List<TBNovaEmailPilotUserEntity> TBNovaEmailPilotGetAllUserById() {
        return TBNovaEmailPilotUserService.TBNovaEmailPilotGetAllUserById();
    }

    /**
     * Update user details by ID.
     *
     * @param id               The ID of the user to update.
     * @param TBNovaEmailPilotUserEntity The user entity with updated details.
     * @return The updated user entity or null if not found.
     */
    @PostMapping("/update/{id}")
    public TBNovaEmailPilotUserEntity TBNovaEmailPilotUpdateUserById(@PathVariable String id, @RequestBody TBNovaEmailPilotUserEntity TBNovaEmailPilotUserEntity) {
        return TBNovaEmailPilotUserService.TBNovaEmailPilotUpdateUserById(id, TBNovaEmailPilotUserEntity);
    }
}
