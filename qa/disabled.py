from selenium import webdriver
import helpers
import random
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

driver = webdriver.Firefox()
driver.get("http://localhost/otteny.com/cleanup/index.html")

#OPTIONS
timeOut = 20;
fromP = random.randint(200, 900)
toP = random.randint(901, 2000)

#ASSING
#inFrom.send_keys(From)
#inCategory.select_by_visible_text(Category)
#inNoStock.click()

inputs = helpers.getInput(driver)
inputs['inFromP'].send_keys(fromP)
inputs['inToP'].send_keys(toP)
inputs['inForm'].submit()
try:
	WebDriverWait(driver, timeOut).until(EC.presence_of_element_located((By.ID,'product_link')))
	count_span = driver.find_element_by_name("count")
	count_total = count_span.get_attribute("innerHTML")
except ValueError:
	print "Oops!  That was no valid number.  Try again..."

driver = helpers.restartDriver(driver)
inputs = helpers.getInput(driver)
inputs['inFromP'].send_keys(fromP)
inputs['inToP'].send_keys(toP)
inputs['inEnProducts'].click()
inputs['inForm'].submit()

try:
	WebDriverWait(driver, timeOut).until(EC.presence_of_element_located((By.ID,'product_link')))
	count_span = driver.find_element_by_name("count")
	count_en = count_span.get_attribute("innerHTML")
except ValueError:
	print "Oops!  That was no valid number.  Try again..."

driver = helpers.restartDriver(driver)
inputs = helpers.getInput(driver)
inputs['inFromP'].send_keys(fromP)
inputs['inToP'].send_keys(toP)
inputs['inDiProducts'].click()
inputs['inForm'].submit()

try:
	WebDriverWait(driver, timeOut).until(EC.presence_of_element_located((By.ID,'product_link')))
	count_span = driver.find_element_by_name("count")
	count_di = count_span.get_attribute("innerHTML")
except ValueError:
	print "Oops!  That was no valid number.  Try again..."

driver.quit()

if int(count_total) == (int(count_di)+int(count_en)):
	print "Ok with disabled and enabled quantities"
else:
	print "Disabled and enabled quantities don't coincide with excpected results"