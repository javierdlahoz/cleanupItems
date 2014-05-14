<?php

class Collection{
 public function getWholeCollection($collection){
  $_SESSION['ready'] = false;
  $products_array = array();
  foreach ($collection as $product) {
    $product_array = array(
        "id" => $product->getId(),
        "name" => $product->getName(),
        "sku" => $product->getSku(),
        "idSelected" => true
    );
    array_push($products_array, $product_array);
  }
  return $products_array;
  }
}