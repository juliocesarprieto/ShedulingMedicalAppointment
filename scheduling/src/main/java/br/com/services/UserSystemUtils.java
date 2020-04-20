package br.com.services;

import br.com.scheduling.models.User;
import br.com.scheduling.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSystemUtils {

    @Autowired
    UserRepository userRepository;

    public User userDetail() throws UsernameNotFoundException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String username = authentication.getName();

            Optional<User> user = userRepository.findByEmail(username);
            user.orElseThrow(() ->
                    new UsernameNotFoundException(String.format("User with email [%s] not found!", username)));

            return user.get();
        }

        return null;
    }
}
