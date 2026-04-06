package com.ecommerce.chestgames.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TicketDTO {

    private String subject;
    private String description;
    private List<AttachmentDTO> attachments;

    @Getter
    @Setter
    public static class AttachmentDTO {
        private String name;
        private String type;
        private String data;
    }
}