const form = document.getElementById('form');
const btnReset = document.getElementById('btn-reset');
const inputs = document.getElementsByClassName('form-control');

const facts = document.getElementById('facts');
const response = document.getElementById('response');
const perim = document.getElementById('perimeter');
const semiPerim = document.getElementById('semiperimeter');
const area = document.getElementById('area');


for (var i = 0; i < inputs.length; i++) {
  // Checking if the user has written anything in the input fields
  inputs[i].addEventListener('input', () => {
    let l1 = document.getElementById('length1').value;
    let l2 = document.getElementById('length2').value;
    let l3 = document.getElementById('length3').value;

    // Check if any of the values are empty or if any of them are not floats
    if (l1 === '' || l2 === '' || l3 === '' || !isPosFloat(l1) || !isPosFloat(l2) || !isPosFloat(l3)) {
      response.innerHTML = `Your need to fill out all the lengths in order to determine the triangle type.
                              <br/> You can only insert positive numbers (decimals are also allowed).`;
      response.className = 'alert alert-warning';
      facts.removeAttribute('class');
    } else {
        // Once all the fields have been filled out correctly, we can determine the triangle type
        let triangleType = calcTriangleType(l1, l2, l3);
        response.innerHTML = 'Your triangle is ' + triangleType;
        response.className = 'alert alert-success';

        // Calculating extra details about the triangle
        perim.innerHTML = calcPerim(l1,l2,l3) + ' cm';
        semiPerim.innerHTML = calcSemiPerim(l1,l2,l3) + ' cm';
        let a = calcArea(l1,l2,l3);
        // Don't add the measurment unit if the area isNaN
        area.innerHTML = isNaN(a) ? a : a + ' cm<sup>2</sup>';
        facts.classList.add('visible');
    }
  });
}

// Add the posibility to reset everything to the initial state
btnReset.addEventListener('click', () => {
  form.reset();
  response.innerHTML = '';
  response.removeAttribute('class');
  facts.removeAttribute('class');
})

// Function that determines if the value is a positive number
let isPosFloat = (val) => {
  return parseFloat(val) && val > 0;
}

// Function that determines the type of triangle, based on the lengths of the 3 sides
let calcTriangleType = (l1, l2, l3) => {
  if(l1 === l2 && l2 === l3) {
    return 'equilateral';
  } else if (l1 === l2 || l2 === l3 || l1 === l3) {
    return 'isosceles';
  } else {
    return 'scalene';
  }
}

// Function that calculates the perimeter of the triangle
let calcPerim = (l1, l2, l3) => {
  return parseFloat(l1) + parseFloat(l2) + parseFloat(l3);
}

// Function that calculates the semiperimeter of the triangle
let calcSemiPerim = (l1, l2, l3) => {
  return calcPerim(l1, l2, l3) / 2;
}

// Function that calculates the area of the triangle (based on the lengths of the sides)
let calcArea = (l1, l2, l3) => {
  const s = calcSemiPerim(l1, l2, l3);
  let area = Math.sqrt(s * (s - l1) * (s - l2) * (s - l3));
  // If there are decimal places, return the area showing only 2 decimals
  if(area % 1 !== 0) {
    return area.toFixed(2);
  }
  // If there are no decimals, just return the area as it is
  return area;
}
