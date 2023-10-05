package com.mo.whatisthis.s3.services;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();
        String s3FileName = UUID.randomUUID()
                                .toString() + "-" + originalFilename;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), metadata);
        return s3FileName;
    }

    public ResponseEntity<byte[]> downloadFile(String fileURL, String fileName) throws IOException {
        S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, fileURL));
        S3ObjectInputStream objectInputStream = o.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        String ext = fileURL.substring(fileURL.lastIndexOf('.'));

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentLength(bytes.length);
        httpHeaders.setContentDispositionFormData("attachment", fileName + ext);

        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }

    public void deleteFile(String fileName) {
        try {
            amazonS3.deleteObject(bucket, fileName);
        } catch (AmazonServiceException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        } catch (SdkClientException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
    }

    public byte[] downloadFilesAsZip(List<String> s3Keys) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            for (String key : s3Keys) {
                int idx = key.lastIndexOf('/');

                if (idx > -1) {
                    key = key.substring(idx + 1);
                }
                
                S3Object o = amazonS3.getObject(new GetObjectRequest(bucket, key));
                S3ObjectInputStream objectInputStream = o.getObjectContent();
                byte[] bytes = IOUtils.toByteArray(objectInputStream);

                zos.putNextEntry(new ZipEntry(key));
                zos.write(bytes);
                zos.closeEntry();
            }
        }
        return baos.toByteArray();
    }
}