package com.example.demo.service.impl;

import com.example.demo.Dto.ProductDto;
import com.example.demo.enums.Category;
import com.example.demo.model.Product;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.WishListRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import static java.util.Objects.isNull;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;


class ProductServiceImplementareTest  {

    private ProductServiceImplementare underTest;
    private AutoCloseable autoCloseable;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private CartRepository cartRepository;
    @Mock
    private WishListRepo wishListRepo;

    @BeforeEach
    void setUp(){
        autoCloseable=MockitoAnnotations.openMocks(this);
        underTest=new ProductServiceImplementare(productRepository,cartRepository,wishListRepo);
    }

    @AfterEach
    void tearDown() throws Exception{
        autoCloseable.close();
    }

    @Test
    void createProductTest(){
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        when(productRepository.save(ArgumentMatchers.any(Product.class))).thenReturn(product);
        Product created=underTest.createProduct(product);

        assertThat(created.getName()).isSameAs(product.getName());
        verify(productRepository).save(product);
    }

    @Test
    void findByIdTest() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        product.setId(1L);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Optional<Product> p=underTest.findById(1L);
        assert(p.isPresent());

        assert(1L == p.get().getId());
    }
    @Test
    void findByIdTestWhenIdDoesntExist() {
        when(productRepository.findById(12L)).thenReturn(null);
        Optional<Product> p=underTest.findById(12L);

        assert(isNull(p));
    }


    @Test
    void whenGivenId_shouldDeleteProduct_ifFound() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        product.setId(1L);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        underTest.deteleProduct(product.getId());
        verify(productRepository).deleteById(product.getId());
    }

    @Test
    void should_throw_exception_when_product_doesnt_exist(){
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        product.setId(89L);
        when(productRepository.findById(anyLong())).thenReturn(Optional.ofNullable(null));

        Exception exception = assertThrows(Exception.class, () -> {
            underTest.deteleProduct(product.getId());
        });
    }

    @Test
    void whenGivenId_shouldUpdateProduct_ifFound() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        product.setId(1L);
        Product newProduct=new Product("p2", Category.Boots,"Zara","F", 200L,"dkc.url");
        given(underTest.findById(product.getId())).willReturn(Optional.of(product));
        underTest.updateProduct(newProduct,product.getId());
        verify(productRepository).save(newProduct);
        verify(productRepository).findById(product.getId());

    }
    @Test
    void should_throw_exception_when_product_doesnt_existUpdate() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        product.setId(89L);
        Product newProduct=new Product("p2", Category.Boots,"Zara","F", 200L,"dkc.url");
        product.setId(88L);
        given(productRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        Exception exception = assertThrows(Exception.class, () -> {
            underTest.updateProduct(newProduct,product.getId());
        });
    }

    @Test
    void CanGetAllProducts() {
        //when
        underTest.getAllProducts();

        //then
        verify(productRepository).findAll();


    }

    @Test
    void findBySex() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        underTest.findBySex(product.getSex());

        verify(productRepository).findBySex(product.getSex());
    }

    @Test
    void notFindBySex() {
        when(productRepository.findBySex("F")).thenReturn(null);
        List<Product> productList=underTest.findBySex("F");

        assertNull(productList);
    }

    @Test
    void findByCategory() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        underTest.findByCategory(product.getCategory());

        verify(productRepository).findByCategory(product.getCategory());
    }
    @Test
    void notFindByCategory() {
        when(productRepository.findByCategory(Category.Boots)).thenReturn(null);
        List<Product> productList=underTest.findByCategory(Category.Boots);

        assertNull(productList);
    }

    @Test
    void findBySexBeforeAndCategory() {
        Product product=new Product("p1", Category.Boots,"Zara","F", 200L,"dkc.url");
        underTest.findBySexBeforeAndCategory(product.getSex(),product.getCategory());

        verify(productRepository).findAllBySexAndCategory(product.getSex(),product.getCategory());

    }
    @Test
    void notFindBySexBeforeAndCategory() {
        when(productRepository.findAllBySexAndCategory("F",Category.Boots)).thenReturn(null);
        List<ProductDto> productList=underTest.findBySexBeforeAndCategory("F",Category.Boots);

        assertNull(productList);
    }


    @Test
    void notFindBySexBeforeAndCategoryAndBrand(){
        when(productRepository.findAllBySexAndCategoryAndBrand("F",Category.Boots,"Zara")).thenReturn(null);
        List<ProductDto> productList=underTest.findBySexBeforeAndCategoryAndBrand("F",Category.Boots,"Zara");

        assertNull(productList);
    }

}