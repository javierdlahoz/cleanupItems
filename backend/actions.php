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

    $mediaDir = "../media/catalog/product";
    $csv = "../files/actionProducts.csv";
    $isEnable = $request->{'isEnable'};
    $isDisable = $request->{'isDisable'};
    $isDelete = $request->{'isDelete'};
    $category =  $request->{'category'};
    $moveTo = $request->{'moveTo'};
    $index = $request->{'index'};
    $storeid=0;
    $productId = $request->{'productId'};
    $product = Mage::getModel('catalog/product')->load($productId);
    $pArray = array('status' => true, 'id' => $productId, 'name' => $product->getName()); 

    if($index==0){
      $fp = fopen($csv, 'w');
      fputcsv($fp, array('id', 'name'));
    }
    else{
      $fp = fopen($csv, 'a');
    }
    fputcsv($fp, array($productId, $product->getName()));
    fclose($fp);

    if($isDisable=="true"){  
      $product->setStatus(0);
      echo json_encode($pArray);
      $product->save();
    }

    if($isEnable=="true"){
      $product->setStatus(1);
      echo json_encode($pArray);
      $product->save();
    }

    if($isDelete=="true"){
      deleteImages($productId);
      echo json_encode($pArray);
      $product->delete();
    }

    if($moveTo=="true"){
      echo json_encode($pArray);
      addCategoryToAProduct($product, $category);
    }

    function deleteImages($product_id){
      $_product = Mage::getModel('catalog/product')->load($product_id); 
      $galleryData = $_product->getMediaGalleryImages();
      foreach($galleryData as $image){ 
        unlink($mediaDir.$image->getFile());
      }
      unlink($mediaDir.$_product->getImage());
    }

    function addCategoryToAProduct($product, $categoryId){
      $categories_id = $product->getCategoryIds();
      array_push($categories_id, $categoryId);
      $product->setCategoryIds($categories_id);
      $product->save();
    }