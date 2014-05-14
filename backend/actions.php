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

    $isEnable = $request->{'isEnable'};
    $isDisable = $request->{'isDisable'};
    $isDelete = $request->{'isDelete'};
    $category =  $request->{'category'};
    $moveTo = $request->{'moveTo'};
    $isSelected = $request->{'isSelected'};
    $noSelected = $request->{'noSelected'};
    $Selected = $request->{'Selected'};
    $storeid=0;
    $products = Mage::getSingleton('core/session')->getProducts();
    
    $fileName = 'results.json';
    if(file_exists($fileName))
      unlink($fileName);
    $fp = fopen($fileName, 'w');
    $total = count($products);
    $i=1;
    if($isDisable=="true"){
      foreach ($products as $_product) {
        $product = Mage::getModel('catalog/product')->load($_product['id']);
        $productArray = array(
              "id" => $_product['id'],
              "name" => $_product['name']
          );
        fwrite($fp, json_encode(array('total'=>$total, 'index' => $i)));
        $product->setStatus(0);
        $product->save();
      }
      fclose($fp);  
    }

    if($isEnable=="true"){
        $product = Mage::getModel('catalog/product')->load($productId);
        $productArray = array(
              "id" => $product->getId(),
              "name" => $product->getName(),
              "sku" => $product->getSku()
          );
        echo json_encode($productArray);
        $product->setStatus(1);
        $product->save();
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
  
