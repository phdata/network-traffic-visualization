package demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan
@Configuration
@EnableAutoConfiguration
@MapperScan(basePackages = {"demo.dao"})
public class DatavizApplication {

    public static void main(String[] args) {
        SpringApplication.run(DatavizApplication.class, args);
    }

}
