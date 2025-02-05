import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'

@Injectable({
    providedIn: 'root'
  })
  export class AesDecryptService {
    private secretKey = '1234567890123456'; // Must match Java key
  
    decrypt(encryptedBase64: string): string {
      // Base64 decode the encrypted data
      const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedBase64);
  
      // Set up the key
      const key = CryptoJS.enc.Utf8.parse(this.secretKey);
  
      // Create a CipherParams object
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: encryptedBytes
      });
  
      // Decrypt with AES-ECB
      const decrypted = CryptoJS.AES.decrypt(
        cipherParams, // Pass the CipherParams object
        key,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      );
  
      // Convert to UTF-8 string
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }