package org.lifeos.resourceloader;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class LifeosResourceLoaderApplication {
    public static void main(String[] args) {
        SpringApplication.run(LifeosResourceLoaderApplication.class, args);
    }

}
