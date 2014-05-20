from selenium import webdriver
import time
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

browser = webdriver.Firefox()
url_main = "http://localhost/magento/admin"
load_time = 1
user = 'root'
password = 'test4echo'

# Admin panel
browser.get(url_main)
time.sleep(load_time)

browser.find_element_by_xpath("//input[@id='username']").send_keys(user)
browser.find_element_by_xpath("//input[@id='login']").send_keys(password)
browser.find_element_by_xpath("//input[@class='form-button']").click()
time.sleep(load_time)

browser.find_element_by_xpath("//span[contains(text(), 'System')]").click()
browser.find_element_by_xpath("//span[contains(text(), 'Index Management')]").click()
time.sleep(load_time)

browser.find_element_by_xpath("//a[@onclick='return indexer_processes_grid_massactionJsObject.selectAll()']").click()
browser.find_element_by_xpath("//button[@onclick='indexer_processes_grid_massactionJsObject.apply()']").click()

wait(browser, 600).until(EC.text_to_be_present_in_element((By.ID, "indexer_processes_grid_massaction-count"), '0'))
items = browser.find_element_by_xpath("//strong[@id='indexer_processes_grid_massaction-count']").text

if items=='0':
	print "Reindexed successfully"
	pass
else:
	print "The reindexing operation took too long"
	pass

browser.quit()