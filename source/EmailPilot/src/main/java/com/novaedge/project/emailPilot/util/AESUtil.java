package com.novaedge.project.emailPilot.util;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;

@Configuration
public class AESUtil {
    private static final String AES_ALGORITHM = "AES";
    private static final String SECRET_KEY = "1234567890123456"; // 16-char key

    // Encrypt method

    public static String encrypt(String data) throws Exception {
        SecretKey secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), AES_ALGORITHM);
        Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedBytes = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // Decrypt method

    public static String decrypt(String encryptedData) throws Exception {
        SecretKey secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), AES_ALGORITHM);
        Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
        return new String(decryptedBytes);
    }
}
