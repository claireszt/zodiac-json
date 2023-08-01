const getZodiacSign = (day, month) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return "Aries";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return "Taurus";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return "Gemini";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return "Cancer";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return "Leo";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return "Virgo";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return "Libra";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return "Scorpio";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return "Sagittarius";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return "Capricorn";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return "Aquarius";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return "Pisces";
    } else {
      return "Invalid date of birth";
    }
  }

async function getZodiacInfo() {
    try {
      const response = await fetch('zodiac.json');
      const data = await response.json();
      return data.zodiacSigns;
    } catch (error) {
      console.error('Error fetching zodiac data:', error);
      return null;
    }
  }
  
  async function printZodiacInfo(zodiacSignName) {
    const zodiacInfo = await getZodiacInfo();
    if (zodiacInfo) {
      const sign = zodiacInfo.find(sign => sign.name.toLowerCase() === zodiacSignName.toLowerCase());
      if (sign) {

        document.querySelector('.signInfo').innerHTML = `<div class="infoBlock"><p class="infoTitle">ELEMENT</p><div id="signElement" class="infoDiv"><img id="elementImg" class="infoImg" src="images/elements/${sign.element}.png"><p id="elementTxt" class="infoTxt">${sign.element}</p></div></div>`
        document.querySelector('.signInfo').innerHTML += `<div class="infoBlock"><p class="infoTitle">PLANET</p><div id="signPlanet" class="infoDiv"><img id="planetImg" class="infoImg" src="images/planets/${sign.planet}.png"><p id="planetTxt" class="infoTxt">${sign.element}</p></div></div>`
        document.querySelector('.signInfo').innerHTML += `<div class="infoBlock"><p class="infoTitle">STONE</p><div id="signStone" class="infoDiv"><img id="stoneImg" src="images/stones/${sign.stone}.png"><p id="stoneTxt" class="infoTxt">${sign.stone}</p></div></div>`


        document.querySelector('#planetImg').src = `images/planets/${sign.planet}.png`
        document.querySelector('#planetTxt').innerHTML = `${sign.planet}`


        document.querySelector('#qualitiesTxt').innerHTML = `${sign.qualities.join(`<br>`)}`
        document.querySelector('#defaultsTxt').innerHTML = `${sign.defaults.join(`<br>`)}`

        document.querySelector('#signSummary').innerHTML = sign.summary

        document.querySelector('.famousPeople').innerHTML = ''

        for (let i = 0 ; i < sign.famousPeople.length ; i++) {
          document.querySelector('.famousPeople').innerHTML += `<div class="infoBlock"><p class="famousName">${sign.famousPeople[i].name}</p><div id="famousPerson" class="infoDiv"><img class="famousImg" src="images/people/${sign.famousPeople[i].name.replace(/\s/g,'')}.png"><p class="famousBirthdate">${sign.famousPeople[i].birthday}</p></div></div>`
        }

      } else {
        console.log("Zodiac sign not found.");
      }
    }
  }
  
  const birthdateUser = () => {
    let day = Number(document.querySelector('#dob-day').value)
    let month = Number(document.querySelector('#dob-month').value)

    const zodiacSign = getZodiacSign(day, month)

    document.querySelector('#signTxt').innerHTML = zodiacSign
    document.querySelector('#signImg').src = `images/signs/${zodiacSign}.png`
    printZodiacInfo(zodiacSign)
    getHoroscope(zodiacSign)
}  


const getHoroscope = async (sign) => {
    const url = `https://daily-horoscope-api.p.rapidapi.com/api/Daily-Horoscope-English/?zodiacSign=${sign}&timePeriod=today`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '908e1d5eb2mshc87084789b2ee77p13dcb3jsne6ebff2d7301',
        'X-RapidAPI-Host': 'daily-horoscope-api.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
}