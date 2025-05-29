const input = document.getElementsById('searchbar');
        
        input.addEventListener('keydown', function(event) {
            if (event.keyCode === 'enter') {
                console.log('enter pressionado')
            }
        })