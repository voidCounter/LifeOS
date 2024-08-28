//package org.lifeos.gateway.config;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletRequestWrapper;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.logging.Logger;
//
//@Component
//public class UserIdAddingFilter extends OncePerRequestFilter {
//    Logger log = Logger.getLogger(UserIdAddingFilter.class.getName());
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String userId = (String) request.getAttribute("userId");
//        if (userId != null) {
//            HttpServletRequestWrapper httpServletRequestWrapper =
//                    new HttpServletRequestWrapper(request) {
//                        @Override
//                        public String getHeader(String name) {
//                            if (name.equalsIgnoreCase("USERID")) {
//                                return userId;
//                            }
//                            return super.getHeader(name);
//                        }
//                    };
//            log.info("Adding userId to request: " + request.getAttribute("userId"));
//            filterChain.doFilter(httpServletRequestWrapper, response);
//        } else {
//            log.info("Adding nothing to request: " + request.getAttribute("userId"));
//            filterChain.doFilter(request, response);
//        }
//    }
//}
