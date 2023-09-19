package com.ssf.auth.domain.user.repository;

import com.ssf.auth.domain.user.enums.SocialType;
import com.ssf.auth.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
