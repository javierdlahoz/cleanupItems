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

    $productId = $request->{'products'};
    $isEnable = $request->{'isEnable'};
    $isDisable = $request->{'isDisable'};
    $isDelete = $request->{'isDelete'};
    $category =  $request->{'category'};
    $moveTo = $request->{'moveTo'};
    $index = $request->{'index'};
    $storeid=0;

    if($isDisable=="true"){
        $product = Mage::getModel('catalog/product')->load($productId);
        $productArray = array(
              "id" => $product->getId(),
              "name" => $product->getName(),
              "sku" => $product->getSku()
          );
        $product->setStatus(0);
        $product->save();
        echo json_encode($productArray);
    }

    if($isEnable=="true"){
        $product = Mage::getModel('catalog/product')->load($productId);
        $productArray = array(
              "id" => $product->getId(),
              "name" => $product->getName(),
              "sku" => $product->getSku()
          );
        $product->setStatus(1);
        $product->save();
        echo json_encode($productArray);
    }

    if($isDelete=="true"){
        $product = Mage::getModel('catalog/product')->load($productId);
        deleteImages($productId);
        $productArray = array(
              "id" => $product->getId(),
              "name" => $product->getName(),
              "sku" => $product->getSku()
          );
        $product->delete();
        echo json_encode($productArray);
    }

    if($moveTo=="true"){
        $product = Mage::getModel('catalog/product')->load($productId);
        addCategoryToAProduct($product, $category);
        $productArray = array(
              "id" => $product->getId(),
              "name" => $product->getName(),
              "sku" => $product->getSku()
        );
        echo json_encode($productArray);
    }

    function deleteImages($product_id){
      $_product = Mage::getModel('catalog/product')->load($product_id); 
      $galleryData = $_product->getMediaGalleryImages();
      foreach($galleryData as $image)
      { 
        unlink("../media/catalog/product".$image->getFile());
      }
      unlink("../media/catalog/product".$_product->getImage());
    }

    function addCategoryToAProduct($product, $categoryId){
      $categories_id = $product->getCategoryIds();
      array_push($categories_id, $categoryId);
      $product->setCategoryIds($categories_id);
      $product->save();
    }