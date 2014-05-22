from selenium import webdriver
from helpers import *
import random
import time

driver = webdriver.Firefox()

search_all(driver)
random_select(driver)
driver.find_element_by_xpath("//button[@class='btn btn-success ng-pristine ng-valid']").click()
#driver.quit()