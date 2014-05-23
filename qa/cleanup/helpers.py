from selenium import webdriver
import time
from random import randint
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

url = "http://localhost/otteny.com/cleanup/index.html"

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

def random_select(driver):
	driver.find_element_by_xpath("//a[@ng-click='selectNone()']").click()
	ctrl = False
	tot = 0
	while ctrl == False:
	    for i in range(50):
	        try:
	        	state = randint(0,1)
	        	if state == 1:
	        		tot += 1
	        		driver.find_element_by_xpath("//input[@name='"+str(i)+"']").click()
	        except:
	            ctrl = True
	            print str(tot-1)
	            break
	    try:
	        driver.find_element_by_xpath("//a[@ng-click='selectPage(page + 1)']").click()
	        time.sleep(2)
	    except:
	        ctrl = True
	        print str(tot-1)

def select_none(driver):
    driver.find_element_by_xpath("//a[@ng-click='selectAll()']").click()
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

def crazy_page(driver):
	for x in xrange(1,20):
		n = randint(1, 3)
		if n==1:
			driver.find_element_by_xpath("//a[@ng-click='ten()']").click()
			time.sleep(1)
		elif n==2:
			driver.find_element_by_xpath("//a[@ng-click='fifty()']").click()
			time.sleep(1)
		else:
			driver.find_element_by_xpath("//a[@ng-click='houndred()']").click()
			time.sleep(1)

def updated_at(driver, from_date, to_date):
	driver.get(url)
	time.sleep(2)
	driver.find_element_by_xpath("//select[@name='filter_select']/option[text()='Updated at']").click()
	time.sleep(1)
	driver.find_element_by_xpath("//input[@name='from']").clear()
	driver.find_element_by_xpath("//input[@name='to']").clear()

	driver.find_element_by_xpath("//input[@name='from']").send_keys(from_date)
	driver.find_element_by_xpath("//input[@name='to']").send_keys(to_date)
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	h4 = driver.find_element_by_xpath("//h4[@class='ng-scope']").text
	if h4=='List of filtered products':
		print "Ok with dates"
	else:
		print "Problem with dates"

def created_at(driver, from_date, to_date):
	driver.get(url)
	time.sleep(2)
	driver.find_element_by_xpath("//select[@name='filter_select']/option[text()='Created at']").click()
	time.sleep(1)
	driver.find_element_by_xpath("//input[@name='from']").clear()
	driver.find_element_by_xpath("//input[@name='to']").clear()

	driver.find_element_by_xpath("//input[@name='from']").send_keys(from_date)
	driver.find_element_by_xpath("//input[@name='to']").send_keys(to_date)
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	h4 = driver.find_element_by_xpath("//h4[@class='ng-scope']").text
	if h4=='List of filtered products':
		print "Ok with dates"
	else:
		print "Problem with dates"

def prices(driver, from_price, to_price):
	driver.get(url)
	driver.execute_script("document.getElementById('fromP').value = '"+from_price+"'")
	driver.execute_script("document.getElementById('toP').value = '"+to_price+"'")
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	h4 = driver.find_element_by_xpath("//h4[@class='ng-scope']").text
	if h4=='List of filtered products':
		print "Ok with prices"
	else:
		print "Problem with prices"

def all_types(driver):
	driver.get(url)
	#for simple products
	driver.find_element_by_xpath("//select[@ng-model='type_id']/option[text()='simple']").click()
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	simple = int(driver.find_element_by_xpath("//span[@name='count']").text)
	driver.find_element_by_xpath("//a[@id='home']").click()
	time.sleep(1)

	#for configurable products
	driver.find_element_by_xpath("//select[@ng-model='type_id']/option[text()='configurable']").click()
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	configurable = int(driver.find_element_by_xpath("//span[@name='count']").text)
	driver.find_element_by_xpath("//a[@id='home']").click()
	time.sleep(1)

	#for bundle products
	driver.find_element_by_xpath("//select[@ng-model='type_id']/option[text()='bundle']").click()
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	bundle = int(driver.find_element_by_xpath("//span[@name='count']").text)
	driver.find_element_by_xpath("//a[@id='home']").click()
	time.sleep(1)

	#for grouped products
	driver.find_element_by_xpath("//select[@ng-model='type_id']/option[text()='grouped']").click()
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	grouped = int(driver.find_element_by_xpath("//span[@name='count']").text)
	driver.find_element_by_xpath("//a[@id='home']").click()
	time.sleep(1)

	#for virtual products
	driver.find_element_by_xpath("//select[@ng-model='type_id']/option[text()='virtual']").click()
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	virtual = int(driver.find_element_by_xpath("//span[@name='count']").text)
	driver.find_element_by_xpath("//a[@id='home']").click()
	time.sleep(1)

	#for all products
	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	total = int(driver.find_element_by_xpath("//span[@name='count']").text)

	if total == (simple + configurable + bundle + grouped + virtual):
		print "OK with types"
	else:
		print "Not OK with types"

def all_categories(driver):
	driver.get(url)
	time.sleep(2)
	i = 1
	suma = 0
	ctrl = True
	categories_no_products = ''
	while ctrl == True:
		try:
			category = driver.find_element_by_xpath("//select[@ng-model='category']/option[@index='"+str(i)+"']").text
			driver.find_element_by_xpath("//select[@ng-model='category']/option[@index='"+str(i)+"']").click()
			driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
			time.sleep(1)
			try:
				suma += int(driver.find_element_by_xpath("//span[@name='count']").text)
			except:
				suma = suma
				categories_no_products += category + "\n"
			i += 1
			driver.find_element_by_xpath("//a[@id='home']").click()
		except:
			ctrl = False

	driver.find_element_by_xpath("//button[@class='btn btn-primary']").click()
	time.sleep(1)
	total = int(driver.find_element_by_xpath("//span[@name='count']").text)

	print "total of products in all categories = "+str(suma)+" (some products are repetead)"
	if suma!=0:
		print "OK with categories"
		print "categories with no products"
		print categories_no_products
	else:
		print "Not OK with categories"

def multiple_check(driver):
	driver.find_element_by_xpath("//a[@ng-click='selectNone()']").click()
	ctrl = False
	tot = 0
	while ctrl == False:
	    for i in range(31):
	        driver.find_element_by_xpath("//input[@name='"+str(11)+"']").click()