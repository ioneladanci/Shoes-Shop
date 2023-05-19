package com.example.demo.repository;

import com.example.demo.model.Product;
import com.example.demo.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Cart;

import java.util.List;

@Repository
public interface CartRepository extends CrudRepository<Cart,Long> {
    List<Cart> findAllByUserOrderByCreatedDateDesc(User user);

    @Transactional
    void deleteAllByUser(User user);

    @Transactional
    void deleteAllByUserAndProduct(User user,Product product);

    List<Cart> findAllByUserAndProduct(User user,Product product);

    void deleteAllByProduct_Id(Long id);

    Boolean existsByProduct_Id(Long id);
}
