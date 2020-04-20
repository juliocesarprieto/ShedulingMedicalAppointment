package br.com.scheduling.repositories;

import br.com.scheduling.models.Doctor;
import br.com.scheduling.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query("SELECT d FROM Doctor d "
            +" WHERE d.user = ?1 "
            +" AND ((?2 IS NULL OR LOWER(d.name) LIKE(LOWER(?2))) "
            +" OR (?2 IS NULL OR LOWER(d.email) LIKE(LOWER(?2)))) ")
    Page<Doctor> findAllByFilter(User user, String filter, Pageable pageable);

    Page<Doctor> findAllByUser(User user, Pageable pageable);

    Optional<Doctor> findOneByName(String name);

    Optional<Doctor> findOneByEmail(String email);
}
