package io.github.kri2.server;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<Car,Long>
{
    List<Car> findByModel(String model);
    List<Car> findAll();
    void deleteAll();
}
