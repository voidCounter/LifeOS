package org.lifeos.ai.service_clients;

import org.apache.coyote.Response;
import org.lifeos.ai.dto.RetrievalQueryDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "lifeos-resource-loader")
public interface ResourceLoaderClient {
    @PostMapping("/youtube/loadYoutubeTranscript")
    ResponseEntity<String> loadTranscript(@RequestBody String youtubeURL);

    @PostMapping("/retrieve")
    String retrieve(@RequestBody RetrievalQueryDTO retrievalQueryDTO);
}
