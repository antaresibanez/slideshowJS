/*=============================================
Objeto con las propiedades del slide
=============================================*/
var p = {

	paginacion: document.querySelectorAll("#paginacion li"),
	// parámetro que cambiará dependiendo de la llamada del método paginaciónSlide()
	item: 0,
	//capturamos la caja del slide
	cajaSlide: document.querySelector("#slide ul"),
	//genero una propiedad para cambiar el tipo de animación y seleccionarla con una condicion
	animacionSlide: "slide",
	//llamamos a todas las imágenes para aplicar el efecto fade
	imgSlide: document.querySelectorAll("#slide ul li"),
	// propiedad para llamar a la flecha "avanzar"
	avanzar: document.querySelector("#slide #avanzar"),
	// propiedad para llamar a la flecha "retroceder"
	retroceder: document.querySelector("#slide #retroceder"),
	//propiedad de la velocidad para m.intervalo
	velocidadSlide: 3000,
	//generamos una propiedad boole para parar el el setInterfal de el método interfalo
	formatearLoop: false
}


/*=============================================
Objeto con las Métodos del slide
=============================================*/

var m = {

	inicioSlide: function() {

		for (var i = 0; i < p.paginacion.length; i++) {
			p.paginacion[i].addEventListener("click", m.paginacionSlide);
			//Creando dinamismo B - imgSlide es quien contiene los "ul"(es un array por lo que tengo que llamar a 
			// todos sus items "[i]" )
			//el width dependerá de la cantidad de items que divida a 100(ej si pongo 6 será 16,66%)
			p.imgSlide[i].style.width = (100/p.paginacion.length) + "%";
		}
		// genero el método con el evento click que llama al evento a m.avanzar/m.retroceder
		p.avanzar.addEventListener("click", m.avanzar);
		p.retroceder.addEventListener("click", m.retroceder);
		//disparo el movimiento automático con un llamando al método "m.intervalo"
		m.intervalo();

		//creando dinamismo A - En caso de tener más items
		//llamo al parámetro "width" de la cajaSlide dependiendo de la cantidad de items(la logintud de p.paginacion).
		//lo multiplico por 100 y concateno el "%" así se modifica la propiedad CSS
		p.cajaSlide.style.width = (p.paginacion.length*100) + "%";


	},
	//creamos un método para recuperar el target del addEventListener anterior con los botones del slide con el parámetro "item", 
	//indicamos ".parentNode" para llamar a al padre del target "li", .getAttribute "item" para llamar al número de item
	paginacionSlide: function(item) {

		console.log("item", item.target.parentNode.getAttribute("item"));
		// llamo al parámetro para cambiar el valor de "item" dependiendo cual pulse
		// le restamos 1 para que empiece desde 0 y si pulso el item 2 me muestre el 1
		p.item = item.target.parentNode.getAttribute("item") - 1;
		//llamamos al método movimientoSlide para llamar al valor del item como parámetro
		m.movimientoSlide(p.item);

	},


	avanzar: function() {

		//genero un condicional para no superar la cantidad de imagenes (4)
		//de modod que el "else" irá incrementando p.item y mientras p.item sea igual a
		// p.imgSlide.lengh(-1 para que sea igual a 3 y no 4(ya que tenemos 0,1,2,3), si llega a 4 da error),
		//lo resetee a "0" en caso de superarlo 
		if (p.item == p.imgSlide.length - 1) {
			p.item = 0;
		} else {
			//aumento p.item con cada click
			p.item++;
		}


		console.log("p.item", p.item);

		// necesito enviar el número del item
		m.movimientoSlide(p.item)


	},

	retroceder: function() {
		//en este caso el condicional es al contraro, siempre, que p.item sea "0"
		// tengo que cambiarlo al al tama;o de p.imgSlide y si no que lo disminuya "--"
		if (p.item == 0) {

			p.item = p.imgSlide.length - 1;

		} else {
			//disminuyo p.item con cada click
			p.item--;
		}
		m.movimientoSlide(p.item)

	},



	// le pasamos el parámetro item que en principio es 0 pero dependerá del click del EventListener,
	// y al multiplicarlo por -100 nos dará los valores negativos que requerimos para mover la imagen hacia la izquierda 
	movimientoSlide: function(item) {
		console.log("item", -(item * 100) + "%");

		//cuando se activa movimientoSlide el formatearLoop se pone en "true", de modo que el setInterval del
		//método intervalo deja empieza a contar de nuevo los 3 segundos sin ejecutar avanzar
		p.formatearLoop = true

		//finalmente llamamos a la cajaSlide y le decimos que su style.left = al valor del item seleccionado	
		p.cajaSlide.style.left = item * -100 + "%";
		//ponemos la opacidad al 50% de todos los botones cuando doy click
		for (var i = 0; i < p.paginacion.length; i++) {
			p.paginacion[i].style.opacity = .5;
		}
		//llamamos a la propiedad paginación para pasarle el parámetro item así poner opacidad 1 al boton seleccionado
		p.paginacion[item].style.opacity = 1;

		//metemos las animaciones en condiciones para seleccionar el tipo de animación
		if (p.animacionSlide == "slide") {

			//aplicamos una propiedad transition de css al objeto caja para que cambie de forma animada con una aceleración de.7s
			p.cajaSlide.style.transition = ".7s left ease-in-out";

		}
		//creamos un ciclo for para reperar todas las imaganes y ponerlas a opacidad 0
		if (p.animacionSlide == "fade") {
			//cuando damos click necesitamos que se ponga opacity a 0	
			p.imgSlide[item].style.opacity = 0;
			//cambiamos la propiedad con un transition de opacity cuando vaya a cambiar a 1
			p.imgSlide[item].style.transition = ".7s opacity ease-in-out";
			//indicamos que la imagen seleccionada "item" tenga opacidad 1 con un setTimeout despues de 500ms
			setTimeout(function() {
				p.imgSlide[item].style.opacity = 1
			}, 500);

		}
	},

	intervalo: function() {
		//generamos un setInterval para ejecutar el método m.avanzar de forma automática cada 3s
		setInterval(function() {
			//el condicional pregunta el estado de formatearLoop, si es "true" no avanza y lo pone en falso para volver
			// a contar los 3s, en su defecto ejecuta m.avanzar
			if (p.formatearLoop) {


				p.formatearLoop = false;

			} else {

				m.avanzar();
			}

		}, p.velocidadSlide)
	}


}
m.inicioSlide();