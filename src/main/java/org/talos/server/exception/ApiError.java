package org.talos.server.exception;



import java.util.Date;

public class ApiError {
    private int status;
    private String message;
    private Date timestamp; // Changed type to Date

    public ApiError(int status, String message, Date timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }

    // Getters and setters
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
