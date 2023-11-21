

function  update(id) {
    const channelName = document.getElementById('channelName').value;
    const channelDescription = document.getElementById('channelDescription').value;

    fetch('/api/channels/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: channelName,
            description: channelDescription,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Atualizado com sucesso')
    })
    .catch((error) => {
        alert('Erro ao atualizar')
        console.error('Error:', error);
    });
}
    
function del() {
    fetch('api/channel/' + 1, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
    

  

