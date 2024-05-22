package com.cecs544.bughound.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cecs544.bughound.service.EmployeeService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig { 
  
	private static final String[] AUTH_WHITELIST = {
			"/v2/api-docs",
			"/swagger-resources",
			"/swagger-resources/**",
			"/configuration/ui",
			"/configuration/security",
			"/swagger-ui.html",
			"/webjars/**",			
			"/v3/api-docs/**",
			"/swagger-ui/**",
			"/"
	};
	
    @Autowired
    private JwtAuthFilter authFilter; 
  
    // User Creation 
    @Bean
    public UserDetailsService userDetailsService() { 
        return new EmployeeService(); 
    } 
  
    // Configuring HttpSecurity 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { 
    	/*return http
        .authorizeHttpRequests(requests -> requests
            .requestMatchers("/addEmployee","/authenticate").permitAll()
            .requestMatchers(HttpMethod.GET,AUTH_WHITELIST).permitAll())
            //.anyRequest().authenticated())
        .authenticationProvider(authenticationProvider())
        .build();*/
    	return http.csrf().disable() 
                .authorizeHttpRequests() 
                .requestMatchers("/area","/area/**","/area/program/**",
                		"/addEmployee", "/authenticate",
                		"/program","/program/**",
                		"/bug","/bug/**","/bug/assignedTo/**","/bug/attachament/**",
                		"/employee","/employee/**",
                		"/specification").permitAll() 
                
                .and() 
                .authorizeHttpRequests().requestMatchers("/auth/user/**").authenticated() 
                .and() 
                .authorizeHttpRequests().requestMatchers("/auth/admin/**").authenticated() 
                .and() 
                .sessionManagement() 
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
                .and() 
                .authenticationProvider(authenticationProvider()) 
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class) 
                .cors(cors -> cors.disable())
                .build(); 
    } 
  
    // Password Encoding 
    @Bean
    public PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    } 
  
    @Bean
    public AuthenticationProvider authenticationProvider() { 
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
        authenticationProvider.setUserDetailsService(userDetailsService()); 
        authenticationProvider.setPasswordEncoder(passwordEncoder()); 
        return authenticationProvider; 
    } 
  
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { 
        return config.getAuthenticationManager(); 
    } 
  
} 