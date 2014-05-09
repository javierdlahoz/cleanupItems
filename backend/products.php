<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    ini_set('log_errors', 1);
    ini_set("error_reporting",E_ALL & ~E_NOTICE & ~E_WARNING);

    $body = file_get_contents("php://input");
    $request = json_decode($body);
    $products = $request->{'products'};
    $fileName = '../files/actionProducts.csv';
    
    if(file_exists($fileName))
        unlink($fileName);
    
    $fp = fopen($fileName, 'w');
    $headers = array('id', 'Name', 'SKU');
    fputcsv($fp, $headers);
    foreach ($products as $product) {  
        $productArray = array($product->{'id'},$product->{'name'},$product->{'sku'});
        fputcsv($fp, $productArray);     
    }
    fclose($fp);
    echo json_encode($products); 