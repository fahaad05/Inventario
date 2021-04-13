package com.pc.inventario.service;

import com.pc.inventario.exception.UserNotFoundException;
import com.pc.inventario.model.User;
import com.pc.inventario.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User findUserById(Long id) {
        return userRepository.findUserById(id).orElseThrow(() ->
                new UserNotFoundException("User by id "+ id+" was not found!"));
    }

    public void updateNumDotazioniPlus(Long id) {
        User userToUpdate = userRepository.findUserById(id).orElseThrow(() ->
                new UserNotFoundException("User by id "+ id+" was not found!"));
        int num = userToUpdate.getNumDotazioni();
        num++;
        userToUpdate.setNumDotazioni(num);
        userRepository.save(userToUpdate);
    }

    public void updateNumDotazioniMinus(Long id) {
        User userToUpdate = userRepository.findUserById(id).orElseThrow(() ->
                new UserNotFoundException("User by id "+ id+" was not found!"));
        
        int num = userToUpdate.getNumDotazioni();
        num--;
        userToUpdate.setNumDotazioni(num);
        userRepository.save(userToUpdate);
    }

    public void deleteUser(Long id) {
        userRepository.deleteUserById(id);
    }
}
