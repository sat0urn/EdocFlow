package org.talos.server.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.talos.server.service.InboxService;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestControllerAdvice
public class ControllerException {
    Logger logger = Logger.getLogger(ControllerException.class.getName());

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ApiError> handleDataNotFoundException(DataNotFoundException ex, WebRequest request) {
        HttpServletRequest servletRequest = ((ServletWebRequest) request).getRequest();
        String requestURI = servletRequest.getRequestURI(); // Gets the path of the request
        logger.info(requestURI + "::" +ex.getMessage());
        Date timestamp = new Date(); // Current time
        ApiError error = new ApiError(HttpStatus.NOT_FOUND.value(), ex.getMessage(), timestamp);
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<ApiError> handleIllegalAccessException(IllegalAccessException ex, WebRequest request) {
        HttpServletRequest servletRequest = ((ServletWebRequest) request).getRequest();
        String requestURI = servletRequest.getRequestURI(); // Gets the path of the request
        logger.info(requestURI + "::" +ex.getMessage());
        Date timestamp = new Date(); // Current time
        ApiError error = new ApiError(HttpStatus.FORBIDDEN.value(), ex.getMessage(), timestamp);
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    // Catch-all handler (optional)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGlobalException(Exception ex, WebRequest request) {
        Date timestamp = new Date(); // Current time
        HttpServletRequest servletRequest = ((ServletWebRequest) request).getRequest();
        String requestURI = servletRequest.getRequestURI(); // Gets the path of the request
        logger.info(requestURI + "::" +ex.getMessage());
        ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage(), timestamp);
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
