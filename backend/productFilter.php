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

    $from = substr($request->{'from'},0,10);
    $to = substr($request->{'to'},0,10);
    $filter = $request->{'filter'};
    $noStocks = $request->{'noStock'};
    $noPicture = $request->{'noPicture'};
    $priceFrom = $request->{'priceFrom'}; 
    $priceTo = $request->{'priceTo'};
    $qtyFrom = $request->{'qtyFrom'}; 
    $qtyTo = $request->{'qtyTo'};
    $category = $request->{'category'};
    $enabledProducts = $request->{'enabledProducts'};
    $disabledProducts = $request->{'disabledProducts'};
    $type = $request->{'type'};
    $name = $request->{'productName'};

    if(!empty($category)){
    	$collection = Mage::getModel("catalog/category")->load($category)->getProductCollection()->addAttributeToSelect('id');
      $collection->addAttributeToSelect('name');
      $collection->addAttributeToSelect('status');
      $collection->addAttributeToSelect('product_url');
    }
    else{
    	$collection = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('id');
      $collection->addAttributeToSelect('name');
      $collection->addAttributeToSelect('status');
      $collection->addAttributeToSelect('product_url');
    }

    if(!empty($name)){
      $collection->addAttributeToFilter('name', array('like' => '%'.$name.'%'));
    }
             
    if(!empty($type))
    	$collection->addAttributeToFilter('type_id', array('eq' => $type));        

    if(!empty($filter)){
        switch ($filter) {
          case 'updated':
            $tFilter = 'updated_at';
            break;

          case 'created':
            $tFilter = 'created_at';
            break;
          }

        $collection->addAttributeToFilter($tFilter, array('gt' => $from))
                   ->addAttributeToFilter($tFilter, array('lt' => $to));
    }

    if($noStock){
        $collection->joinField(
                  'qty',
                  'cataloginventory/stock_item',
                  'qty',
                  'product_id=entity_id',
                  '{{table}}.stock_id=1',
                  'left'
                  )
            ->addAttributeToFilter('qty', array('lt' => 1));
    }

    if($priceTo!=0){
      $collection->addAttributeToFilter('price', array('gt' => $priceFrom))
                   ->addAttributeToFilter('price', array('lt' => $priceTo));
    }

    if($qtyTo!=0){
      $collection->joinField(
                  'qty',
                  'cataloginventory/stock_item',
                  'qty',
                  'product_id=entity_id',
                  '{{table}}.stock_id=1',
                  'left'
                  );
      $collection->addAttributeToFilter('qty', array('gt' => $qtyFrom))
                   ->addAttributeToFilter('qty', array('lt' => $qtyTo));
    }

    if($enabledProducts){
      $collection->addAttributeToFilter('status', 1);  
    }

    if($disabledProducts){
      $collection->addAttributeToFilter('status', 0);  
    }

    if($noPicture){
        $products_array = array();
        foreach ($collection as $product) {
              $_product = Mage::getModel('catalog/product')->load($product_id); 
              $galleryData = $_product->getMediaGalleryImages();
              $images = $product->getImage();
               if(count($galleryData)==0){
                   if(empty($images)){
                         $url = $product->getProductUrl();
			                   $product_array = array(
      			                  "id" => $product->getId(),
      			                  "name" => $product->getName(),
      			                  "sku" => $product->getSku(),
      			                  "url" => str_replace("productFilter.php/", "", $url),
      			                  "status" => (bool) $product->getStatus(),
      			                  "idSelected" => true
      			             );
			             array_push($products_array, $product_array);
                   }
               }
        }
    }
    else{
        $products_array = array();
        foreach ($collection as $product) {
              $url = $product->getProductUrl();
              $product_array = array(
                  "id" => $product->getId(),
                  "name" => $product->getName(),
                  "sku" => $product->getSku(),
                  "url" => str_replace("productFilter.php/", "", $url),
                  "status" => (bool) $product->getStatus(),
                  "idSelected" => true
              );
              array_push($products_array, $product_array);
        }
    }
    echo json_encode($products_array);