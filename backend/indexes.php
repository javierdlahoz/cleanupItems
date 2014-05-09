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
    $action = $request->{'action'};

    switch ($action) {
        case '--reindexall':
            for ($i = 1; $i <= 9; $i++) {
                $process = Mage::getModel('index/process')->load($i);
                $process->reindexAll();
            }
            echo json_encode(array('status' => true));
            break;

        case '--mode-manual':
            $pCollection = Mage::getSingleton('index/indexer')->getProcessesCollection(); 
            foreach ($pCollection as $process) {
              $process->setMode(Mage_Index_Model_Process::MODE_MANUAL)->save();
            }
            echo json_encode(array('status' => true));
            break;

        case '--mode-realtime':
            $pCollection = Mage::getSingleton('index/indexer')->getProcessesCollection(); 
            foreach ($pCollection as $process) {
              $process->setMode(Mage_Index_Model_Process::MODE_REAL_TIME)->save();
            }
            echo json_encode(array('status' => true));
            break;   
    }