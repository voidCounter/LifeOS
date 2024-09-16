package org.lifeos.gateway.config;

import org.lifeos.gateway.model.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.function.*;

import java.util.function.Function;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.*;
import static org.springframework.cloud.gateway.server.mvc.filter.LoadBalancerFilterFunctions.lb;

@Configuration
public class RoutingConfig {
    private static final Logger log = LoggerFactory.getLogger(RoutingConfig.class);
    private org.lifeos.gateway.service.JWTService jwtService;

    @Bean
    public RouterFunction<ServerResponse> quizServiceRoute() {
        return GatewayRouterFunctions.route("quiz-service")
                .route(RequestPredicates.path("/api/quiz/**"),
                        HandlerFunctions.http())
                .filter(lb("lifeos-quiz-microservice"))
                .before(stripPrefix(2))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> aiService() {
        return GatewayRouterFunctions.route("ai-service")
                .route(RequestPredicates.path("/api/ai/**"),
                        HandlerFunctions.http())
                .filter(lb("lifeos-ai-microservice"))
                .before(stripPrefix(2))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> userService() {
        return GatewayRouterFunctions.route("user-service")
                .route(RequestPredicates.path("/api/user/**")
                                .or(RequestPredicates.path("/api/auth/**")),
                        HandlerFunctions.http())
                .filter(lb("lifeos-user-microservice"))
                .before(stripPrefix(1))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> resourceLoaderService() {
        return GatewayRouterFunctions.route("resource-loader-service")
                .route(RequestPredicates.path("/api/resource-loader/**"),
                        HandlerFunctions.http())
                .filter(lb("lifeos-resource-loader"))
                .before(stripPrefix(2))
                .build();
    }
    @Bean
    public RouterFunction<ServerResponse> pathwayService() {
        return GatewayRouterFunctions.route("pathway-service")
                .route(RequestPredicates.path("/api/pathway/**"),
                        HandlerFunctions.http())
                .filter(lb("lifeos-pathway-microservice"))
                .before(stripPrefix(2))
                .build();
    }

}
