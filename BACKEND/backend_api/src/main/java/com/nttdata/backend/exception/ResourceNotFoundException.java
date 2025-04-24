package com.nttdata.backend.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(){
        super();
    }

    public ResourceNotFoundException(String message){
        super(message);
    }
}

