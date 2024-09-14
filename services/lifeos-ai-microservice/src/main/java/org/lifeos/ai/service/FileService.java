package org.lifeos.ai.service;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class FileService {
    public String convertResourceToString(Resource resourceFile) {
        try {
            return StreamUtils.copyToString(resourceFile.getInputStream(),
                    StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Error converting resource to string");
        }
    }
}
