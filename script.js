const input = document.getElementById('input');
const output = document.getElementById('output');

const commands = {
  help: `
  Danh sách lệnh:
  - whoami
  - skills
  - projects
  - love
  - clear
  `,
  whoami: 'Trần Cao Anh Võ - IT Student @ CTU',
  skills: `Python (Tensorflow, Pandas, Numpy)\nC, PHP, SQL\nLinux (Ubuntu, Arch)`,
  projects: `ctbot - Chatbot học vụ\nCmdBot - Trình thông dịch đơn giản\nTerminal Web này 😈`,
  love: `Tên: Thương\nRole: Vợ yêu bé bỏng 😳\nTình trạng: Đã trao tim 💖`,
};

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    output.innerHTML += `<div><span class="prompt">anhvo@ctu:~$</span> ${cmd}</div>`;

    if (cmd === 'clear') {
      output.innerHTML = '';
    } else if (commands[cmd]) {
      output.innerHTML += `<div>${commands[cmd].replace(/\n/g, '<br>')}</div>`;
    } else {
      output.innerHTML += `<div>Command not found: ${cmd}</div>`;
    }

    input.value = '';
    window.scrollTo(0, document.body.scrollHeight);
  }
});
