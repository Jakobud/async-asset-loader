var asyncAssetLoader = function(assets) {

  var loadError = function (oError) {
    throw new URIError("The script " + oError.target.src + " is not accessible.");
  }

  var importScript = function(sSrc, complete, assets) {
    var oScript = document.createElement("script");
    oScript.type = "text\/javascript";
    oScript.async = "async";
    oScript.onerror = loadError;

    oScript.onload = function(){
      setTimeout(function(){
        complete();
      });
      setTimeout(function(){
        loadAssets(assets);
      });
    }
    document.body.appendChild(oScript);
    oScript.src = sSrc;
  }

  var loadAssets = function(assets) {
    for (var index in assets) {

      if (typeof(assets[index].path !== 'undefined')) {
        importScript(assets[index].path, assets[index].complete, assets[index].deps);
      }
    }
  }

  loadAssets(assets);
}
