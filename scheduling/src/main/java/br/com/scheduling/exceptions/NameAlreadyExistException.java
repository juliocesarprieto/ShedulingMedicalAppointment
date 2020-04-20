package br.com.scheduling.exceptions;

public class NameAlreadyExistException extends RuntimeException {

    public NameAlreadyExistException(String name) {
        super(String.format("Name [%s] already exist!", name));
    }
}
