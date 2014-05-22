from selenium import webdriver
from helpers import *
import random
import time

driver = webdriver.Firefox()
from_price = '0'
to_price = '200'

prices(driver, from_price, to_price)
driver.quit()
exit()