import storm
from nsetools import Nse
nse = Nse()

import time
import datetime
from pytz import timezone

def todayAt(hr, min=0, sec=0, micros=0):
	now = datetime.datetime.now(timezone('Asia/Calcutta'))
	return now.replace(hour=hr, minute=min, second=sec, microsecond=micros)

class QuoteSpout(storm.Spout):
	def initialize(self, conf, context):
		self._conf = conf
		self._context = context
		self.count = 0
		all_stock_codes = nse.get_stock_codes(cached=False)
		self.quote_keys = all_stock_codes.keys()
		storm.log("Spout instance starting...")

	def nextTuple(self):
		try:
			if self.count < len(self.quote_keys):
				quote = self.quote_keys[self.count]
				self.count = self.count + 1
				q_json = nse.get_quote(quote,as_json=True)
				storm.emit([q_json])
			else:
				#timenow = datetime.datetime.now(timezone('Asia/Calcutta'))
				#if timenow < todayAt(15,45) and timenow > todayAt(9,20):
				time.sleep(5)
				all_stock_codes = nse.get_stock_codes(cached=False)
				self.quote_keys = all_stock_codes.keys()
				self.count = 0
		except Exception:
			pass

QuoteSpout().run()
