package demo.dao;

import demo.dto.Log;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


public interface MyBatisMapper {

    @Select("select count(*) as cnt, srcaddr_s, dstaddr_s, uptime,packet_timestamp from netflow where packet_timestamp='${timestamp}' group by srcaddr_s, dstaddr_s, uptime,packet_timestamp ;")
    List<Log> select(@Param("timestamp") String timestamp);
}
