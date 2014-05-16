from selenium import webdriver
import helpers
import random
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0

url = "http://localhost/otteny.com/cleanup/index.html"
driver = webdriver.Firefox()
driver.get(url)

#OPTIONS
timeOut = 20;
fromD = '2014-01-01'
toD = '2014-05-14'

inputs = helpers.getInput(driver)
inputs['inFilter'].click()
inputs['inFrom'].clear()
inputs['inTo'].clear()
inputs['inFrom'].send_keys(fromD)
inputs['inTo'].send_keys(toD)
inputs['inForm'].submit()
try:
	WebDriverWait(driver, timeOut).until(EC.presence_of_element_located((By.ID,'product_link')))
	count_span = driver.find_element_by_name("count")
	count_total = count_span.get_attribute("innerHTML")
except ValueError:
	print "Oops!  That was no valid number.  Try again..."

driver = helpers.restartDriver(driver)
inputs = helpers.getInput(driver)
inputs['inFilter'].click()
inputs['inFrom'].clear()
inputs['inTo'].clear()
inputs['inFrom'].send_keys(fromD)
inputs['inTo'].send_keys(toD)
inputs['inEnProducts'].click()
inputs['inForm'].submit()

try:
	WebDriverWait(driver, timeOut).until(EC.presence_of_element_located((By.ID,'product_link')))
	count_span = driver.find_element_by_name("count")
	count_en = count_span.get_attribute("innerHTML")
except ValueError:
	print "Oops!  That was no valid number.  Try again..."

driver = helpers.restartDriver(driver)
inputs = helpers.getInput(driver)
inputs['inFilter'].click()
inputs['inFrom'].clear()
inputs['inTo'].clear()
inputs['inFrom'].send_keys(fromD)
inputs['inTo'].send_keys(toD)
inputs['inDiProducts'].click()
inputs['inForm'].submit()

try:
	WebDriverWait(driver, timeOut).until(EC.presence_of_element_located((By.ID,'product_link')))
	count_span = driver.find_element_by_name("count")
	count_di = count_span.get_attribute("innerHTML")
except ValueError:
	print "Oops!  That was no valid number.  Try again..."

driver.quit()

if int(count_total) == (int(count_di)+int(count_en)):
	print "Ok with disabled and enabled quantities"
else:
	print "Disabled and enabled quantities don't coincide with excpected results"

$scope.changePage = function(){
        $scope.loader = true;
        $scope.actiongo = true;
		$rootScope.Params.pageLength = $scope.pageLength;
		$rootScope.Params.currentPage = $scope.currentPage;
		$http.post(API.base_url + API.filter, $rootScope.Params).success(function(data) {
			    $scope.products = data[0].products;
			    $scope.status = true;
			    $scope.count = data[0].products.length;
			    $scope.total = data[1].count;
			    if($scope.total>0){
			    	$scope.visible = true;
			    	if($scope.total>$scope.pageLength)
			    		$scope.pageStatus = true;
			    	$scope.showSelected();
			    }
			    else
			    	$scope.visible = false;

                $scope.loader = false;
                $scope.actiongo = false;
			 }).error(function(data) {
			  	console.log("Web service error");
		});
	}