package demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class Log {

    private String cnt;
    private String srcaddr_s;
    private String dstaddr_s;
    private String uptime;
    private String timestamp_1;

}
