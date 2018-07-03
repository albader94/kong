import getTempHumid
import unittest

class TextprocTestCase(unittest.TestCase):
   def test_connected_sensor(self):
       self.assertNotEqual(getTempHumid, 'Failed to get reading. Try again!')


