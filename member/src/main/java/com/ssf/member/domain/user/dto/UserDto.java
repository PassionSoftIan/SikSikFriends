package com.ssf.member.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDto {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Detail {

        private String email;
        private String nickname;
        private String profile;
        private int level;
        private Long rank;
        private int score;
        private String odds;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Request {

        private String nickname;
        private String password;
        private String profile;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Response {

        private String email;
        private String nickname;
        private String profile;
        private String odds;
        private Long user_id;
        private Long rank;
        private boolean activated;
        private int score;
        private int level;
    }
}
