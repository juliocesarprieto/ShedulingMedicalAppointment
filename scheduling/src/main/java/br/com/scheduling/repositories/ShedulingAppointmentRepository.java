package br.com.scheduling.repositories;

import br.com.scheduling.models.ShedulingAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShedulingAppointmentRepository extends JpaRepository<ShedulingAppointment, Long> {

    @Query("SELECT sp FROM ShedulingAppointment sp " +
            "WHERE sp.user.id =:userId " +
            "ORDER BY sp.date ASC")
    List<ShedulingAppointment> findAllByUserIdOrderByDate(@Param("userId") Long id);
}
