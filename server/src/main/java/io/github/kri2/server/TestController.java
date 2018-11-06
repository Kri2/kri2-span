package io.github.kri2.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    
    @GetMapping("/cars/{id}")
    public Car retrieveCar(@PathVariable long id){
        //Optional<Car> car = carRepository.findById(id);
        //return car.get();
        return carRepository.findById(id).orElseThrow(()->new CarNotFoundException(id));
    }
    
    @PostMapping(value={"/cars", "/add"})
    public Car newCar(@RequestBody Car newCar){
        return carRepository.save(newCar);
    }
    
    @PutMapping("/cars/{id}")
    public Car replaceCar(@RequestBody Car newCar,@PathVariable Long id){
        return carRepository.findById(id).map(car->{
            car.setMake(newCar.getMake());
            car.setModel(newCar.getModel());
            return carRepository.save(car);
        }).orElseGet(()-> {
            newCar.setId(id);
            return carRepository.save(newCar);
        });
    }
    
    @DeleteMapping("/cars/{id}")
    public void deleteCar(@PathVariable Long id){
        carRepository.deleteById(id);
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

