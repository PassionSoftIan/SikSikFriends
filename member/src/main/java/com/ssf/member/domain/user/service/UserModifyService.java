package com.ssf.member.domain.user.service;

import com.ssf.member.domain.user.dto.UserDto;

public interface UserModifyService {

    public void modifyUser(String accessHeader, UserDto.Request request) throws Exception;
}
