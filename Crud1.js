const form = document.getElementById('formRegister');
const nameinput = document.getElementById('nameinput');
const IDinput = document.getElementById('IDinput');
const tablebody = document.getElementById('tablebody');
let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function(event){
    event.preventDefault();
    const name = nameinput.value;
    const ID = IDinput.value;

    if(name && ID){
        const newData = {name,ID};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else {
        alert('Favor llenar todos los campos');
    }
});

function saveDataToLocalStorage(){
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable(){
    tablebody.innerHTML = '';

    data.forEach(function(item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const IDCell = document.createElement('td');
        const dateTimeCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');

        nameCell.textContent = item.name;
        IDCell.textContent = item.ID;
        
        // Obtener la fecha y hora actual
        const currentDateTime = new Date();
        const formattedDateTime = currentDateTime.toLocaleString('es-ES');

        // Agregar la fecha y hora actual a la celda correspondiente
        dateTimeCell.textContent = formattedDateTime;

        editButton.textContent = 'Editar';
        editButton.classList.add('button', 'button--secundary');

        editButton.addEventListener('click', function(){
            editData(index);
        });

        actionCell.appendChild(editButton);
        row.appendChild(nameCell);
        row.appendChild(IDCell);
        row.appendChild(dateTimeCell); // Agregar la celda de fecha y hora a la fila
        row.appendChild(actionCell);
        tablebody.appendChild(row);
    });
}

function editData(index){
    const item = data[index];
    nameinput.value = item.name;
    IDinput.value = item.ID;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();




