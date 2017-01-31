<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CPS630 Labs | Daniel Tran</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/style/style.css">
    <script src="assets/scripts/parallax.js"></script>
    <script src="https://use.fontawesome.com/9655b265f7.js"></script>
  </head>
  <body>
    <!-- BEGIN NAVBAR -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <i class="fa fa-home" aria-hidden="true"></i>
          </a>
          <ul class="nav navbar-nav navbar-left">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="lab1/index.html">Lab 1</a></li>
            <li><a href="#">Lab 2</a></li>
            <li><a href="#">Lab 3</a></li>
            <li><a href="#">Lab 4</a></li>
            <li><a href="#">Lab 5</a></li>
          </ul>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#"><i class="fa fa-github fa-lg" aria-hidden="true"></i></a></li>
        </ul>
      </div>
    </nav>
    <!-- END NAVBAR -->
    <div id="container" class="container">
  		<ul id="scene" class="scene">
  			<li class="layer" data-depth="1.00"><img src="assets/images/layer1.png"></li>
  			<li class="layer" data-depth="0.80"><img src="assets/images/layer2.png"></li>
  			<li class="layer" data-depth="0.60"><img src="assets/images/layer3.png"></li>
  			<li class="layer" data-depth="0.40"><img src="assets/images/layer4.png"></li>
  			<li class="layer" data-depth="0.20"><img src="assets/images/layer5.png"></li>
  			<li class="layer" data-depth="0.00"><img src="assets/images/layer6.png"></li>
  		</ul>
  	</div>
  <script>
  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);
  </script>
</body>
</html>
