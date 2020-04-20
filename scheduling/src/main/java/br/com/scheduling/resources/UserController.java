package br.com.scheduling.resources;

import br.com.scheduling.exceptions.EmailAlreadyExistException;
import br.com.scheduling.exceptions.IdNotFoundException;
import br.com.scheduling.exceptions.NameAlreadyExistException;
import br.com.scheduling.models.User;
import br.com.scheduling.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IdNotFoundException(id));
        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody User user) {
        userRepository.findById(user.getId()).orElseThrow(() -> new IdNotFoundException(user.getId()));

        Optional<User> validateName = userRepository.findOneByName(user.getName());
        if (validateName.isPresent() && validateName.get().getId() != user.getId())
            throw new NameAlreadyExistException(user.getName());

        Optional<User> validateEmail = userRepository.findOneByEmail(user.getEmail());
        if (validateEmail.isPresent() && validateEmail.get().getId() != user.getId())
            throw new EmailAlreadyExistException(user.getEmail());

        return ResponseEntity.ok(userRepository.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
       userRepository.findById(id).orElseThrow(() -> new IdNotFoundException(id));

       userRepository.deleteById(id);
       return ResponseEntity.ok().build();
    }
}
