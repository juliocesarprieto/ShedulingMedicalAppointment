package br.com.scheduling.resources;

import br.com.scheduling.exceptions.ActionDeniedException;
import br.com.scheduling.exceptions.IdNotFoundException;
import br.com.scheduling.models.ShedulingAppointment;
import br.com.scheduling.models.User;
import br.com.scheduling.repositories.DoctorRepository;
import br.com.scheduling.repositories.ShedulingAppointmentRepository;
import br.com.scheduling.repositories.UserRepository;
import br.com.services.UserSystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sheduling_appointments")
public class ShedulingAppointmentController {

    @Autowired
    private ShedulingAppointmentRepository shedulingAppointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserSystemUtils userSystemUtils;

    @GetMapping("/")
    public ResponseEntity<List<ShedulingAppointment>> findAllByUserId(@RequestParam("filter") String filter, Pageable pageable) {

        User user = userSystemUtils.userDetail();

//        List<ShedulingAppoiment> shedulingAppoiments = shedulingAppoimentRepository.findAllByUserIdOrderByDate(id);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/")
    public ResponseEntity<ShedulingAppointment> create(
            @RequestBody ShedulingAppointment shedulingAppointment) {

        User user = userSystemUtils.userDetail();

        shedulingAppointment.setUser(user);

        return ResponseEntity.ok(shedulingAppointmentRepository.save(shedulingAppointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        ShedulingAppointment shedulingAppointment =shedulingAppointmentRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException(id));

        User user = userSystemUtils.userDetail();

        if (shedulingAppointment.getUser().getId() != user.getId())
            throw new ActionDeniedException("Do not have permission for this action!");

        shedulingAppointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
