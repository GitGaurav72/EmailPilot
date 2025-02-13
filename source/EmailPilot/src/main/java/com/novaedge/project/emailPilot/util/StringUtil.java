package com.novaedge.project.emailPilot.util;


import java.security.SecureRandom;
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
	

	     public static String generateRandomId(String email) {
	         if (email == null || !email.contains("@")) {
	             throw new IllegalArgumentException("Invalid email address");
	         }

	         // Extract first two characters from the email username
	         String username = email.split("@")[0];
	         String prefix = username.length() >= 2 ? username.substring(0, 2).toUpperCase() : username.toUpperCase();

	         // Generate a 4-digit random number
	         SecureRandom random = new SecureRandom();
	         int randomNumber = 1000 + random.nextInt(9000); // Ensures a 4-digit number

	         // Combine the prefix and random number
	         return prefix + randomNumber;
	     }


}
