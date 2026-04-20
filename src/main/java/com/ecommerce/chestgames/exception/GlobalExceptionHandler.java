package com.ecommerce.chestgames.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        
        // Si hay un error de email, devolverlo explícitamente
        if (errors.containsKey("email")) {
            return ResponseEntity.badRequest().body(errors.get("email"));
        }
        
        // Si hay otros errores, devolverlos
        return ResponseEntity.badRequest().body(errors.isEmpty() 
            ? "Datos inválidos" 
            : errors.values().stream().findFirst().orElse("Datos inválidos"));
    }
}
