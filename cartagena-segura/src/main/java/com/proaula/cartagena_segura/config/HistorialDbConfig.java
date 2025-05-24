package com.proaula.cartagena_segura.config;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.*;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.proaula.cartagena_segura.repository",
        entityManagerFactoryRef = "historialEntityManagerFactory",
        transactionManagerRef = "historialTransactionManager"
)
public class HistorialDbConfig {

    @Bean(name = "historialDataSource")
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.history")
    public DataSource historialDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "historialEntityManagerFactory")

    public LocalContainerEntityManagerFactoryBean historialEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("historialDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.proaula.cartagena_segura.model")
                .persistenceUnit("historial")
                .build();
    }

    @Bean(name = "historialTransactionManager")

    public PlatformTransactionManager historialTransactionManager(
            @Qualifier("historialEntityManagerFactory") EntityManagerFactory historialEntityManagerFactory) {
        return new JpaTransactionManager(historialEntityManagerFactory);
    }
}
