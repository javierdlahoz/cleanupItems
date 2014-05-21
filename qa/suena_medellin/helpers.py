from selenium import webdriver
import helpers
import random
import time
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0

def create_user(driver, first_name, last_name, email, password):
    driver.get("http://aquisuenamedellin.com/auth/login")
    driver.find_element_by_xpath("//a[@href='#collapseThree']").click()
    driver.find_element_by_xpath("//input[@name='firstname']").send_keys(first_name)
    driver.find_element_by_xpath("//input[@name='lastname']").send_keys(last_name)
    driver.find_element_by_xpath("//input[@id='email_signup']").send_keys(email)
    driver.find_element_by_xpath("//input[@name='email_confirm']").send_keys(email)
    driver.find_element_by_xpath("//input[@id='password_signup']").send_keys(password)
    driver.find_element_by_xpath("//input[@name='password_confirm']").send_keys(password)
    driver.find_element_by_xpath("//input[@value='Crear cuenta']").click()
