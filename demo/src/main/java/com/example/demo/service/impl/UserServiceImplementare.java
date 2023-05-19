package com.example.demo.service.impl;

import com.example.demo.Dto.UserResponse;
import com.example.demo.enums.UserType;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserServiceImplementare implements UserService {

    private final UserRepository userRepo;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @SneakyThrows
    @Override
    public void updateUser(User user, Long id){
        userRepo.findByUserId(id).orElseThrow(()->new Exception("Id not found"));
        user.setUserId(id);
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepo.save(user);
        userRepo.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepo.findByUserId(id);
    }

    @Override
    public UserResponse createUser(User user) {
        User createdUser = userRepo.save(user);
        return new UserResponse(createdUser);
    }

    @Override
    public List<UserResponse> findAll() {
        List<User> userList=  (List<User>) userRepo.findAll();
        List<UserResponse> userDtoList= new ArrayList<>();
        for(User user: userList){
            userDtoList.add(new UserResponse(user));
        }
        return userDtoList;
    }


    @SneakyThrows
    @Override
    public User register(User user1) {
         User user=new User(user1.getEmail(),user1.getPassword(),UserType.BUYER);
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        if(user1.getEmail().length()<5 || user1.getPassword().length()<5){

            throw new Exception("Invalid Register");
        }
        user.setPassword(encodedPassword);
        userRepo.save(user);
        System.out.println(user.getUserId());
        this.setLogedVar(user.getUserId(), true);
        return user;
    }

    @SneakyThrows
    public User login(User user) {

        User user1 = userRepo.findByEmail(user.getEmail());
        if(!Objects.nonNull(user1)){
            throw new Exception("Invalid email");
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());

        if(!passwordEncoder.matches(user.getPassword(), encodedPassword) || !user1.getRole().equals(user.getRole())){

            throw new Exception("Invalid password/role");
        }
        System.out.println(user1.getUserId());
        this.setLogedVar(user1.getUserId(), true);
        return user1;
    }

    @Override
    public User loginBuyer(User user)  {
        return login(user);
    }

    @Override
    public User loginAdmin(User user)  {
        return login(user);
    }

    @SneakyThrows
    @Override
    public UserResponse logOut(String email) {
        User user1 = userRepo.findByEmail(email);

        this.setLogedVar(user1.getUserId(), false);
        return new UserResponse(user1);
    }

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @SneakyThrows
    @Override
    public void setLogedVar(Long id, boolean loged){
        System.out.println(id);
        User user = userRepo.findByUserId(id).orElseThrow(()->new Exception("Id not found"));
        user.setUserId(id);
        user.setLoged(loged);
        userRepo.save(user);
    }

    @SneakyThrows
    @Override
    public boolean getLogedVar(String email){
        User user = userRepo.findByEmail(email);

        return user.isLoged();
    }

    @Override
    public String forgotPassword(String email){
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        User user=userRepo.findByEmail(email);
        user.setPassword(generatedString);
        updateUser(user, user.getUserId());
        return generatedString;
    }

    @Override
    public void deleteById(Long id) {
         userRepo.deleteById(id);
    }
}
