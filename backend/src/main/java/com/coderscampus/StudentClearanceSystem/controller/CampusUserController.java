package com.coderscampus.StudentClearanceSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.coderscampus.StudentClearanceSystem.domain.Account;
import com.coderscampus.StudentClearanceSystem.domain.CampusUser;
import com.coderscampus.StudentClearanceSystem.dto.StaffDto;
import com.coderscampus.StudentClearanceSystem.enums.AuthorityEnum;
import com.coderscampus.StudentClearanceSystem.service.CampusUserService;
import com.coderscampus.StudentClearanceSystem.util.AuthorityUtil;
import java.util.List;

@RestController
@RequestMapping("/api/campus_users")
public class CampusUserController {
    @Autowired
    private CampusUserService campusUserService;
    @PostMapping
    public ResponseEntity<?> saveUser(@AuthenticationPrincipal Account account,
    @RequestBody StaffDto staff){
        try{
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                return ResponseEntity.ok(campusUserService.saveUser(staff));
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        catch(Exception ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    @GetMapping("cafeterias")
    public ResponseEntity<?> getCafeteria(@AuthenticationPrincipal Account account){
        try{
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                System.out.println("\n\n\n**** Firstname: ");
List<CampusUser> users = campusUserService.getCafeteria();

// Check if users list is null or empty to avoid NullPointerException
if (users != null && !users.isEmpty()) {
    for (CampusUser user : users) {
        System.out.println(user.getFname());
    }
} else {
    System.out.println("No users found in the cafeteria.");
}

return ResponseEntity.ok(users);

            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        catch(Exception ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

   

    @GetMapping("campus_polices")
    public ResponseEntity<?> getCampusPolice(@AuthenticationPrincipal Account account){
      
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(),account)){
                return ResponseEntity.ok(campusUserService.getCampusPolice());
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
       
    }

    




         @DeleteMapping("/{staffId}")
    public ResponseEntity<?> deleteStaff(@AuthenticationPrincipal Account account,
                                           @PathVariable Long staffId) {
     
        if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_ADMIN.name(), account)) {
            campusUserService.deleteStaff(staffId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
