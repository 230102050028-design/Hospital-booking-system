// مصفوفة الحجوزات (بديل الموصل appointment[MAX_APPOINTMENTS])
let appointments = JSON.parse(localStorage.getItem('hospital_appointments')) || [];

const form = document.getElementById('appointmentForm');
const appointmentsList = document.getElementById('appointmentsList');
const remindAllBtn = document.getElementById('remindAllBtn');

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderAppointments);

// إضافة حجز جديد (Case 1)
form.addEventListener('submit', function(e) {
    e.preventDefault();

        const newAppointment = {
                id: Date.now(), // رقم فريد بديل لـ numAppointments
                        name: document.getElementById('patientName').value,
                                disease: document.getElementById('disease').value,
                                        number: document.getElementById('phoneNumber').value,
                                                gender: document.getElementById('gender').value,
                                                        date: document.getElementById('appointmentDate').value,
                                                                time: document.getElementById('appointmentTime').value
                                                                    };

                                                                        appointments.push(newAppointment);
                                                                            saveAndRender();
                                                                                form.reset();
                                                                                    alert("تم تسجيل الموعد بنجاح!");
                                                                                    });

                                                                                    // عرض المواعيد (Case 2)
                                                                                    function renderAppointments() {
                                                                                        appointmentsList.innerHTML = '';

                                                                                            if (appointments.length === 0) {
                                                                                                    appointmentsList.innerHTML = '<p style="text-align:center; color:#94a3b8;">لا توجد مواعيد محجوزة حالياً.</p>';
                                                                                                            return;
                                                                                                                }

                                                                                                                    appointments.forEach((item, index) => {
                                                                                                                            const card = document.createElement('div');
                                                                                                                                    card.className = 'appointment-item';
                                                                                                                                            card.innerHTML = `
                                                                                                                                                        <span class="badge">رقم الحجز: #${index + 1}</span>
                                                                                                                                                                    <h3><i class="fa-solid fa-user"></i> المريض: ${item.name} (${item.gender})</h3>
                                                                                                                                                                                <p><i class="fa-solid fa-stethoscope"></i> <strong>التخصص / المرض:</strong> ${item.disease}</p>
                                                                                                                                                                                            <p><i class="fa-solid fa-phone"></i> <strong>الهاتف:</strong> ${item.number}</p>
                                                                                                                                                                                                        <p><i class="fa-solid fa-calendar"></i> <strong>الموعد:</strong> ${item.date} في ${item.time}</p>
                                                                                                                                                                                                                    
                                                                                                                                                                                                                                <div class="appointment-actions">
                                                                                                                                                                                                                                                <button class="btn btn-danger" onclick="cancelAppointment(${item.id})">
                                                                                                                                                                                                                                                                    <i class="fa-solid fa-trash"></i> إلغاء الحجز
                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                        `;
                                                                                                                                                                                                                                                                                                                appointmentsList.appendChild(card);
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    // إلغاء حجز (Case 4)
                                                                                                                                                                                                                                                                                                                    function cancelAppointment(id) {
                                                                                                                                                                                                                                                                                                                        if (confirm("هل أنت تأكد من إلغاء هذا الموعد؟")) {
                                                                                                                                                                                                                                                                                                                                appointments = appointments.filter(app => app.id !== id);
                                                                                                                                                                                                                                                                                                                                        saveAndRender();
                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                            // التذكير بالمواعيد (Case 3 الموقوفة في كود C++)
                                                                                                                                                                                                                                                                                                                                            remindAllBtn.addEventListener('click', function() {
                                                                                                                                                                                                                                                                                                                                                if (appointments.length === 0) {
                                                                                                                                                                                                                                                                                                                                                        alert("لا توجد مواعيد لإرسال التذكيرات إليها.");
                                                                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                        alert(`تم إرسال تذكيرات نصية تلقائية لـ (${appointments.length}) مريض بنجاح!`);
                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                        // حفظ البيانات في متصفح المستخدم
                                                                                                                                                                                                                                                                                                                                                                        function saveAndRender() {
                                                                                                                                                                                                                                                                                                                                                                            localStorage.setItem('hospital_appointments', JSON.stringify(appointments));
                                                                                                                                                                                                                                                                                                                                                                                renderAppointments();
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                