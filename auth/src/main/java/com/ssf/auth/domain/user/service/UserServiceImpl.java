package com.ssf.auth.domain.user.service;

import com.ssf.auth.domain.user.dto.UserSignUpDto;
import com.ssf.auth.domain.user.User;
import com.ssf.auth.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UserSignUpDto userSignUpDto) throws Exception {

        if (userRepository.existsByEmail(userSignUpDto.getEmail())) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if (userRepository.existsByNickname(userSignUpDto.getNickname())) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .password(userSignUpDto.getPassword())
                .nickname(userSignUpDto.getNickname())
                .profile(userSignUpDto.getProfile())
                .build();

        user.encodePassword(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public void validEmail(String email) throws Exception {
        if (userRepository.existsByEmail(email)) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }
    }

    @Override
    public void ValidNickname(String nickname) throws Exception {
        if (userRepository.existsByNickname(nickname)) {
            throw new Exception("이미 존재하는 닉네임입니다.");
        }
    }
}
