package br.com.scheduling.repositories;

import br.com.scheduling.models.ShedulingAppointment;
import br.com.scheduling.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ShedulingAppointmentRepository extends JpaRepository<ShedulingAppointment, Long> {

    @Query("SELECT sp FROM ShedulingAppointment sp "
            + " WHERE sp.user = ?1 "
            + " AND ((?2 IS NULL OR LOWER(sp.doctor.name) LIKE(LOWER(?2))) "
            + " OR (?2 IS NULL OR LOWER(sp.description) LIKE(LOWER(?2)))) "
            + " ORDER BY sp.date ASC")
    Page<ShedulingAppointment> findAllByFilterOrderByDate(User user, String filter, Pageable pageable);

    Page<ShedulingAppointment> findAllByUser(User user, Pageable pageable);
}
