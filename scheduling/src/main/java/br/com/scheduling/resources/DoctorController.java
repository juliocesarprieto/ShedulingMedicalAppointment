package br.com.scheduling.resources;

import br.com.scheduling.exceptions.ActionDeniedException;
import br.com.scheduling.exceptions.EmailAlreadyExistException;
import br.com.scheduling.exceptions.IdNotFoundException;
import br.com.scheduling.exceptions.NameAlreadyExistException;
import br.com.scheduling.models.Doctor;
import br.com.scheduling.models.User;
import br.com.scheduling.repositories.DoctorRepository;
import br.com.services.UserSystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserSystemUtils userSystemUtils;

    @CrossOrigin("*")
    @GetMapping("/")
    public Page<Doctor> filter(@RequestParam(required = false) String filter, Pageable pageable) {

        User user = userSystemUtils.userDetail();

        Page<Doctor> page = filter.isEmpty()
                ? doctorRepository.findAllByUser(user, pageable)
                : doctorRepository.findAllByFilter( user,"%" + filter + "%", pageable);
        return page;
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> findById(@PathVariable Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new IdNotFoundException(id));

        User user = userSystemUtils.userDetail();

        if (doctor.getUser().getId() != user.getId())
            throw new ActionDeniedException("Do not have permission for this actions!");

        return ResponseEntity.ok(doctor);
    }

    @CrossOrigin("*")
    @PostMapping("/")
    public ResponseEntity<Doctor> create(@RequestBody Doctor newDoctor) {

        User user = userSystemUtils.userDetail();

        Optional<Doctor> validateName = doctorRepository.findOneByName(newDoctor.getName());
        if (validateName.isPresent())
            throw new NameAlreadyExistException(newDoctor.getName());

        Optional<Doctor> validateEmail = doctorRepository.findOneByEmail(newDoctor.getEmail());
        if (validateEmail.isPresent())
            throw new EmailAlreadyExistException(newDoctor.getEmail());

        newDoctor.setUser(user);

        List<Doctor> doctors = new ArrayList<>();
        doctors.add(newDoctor);

        newDoctor = doctorRepository.save(newDoctor);
        return ResponseEntity.ok(newDoctor);
    }

    @CrossOrigin("*")
    @PutMapping("/")
    public ResponseEntity<Doctor> update(@RequestBody Doctor doctor) {
        Doctor doctorBD = doctorRepository.findById(doctor.getId())
                .orElseThrow(() -> new IdNotFoundException(doctor.getId()));

        User user = userSystemUtils.userDetail();

        if (doctorBD.getUser().getId() != user.getId())
            throw new ActionDeniedException("Do not have permission for this actions!");


        Optional<Doctor> validateName = doctorRepository.findOneByName(doctor.getName());
        if (validateName.isPresent() && validateName.get().getId() != doctor.getId())
            throw new NameAlreadyExistException(doctor.getName());

        Optional<Doctor> validateEmail = doctorRepository.findOneByEmail(doctor.getEmail());
        if (validateEmail.isPresent() && validateEmail.get().getId() != doctor.getId())
            throw new EmailAlreadyExistException(doctor.getEmail());

        doctor.setUser(doctorBD.getUser());

        return ResponseEntity.ok(doctorRepository.save(doctor));
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        User user = userSystemUtils.userDetail();

        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new IdNotFoundException(id));

        if (user.getId() != doctor.getUser().getId())
            throw new ActionDeniedException("Do not have permission for this actions!");

        doctorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
