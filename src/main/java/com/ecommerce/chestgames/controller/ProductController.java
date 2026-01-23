package com.ecommerce.chestgames.controller;

import com.ecommerce.chestgames.dto.ProductRequest;
import com.ecommerce.chestgames.dto.ProductResponse;
import com.ecommerce.chestgames.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // =====================================
    //           ENDPOINTS PÚBLICOS
    // =====================================

    @GetMapping
    public List<ProductResponse> getAll() {
        return productService.findAll();
    }

    @GetMapping("/platform/{platform}")
    public List<ProductResponse> byPlatform(@PathVariable String platform) {
        return productService.findByPlatform(platform);
    }

    @GetMapping("/category/{category}")
    public List<ProductResponse> byCategory(@PathVariable String category) {
        return productService.findByCategory(category);
    }

    // =====================================
    //           ENDPOINTS ADMIN
    // =====================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ProductResponse create(@RequestBody @Valid ProductRequest request) {
        return productService.create(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ProductResponse update(@PathVariable Long id,
                                  @RequestBody @Valid ProductRequest request) {
        return productService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
}
