<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Eventbux</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDaX27LuWvfnZHHL0EO3SE3wjZHW3EFpLA&libraries=geometry,places"></script>
    </head>
    <body>
        <div id="eventbux"></div>
        <script src="https://cloud.tinymce.com/5/tinymce.min.js"></script>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>