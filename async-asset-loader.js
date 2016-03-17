var asyncAssetLoader = function(assets) {

  var loadError = function (oError) {
    throw new URIError("The script " + oError.target.src + " is not accessible.");
  }

  var importScript = function(source, onload) {
    var script = document.createElement("script");
    script.type = "text\/javascript";
    script.async = "async";
    script.onerror = loadError;

    if (typeof(onload) === 'function') {
      script.onload = function(){
        onload();
      }
    }
    document.body.appendChild(script);
    script.src = source;
  }

  var loadAssets = function(assets) {

    // Iterate through the assets
    assets.forEach(function(asset){

      var countdown = asset.urls.length;

      // Iterate through array of asset urls
      asset.urls.forEach(function(url){

        // Asynchronously load the url
        importScript(url, function(){

          // After all urls loaded...
          if (--countdown === 0) {

            // Run the complete function
            setTimeout(function(){
              asset.complete();
            });

            // load dependent assets
            if (typeof(asset.deps) === 'object') {
              setTimeout(function(){
                loadAssets(asset.deps);
              });
            }

          }


        });

      });

    });
  }

  loadAssets(assets);
}
