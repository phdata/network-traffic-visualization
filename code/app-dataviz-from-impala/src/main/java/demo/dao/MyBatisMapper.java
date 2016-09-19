package demo.dao;

import demo.dto.Log;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by youen on 07/12/2015.
 */
public interface MyBatisMapper {

    @Select("select count(*) as cnt, srcaddr_s, dstaddr_s, uptime,timestamp_1 from udp_data_set group by srcaddr_s, dstaddr_s, uptime,timestamp_1 limit ${limit};")
    List<Log> select(@Param("limit") String limit);
}
