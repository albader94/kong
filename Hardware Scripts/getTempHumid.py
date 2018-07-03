#!/usr/bin/python
# 
# Bader Albader
# CSCI 3308: Software Dev & Tools
# Kong: Greenhouse Project
# Temp + Humidity Sensor used is RHT03 aka DHT22
# GPIO pin # used is 4
#

import sys
import Adafruit_DHT
import MySQLdb
import time
import datetime
from time import strftime

# Variable for MySQL
db = MySQLdb.connect(host="localhost", user="root", passwd="raspberry", db="kong")
cur = db.cursor()

# Parse command line parameters.
#sensor_args = { '11': Adafruit_DHT.DHT11,
#                '22': Adafruit_DHT.DHT22}
#if len(sys.argv) == 3 and sys.argv[1] in sensor_args:
#    sensor = sensor_args[sys.argv[1]]
#    pin = sys.argv[2]
#else:
#    print('usage: sudo python your_file.py [11|22] GPIOpin#')
#    sys.exit(1)

# Manually setting values for the sensor and the pin.
# Can use command line parameters like above if necessary.
sensor = Adafruit_DHT.DHT22
pin = 4

# Try to grab a sensor reading. Using the read_retry method will retry up
# to 15 times to get a sensor reading (waiting 2 seconds between each retry).
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

# Note that sometimes you won't get a reading and
# the results will be null (because Linux can't
# guarantee the timing of calls to read the sensor).
# Note: If this happens try again!
if humidity is not None and temperature is not None:
	# Write the temp + humid at FLOAT(5,2)
    print('Temp={0:0.2f}*C  Humidity={1:0.2f}%'.format(temperature, humidity))
    
    # Write date time
    datetimeWrite = (time.strftime("%Y-%m-%d ") + time.strftime("%H:%M:%S"))
    print datetimeWrite

    sql = ("""INSERT INTO Sensor (SensorDT, SensorTemperature,SensorHumidity) VALUES (%s,%s,%s) """,(datetimeWrite,temperature,humidity))
    try:
		print "Writing to database..."
		# Execute the SQL command
		cur.execute(*sql)
		# Commit your changes in the database
		db.commit()
		print "Write Complete"
    except:
		# Rollback in case there is any error
		db.rollback()
		print "Failed writing to database"
else:
    print "Failed to get reading. Try again!"

sys.exit(1)
cur.close()
db.close()
