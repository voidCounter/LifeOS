package org.lifeos.pathway.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Roadmap extends Stage {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator")
    private User creator;

    @Column(name = "published")
    private Boolean published;



    public Roadmap(
            User creator,
            Boolean published
    ) {
        this.creator = creator;
        this.published = published;
    }


}
