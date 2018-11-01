package io.github.kri2.server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins={"https://kri2-span.herokuapp.com","http://localhost:4200"})
@RequestMapping("/api")
public class TestController
{
    @GetMapping(path="/hello-world")
    public String helloWorld(){
        System.out.println("kontroler otrzymał request");
        return "Hello World!";
    }
    
}
