package br.com.scheduling.exceptions;

public class ActionDeniedException extends RuntimeException {

    public ActionDeniedException(String message) {
        super(message);
    }
}
