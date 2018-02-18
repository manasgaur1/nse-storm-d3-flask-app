package market.storm;

import backtype.storm.Config;
import backtype.storm.LocalCluster;
import backtype.storm.StormSubmitter;
import backtype.storm.spout.SpoutOutputCollector;
import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.testing.TestWordSpout;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.topology.TopologyBuilder;
import backtype.storm.topology.base.BaseRichSpout;
import backtype.storm.topology.base.BaseRichBolt;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Tuple;
import backtype.storm.tuple.Values;
import backtype.storm.utils.Utils;

import java.util.Map;
import java.text.ParseException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import market.storm.tools.*;

import com.lambdaworks.redis.RedisClient;
import com.lambdaworks.redis.RedisConnection;

/**
 * A bolt that prints the word and count to redis
 */
public class ReportBolt extends BaseRichBolt
{
  // place holder to keep the connection to redis
  transient RedisConnection<String,String> redis;
  private int res;
  @Override
  public void prepare(
      Map                     map,
      TopologyContext         topologyContext,
      OutputCollector         outputCollector)
  {
    // instantiate a redis connection
    RedisClient client = new RedisClient("entelege.egouhm.0001.aps1.cache.amazonaws.com",6379);

    // initiate the actual connection
    redis = client.connect();
    res = 0;
  }

  @Override
  public void execute(Tuple tuple)
  {
    // access the first column 'word'
    String word = tuple.getStringByField("symbol");

    // access the second column 'count'
    Double count = tuple.getDoubleByField("totalTradedVolume");
    //Long cnt = (long) count;
    DecimalFormat df = new DecimalFormat("#");
    // publish the word count to redis using word as the key
    DateCompare programm = new DateCompare();
    Boolean yn;

    SimpleDateFormat sd = new SimpleDateFormat("HH:mm:ss");
    Date date = new Date();
    sd.setTimeZone(TimeZone.getTimeZone("IST"));
    try {
    		yn = programm.isTimeBetweenTwoTime("07:00:00","10:00:00",sd.format(date));
		if (yn) {
			if (res == 0)
				{
				redis.publish("WordCountTopology","INITIALIZING|0");
				res = res + 1;
				}
			}
		else
			{
			res = 0;
			redis.publish("WordCountTopology", word + "|" + df.format(count));
			}	
        } catch (ParseException e) {
		System.out.println("Exception Caught");
	}
     
    //redis.publish("WordCountTopology", word + "|" + df.format(count));
  }

  public void declareOutputFields(OutputFieldsDeclarer declarer)
  {
    // nothing to add - since it is the final bolt
  }
}
