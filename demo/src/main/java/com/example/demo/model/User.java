package com.example.demo.model;

import com.example.demo.Dto.UserDto;
import com.example.demo.enums.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"email"})})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Email
    @Column(nullable= false,length = 30)
    private String email;


    @Column(nullable= false)
    private String password;

    @Column(nullable= false)
    private UserType role;
    @Column(nullable= false)
    private boolean loged ;

    public User(String email, String password, UserType role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(String email, String password, UserType role,boolean loged) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.loged=loged;
    }

    public User(UserDto userDto, UserType userType) {
        this.email = userDto.getEmail();
        this.password = userDto.getPassword();
        this.role = userType;
    }




}
