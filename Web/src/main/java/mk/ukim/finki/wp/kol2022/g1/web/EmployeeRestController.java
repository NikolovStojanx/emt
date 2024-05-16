package mk.ukim.finki.wp.kol2022.g1.web;

import mk.ukim.finki.wp.kol2022.g1.model.Employee;
import mk.ukim.finki.wp.kol2022.g1.model.EmployeeType;
import mk.ukim.finki.wp.kol2022.g1.model.Skill;
import mk.ukim.finki.wp.kol2022.g1.service.EmployeeService;
import mk.ukim.finki.wp.kol2022.g1.service.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/employees")
public class EmployeeRestController {

    private final EmployeeService service;
    private final SkillService skillService;

    public EmployeeRestController(EmployeeService service, SkillService skillService) {
        this.service = service;
        this.skillService = skillService;
    }

    @GetMapping("/show")
    public ResponseEntity<List<Employee>> getAllEmployees(
            @RequestParam(required = false) Long skillId,
            @RequestParam(required = false) Integer yearsOfService) {
        List<Employee> employees;
        if (skillId == null && yearsOfService == null) {
            employees = this.service.listAll();
        } else {
            employees = this.service.filter(skillId, yearsOfService);
        }
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        List<Skill> skills;
        skills = skillService.listAll();

        return ResponseEntity.ok(skills);
    }

    @GetMapping("/employeeTypes")
    public ResponseEntity<List<String>> getEmployeeTypes() {
        List<String> employeeTypes;
        employeeTypes = Arrays.stream(EmployeeType.values()).map(type -> type.toString()).collect(Collectors.toList());

        return ResponseEntity.ok(employeeTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = service.findById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = service.create(employee.getName(),
                employee.getEmail(),
                employee.getPassword(),
                employee.getType(),
                employee.getSkills().stream().map(skill -> skill.getId()).collect(Collectors.toList()),
                employee.getEmploymentDate());

        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = service.findById(id);
        if (employee != null) {

            Employee updatedEmployee = service.update(employeeDetails.getId(),
                    employeeDetails.getName(),
                    employeeDetails.getEmail(),
                    employeeDetails.getPassword(),
                    employeeDetails.getType(),
                    employeeDetails.getSkills().stream().map(skill -> skill.getId()).collect(Collectors.toList()),
                    employeeDetails.getEmploymentDate());

            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee employee = service.findById(id);
        if (employee != null) {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
