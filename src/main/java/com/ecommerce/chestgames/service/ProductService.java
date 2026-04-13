package com.ecommerce.chestgames.service;

import com.ecommerce.chestgames.dto.ProductRequest;
import com.ecommerce.chestgames.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    ProductResponse update(Long id, ProductRequest request);

    void delete(Long id);

    List<ProductResponse> findAll();

    List<ProductResponse> findByPlatform(String platform);

    List<ProductResponse> findByCategory(String category);
}
