package com.mylearning.ecom_proj.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
//used to tell this as a database related file
@Entity
@Data
//insted of using constructer i mean writting the code to send objects we can use this
@AllArgsConstructor
@NoArgsConstructor
public class Product {
//    used to identify the primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //used to auto genrate the values example like id sequence
    private Integer  id;
    private String name;
    private String description;
    private String brand;
    private BigDecimal price;
    private String category;
//    this is to handle data formate u can do it in backend like this or u can handle it in frontned UI
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    private Date releaseDate;
    private boolean avaliable;
    private int quantity;

    private String imageName;
    private String imageType;
//    used for large objects
    @Lob
    private byte[] imageData;



}
