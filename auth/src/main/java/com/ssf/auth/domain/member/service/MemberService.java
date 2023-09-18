package com.ssf.auth.domain.member.service;

import com.ssf.auth.domain.member.dto.MemberResponse;
import com.ssf.auth.domain.member.entity.Member;
import com.ssf.auth.domain.member.enums.MemberErrorResult;
import com.ssf.auth.domain.member.enums.SocialType;
import com.ssf.auth.domain.member.exception.MemberException;
import com.ssf.auth.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private static final String EMAIL = "test@test.com";
    private static final String PASSWORD = "password";
    private static final String NICKNAME = "nickname";

    public MemberResponse createMember(final String email, final SocialType socialType) {
        final Member result = memberRepository.findByEmailAndSocialType(email, socialType);

        if (result != null) {
            throw new MemberException(MemberErrorResult.DUPLICATED_MEMBER_REGISTER);
        }

        final Member member = Member.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .nickname(NICKNAME)
                .build();

        final Member savedMember =  memberRepository.save(member);

        return MemberResponse.builder()
                .email(savedMember.getEmail())
                .socialType(savedMember.getSocialType())
                .build();
    }
}
