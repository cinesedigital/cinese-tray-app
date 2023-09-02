const body = document.querySelector('body');
const btn = $(`<button class="mic__button"><svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve" width="50" height="50"><circle cx="128" cy="128" r="22" data-circle=""></circle><g data-mic=""><path d="M173,123.1c0-2.7-2.2-4.8-4.8-4.8s-4.8,2.2-4.8,4.8c0,19.6-15.9,35.5-35.5,35.5s-35.5-15.9-35.5-35.5
c0-2.7-2.2-4.8-4.8-4.8s-4.8,2.2-4.8,4.8c0,23.3,17.7,42.4,40.3,44.8v20.2h-11.4c-2.7,0-4.8,2.2-4.8,4.8c0,2.7,2.2,4.8,4.8,4.8
h32.4c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8h-11.4v-20.2C155.3,165.5,173,146.3,173,123.1z"></path><path d="M127.9,152.3c16,0,29-13,29-29V87c0-16-13-29-29-29c-16-0.1-29.1,13-29.1,29v36.3C98.8,139.2,111.9,152.3,127.9,152.3z"></path></g></svg></button>`)
btn.css('position', 'fixed');
btn.css('bottom', '35px');
btn.css('right', '35px');
btn.css('background', '#FFF');
btn.css('border-radius', '100%');
$('body').append(btn);
const btnSearch = jQuery(".mic__button");
const input = jQuery('[name="palavra_busca"]');
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    input.addClass("mic_support");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.onstart = function() {
        const mic = $("[data-mic]");
        const circle = $("[data-circle]");
        mic.addClass("micActive");
        circle.addClass("micActiveBg");
        input.attr('placeholder', 'Fale Agora!');
    };

    recognition.onresult = function(event) {
        const currentTranscript = event.results[0][0].transcript;
        
        
        const form = document.querySelector("[data-search]");

        input.val(currentTranscript);
        form.submit();
    };

    recognition.onerror = function(event) {
        console.error('Erro na transcrição:', event.error);
    };

    recognition.onend = function() {
        const mic = $("[data-mic]");
        const circle = $("[data-circle]");
        circle.removeClass("micActiveBg");
        mic.removeClass("micActive");
        input.attr('placeholder', 'O que deseja Procurar?');
    };

    btnSearch.on('click', (e) => {
        e.preventDefault();
        recognition.start();
    })
    } else {
    input.addClass("mic_not_support")
    console.error('A API de reconhecimento de fala não é suportada pelo seu navegador.');
    }

    
