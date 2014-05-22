from selenium import webdriver
from helpers import *
import random
import time

driver = webdriver.Firefox()

enable_all(driver)
percent = driver.find_element_by_xpath("//b[@class='ng-scope ng-binding']").text

try:
    while percent != '100%':
        driver.find_element_by_xpath("//button[@class='btn btn-danger']").click()
        time.sleep(1)
        driver.find_element_by_xpath("//button[@class='btn btn-success']").click()
        #time.sleep(1)
    print "OK with cancel and continue buttons"
except:
    print "Not OK with cancel and continue buttons"

driver.quit()