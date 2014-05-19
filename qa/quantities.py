from selenium import webdriver
import helpers
import random
import time
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

driver = webdriver.Firefox()
driver.get("http://localhost/otteny.com/cleanup/index.html")
#inputs = getInput(driver)
load_time = 2;
#time.sleep(load_time)

assert 'Submit' in driver.find_element_by_xpath("//button[@class='btn btn-primary']").text
driver.find_element_by_xpath("//input[@ng-model='enabledProducts']").click()
driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
time.sleep(load_time)
enabled = driver.find_element_by_xpath("//span[@name='count']").text
print "enabled: "+enabled
driver.find_element_by_xpath("//a[@id='home']").click()

assert 'Submit' in driver.find_element_by_xpath("//button[@class='btn btn-primary']").text
driver.find_element_by_xpath("//input[@ng-model='disabledProducts']").click()
driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
time.sleep(load_time)
disabled = driver.find_element_by_xpath("//span[@name='count']").text
print "disabled: "+disabled
driver.find_element_by_xpath("//a[@id='home']").click()

assert 'Submit' in driver.find_element_by_xpath("//button[@class='btn btn-primary']").text
driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
time.sleep(load_time)
total = driver.find_element_by_xpath("//span[@name='count']").text
print "total: "+total

tmp = int(enabled)+int(disabled)

if int(total) == tmp:
	print "OK with quantities"
else:
	print "there was an error"

driver.quit()