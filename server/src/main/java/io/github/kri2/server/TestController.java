package io.github.kri2.server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins={"https://kri2-span.herokuapp.com",
                      "http://kri2-span.herokuapp.com",
                      "http://localhost:4200",
                      "http://localhost:8080" })
@RequestMapping("/api")
public class TestController
{
    @GetMapping(path="/hello-world")
    public Greeting helloWorld(){
        System.out.println("kontroler otrzymał request");
        return new Greeting("Hello World");
    }
    
}
class Greeting{
    Greeting(){}
    Greeting(String text){this.text=text;}
    private String text;
    
    public String getText()
    {
        return text;
    }
    
    public void setText(String text)
    {
        this.text = text;
    }
}

