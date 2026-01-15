    let patients = [];

    function addPatient() {
        const nameInput = document.getElementById('patientName');
        const rateInput = document.getElementById('hourlyRate');
        const daysInput = document.getElementById('daysPerWeek');

        const name = nameInput.value || `Paciente ${patients.length + 1}`;
        const rate = parseFloat(rateInput.value);
        const days = parseInt(daysInput.value);

        if (isNaN(rate) || isNaN(days)) {
            alert("Por favor, preencha o valor por hora e os dias por semana corretamente.");
            return;
        }

        // Cálculo: (valor * 2h) * diasSemana * 4 semanas
        const monthlyValue = (rate * 2) * days * 4;

        const patient = {
            id: Date.now(),
            name: name,
            rate: rate,
            days: days,
            monthlyValue: monthlyValue
        };

        patients.push(patient);
        updateUI();

        // Limpar campos
        nameInput.value = '';
        rateInput.value = '';
        daysInput.value = '';
        nameInput.focus();
    }

    function removePatient(id) {
        patients = patients.filter(p => p.id !== id);
        updateUI();
    }

    function updateUI() {
        const listElement = document.getElementById('patientList');
        const totalElement = document.getElementById('totalValue');
        
        listElement.innerHTML = '';
        let total = 0;

        patients.forEach(p => {
            total += p.monthlyValue;
            
            const div = document.createElement('div');
            div.className = 'patient-item';
            div.innerHTML = `
                <div>
                    <strong>${p.name}</strong><br>
                    <small>R$ ${p.rate.toFixed(2)}/h | ${p.days}x na semana</small>
                </div>
                <div>
                    <span>R$ ${p.monthlyValue.toFixed(2)}</span>
                    <button class="btn-remove" onclick="removePatient(${p.id})" style="margin-left: 10px; padding: 5px 10px;">×</button>
                </div>
            `;
            listElement.appendChild(div);
        });

        totalElement.innerText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }