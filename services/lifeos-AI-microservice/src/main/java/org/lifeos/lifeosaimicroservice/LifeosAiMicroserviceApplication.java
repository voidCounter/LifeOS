package org.lifeos.lifeosaimicroservice;

import org.springframework.ai.autoconfigure.vectorstore.pgvector.PgVectorStoreAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class,
        PgVectorStoreAutoConfiguration.class})
public class LifeosAiMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeosAiMicroserviceApplication.class, args);
    }

}
