package com.coderscampus.StudentClearanceSystem.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class CollegeUser  extends User{

    @ManyToOne
    private College college;
  
    public College getCollege(){
        return college;
    }

   
    public void setCollege(College college){
        this.college=college;
    }
}
