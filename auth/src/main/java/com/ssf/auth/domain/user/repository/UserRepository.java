package com.ssf.auth.domain.user.repository;

import com.ssf.auth.domain.user.SocialType;
import com.ssf.auth.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByRefreshToken(String refreshToken);
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
