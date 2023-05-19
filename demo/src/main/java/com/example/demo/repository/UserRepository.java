package com.example.demo.repository;

import com.example.demo.enums.UserType;
import com.example.demo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {


    Optional<User> findByUserId(Long id);
    User findByEmail(String email);
    Optional<User> findByEmailBeforeAndPasswordAndRole(String email, String password, UserType type);
    Boolean existsByEmail(String email);

}

