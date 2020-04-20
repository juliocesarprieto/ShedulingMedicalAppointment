package br.com.scheduling.resources;

import br.com.scheduling.exceptions.EmailAlreadyExistException;
import br.com.scheduling.exceptions.NameAlreadyExistException;
import br.com.scheduling.models.User;
import br.com.scheduling.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<User> register(@RequestBody User newUser) {

        Optional<User> validateName = userRepository.findOneByName(newUser.getName());
        if (validateName.isPresent())
            throw new NameAlreadyExistException(newUser.getName());

        Optional<User> validateEmail = userRepository.findOneByEmail(newUser.getEmail());
        if (validateEmail.isPresent())
            throw new EmailAlreadyExistException(newUser.getEmail());

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        newUser.setRoles("USER");

        return ResponseEntity.ok(userRepository.save(newUser));
    }
}
