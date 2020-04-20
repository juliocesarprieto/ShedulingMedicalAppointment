package br.com.scheduling.repositories;

import br.com.scheduling.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByName(String name);

    Optional<User> findOneByEmail(String email);

    Optional<User> findByEmail(String email);
}
