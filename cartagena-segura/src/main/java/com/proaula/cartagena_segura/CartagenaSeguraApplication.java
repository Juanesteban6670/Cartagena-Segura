package com.proaula.cartagena_segura;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CartagenaSeguraApplication {
	public static void main(String[] args) {
		SpringApplication.run(CartagenaSeguraApplication.class, args);
	}
}
