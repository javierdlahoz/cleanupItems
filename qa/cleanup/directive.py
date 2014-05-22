import time
def actions(driver, fromval, to):
    driver.get("http://172.16.1.27/otteny.com/cleanup/index.html")
    driver.find_element_by_xpath("//input[@ng-model='priceFrom']").send_keys(fromval)
    driver.find_element_by_xpath("//input[@ng-model='priceTo']").send_keys(to)
    driver.find_element_by_xpath("//input[@name='chEProducts']").click()
    driver.find_element_by_xpath("//button[@type='submit']").click()
    time.sleep(2)
    driver.find_element_by_xpath("//button[@ng-click='setIsDisable()']").click()