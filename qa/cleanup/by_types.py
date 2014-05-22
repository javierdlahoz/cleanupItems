from selenium import webdriver
from helpers import *
import random
import time

driver = webdriver.Firefox()
all_types(driver)
driver.quit()
exit()