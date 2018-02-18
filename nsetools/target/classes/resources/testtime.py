import time
import datetime
from pytz import timezone

def todayAt(hr, min=0, sec=0, micros=0):
        now = datetime.datetime.now(timezone('Asia/Calcutta'))
        return now.replace(hour=hr, minute=min, second=sec, microsecond=micros)

timenow = datetime.datetime.now(timezone('Asia/Calcutta'))        
if timenow > todayAt(15,45):
        print "Time greater than 15:45"

if timenow < todayAt(21,30):
	print "Time less than 21:30"
