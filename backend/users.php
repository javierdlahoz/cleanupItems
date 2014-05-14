<?php 
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    ini_set('log_errors', 1);
    ini_set("error_reporting",E_ALL & ~E_NOTICE & ~E_WARNING);

    include_once dirname(__FILE__) . '../../../app/Mage.php';

    Mage::app('admin');
    umask(0);
    $body = file_get_contents("php://input");
    $request = json_decode($body);

    switch ($request->{'meth'}) {
    	case 'isLoggedIn':
    		echo isLoggedIn();
    		break;
    }

	function isLoggedIn(){
		Mage::getSingleton('core/session', array('name'=>'adminhtml'));
		$status = false;
		if(Mage::getSingleton('admin/session')->isLoggedIn()){
			$status = true;
		}
        $url = Mage::helper("adminhtml")->getUrl();
		$json_response = array("status" => $status, "url" => $url);
		return json_encode($json_response);
	}