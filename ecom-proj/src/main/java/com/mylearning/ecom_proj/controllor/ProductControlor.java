package com.mylearning.ecom_proj.controllor;

import com.mylearning.ecom_proj.model.Product;
import com.mylearning.ecom_proj.service.ProductService;
import org.hibernate.event.internal.EntityState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.parser.Entity;
import java.io.IOException;
import java.util.List;
//used to merge fronted and backend port ie cross platform ,front and backend port number will be different because of security reasons
@CrossOrigin
@RestController
//setting the the url page ex:http;//products/API<- this we tell set by requestMapping
@RequestMapping("/api")
public class ProductControlor {
//helps to get the object from the other class
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


//@requestpart accpects the part of the object
//@requestBody accpects the whole object
    @PostMapping("/product")
public ResponseEntity<?>addProduct(@RequestPart Product product,
                                   @RequestPart MultipartFile imageFile){
    try {
        Product product1 = service.addProduct(product, imageFile);
        return new ResponseEntity<>(product1,HttpStatus.OK);
    }
    catch ( Exception e ){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
@GetMapping("/product/{productId}/image")
public ResponseEntity<byte[]>getImageByProductId(@PathVariable int productId){
    Product product= service.getProductById(productId);
    byte[] imageFile = product.getImageData();

    return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType()))
                             .body(imageFile);
}
@PutMapping("/product/{id}")
public ResponseEntity<String>updateProduct(@PathVariable int id,@RequestPart Product product,
                                           @RequestPart(required = false)  MultipartFile imageFile){

    Product product1 = null;
    try {
        product1 = service.updateProduct(id,product,imageFile);
    } catch (IOException e) {
        return new ResponseEntity<>("failed to update",HttpStatus.BAD_GATEWAY);
    }
    if (product1 !=null)
        return new ResponseEntity<>("updated",HttpStatus.OK);
    else
        return new ResponseEntity<>("failed to update",HttpStatus.BAD_GATEWAY);
}

@DeleteMapping("/product/{id}")
    public ResponseEntity<String>deleteProduct(@PathVariable int id ){
    Product product = service.getProductById(id);
             if(product != null){
                    service.deleteProduct(id);
                        return new ResponseEntity<>("deleted",HttpStatus.OK);}
             else {return new ResponseEntity<>("product not found",HttpStatus.BAD_GATEWAY);}

}
@GetMapping("/product/search")
public ResponseEntity<List<Product>>searchProduct(@RequestParam String keyword){
    System.out.println("searching with"+" "+keyword);
    List<Product>products=service.searchProduct(keyword);
    return new ResponseEntity<>(products,HttpStatus.OK);
}
}
