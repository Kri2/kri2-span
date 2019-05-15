package io.github.kri2.server.car.controller;

import io.github.kri2.server.car.domain.Car;
import io.github.kri2.server.car.repository.CarRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * given-when-then
 * @ExtendWith(SpringExtension.class)  Register the SpringExtension which integrates the Spring TestContext Framework into Junit 5’s Jupiter programming model.
 * @WebMvcTest(CarController.class)  Auto configure Spring MVC infrastructure and MockMvc. It will only scan beans related to Web layer, like @Controller, @ControllerAdvice, WebMvcConfigurer etc. This is useful because we are interested only in web layer when unit testing Controller classes.
 * MockMvc: Provide Spring MVC infrastructure without starting the HTTP Server.
 * @MockBean: It adds Mockito mocks as a bean in Spring ApplicationContext.
 */
// @RunWith(JUnitPlatform.class)
// @SpringBootTest
// @WebAppConfiguration
@ExtendWith(SpringExtension.class)
@WebMvcTest(CarController.class)
class CarControllerTest
{
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    CarController carController;
    @MockBean
    CarRepository carRepository;
    // @Autowired
    // private WebApplicationContext wac;
    
    private final String uri = "/api/car/cars";
    
    @BeforeEach
    void setUp()
    {
        // this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build(); // doesn't seem to be necessary
    }
    
    @Test
    void contextLoads(){
        assertNotNull(carController);
    }
    
    @Test
    void getCars() throws Exception {
        mockMvc.perform(get("/api/car/cars")).andExpect(status().isOk());
    }
    
    
    @Test
    void retrieveAllCars() throws Exception
    {
        // prepare data and mock's behaviour
        List<Car> carList = new ArrayList<>();
        Car car1 = new Car("Nissan","Sunny");
        car1.setId(1L);
        carList.add(car1);
        Car car2 = new Car("Toyota","Carina");
        car2.setId(2L);
        carList.add(car2);
        
        when( carRepository.findAll() ).thenReturn(carList);
        
        // execute
        MvcResult result = mockMvc.perform( MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON) )
                                  .andReturn();
        // verify
        int status = result.getResponse().getStatus();
        assertEquals( HttpStatus.OK.value(), status,"Incorrect Response Status" );
        
        // verify that service method was called once
        verify(carRepository).findAll();
        
    }
    
    @Test
    void newCar() throws Exception
    {
        // prepare data and mock's behaviour
        Car carStub = new Car("Pontiac","Aztec");
        carStub.setId(1L);
        when( carRepository.save(any(Car.class)) ).thenReturn(carStub);
        
        // execute
        MvcResult mvcResult = mockMvc.perform( MockMvcRequestBuilders
                                                   .post(uri)
                                                   .contentType(MediaType.APPLICATION_JSON).content("{" +
                                                                                                    "   \"id\":1," +
                                                                                                    "   \"make\":\"Chrysler\"," +
                                                                                                    "   \"model\":\"Stratus\"" +
                                                                                                    "}")
                                                   .accept(MediaType.APPLICATION_JSON))
                                     .andReturn();
        // verify
        int status = mvcResult.getResponse().getStatus();
        // assertEquals( HttpStatus.CREATED.value(), status, "Incorrect Response Status"); // TODO: Consider making it REST compliant and return 201
        assertEquals( HttpStatus.CREATED.value(), status, "Incorrect Response Status");
        // verify that service method was called once
        verify(carRepository).save(any(Car.class));
        
    }
    
    @Test
    void deleteCar() throws Exception
    {
        // TODO:
    }
}