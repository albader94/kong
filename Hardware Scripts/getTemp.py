import os
import time
import datetime
import glob
import MySQLdb
from time import strftime

# System initializers for gpio and the tempereture sensor
os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
temp_sensor = '/sys/bus/w1/devices/28-0000098ff2bd/w1_slave'

#
#
# TODO: 1. add location of humidity sensor
#
#

# Variables for MySQL
db = MySQLdb.connect(host="localhost", user="root",passwd="raspberry", db="kong")
cur = db.cursor()

# Function that reads temperatue from the tempereture sensor
def tempRead():
    t = open(temp_sensor, 'r')
    lines = t.readlines()
    t.close()

    temp_output = lines[1].find('t=')
    if temp_output != -1:
        temp_string = lines[1].strip()[temp_output+2:]
        temp_c = float(temp_string)/1000.0
    return round(temp_c,1)

#
#
# TODO: 2. add function that reads humidity
#
#

while True:
    temp = tempRead()
    print temp
    datetimeWrite = (time.strftime("%Y-%m-%d ") + time.strftime("%H:%M:%S"))
    print datetimeWrite
    
    #
    #
    # TODO: 3. call humidity function and store in variable, and add cell to hold humidity value
    #
    #
    humidity = 0.999
    print humidity
    
    sql = ("""INSERT INTO Sensor (SensorDT,SensorTemperature,SensorHumidity) VALUES (%s,%s,%s)""",(datetimeWrite,temp,humidity))
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

    cur.close()
    db.close()
    break
