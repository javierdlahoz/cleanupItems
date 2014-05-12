from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

url = "http://localhost/otteny.com/cleanup/index.html"

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