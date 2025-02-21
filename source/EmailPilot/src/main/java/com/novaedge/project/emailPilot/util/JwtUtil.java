package com.novaedge.project.emailPilot.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.novaedge.project.emailPilot.model.CustomUserDetails;

import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil1 {

    private final String secret = "abcdefghijklmnopqrstabcdwwwwwaaaaaaaaaaaaaaaaaaa"; // At least 256-bit key
    private final Key key = Keys.hmacShaKeyFor(secret.getBytes());

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours validity
                .signWith(key, SignatureAlgorithm.HS256) // Use `key` instead of string secret
                .compact();
    }

//    public Boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return (username.equals(userDetails.getUsername()) || username.equals(userDetails.getEmail()) && !isTokenExpired(token));
//    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        // Check if userDetails is an instance of your custom class
        if (userDetails instanceof CustomUserDetails) {
            String email = ((CustomUserDetails) userDetails).getEmail();
            return (username.equals(userDetails.getUsername()) || 
                    username.equals(email)) && 
                    !isTokenExpired(token);
        }

        // Default check if it's not an instance of CustomUserDetails
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

}
