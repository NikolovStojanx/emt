package mk.ukim.finki.wp.kol2022.g1.model;

import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.emt.eshop.model.enumerations.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@Entity
@Table(name = "shop_users")
public class User implements UserDetails {

    @Id
    private String username;

    @Version
    private Long version;

    private String password;

    private String name;

    private String surname;

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;

    @Enumerated(value = EnumType.STRING)
    private EmployeeType role;

    // default:
    // to-one -> FetchType.EAGER
    // to-many -> FetchType.LAZY
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private List<ShoppingCart> carts;

    public User() {
    }

    public User(String username, String password, String name, String surname, EmployeeType role) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList((GrantedAuthority) role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
