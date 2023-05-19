package com.example.demo.repository;


import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.model.WishList;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishListRepo extends CrudRepository<WishList,Long> {

    List<WishList> findAllByUserOrderByCreatedDateDesc(User user);

    Optional<Object> findByWishlistId(Long id);

    void deleteByWishlistId(Long id);

    @Transactional
    void deleteAllByUserAndProduct(User user,Product product);

    WishList findAllByUserAndProduct(User user, Product product);

    void deleteAllByProduct_Id(Long id);

    Boolean existsByProduct_Id(Long id);
}
