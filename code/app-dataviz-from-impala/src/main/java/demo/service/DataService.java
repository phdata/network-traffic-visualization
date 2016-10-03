package demo.service;

import demo.dao.MyBatisMapper;
import demo.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class DataService {

    @Autowired
    private MyBatisMapper myBatisMapper;

    public List<Log> getDataBytimestamp(String timestamp) {

        return myBatisMapper.select(timestamp);
    }


}
