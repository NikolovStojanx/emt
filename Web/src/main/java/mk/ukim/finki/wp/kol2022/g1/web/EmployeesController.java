package mk.ukim.finki.wp.kol2022.g1.web;


import mk.ukim.finki.wp.kol2022.g1.model.Employee;
import mk.ukim.finki.wp.kol2022.g1.model.EmployeeType;
import mk.ukim.finki.wp.kol2022.g1.service.EmployeeService;
import mk.ukim.finki.wp.kol2022.g1.service.SkillService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class EmployeesController {
    private final EmployeeService employeeService;
    private final SkillService skillService;

    public EmployeesController(EmployeeService employeeService, SkillService skillService) {
        this.employeeService = employeeService;
        this.skillService = skillService;
    }

    @GetMapping
    public String data(Model model) {
        List<Employee> employees = employeeService.listAll();
        model.addAttribute("employees", employees);
        model.addAttribute("skills", skillService.listAll());
        model.addAttribute("types", EmployeeType.values());

        return "list";

    }
}
