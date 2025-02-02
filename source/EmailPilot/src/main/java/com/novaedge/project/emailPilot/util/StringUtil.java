package com.novaedge.project.emailPilot.util;


import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.stereotype.Service;

@Service
public class StringUtil {

	 public static boolean isValid(String email) {
	      
	        // Regular expression to match valid email formats
	        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
	                            "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
	    
	        // Compile the regex
	        Pattern p = Pattern.compile(emailRegex);
	      
	        // Check if email matches the pattern
	        return email != null && p.matcher(email).matches();
	    }
}
