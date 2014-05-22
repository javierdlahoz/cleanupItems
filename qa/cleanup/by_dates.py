from selenium import webdriver
from helpers import *
import random
import time

driver = webdriver.Firefox()
from_date = '2000-01-01'
to_date = '2015-05-05'

created_at(driver, from_date, to_date)
driver.quit()
exit()