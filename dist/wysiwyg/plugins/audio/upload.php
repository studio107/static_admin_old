<?php

if(!empty($_FILES['upload']))
{
	$file = $_SERVER['DOCUMENT_ROOT']."/public/modules/pages/editor/mp3/".md5($_FILES['upload']['name']).".mp3";
	copy($_FILES['upload']['tmp_name'],$file);
}

?>