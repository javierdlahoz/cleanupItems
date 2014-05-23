from selenium import webdriver
from helpers import *
import random
import time

driver = webdriver.Firefox()

search_all(driver)
#select_all(driver)
multiple_check(driver)
#crazy_page(driver)

driver.find_element_by_xpath("//button[@class='btn btn-success ng-pristine ng-valid']").click()

#driver.quit()