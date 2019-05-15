package io.github.kri2.server.car.controller;

import io.github.kri2.server.car.domain.Car;
import io.github.kri2.server.car.exception.CarNotFoundException;
import io.github.kri2.server.car.repository.CarRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;


/**
 * PUT and DELETE are idempotent, POST is not.
 */
@RestController
@CrossOrigin(origins={"https://kri2-span.herokuapp.com",
                      "http://kri2-span.herokuapp.com"
                      /*"http://localhost:4200",
                      "http://localhost:8080"*/})

@RequestMapping("/api/car")
public class CarController {
    
    private static final Logger LOG = LoggerFactory.getLogger( CarController.class );
    private final CarRepository carRepository;
    
    @Autowired
    CarController(CarRepository carRepository){
        this.carRepository = carRepository;
    }
    
    
    
    /**
     * GET all Cars
     * @param request
     * @param order
     * @return
     */
    @GetMapping(value={"/cars", "/"})
    @ResponseStatus(HttpStatus.OK)
    public List<Car> retrieveAllCars(HttpServletRequest request, @RequestParam(value="order", required = false)String order){
        System.out.println("------> REMOTE ADDRESS: "+request.getRemoteAddr());
        System.out.println("------> REMOTE HOST: "+request.getRemoteHost());
        System.out.println("------> LOCAL ADDRESS: "+ request.getLocalAddr());
        System.out.println("got order param with value: "+order);
        if(order!=null)
        {
            if(order.equals("asc")) return carRepository.findAllByOrderByMakeAsc();
            else if(order.equals("desc")) return carRepository.findAllByOrderByMakeDesc();
        }
        return carRepository.findAll();
    }
    
    
    /**
     * GET Car with id
     * @param id
     * @return
     */
    @GetMapping("/cars/{id:\\d+}")
    @ResponseStatus(HttpStatus.OK)
    public Car retrieveCar(@PathVariable long id){
        return carRepository.findById(id)
                            .orElseThrow(()->new CarNotFoundException(id));
    }
    
    /**
     * CREATE a Car.
     * In cases of resource creation, it indicates the URL to the newly created resource.
     * @param newCar
     * @return the created Car
     */
    @PostMapping(value={"/cars", "/add"})
    @ResponseStatus(HttpStatus.CREATED)
    public Car newCar(@RequestBody Car newCar, HttpServletRequest request, HttpServletResponse response){
        LOG.debug("create Car:{}", newCar.toString());
        Car createdCar = carRepository.save(newCar);
        response.setHeader("Location", request.getRequestURL().append("/").append(createdCar.getId()).toString());
        LOG.debug("Created Car {} with {}", createdCar.toString(), createdCar.getId());
        return createdCar;
    }
    
    
    /**
     * UPDATE a Car
     * @param newCar
     * @param id
     * @return
     */
    @PutMapping("/cars/{id:\\d+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Car replaceCar(@RequestBody Car newCar,@PathVariable Long id){
        return carRepository.findById(id)
                            .map(car->{ // Optional is used here
                                    car.setMake(newCar.getMake());
                                    car.setModel(newCar.getModel());
                                    return carRepository.save(car);
                            }).orElseGet(()-> {
                                    LOG.info("Car not found"); // TODO some Exception should be thrown here
                                    return new Car();
                            });
    }
    
    
    /**
     * DELETE a Car with id
     * @param id
     */
    @DeleteMapping(value = "/cars/{id:\\d+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCar(@PathVariable Long id){
        carRepository.deleteById(id);
    }
    
    @DeleteMapping("/cars/bymodel/{model}")
    public void deleteCarModel(@PathVariable String model){
        Long modelId = carRepository.findByModel(model).get(0).getId();// TODO: change it later to delete only by id?
        carRepository.deleteById(modelId);                             // TODO: exception should be thrown if car is not found eg ResourceNotFound
    }
}
