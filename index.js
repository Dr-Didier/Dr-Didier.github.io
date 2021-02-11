

  window.onload = function () {
    Particles.init({
      selector: '.background',
      maxParticles: 450,
      color: "#9ecadb",
	  connectParticles: true,
	  retina_detect: true,
    });
  };

// particlesJS.load('particles-js', 'particlesjs.json', function() {
// 	console.log('callback - particles.js config loaded');
//   });	