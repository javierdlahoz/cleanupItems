from selenium import webdriver
from helpers import *
import string
import random

driver = webdriver.Firefox()

first_name = '|@#'
last_name = '@#@|'
email = '3432-12@gmail.com'
password = 'k'

Nfirst_name = "@#@|"
Nlast_name = "@#@|"
birth_date = "890-05-05"
Nemail = '3432-12@gmail.com'
new_password = "j"

phone = "123456"
address = "Near"
city = "M"

#create_user(driver, first_name, last_name, email, password)
loggin(driver, email, password)
edit_user(driver, Nfirst_name, Nlast_name, birth_date)
#change_email(driver, Nemail)
#change_password(driver, password, new_password)
#change_contact(driver, phone, address, city)
driver.quit()
exit()

'''SEARCHING
driver.get("http://aquisuenamedellin.com")
for j in range(100):
    leng = random.randint(1,11)
    search_str = ''
    for i in range(leng):
        search_str += random.choice(string.lowercase)
    search(driver, search_str)
'''