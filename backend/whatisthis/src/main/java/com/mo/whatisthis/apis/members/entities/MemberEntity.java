package com.mo.whatisthis.apis.members.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "members")
@ToString
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 사원번호/기기 등록번호
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String name;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = false)
    private Role role;

    @Column(nullable = true)
    private String image_url;

    public MemberEntity(String username, String password,
        Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public void setInitialInfo(String name, String phone, String image_url) {
        this.name = name;
        this.phone = phone;
        this.image_url = image_url;
    }

    public enum Role {
        ROLE_EMPLOYEE("ROLE_EMPLOYEE"),
        ROLE_DEVICE("ROLE_DEVICE");

        private final String authority;

        Role(String authority) {
            this.authority = authority;
        }

        public String getAuthority() {
            return authority;
        }
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        password = passwordEncoder.encode(password);
    }
}
