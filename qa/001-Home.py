from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from config import *

# Start
browser = webdriver.Firefox()

# Home
browser.get(url_main)
time.sleep(load_time)
assert 'Submit' in browser.find_element_by_xpath("//button[@class='btn btn-primary']").text

# click Artist
browser.find_element_by_xpath("//div[@id='artista']").click()
time.sleep(load_time)
assert 'Powered by' in browser.find_element_by_xpath("//span[@class='powered']").text

# click Venue
browser.find_element_by_xpath("//img[@id='logo']").click()
time.sleep(load_time)
browser.find_element_by_xpath("//div[@id='venue']").click()
time.sleep(load_time)
assert 'Powered by' in browser.find_element_by_xpath("//span[@class='powered']").text

# click Comunicador
browser.find_element_by_xpath("//img[@id='logo']").click()
time.sleep(load_time)
browser.find_element_by_xpath("//div[@id='comunicador']").click()
time.sleep(load_time)
assert 'Powered by' in browser.find_element_by_xpath("//span[@class='powered']").text

# Home
browser.find_element_by_xpath("//img[@id='logo']").click()
time.sleep(load_time)
assert 'Powered by' in browser.find_element_by_xpath("//span[@class='powered']").text

browser.quit()