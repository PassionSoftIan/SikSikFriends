package com.ssf.member.global.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssf.member.domain.user.dto.UserRequest;
import com.ssf.member.domain.user.repository.UserRepository;
import com.ssf.member.global.jwt.dto.JwtDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.ssf.member.global.jwt.domain.JwtConstants.*;

@Service
@Slf4j
@Transactional
@Getter
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final RedisTemplate<String, String> redisTemplate;
    private final UserRepository userRepository;

    public String createAccessToken(String id) {
        Date now = new Date();

        return JWT.create()
                .withSubject(ACCESS_TOKEN_SUBJECT.getValue())
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod))
                .withClaim(ID_CLAIM.getValue(), id)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public String createRefreshToken() {
        Date now = new Date();

        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT.getValue())
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(accessHeader, accessToken);
    }

    public JwtDto extractHeader(UserRequest.AccessHeader accessHeader) {
        String accessToken = extractAccessToken(accessHeader).orElseThrow();
        DecodedJWT decodedJWT = extractJwt(accessToken).orElseThrow();

        return JwtDto.builder()
                .accessToken(accessToken)
                .id(String.valueOf(decodedJWT.getClaim(ID_CLAIM.getValue())))
                .exp(extractExpiration(decodedJWT))
                .build();
    }

    public Optional<String> extractAccessToken(UserRequest.AccessHeader accessHeader) {
        return Optional.ofNullable(accessHeader.accessHeader())
                .filter(accessToken -> accessToken.startsWith(AUTH_TYPE.getValue()))
                .map(accessToken -> accessToken.replace(AUTH_TYPE.getValue(), ""));
    }

    public String extractRefreshToken(String id) {
        return redisTemplate.opsForValue().get(id);
    }

    private Optional<DecodedJWT> extractJwt(String accessToken) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken));

        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<String> extractId(String accessToken) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getClaim(ID_CLAIM.getValue()).toString());

        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Long extractExpiration(DecodedJWT decodedJWT) {
        return decodedJWT.getClaim(EXP_CLAIM.getValue()).asLong() * 1000
                - System.currentTimeMillis();
    }

    public void updateRefreshToken(String id, String refreshToken) {
        redisTemplate.opsForValue().set(id, refreshToken, 300L, TimeUnit.SECONDS);
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
