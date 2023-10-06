package com.mo.whatisthis.security.utils;

import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.security.service.UserDetailsImpl;
import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static Optional<Integer> getLoginId() {
        Object principal = SecurityContextHolder.getContext()
                                                .getAuthentication()
                                                .getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return Optional.ofNullable(((UserDetailsImpl) principal).getUserId());
        }

        return Optional.empty();
    }

    public static Optional<String> getUsername() {
        Object principal = SecurityContextHolder.getContext()
                                                .getAuthentication()
                                                .getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return Optional.ofNullable(((UserDetailsImpl) principal).getUsername());
        }

        return Optional.empty();
    }

    public static Optional<Role> getLoginRole() {
        Object principal = SecurityContextHolder.getContext()
                                                .getAuthentication()
                                                .getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return Optional.ofNullable(((UserDetailsImpl) principal).getRole());
        }

        return Optional.empty();
    }

    public static Optional<String> getPhone() {
        Object principal = SecurityContextHolder.getContext()
                                                .getAuthentication()
                                                .getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return Optional.ofNullable(((UserDetailsImpl) principal).getPhone());
        }
        return Optional.empty();
    }
}
