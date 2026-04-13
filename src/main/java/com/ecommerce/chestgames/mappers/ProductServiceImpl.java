package com.ecommerce.chestgames.mappers;

import com.ecommerce.chestgames.dto.ProductRequest;
import com.ecommerce.chestgames.dto.ProductResponse;
import com.ecommerce.chestgames.entity.Category;
import com.ecommerce.chestgames.entity.Product;
import com.ecommerce.chestgames.repository.CategoryRepository;
import com.ecommerce.chestgames.repository.ProductRepository;
import com.ecommerce.chestgames.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        mapRequestToEntity(product, request);
        return mapToResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        mapRequestToEntity(product, request);
        return mapToResponse(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(false); // Soft delete
    }

    @Override
    public List<ProductResponse> findAll() {
        return productRepository.findByActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> findByPlatform(String platform) {
        return productRepository.findByPlatformAndActiveTrue(platform)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> findByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private void mapRequestToEntity(Product product, ProductRequest request) {
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setPlatform(request.getPlatform());
        product.setImageUrl(request.getImageUrl());

        Set<Category> categories = request.getCategories()
                .stream()
                .map(name -> categoryRepository.findByName(name)
                        .orElseGet(() -> categoryRepository.save(new Category(null, name))))
                .collect(Collectors.toSet());

        product.setCategories(categories);
    }

    private ProductResponse mapToResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getPlatform(),
                product.getImageUrl(),
                product.getCategories()
                        .stream()
                        .map(Category::getName)
                        .collect(Collectors.toSet())
        );
    }
}
