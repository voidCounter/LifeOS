package org.lifeos.ai.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.lifeos.ai.dto.chat.ChatDTO;
import org.lifeos.ai.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    @PostMapping(value = "/chat", produces = "application/json")
    public ResponseEntity<?> chat(
            @RequestBody ChatDTO chatDTO,
            @RequestHeader(value = "user-id") String userId
    ) throws JsonProcessingException {
        ChatDTO response = chatService.chat(chatDTO, userId);
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            log.error("Error in chat", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
