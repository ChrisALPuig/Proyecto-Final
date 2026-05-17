package com.ecommerce.chestgames.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.Executor;

/**
 * Configuración para procesar tareas asíncronas en segundo plano
 * Esto permite que operaciones no críticas como envío de emails
 * no bloqueen las respuestas HTTP
 */
@Configuration
@EnableAsync
public class AsyncConfig {
    
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);        // Mínimo 5 threads
        executor.setMaxPoolSize(10);        // Máximo 10 threads
        executor.setQueueCapacity(100);     // Cola de 100 tareas
        executor.setThreadNamePrefix("async-email-");
        executor.initialize();
        return executor;
    }
}
