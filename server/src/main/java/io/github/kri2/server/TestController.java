package io.github.kri2.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins={"https://kri2-span.herokuapp.com",
                      "http://kri2-span.herokuapp.com",
                      "http://localhost:4200",
                      "http://localhost:8080" })
@RequestMapping("/api")
public class TestController
{
    @Autowired
    CarRepository carRepository; // TODO: change to constructor injection later
    
    @GetMapping(path="/hello-world")
    public Greeting helloWorld(){
        System.out.println("kontroler otrzymał request");
        return new Greeting("Hello World");
    }
    
    @GetMapping(value={"/cars","/cool-cars"})
    public List<Car> retrieveAllCars(){
        return carRepository.findAll();
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

