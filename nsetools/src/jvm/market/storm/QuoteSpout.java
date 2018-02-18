package market.storm;

import java.util.Map;

import backtype.storm.Config;
import backtype.storm.spout.ShellSpout;
import backtype.storm.topology.IRichSpout;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Fields;

public class QuoteSpout extends ShellSpout implements IRichSpout {
	public QuoteSpout() {
		super("python","quotes.py");
	}

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
        declarer.declare(new Fields("quote_json"));
    }

    @Override
    public Map<String, Object> getComponentConfiguration() {
        return null;
    }
}
