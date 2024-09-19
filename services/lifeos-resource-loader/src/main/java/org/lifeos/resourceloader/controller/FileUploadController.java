package org.lifeos.resourceloader.controller;

import com.ctc.wstx.io.ReaderSource;
import org.lifeos.resourceloader.service.LoaderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FileUploadController {
    private static final Logger log = LoggerFactory.getLogger(FileUploadController.class);
    private final LoaderService loaderService;

    public FileUploadController(LoaderService loaderService) {
        this.loaderService = loaderService;
    }

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFile(@RequestParam("files") List<MultipartFile> files) {
        log.info("Files uploaded: {}", files.size());
        List<String> fileNames =
                files.stream().map(file -> loaderService.loadFile(file.getResource())).toList();
        return ResponseEntity.ok(fileNames);
    }
}
