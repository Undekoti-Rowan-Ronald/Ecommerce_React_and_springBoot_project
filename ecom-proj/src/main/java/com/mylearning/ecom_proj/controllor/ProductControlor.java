package com.mylearning.ecom_proj.controllor;

import com.mylearning.ecom_proj.model.Product;
import com.mylearning.ecom_proj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductControlor {

    @Autowired
    private ProductService service;

//    @RequestMapping("/")
//public String greet(){
//    return "hello World";
//}

@GetMapping ("/products")
public ResponseEntity< List<Product>>getAllPProducts(){
   return new ResponseEntity<>( service.getAllProducts(),HttpStatus.OK);
}
@GetMapping("/product/{id}")
public ResponseEntity< Product >getProduct(@PathVariable int id){
    Product product= service.getProductById(id);
    if (product != null)
    return new ResponseEntity<>(product,HttpStatus.OK);
    else
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}

}
