package kom.task.web;

import com.fasterxml.jackson.databind.node.TextNode;
import kom.task.domain.dailydo.daydo.Daydo;
import kom.task.domain.dailydo.todo.Todo;
import kom.task.domain.pomodoro.Pomodoro;
import kom.task.service.TaskService;
import kom.task.web.dto.daydo.DaydoResponseDto;
import kom.task.web.dto.daydo.DaydoSaveRequestDto;
import kom.task.web.dto.daydo.DaydoUpdateRequestDto;
import kom.task.web.dto.todo.TodoResponseDto;
import kom.task.web.dto.todo.TodoSaveRequestDto;
import kom.task.web.dto.todo.TodoUpdateRequestDto;
import kom.task.web.dto.user.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001","http://localhost:3002"})
public class TaskApiController {

    private final TaskService taskService;

    /*** LOGIN REST CONTROLLER ***/
    // Login
    @PostMapping("/api/google/tokensignin")
    public String googleTokenLogin(@RequestParam("idtoken") String tokenDtoString) {
        String userName = taskService.googleTokenLogin(tokenDtoString);

        return userName;
    }

    // Get User Info
    @PostMapping("/api/user")
    public ResponseEntity<?> fetchUserData(@RequestBody TextNode tokenDtoString) {
        UserResponseDto responseDto = taskService.fetchUserInfo(tokenDtoString.asText());

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }


    /*** To Do REST CONTROLLER ***/

    // Create
    @PostMapping("/api/todo")
    public ResponseEntity<?> saveTodoItem(@RequestBody TodoSaveRequestDto requestDto) {
        Todo newTodo = taskService.saveTodoItem(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(newTodo);
    }

    // Read
    @GetMapping("/api/todo")
    public ResponseEntity<?> fetchAllTodoItems() {
        List<TodoResponseDto> responseDto = taskService.fetchAllTodoItems();

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // Update
    @PutMapping("/api/todo/{id}")
    public Long updateTodoItem(@PathVariable Long id, @RequestBody TodoUpdateRequestDto requestDto) {
        return taskService.updateTodoItem(id, requestDto);
    }

    // Delete
    @DeleteMapping("/api/todo/{id}")
    public Long deleteTodoItem(@PathVariable Long id) {
        return taskService.deleteTodoItem(id);
    }


    /*** Day Do REST CONTROLLER ***/

    // Create
    @PostMapping("/api/daydo")
    public ResponseEntity<?> saveDaydoItem(@RequestBody DaydoSaveRequestDto requestDto) {
        Daydo newDaydo = taskService.saveDaydoItem(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(newDaydo);
    }

    // Read
    @GetMapping("/api/daydo")
    public ResponseEntity<?> fetchAllDaydoItems() {
        List<DaydoResponseDto> responseDto = taskService.fetchAllDaydoItems();

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // Update
    @PutMapping("/api/daydo/{id}")
    public Long updateDaydoItem(@PathVariable Long id, @RequestBody DaydoUpdateRequestDto requestDto) {
        return taskService.updateDaydoItem(id, requestDto);
    }

    // Delete
    @DeleteMapping("/api/daydo/{id}")
    public Long deleteDaydoItem(@PathVariable Long id) {
        return taskService.deleteDaydoItem(id);
    }


    /*** Pomodoro TEMPORARY REST Controller ***/

     // Read
     @GetMapping("/api/pomodoro")
     public ResponseEntity<?> fetchAllPomodoroItems() {
         Pomodoro pomodoro = taskService.fetchPomodoroItem();

        return ResponseEntity.status(HttpStatus.OK).body(pomodoro);
     }

     // Update
     @PutMapping("/api/pomodoro/timerset")
     public ResponseEntity<?> updatePomodoroItemTimerSet(@RequestBody Pomodoro pomodoro) {

         Pomodoro updatedPomodoro = taskService.updatePomodoroItemTimerSet(pomodoro);

         return ResponseEntity.status(HttpStatus.OK).body(updatedPomodoro);
     }

    // Update
    @PutMapping("/api/pomodoro/pomo")
    public ResponseEntity<?> updatePomodoroItemPomo(@RequestBody Pomodoro pomodoro) {

        Pomodoro updatedPomodoro = taskService.updatePomodoroItemPomo(pomodoro);

        return ResponseEntity.status(HttpStatus.OK).body(updatedPomodoro);
    }
}
