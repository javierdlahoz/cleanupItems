from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys

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
    try:
        button = driver.find_element_by_xpath("//a[@href='/music/playlist/create']").text
        print "OK creating an user"
        logout(driver)
    except:
        print "We couldn't create an user account"
        driver.quit()
        exit()

def loggin(driver, email, password):
    driver.get("http://aquisuenamedellin.com/auth/login")
    driver.find_element_by_xpath("//a[@href='#collapseTwo']").click()
    driver.find_element_by_xpath("//input[@id='email']").send_keys(email)
    driver.find_element_by_xpath("//input[@id='password']").send_keys(password)
    driver.find_element_by_xpath("//input[@id='password']").send_keys(Keys.RETURN)
    try:
        button = driver.find_element_by_xpath("//a[@href='/music/playlist/create']").text
        print "OK loggin an user"
    except:
        print "We couldn't loggin"
        driver.quit()
        exit()

def logout(driver):
    driver.get("http://aquisuenamedellin.com/auth/logout")

def search(driver, search_str):
    driver.execute_script("$('.seach-input.span6').attr('value' , '"+search_str+"');")
    driver.execute_script("$('form[action=\"/search\"]').submit()")
    try:
        button = driver.find_element_by_xpath("//div[@class='left reel']").text
    except:
        print "We found an error with this search: '"+search_str+"'"
        driver.quit()
        exit()

def access_user_info(driver):
    driver.get("http://aquisuenamedellin.com/user/profile/")
    time.sleep(2)
    driver.find_element_by_xpath("//a[@href='/user/profile/myaccount']").click()
    time.sleep(5)


def edit_user(driver, first_name, last_name, birth_date):
    driver.get("http://aquisuenamedellin.com/user/profile/")
    time.sleep(2)
    driver.find_element_by_xpath("//a[@href='/user/profile/myaccount']").click()
    time.sleep(5)
    driver.find_element_by_xpath("//input[@id='firstname']").clear()
    driver.find_element_by_xpath("//input[@id='firstname']").send_keys(first_name)
    driver.find_element_by_xpath("//input[@id='lastname']").clear()
    driver.find_element_by_xpath("//input[@id='lastname']").send_keys(last_name)
    driver.find_element_by_xpath("//input[@id='birthday']").clear()
    driver.find_element_by_xpath("//input[@id='birthday']").send_keys(birth_date)
    driver.find_element_by_xpath("//select[@name='gender']/option[text()='Masculino']").click()
    driver.find_element_by_xpath("//input[@value='Guardar']").click()
    time.sleep(6)
    try:
        ok = driver.find_element_by_xpath("//i[@class='icon-ok-sign']").text
        print "OK editing an user account"
    except:
        print "We found an error editing an user account"
        driver.quit()
        exit()

def change_email(driver, email):
    access_user_info(driver)
    driver.find_element_by_xpath("//a[@href='/user/profile/login']").click()
    time.sleep(5)
    driver.find_element_by_xpath("//input[@id='email']").clear()
    driver.find_element_by_xpath("//input[@id='email']").send_keys(email)
    driver.find_element_by_xpath("//input[@id='email']").send_keys(Keys.RETURN)
    time.sleep(3)
    try:
        n_email = driver.find_element_by_xpath("//div[@class='alert alert-success']").text
        if (n_email):
            print n_email
        else:
            print "We found an error editing your email (else part)"
    except:
        print "We found an error editing your email"

def change_password(driver, old_password, new_password):
    access_user_info(driver)
    driver.find_element_by_xpath("//a[@href='/user/profile/login']").click()
    time.sleep(4)
    driver.find_element_by_xpath("//input[@id='password']").send_keys(old_password)
    driver.find_element_by_xpath("//input[@id='password-new']").send_keys(new_password)
    driver.find_element_by_xpath("//input[@id='passwordrepeat']").send_keys(new_password)
    driver.find_element_by_xpath("//input[@id='passwordrepeat']").send_keys(Keys.RETURN)
    time.sleep(7)
    try:
        success = driver.find_element_by_xpath("//div[@class='alert alert-success']").text
        if(success):
            print success
        else:
            print "We couldn't change your password"
    except:
        print "We couldn't change your password"

def change_contact(driver, phone, address, city):
    access_user_info(driver)
    driver.find_element_by_xpath("//a[@href='/user/profile/contacts']").click()
    time.sleep(4)
    driver.find_element_by_xpath("//input[@id='phone']").clear()
    driver.find_element_by_xpath("//input[@id='phone']").send_keys(phone)
    driver.find_element_by_xpath("//input[@id='address']").clear()
    driver.find_element_by_xpath("//input[@id='address']").send_keys(address)
    driver.find_element_by_xpath("//input[@id='city']").clear()
    driver.find_element_by_xpath("//input[@id='city']").send_keys(city)
    driver.find_element_by_xpath("//input[@value='Guardar']").click()
    time.sleep(7)
    try:
        success = driver.find_element_by_xpath("//div[@class='alert alert-success']").text
        if(success):
            print success
        else:
            print "We couldn't change your contac info"
    except:
        print "We couldn't change your contac info"