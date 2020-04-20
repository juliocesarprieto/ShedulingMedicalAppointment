package br.com.scheduling.exceptions;

public class EmailAlreadyExistException extends RuntimeException {

    public EmailAlreadyExistException(String email) {
        super(String.format("Email [%s] already exist!", email));
    }
}
