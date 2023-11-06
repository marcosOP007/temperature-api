
window.addEventListener('load', function () {
    document.getElementById('updateB').addEventListener('click', function () {
        const channelName = document.getElementById('channelName').value;
        const channelDescription = document.getElementById('channelDescription').value;
    
        fetch('/api/channels/' + 1, {
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
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    
    document.getElementById('delB').addEventListener('click', function () {
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
    });
    
});
  

