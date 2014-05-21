from selenium import webdriver
import time
from helpers import *

driver = webdriver.Firefox()

first_name = 'Javier'
last_name = 'Enrique'
email = 'ajshdvajdahvdva@gmail.com'
password = 'javier123'

create_user(driver, first_name, last_name, email, password)
time.sleep(2)
button = driver.find_element_by_xpath("//a[@href='/music/playlist/create']").text

if button == "Crear nueva lista":
    print "OK"
else:
    print "There's an error"
driver.quit()