// =========================================
// 1. Custom Cursor (شكل الماوس المخصص)
// =========================================
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

// تتبع حركة الماوس
document.addEventListener('mousemove', e => { 
    mx = e.clientX; 
    my = e.clientY; 
    cur.style.left = mx + 'px'; 
    cur.style.top = my + 'px'; 
});

// تأثير الدائرة اللي بتتحرك ورا الماوس
(function loop() { 
    rx += (mx - rx) * .1; 
    ry += (my - ry) * .1; 
    ring.style.left = rx + 'px'; 
    ring.style.top = ry + 'px'; 
    requestAnimationFrame(loop); 
})();

// تكبير الماوس لما تقفي على زراير أو لينكات
document.querySelectorAll('a, button, .skc, .pc, .ach, .ji, .pfeat').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('h'); ring.classList.add('h'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('h'); ring.classList.remove('h'); });
});

// =========================================
// 2. Contact Form - Formspree Integration
// =========================================
async function send() {
    const name = document.getElementById('cn').value;
    const email = document.getElementById('ce').value;
    const subject = document.querySelector('input[placeholder="I\'d love to collaborate..."]').value;
    const message = document.querySelector('textarea').value;
    const statusMsg = document.getElementById('ok');

    if (!name || !email || !message) {
        alert('من فضلك املئ البيانات الأساسية (الاسم، الإيميل، والرسالة).');
        return;
    }

    try {
        const response = await fetch('https://formspree.io/f/xzdywgzg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        });

        if (response.ok) {
            statusMsg.innerText = " تم الإرسال بنجاح! هرد عليكي في أقرب وقت.";
            statusMsg.classList.add('show');
            
            // تفريغ الخانات بعد الإرسال
            document.getElementById('cn').value = "";
            document.getElementById('ce').value = "";
            document.querySelector('input[placeholder="I\'d love to collaborate..."]').value = "";
            document.querySelector('textarea').value = "";
            
            setTimeout(() => statusMsg.classList.remove('show'), 5000);
        } else {
            alert('حصل مشكلة في الإرسال، حاولي تاني!');
        }
    } catch (error) {
        alert('تأكدي من اتصالك بالإنترنت وحاولي تاني.');
    }
}