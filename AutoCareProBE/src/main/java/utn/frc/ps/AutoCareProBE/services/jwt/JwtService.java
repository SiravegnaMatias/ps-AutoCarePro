package utn.frc.ps.AutoCareProBE.services.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    public static String getToken(UserDetails userDetails) {
        return getToken(new HashMap<>(), userDetails);
    }

    private static String getToken(Map<String,Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
            .subject(userDetails.getUsername())
            .claims(extraClaims)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
            .signWith(getKey()) // 24 hours
            .compact();
    }

    private static Key getKey() {
        SecretKey key = Jwts.SIG.HS256.key().build();
        return key;
    }

    

  
    
}
