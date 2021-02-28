
/***
  * mocker-data-generator creates random data for testing
***/
const mocker = require('mocker-data-generator').default;
const fs = require('fs');

/***
  * path - output for generated file
  * amount - number of generated objects
  * phraseLength - number of words for phrase property
  * images - array of all available images
***/
const config = {
  path: './public/data.json',
  amount: 50,
  phraseLength: 25,
  images: ['cat', 'dog', 'fox', 'koala', 'lion', 'owl', 'penguin', 'pig', 'raccoon', 'sheep']
};

const { path, amount, phraseLength, images } = config;

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const user = {
  id: {
    faker: 'random.uuid'
  },
  name: {
    faker: 'name.findName'
  },
  age: {
    faker: 'random.number({"min": 18, "max": 99})'
  },
  phone: {
    faker: 'phone.phoneNumber(###-###-##-##)'
  },
  image: {
    function: () => images[randomInRange(0, images.length)]
  },
  phrase: {
    faker: `lorem.words(${phraseLength})`
  }
}

mocker()
  .schema('user', user, amount)
  .build()
  .then(
    data => {
      const json = JSON.stringify(data.user);
      fs.writeFile(path, json, 'utf8', (err) => {
        if (err) console.log(err.message)
        else console.log('Data generated successfully');
      });
      
    },
    err => console.error(err)
  )