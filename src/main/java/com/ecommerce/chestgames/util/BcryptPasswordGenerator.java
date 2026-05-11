package com.ecommerce.chestgames.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * ============================================================
 * GENERADOR DE HASHES BCRYPT PARA CONTRASEÑAS
 * ============================================================
 * 
 * Utilidad para generar hashes BCrypt de contraseñas.
 * Úsalo para crear contraseñas personalizadas para usuarios admin.
 * 
 * Ejemplo de uso:
 *   java -cp target/chestgames-0.0.1-SNAPSHOT.jar \
 *        com.ecommerce.chestgames.util.BcryptPasswordGenerator "miContraseña123"
 * 
 * O desde la aplicación Spring Boot corriendo:
 *   1. Accede a la ruta: GET /api/util/generate-bcrypt?password=miContraseña
 * 
 * ============================================================
 */
public class BcryptPasswordGenerator {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("============================================================");
            System.out.println("GENERADOR DE HASHES BCRYPT PARA CONTRASEÑAS");
            System.out.println("============================================================");
            System.out.println("");
            System.out.println("Uso: java BcryptPasswordGenerator <contraseña>");
            System.out.println("");
            System.out.println("Ejemplos:");
            System.out.println("  java BcryptPasswordGenerator admin123");
            System.out.println("  java BcryptPasswordGenerator miContraseña456");
            System.out.println("");
            System.out.println("Salida: El hash BCrypt de tu contraseña");
            System.out.println("");
            System.out.println("============================================================");
            System.out.println("");
            System.out.println("Contraseña por defecto generada (admin123):");
            System.out.println("$2a$10$lQRE9c8W2LAJHGaBpqqeT.F5a7w.qwrpSjTXqPTxVtL8RGqvf9Nji");
            System.out.println("");
            
            // Si no proporcionan argumento, generamos un hash de ejemplo
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String defaultPassword = "admin123";
            String hash = encoder.encode(defaultPassword);
            System.out.println("Hash generado para 'admin123':");
            System.out.println(hash);
            return;
        }

        String password = args[0];
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode(password);

        System.out.println("============================================================");
        System.out.println("HASH BCRYPT GENERADO");
        System.out.println("============================================================");
        System.out.println("");
        System.out.println("Contraseña en texto plano: " + password);
        System.out.println("Hash BCrypt:              " + hash);
        System.out.println("");
        System.out.println("Instrucciones de uso:");
        System.out.println("1. Copia el hash BCrypt:");
        System.out.println("   " + hash);
        System.out.println("");
        System.out.println("2. Usa este hash en tu SQL INSERT:");
        System.out.println("   INSERT INTO users (username, email, password, enabled, created_at)");
        System.out.println("   VALUES ('admin', 'admin@example.com', '" + hash + "', true, NOW());");
        System.out.println("");
        System.out.println("============================================================");
    }
}
