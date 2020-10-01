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

                var msg = document.getElementById("1ad58s7r1ft6s48zg4a1");
                var dataSpl = this.getAttribute('data').split(",")
                var data = "<input type='hidden' name='name' value='" + dataSpl[0] + "'>\n";
                data += "<div class='input-field'>"
                data += "    <input type='text' name='address' required>"
                data += "    <label>Address</label>"
                data += "    <span></span>"
                data += "</div>"
                data += "<input type='hidden' name='userId' value='" + dataSpl[3] + "'>\n"
                data += "<input type='hidden' name='amount' value='" + dataSpl[1] + "'>\n";
                data += "<input type='hidden' name='id' value='" + dataSpl[2] + "'>";
                msg.innerHTML = data;
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