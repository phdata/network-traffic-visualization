package demo.controller;


import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.Gson;

import demo.service.DataService;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@Slf4j
@RequestMapping("/api/v1")
public class DataController {

	Gson gson = new Gson();
	
    @Autowired
    private DataService dataService;

    @RequestMapping(value = "/log/{limit}", method = GET)
 
    public String getTemperatureDevice(@PathVariable("limit") String limit) {
       // log.debug("/temperature/"+deviceid);
    	System.out.println("/log/---"+dataService.getTemperatureByDeviceId(limit).get(0));
    	
        return  gson.toJson(dataService.getTemperatureByDeviceId(limit));
    }

    @RequestMapping(value = "/temperature/{clientip}/fake", method = GET)
    public String getTemperatureDeviceString(@PathVariable("clientip") String deviceid) {
     //   log.debug("/temperature/"+deviceid);
        return "[{\"date\":\"2015-12-07T22:45Z\",\"value\":\"22.5\"},{\"date\":\"2015-12-07T20:00Z\",\"value\":\"23.0\"},{\"date\":\"2015-12-06T11:27Z\",\"value\":\"19.0\"}]";
    }
}
