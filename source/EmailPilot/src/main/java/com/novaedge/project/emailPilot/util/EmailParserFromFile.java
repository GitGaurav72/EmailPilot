package com.novaedge.project.emailPilot.util;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class EmailParserFromFile {
	
	public static List<String> parseEmailsFromCSV(String filePath) {
        List<String> emailList = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            int emailColumnIndex = -1; // Column index of "Email ID"

            // Read the header row first
            if ((line = br.readLine()) != null) {
                String[] headers = line.split(","); // Splitting by comma

                // Find the "Email ID" column index
                for (int i = 0; i < headers.length; i++) {
                	String normalizedHeader = headers[i].replaceAll("[\\p{C}\\p{Z}]", "").trim();
                    if (normalizedHeader.equalsIgnoreCase("EmailId")) {
                        emailColumnIndex = i;
                        break;
                    }
                }
            }

            // If the email column is found, extract email IDs
            if (emailColumnIndex != -1) {
                while ((line = br.readLine()) != null) {
                    String[] values = line.split(",");
                    if (values.length > emailColumnIndex) {
                        String email = values[emailColumnIndex].trim();
                        emailList.add(email);
                    }
                }
            } else {
                System.out.println("Error: 'Email ID' column not found.");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return emailList;
    }

    public static void main(String[] args) {
        String filePath = "C:\\Users\\GauravKumar\\Documents\\dummyEmail.csv"; // Update your CSV file path
        List<String> emails = parseEmailsFromCSV(filePath);

        System.out.println("Extracted Email IDs:");
        emails.forEach(System.out::println);
    }
}
