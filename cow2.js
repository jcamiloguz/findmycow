const getInfo = async () => {
  try {
    let temp = await fetch(
      `https://things.ubidots.com/api/v1.6/devices/cowid_2/temperatura/values/?token=BBFF-D3X7Du3eCREwwHa5G8FVypLYmhXO55`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let humd = await fetch(
      `https://things.ubidots.com/api/v1.6/devices/cowid_2/humedad/values/?token=BBFF-D3X7Du3eCREwwHa5G8FVypLYmhXO55`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let lat = await fetch(
      `https://things.ubidots.com/api/v1.6/devices/cowid_2/lat/values/?token=BBFF-D3X7Du3eCREwwHa5G8FVypLYmhXO55`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let long = await fetch(
      `https://things.ubidots.com/api/v1.6/devices/cowid_2/long/values/?token=BBFF-D3X7Du3eCREwwHa5G8FVypLYmhXO55`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let alertTemp = await fetch(
      `https://things.ubidots.com/api/v1.6/devices/cowid_2/temp-alert/values/?token=BBFF-D3X7Du3eCREwwHa5G8FVypLYmhXO55`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let alertHum = await fetch(
      `https://things.ubidots.com/api/v1.6/devices/cowid_2/hum-alert/values/?token=BBFF-D3X7Du3eCREwwHa5G8FVypLYmhXO55`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const tempjson = await temp.json()
    const humejson = await humd.json()
    const latjson = await lat.json()
    const longjson = await long.json()
    const alertHumjson = await alertHum.json()
    const alertTempjson = await alertTemp.json()
    console.log(tempjson)
    console.log(humejson)
    console.log(latjson)
    console.log(longjson)
    console.log(alertHumjson)
    console.log(alertTempjson)
    document.getElementById('cow').innerHTML = `
		<div class="menu">

		<a href="./index.html">Volver</a>
	</div>
		<div class="cow-state"> <h2>Estado de tu vaca:</h2>
		<p> Temperatura
		 ${
       alertTempjson.results[0].value === 0
         ? '<span>Tu vaca tiene un buena temperatura 🌡🐮</span>'
         : '<span>tu vaca tiene una temperatura muy alta podria tener fiebre 🔥💊</span>'
     }
		</p>
		<p> Humedad
		 ${
       alertHumjson.results[0].value === 0
         ? '<span>Tu vaca tiene una humedad aceptable 🐮</span>'
         : '<span>tu vaca tiene una alta humedad podri tener un virus 💦💊</span>'
     }
		</p>
		<p> Ubicacion
		 ${
       latjson.results[0].value < 3 && longjson.results[0].value > -61
         ? '<span>Tu vaca se encuentra en su resinto 🐮</span>'
         : '<span>tu vaca no se encuentra en su resinto 🆘</span>'
     }
		</p>
		<div class="map">
		<iframe src="https://www.google.com/maps/embed/v1/place
		?key=AIzaSyBC9qr456dF_UWRtj6joKqoqzxf8EAal-Q&zoom=7&maptype=satellite
		&q=${latjson.results[0].value + ',' + longjson.results[0].value}" ></iframe>
		</div>
		</div>
		<h2>Informacion cruda</h2>
		<div class="cow-state-raw">
		<div className="Temp">
		<h2>Temperatura</h2>
		<ul>
		${tempjson.results.map((temp) => `<li>${temp.value} c</li>`)}
		</ul>
		</div>
		<div className="humedad">
		<h2>Humedad</h2>
		<ul>
		${humejson.results.map((hume) => `<li>${hume.value} </li>`)}
		</ul>
		
		</div>
		<div className="lat">
		<h2>Latitud</h2>
		<ul>
		${latjson.results.map((lat) => `<li>${lat.value} </li>`)}
		</ul>
		
		</div>
		<div className="long">
		<h2>Longitud</h2>
		<ul>
		${longjson.results.map((long) => `<li>${long.value} </li>`)}
		</ul>
		</div>
		
		</div>


		`
  } catch (e) {
    console.log(e)
  }
}
getInfo()
