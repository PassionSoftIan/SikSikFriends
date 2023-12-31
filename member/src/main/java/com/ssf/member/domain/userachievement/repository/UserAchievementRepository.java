package com.ssf.member.domain.userachievement.repository;

import com.ssf.member.domain.userachievement.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {

    List<UserAchievement> findAllByUser_Id(Long id);
}
