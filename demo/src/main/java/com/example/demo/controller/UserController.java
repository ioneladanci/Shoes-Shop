package com.example.demo.controller;
import com.example.demo.Dto.UserDto;
import com.example.demo.Dto.UserResponse;
import com.example.demo.enums.UserType;
import com.example.demo.model.User;
import com.example.demo.service.impl.EmailServiceImplementare;
import com.example.demo.service.impl.UserServiceImplementare;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserServiceImplementare userService;

    @Autowired
    private EmailServiceImplementare emailServiceImplementare;

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateUser(@Valid @RequestBody UserDto userDto, @PathVariable Long id) {
         userService.updateUser( new User(userDto, UserType.BUYER),id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity findById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findById(id));
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@Valid @RequestBody UserDto userDto) {
        return userService.createUser(new User(userDto, UserType.BUYER));
    }

    @GetMapping("/all_users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> findAll() {
        return userService.findAll();
    }

    @PutMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> register(@Valid @RequestBody UserDto userdto) {
        User user=new User(userdto,UserType.BUYER);
        return ResponseEntity.ok().body(userService.register(user));
    }

    @PutMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse loginBuyer(@Valid @RequestBody UserDto userDto) {
        User user=new User(userDto,UserType.BUYER);
        return new UserResponse(userService.loginBuyer(user));
    }

    @PutMapping("/loginAdmin")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse loginAdmin(@Valid @RequestBody UserDto userdto) {
        User user=new User(userdto,UserType.ADMIN);
        return new UserResponse(userService.loginAdmin(user));
    }

    @PutMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserResponse> logOut(@RequestParam String email) {
        return ResponseEntity.ok().body(userService.logOut(email));
    }

    @GetMapping("/isloged")
    @ResponseStatus(HttpStatus.OK)
    public boolean idLoged(@Valid @RequestBody String email) {
        return userService.getLogedVar(email);
    }

    @GetMapping("/findByEmail")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse findByEmail(@RequestParam String email) {
        User user= userService.findByEmail(email);
        return new UserResponse(user);
    }

    @PostMapping("/send_password")
    public void sendPassword(@RequestParam String email) throws MessagingException {
        emailServiceImplementare.sendMailWithAttachment(email,
                "Your password is:" + userService.forgotPassword(email),
                "Password requested");
    }
}
