package br.com.scheduling.exceptions;

public class IdNotFoundException extends RuntimeException {

    public IdNotFoundException(Long id) {
        super((String.format("Id [%s] not found!", id)));
    }

    public IdNotFoundException(String msg) {
        super(msg);
    }
}
