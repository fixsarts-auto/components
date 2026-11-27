/* Fixs Arts - Marquee Logo (loader)
   Pasang cukup: <div id="fixs-marquee"></div> + <script src="PATH/marquee.js"></script>
   File ini otomatis memuat css/ dan js/ yang ada di sebelahnya. */
(function(){
  var s=document.currentScript,b=s.src.replace(/[^\/]*$/,'');
  function css(h){var l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l)}
  function js(h,cb){var e=document.createElement('script');e.src=h;e.onload=cb;document.head.appendChild(e)}
  css(b+'css/marquee-logo.css');
  js(b+'js/marquee-config.js',function(){js(b+'js/marquee-logo.js')});
})();
