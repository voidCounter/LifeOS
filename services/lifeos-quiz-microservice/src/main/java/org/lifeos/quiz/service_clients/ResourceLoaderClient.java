package org.lifeos.quiz.service_clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "lifeos-resource-loader")
public interface ResourceLoaderClient {
    @GetMapping("/getEmbedding")
    float[] getEmbedding(@RequestParam String text);
}
