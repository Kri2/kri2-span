package io.github.kri2.server.car.repository;

import io.github.kri2.server.car.domain.Car;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<Car,Long>
{
    List<Car> findByModel(String model);
    List<Car> findAll();
    List<Car> findAllByOrderByMakeAsc();
    List<Car> findAllByOrderByMakeDesc();
    List<Car> findAllByOrderByModelAsc();
    List<Car> findAllByOrderByModelDesc();
    List<Car> findAll(Sort sort);
    void deleteAll();
}
