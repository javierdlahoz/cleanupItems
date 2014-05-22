from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

url = "http://172.16.1.27/otteny.com/cleanup/index.html"

def getInput(driver):
  	inputs = {'inForm': driver.find_element_by_name("form")}
	inputs['inFilter'] = driver.find_element_by_xpath("//select[@name='filter_select']/option[text()='Updated at']")
	inputs['inFrom'] = driver.find_element_by_name("from")
	inputs['inTo'] = driver.find_element_by_name("to")
	inputs['inFromP'] = driver.find_element_by_name("fromP")
	inputs['inToP'] = driver.find_element_by_name("toP")
	inputs['inType'] = driver.find_element_by_xpath("//select[@name='typeId']/option[text()='simple']")
	inputs['inCategory'] = driver.find_element_by_name("categoryIn")
	inputs['inNoStock'] = driver.find_element_by_name("chNStock")
	inputs['inNoPictures'] = driver.find_element_by_name("chNPictures")
	inputs['inEnProducts'] = driver.find_element_by_name("chEProducts")
	inputs['inDiProducts'] = driver.find_element_by_name("chDProducts")
	return inputs;

def restartDriver(driver):
	driver.quit()
	driver = webdriver.Firefox()
	driver.get(url)
	return driver

def search_all(driver):
	driver.get(url)
	time.sleep(2)
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(3)

def enable_all(driver):
	search_all(driver)
	driver.find_element_by_xpath("//button[@class='btn btn-success ng-pristine ng-valid']").click()
	time.sleep(3)

def disable_all(driver):
	search_all(driver)
	driver.find_element_by_xpath("//button[@class='btn btn-warning ng-pristine ng-valid']").click()
	time.sleep(3)

def select_all(driver):
	driver.find_element_by_xpath("//a[@ng-click='selectNone()']").click()
	ctrl = False
	while ctrl == False:
	    for i in range(50):
	        try:
	            driver.find_element_by_xpath("//input[@name='"+str(i)+"']").click()
	        except:
	            ctrl = True
	            break
	    try:
	        driver.find_element_by_xpath("//a[@ng-click='selectPage(page + 1)']").click()
	        time.sleep(2)
	    except:
	        ctrl = True