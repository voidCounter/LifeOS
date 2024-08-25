package org.lifeos.pathway.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.lifeos.pathway.dto.StageDTO;

import java.sql.Timestamp;
import java.util.UUID;
import java.util.List;




@Entity
@Data
@Table(name = "stages")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Roadmap.class, name = "ROADMAP"),
        @JsonSubTypes.Type(value = Stage.class, name = "MILESTONE"),
        @JsonSubTypes.Type(value = Stage.class, name = "MODULE"),
        @JsonSubTypes.Type(value = Stage.class, name = "TASK"),
        @JsonSubTypes.Type(value = Stage.class, name = "PROJECT"),
})
@NoArgsConstructor
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "stage_id")
    private UUID stageId;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private StageType type;


    @OneToMany(mappedBy ="parent", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Stage> subStages;



    @JoinColumn(name = "parent_id", referencedColumnName = "stage_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Stage parent;

    @Column(name = "status")
    private Boolean status;
    @Column(name = "due_date")
    private Timestamp dueDate;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;

    public Stage(StageDTO stageDTO) {
        this.type = StageType.fromValue(stageDTO.getType());
        this.status = stageDTO.getStatus();
        this.dueDate = stageDTO.getDueDate();
        this.title = stageDTO.getTitle();
        this.description = stageDTO.getDescription();
    }

}
