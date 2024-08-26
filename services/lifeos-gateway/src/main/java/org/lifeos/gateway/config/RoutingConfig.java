package org.lifeos.gateway.config;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.function.RequestPredicate;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.stripPrefix;

@Configuration
@EnableWebSecurity
public class RoutingConfig {


    @Bean
    public RouterFunction<ServerResponse> aiServiceRoute() {
        return GatewayRouterFunctions.route("ai-service")
                .route(RequestPredicates.path("/api/ai/**"),
                        HandlerFunctions.http("http://localhost:8081"))
                .before(stripPrefix(2)).build();
    }

    @Bean
    public RouterFunction<ServerResponse> quizServiceRoute() {
        return GatewayRouterFunctions.route("quiz-service")
                .route(RequestPredicates.path("/api/quiz/**"),
                        HandlerFunctions.http("http://localhost:8082"))
                .before(stripPrefix(2)).build();
    }

    @Bean
    public RouterFunction<ServerResponse> userService() {
        return GatewayRouterFunctions.route("user-service")
                .route(RequestPredicates.path("/api/user/**"),
                        HandlerFunctions.http("http://localhost:8083"))
                .before(stripPrefix(2)).build();
    }
}
