import Tkinter
from selenium import webdriver
from directive import *

driver = webdriver.Firefox()
actions(driver, '0', '1000')