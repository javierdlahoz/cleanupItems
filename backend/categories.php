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

    $categories = Mage::getModel("catalog/category")->getCollection();
    $categories_array = array();
    foreach($categories as $category){
        $category = Mage::getModel("catalog/category")->load($category->getId());
        if($category->getIsActive()==1){
          $category_array = array(
                "id" => $category->getId(),
                "name" => $category->getName()
              );
          array_push($categories_array, $category_array);
        }
    }

    echo json_encode($categories_array);