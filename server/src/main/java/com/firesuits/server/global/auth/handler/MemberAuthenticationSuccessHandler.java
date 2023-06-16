package com.firesuits.server.global.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.firesuits.server.global.error.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 로그인 인증 성공 시 추가 작업을 할 수 있는 클래스
@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        response.setContentType("application/json");
        response.getWriter().write(new ObjectMapper().writeValueAsString(Response.success()));
        log.info("# Authenticated successfully!");
    }
}
