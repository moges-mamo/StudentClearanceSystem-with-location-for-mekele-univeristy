package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class CampusUser extends User{
 
    @ManyToOne
    private Campus campus;
   
    public Campus getCampus(){
        return campus;
    }
   
    public void setCampus(Campus campus){
        this.campus=campus;
    }
    
}
