import $ from 'jquery';
import Chat from './Chat';

const $log = $('#log');
const $input = $('#message');
const name = 'Lexy';
let type;
$('#sendBtn').on('click', sendMessage);

const talk = new Chat({
    name,
    type,
    onmessage: addLog
})

function addLog(message) {
    $log.append(
        `<div class="${message.type}">${message.name}: ${message.message}</div>`
    );
}

function sendMessage() {
    const message = $input.val();
    talk.message(name, type, message);
    $input.val('');
}  