var vid;
const s = document.querySelectorAll('#btn-messge');
let bool = true;

s.forEach(btn => {
    btn.addEventListener('click', function() {
        vid = this.getAttribute('data-id');
        if (bool) {
            try {

                document.querySelector("#" + vid).style.display = 'block';
                vid = "#" + vid;

                setTimeout(() => {
                    document.querySelector(vid + ' .messge-btn').classList.add('active');
                    document.querySelector(vid).classList.add('active');
                }, 0);
                document.querySelector('body').classList.add('none');

                bool = false;
            } catch (error) {
                throw new Error('id ' + vid + ' is null !!\n' + error);
            }

        }

    });
});


const button = document.querySelectorAll('#clous');
button.forEach(btn => {

    btn.addEventListener('click', function() {
        try {
            document.querySelector(vid + ' .messge-btn').classList.remove('active');
            document.querySelector(vid).classList.remove('active');
            setTimeout(() => {
                document.querySelector(vid).style.display = 'none';
                document.querySelector('body').classList.remove('none');
            }, 500);
            bool = true;
            //document.write(this.getAttribute('class'));
        } catch (error) {
            throw new Error('id ' + vid + ' is null !!');
        }
    })

})