package com.example.demo.service.impl;

import com.example.demo.Dto.ProductDto;
import com.example.demo.enums.Category;
import com.example.demo.model.Product;
import com.example.demo.model.WishList;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.WishListRepo;
import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
import com.example.demo.service.WishListService;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.isNull;

@Service
@AllArgsConstructor
public class ProductServiceImplementare implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartRepository cartRepository;
    @Autowired
    WishListRepo wishListRepo;

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> productList= (List<Product>) productRepository.findAll();
        List<ProductDto> productDtoList= new ArrayList<>();
        for(Product product: productList){
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @SneakyThrows
    @Override
    public void deteleProduct(Long product_id) {
        productRepository.findById(product_id).orElseThrow(()-> new Exception("sdv"));
        if(cartRepository.existsByProduct_Id(product_id))
            cartRepository.deleteAllByProduct_Id(product_id);
        if(wishListRepo.existsByProduct_Id(product_id))
            wishListRepo.deleteAllByProduct_Id(product_id);

        productRepository.deleteById(product_id);
    }

    @SneakyThrows
    @Override
    public void updateProduct(Product product, Long id) {
        productRepository.findById(id).orElseThrow(()->new Exception("Id not found"));
        product.setId(id);
        productRepository.save(product);
    }

    @Override
    public List<Product> findBySex(String sex) {
        return productRepository.findBySex(sex);
    }

    @Override
    public List<Product> findByCategory(Category category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public List<ProductDto> findBySexBeforeAndCategory(String sex, Category category) {
        List<Product> productList = productRepository.findAllBySexAndCategory(sex, category);
        List<ProductDto> productDtoList=new ArrayList<>();
        if (isNull(productList)) return null;
        for(Product product:productList){
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public List<ProductDto> findBySexBeforeAndCategoryAndBrand(String sex, Category category, String brand) {
        List<Product> productList = productRepository.findAllBySexAndCategoryAndBrand(sex, category, brand);
        List<ProductDto> productDtoList=new ArrayList<>();
        if (isNull(productList)) return null;
        for(Product product:productList){
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public Optional<Product> findById(long productId) {
        return productRepository.findById(productId);
    }

    @Override
    public List<ProductDto> findAllByNameLike(String name) {
        List<Product> productList=productRepository.findAllByNameLike("%"+name+"%");
        List<ProductDto> productDtoList=new ArrayList<>();
        for(Product product:productList){
            System.out.println(product);
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public List<ProductDto> findAllBySexAndCategoryAndBrandOrderByPriceAsc(String sex, Category category, String brand){
        List<Product> productList=productRepository.findAllBySexAndCategoryAndBrandOrderByPriceAsc(sex, category, brand);
        List<ProductDto> productDtoList=new ArrayList<>();
        for(Product product:productList){
            System.out.println(product);
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public List<ProductDto> findAllBySexAndCategoryAndBrandOrderByPriceDesc(String sex, Category category, String brand){
        List<Product> productList=productRepository.findAllBySexAndCategoryAndBrandOrderByPriceDesc(sex, category, brand);
        List<ProductDto> productDtoList=new ArrayList<>();
        for(Product product:productList){
            System.out.println(product);
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public List<ProductDto> findAllBySexAndCategoryOrderByPriceDesc(String sex, Category category){
        List<Product> productList=productRepository.findAllBySexAndCategoryOrderByPriceDesc(sex, category);
        List<ProductDto> productDtoList=new ArrayList<>();
        for(Product product:productList){
            System.out.println(product);
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }

    @Override
    public List<ProductDto> findAllBySexAndCategoryOrderByPriceAsc(String sex, Category category){
        List<Product> productList=productRepository.findAllBySexAndCategoryOrderByPriceAsc(sex, category);
        List<ProductDto> productDtoList=new ArrayList<>();
        for(Product product:productList){
            System.out.println(product);
            productDtoList.add(new ProductDto(product));
        }
        return productDtoList;
    }
}
