package com.novaedge.project.emailPilot.services;

import java.util.List;
import java.util.UUID;

import org.hibernate.id.UUIDGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotUserEntity;
import com.novaedge.project.emailPilot.util.AESUtil;
import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotUserDao;

@Service
public class TBNovaEmailPilotUserService {

    @Autowired
    private TBNovaEmailPilotUserDao TBNovaEmailPilotUserDao; // Follow camelCase for variable names

    @Autowired
    private AESUtil aESUtil;

	@Autowired
	private PasswordEncoder passwordEncoder;
    /**
     * Fetch a user by their ID.
     *
     * @param id The ID of the user.
     * @return The user entity or null if not found.
     */
    public TBNovaEmailPilotUserEntity TBNovaEmailPilotGetUserById(String id) {
        // Using JpaRepository's findById method
        return TBNovaEmailPilotUserDao.findById(id).orElse(null);
    }

    /**
     * Fetch all users.
     *
     * @return A list of all user entities.
     */
    public List<TBNovaEmailPilotUserEntity> TBNovaEmailPilotGetAllUserById() {
        // Using JpaRepository's findAll method
        return TBNovaEmailPilotUserDao.findAll();
    }

    /**
     * Update a user's details by ID.
     *
     * @param id The ID of the user to update.
     * @param TBNovaEmailPilotUserEntity The updated user details.
     * @return The updated user entity or null if not found.
     */
    public TBNovaEmailPilotUserEntity TBNovaEmailPilotUpdateUserById(String id, TBNovaEmailPilotUserEntity TBNovaEmailPilotUserEnty) {
        // Check if the user exists
    	TBNovaEmailPilotUserEntity TBNovaEmailPilotUserEntity = new TBNovaEmailPilotUserEntity();
        if (TBNovaEmailPilotUserDao.existsById(id)) {
            TBNovaEmailPilotUserEntity.setId(TBNovaEmailPilotUserEnty.getId());
            TBNovaEmailPilotUserEntity.setUserName(TBNovaEmailPilotUserEnty.getUserName());
            TBNovaEmailPilotUserEntity.setPassword(TBNovaEmailPilotUserEnty.getPassword());
            TBNovaEmailPilotUserEntity.setEmail(TBNovaEmailPilotUserEnty.getEmail());
            TBNovaEmailPilotUserEntity.setAbout(TBNovaEmailPilotUserEnty.getAbout());
            // Ensure the ID is correctly
            return TBNovaEmailPilotUserDao.save(TBNovaEmailPilotUserEntity);
        }
        return null;
    }

    /**
     * Delete a user by their ID.
     *
     * @param id The ID of the user to delete.
     * @return True if the user was deleted, false otherwise.
     */
    public boolean deleteUserById(String id) {
        if (TBNovaEmailPilotUserDao.existsById(id)) {
            TBNovaEmailPilotUserDao.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Fetch users by a specific attribute (e.g., email).
     *
     * @param email The email of the user.
     * @return A list of users matching the email.
     * @throws Exception 
     */
    public TBNovaEmailPilotUserEntity TBNovaEmailPilotRegisterUser(TBNovaEmailPilotUserEntity TBNovaEmailPilotUserEntity) throws Exception {
    	TBNovaEmailPilotUserEntity.setId(UUID.randomUUID().toString());
    	TBNovaEmailPilotUserEntity.setEmail(AESUtil.encrypt(TBNovaEmailPilotUserEntity.getEmail()));
    	TBNovaEmailPilotUserEntity.setPassword(passwordEncoder.encode(TBNovaEmailPilotUserEntity.getPassword()));
        return TBNovaEmailPilotUserDao.save(TBNovaEmailPilotUserEntity); // Assuming a custom query in TBNovaEmailPilotUserDao
    }

	public TBNovaEmailPilotUserEntity getUsrByUsrNm(String username) {
		
		return TBNovaEmailPilotUserDao.findByUserName(username);
	}
}
