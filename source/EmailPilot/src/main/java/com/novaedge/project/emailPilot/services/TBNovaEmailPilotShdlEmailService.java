package com.novaedge.project.emailPilot.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.novaedge.project.emailPilot.dao.TBNovaEmailPilotShdlEmailDao;
import com.novaedge.project.emailPilot.entity.TBNovaEmailPilotShdlEmail;
import com.novaedge.project.emailPilot.model.ApiResponse;

// Service Implementation



@Service
public class TBNovaEmailPilotShdlEmailService {

    private final TBNovaEmailPilotShdlEmailDao dao;

    public TBNovaEmailPilotShdlEmailService(TBNovaEmailPilotShdlEmailDao dao) {
        this.dao = dao;
    }

    public ApiResponse<List<TBNovaEmailPilotShdlEmail>> findByUserId(String userId) {
        try {
            return new ApiResponse<>(true, "Data retrieved successfully", dao.findByUserId(userId));
        } catch (Exception e) {
            return new ApiResponse<>(false, "Error retrieving data: " + e.getMessage(), null);
        }
    }

    public ApiResponse<List<TBNovaEmailPilotShdlEmail>> findByGrpId(String grpId) {
        try {
            return new ApiResponse<>(true, "Data retrieved successfully", dao.findByGrpId(grpId));
        } catch (Exception e) {
            return new ApiResponse<>(false, "Error retrieving data: " + e.getMessage(), null);
        }
    }

    public ApiResponse<TBNovaEmailPilotShdlEmail> update(String id, TBNovaEmailPilotShdlEmail entity) {
        try {
            if(dao.existsById(id)) {
                entity.setId(id);
                return new ApiResponse<>(true, "Updated successfully", dao.save(entity));
            }
            return new ApiResponse<>(false, "Record not found", null);
        } catch (Exception e) {
            return new ApiResponse<>(false, "Update failed: " + e.getMessage(), null);
        }
    }

    public ApiResponse<Void> deleteById(String id) {
        try {
            dao.deleteById(id);
            return new ApiResponse<>(true, "Deleted successfully", null);
        } catch (Exception e) {
            return new ApiResponse<>(false, "Delete failed: " + e.getMessage(), null);
        }
    }

	public ApiResponse<TBNovaEmailPilotShdlEmail> findShdlMailId(String id) {
	
        try {
            if(dao.existsById(id)) {
            	return new ApiResponse<>(true, "Record found", dao.findById(id).get());
                
            }
            return new ApiResponse<>(false, "Record not Exist", null);
        } catch (Exception e) {
            return new ApiResponse<>(false, "feteching Record failed: " + e.getMessage(), null);
        }
	}

	public ApiResponse<TBNovaEmailPilotShdlEmail> create(TBNovaEmailPilotShdlEmail entity) {
		  entity.setId(UUID.randomUUID().toString());
		return new ApiResponse<>(true, "Record found", dao.save(entity));
	}
}