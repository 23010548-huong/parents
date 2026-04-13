// chat.js - Chat specific logic

let activeChatId = null;

export function renderChatPage(student) {
    const contactList = document.getElementById('chatContactList');
    if (!contactList) return;
    contactList.innerHTML = '';
    
    if (!student.teachers || student.teachers.length === 0) {
        contactList.innerHTML = '<div style="padding:15px">Chưa có liên hệ</div>';
        return;
    }

    student.teachers.forEach(t => {
        const item = document.createElement('div');
        item.className = 'contact-item' + (activeChatId === t.id ? ' active' : '');
        item.onclick = () => {
            activeChatId = t.id;
            renderChatPage(student);
            renderChatHistory(student, t.id);
        };
        
        item.innerHTML = `
            <div class="avatar-sm ${t.color}">${t.avatar}</div>
            <div class="contact-info">
                <h4>${t.name}</h4>
                <p>${t.role}</p>
            </div>
            <div class="contact-status">
                <span class="time">${t.lastActive}</span>
            </div>
        `;
        contactList.appendChild(item);
    });

    // Auto-select first contact if none active
    if (!activeChatId && student.teachers.length > 0) {
        activeChatId = student.teachers[0].id;
        renderChatHistory(student, activeChatId);
        contactList.children[0].classList.add('active');
    }
}

function renderChatHistory(student, teacherId) {
    const chatContainer = document.getElementById('chatMessages');
    if (!chatContainer) return;
    
    const teacher = student.teachers.find(t => t.id === teacherId);
    const messages = student.chatHistory[teacherId] || [];
    
    document.getElementById('activeTeacherName').innerText = teacher.name;
    document.getElementById('activeTeacherRole').innerText = teacher.role;
    
    chatContainer.innerHTML = '';
    messages.forEach(msg => {
        if (msg.type === 'sys') {
            chatContainer.insertAdjacentHTML('beforeend', `<div class="chat-time"><span>${msg.text}</span></div>`);
        } else {
            chatContainer.insertAdjacentHTML('beforeend', `
                <div class="message ${msg.type}">
                    <div class="message-bubble">${msg.text}</div>
                </div>
            `);
        }
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

