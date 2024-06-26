package mk.ukim.finki.wp.kol2022.g1.service;

import mk.ukim.finki.emt.eshop.model.enumerations.Role;
import mk.ukim.finki.emt.eshop.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User register(String username, String password, String repeatPassword, String name, String surname, Role role);
}


