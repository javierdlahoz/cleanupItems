from selenium import webdriver
import helpers
import random
import time
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
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