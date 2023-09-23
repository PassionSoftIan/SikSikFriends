package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.User;
import com.ssf.member.domain.user.dto.UserDto;
import com.ssf.member.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserFindServiceImpl implements UserFindService {

    private final UserRepository userRepository;

    @Override
    public UserDto.Detail findUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(null);

        return UserDto.Detail.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .level(user.getLevel())
                .rank(user.getRank())
                .score(user.getScore())
                .odds(user.getLose() == 0L ? (user.getWin() == 0L ? 0L : 100L) : user.getWin() / user.getLose())
                .build();
    }

    @Override
    public List<UserDto.Detail> findUsers() {
        List<User> users = userRepository.findTop10ByOrderByScoreDesc().orElseThrow(null);
        List<UserDto.Detail> result = new ArrayList<>();

        for (User user : users) {
            result.add(UserDto.Detail.builder()
                    .email(user.getEmail())
                    .nickname(user.getNickname())
                    .score(user.getScore())
                    .profile(user.getProfile())
                    .build());
        }

        return result;
    }
}
