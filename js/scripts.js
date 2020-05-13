const randomUsersUrl = "https://randomuser.me/api/?results=12";
const gallery = document.querySelector('.gallery');

const fetchData = (url) => {
    return fetch(url)
    .then(res => checkFetchStatus(res))
    .then(res => res.json())
    .catch(error => console.error(error));
}

const checkFetchStatus = response => {

    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response.statusText);
    }
}

const createGallery = users => {

    const userArray = users.results;
    userArray.forEach(user => {

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.addEventListener('click', () => showModal(user));

        const cardImgDiv = document.createElement('div');
        cardImgDiv.className = 'card-img-container';

        const img = document.createElement('img');
        img.className = 'card-img';
        img.src = user.picture.large;
        cardImgDiv.appendChild(img);
        
        cardDiv.appendChild(cardImgDiv);

        const cardInfoDiv = document.createElement('div');
        cardInfoDiv.className = 'card-info-container';

        const nameH3 = document.createElement('h3');
        nameH3.id = 'name';
        nameH3.className = 'card-name cap';
        nameH3.innerText = `${user.name.first} ${user.name.last}`;
        cardInfoDiv.appendChild(nameH3);

        const emailP = document.createElement('p');
        emailP.className = 'card-text';
        emailP.textContent = `${user.email}`;
        cardInfoDiv.appendChild(emailP);

        const locationP = document.createElement('p');
        locationP.className = 'card-text cap';
        locationP.textContent = `${user.location.city}, ${user.location.state}`;
        cardInfoDiv.appendChild(locationP);

        cardDiv.appendChild(cardInfoDiv);

        
        gallery.appendChild(cardDiv);
   
    });

}

const createModal = () => {

    const containerDiv = document.createElement('div');
    containerDiv.className = 'modal-container';

    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'modal-close-btn';
    closeButton.className = 'modal-close-btn';
    closeButton.innerHTML = '<strong>X</strong>';
    closeButton.addEventListener('click', hideModal);
    modalDiv.appendChild(closeButton);

    const modalInfoDiv = document.createElement('div');
    modalInfoDiv.className = 'modal-info-container';

    const modalImg = document.createElement('img');
    modalImg.className = 'modal-img';
    modalImg.alt = 'profile picture';
    modalInfoDiv.appendChild(modalImg);

    const modalName = document.createElement('h3');
    modalName.id = 'name';
    modalName.className = 'modal-name cap';
    modalInfoDiv.appendChild(modalName);

    const modalEmail = document.createElement('p');
    modalEmail.className = 'modal-text';
    modalInfoDiv.appendChild(modalEmail);

    const modalCity = document.createElement('p');
    modalCity.className = 'modal-text cap';
    modalInfoDiv.appendChild(modalCity);

    const modalHr = document.createElement('hr');
    modalInfoDiv.appendChild(modalHr);

    const modalNumber = document.createElement('p');
    modalNumber.className = 'modal-text';
    modalInfoDiv.appendChild(modalNumber);

    const modalAddress = document.createElement('p');
    modalAddress.className = 'modal-text';
    modalInfoDiv.appendChild(modalAddress);

    const modalBirthday = document.createElement('p');
    modalBirthday.className = 'modal-text';
    modalInfoDiv.appendChild(modalBirthday);

    modalDiv.appendChild(modalInfoDiv);

    containerDiv.appendChild(modalDiv);

    gallery.insertAdjacentElement('afterend', containerDiv);
    hideModal();

}

const showModal = (user) => {

    console.log(user);
    document.querySelector('img.modal-img').src = user.picture.large;
    document.querySelector('h3.modal-name').innerText = `${user.name.first} ${user.name.last}`;
    const modalPElements = document.querySelectorAll('p.modal-text');

    modalPElements[0].innerText = user.email;
    modalPElements[1].innerText = user.location.city;
    modalPElements[2].innerText = user.phone;
    modalPElements[3].innerText = `${user.location.street.number} ${user.location.street.name}, ${user.location.state} ${user.location.postcode}`;
    modalPElements[4].innerText = `Birthday: ${getFormattedDate(new Date(user.dob.date))}`;

    document.querySelector('.modal-container').style.display = '';
}

const hideModal = () => {
    document.querySelector('.modal-container').style.display = 'none';
}
/** 
* This function takes a date object and returns the date in month/day/year format. Thanks to Ore4444 here: https://stackoverflow.com/a/15764763
* @param {Date} date - A date object to be converted
* @return {String} The date in month/day/year format
*/
const getFormattedDate = (date) => {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

fetchData(randomUsersUrl)
    .then(createGallery);

createModal();
