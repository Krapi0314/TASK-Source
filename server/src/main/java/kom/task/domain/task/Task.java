package kom.task.domain.task;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Column
    private Boolean isDone;


    @Builder
    public Task(String content, Boolean isDone) {
        this.content = content;
        this.isDone = isDone;
    }

    public void update(String content, Boolean isDone) {
        this.content = content;
        this.isDone = isDone;
    }
}
