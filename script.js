document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. GERENCIAMENTO DE COOKIES LGPD (PERSISTÊNCIA COM LOCALSTORAGE)
     ======================================================================== */
  const bannerCookies = document.getElementById('bannerCookies');
  const btnAceitar = document.getElementById('btnAceitarCookies');
  const btnRecusar = document.getElementById('btnRecusarCookies');

  if (bannerCookies) {
    const escolhaCookie = localStorage.getItem('julianaOgeda_cookies');
    if (escolhaCookie) {
      bannerCookies.classList.add('oculto');
    }

    if (btnAceitar) {
      btnAceitar.addEventListener('click', () => {
        localStorage.setItem('julianaOgeda_cookies', 'aceito');
        bannerCookies.classList.add('oculto');
      });
    }

    if (btnRecusar) {
      btnRecusar.addEventListener('click', () => {
        localStorage.setItem('julianaOgeda_cookies', 'essenciais');
        bannerCookies.classList.add('oculto');
      });
    }
  }

  /* ========================================================================
     2. SLIDER BANNER - EFEITO CARROSSEL AUTOMÁTICO E MANUAL
     ======================================================================== */
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');
  let slideAtual = 0;
  let intervaloSlider;

  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
      dot.addEventListener('click', () => irParaSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function irParaSlide(n) {
      slides[slideAtual].classList.remove('active');
      dots[slideAtual].classList.remove('active');
      slideAtual = (n + slides.length) % slides.length;
      slides[slideAtual].classList.add('active');
      dots[slideAtual].classList.add('active');
    }

    function iniciarAutoplay() {
      intervaloSlider = setInterval(() => irParaSlide(slideAtual + 1), 6000);
    }

    function reiniciarAutoplay() {
      clearInterval(intervaloSlider);
      iniciarAutoplay();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        irParaSlide(slideAtual - 1);
        reiniciarAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        irParaSlide(slideAtual + 1);
        reiniciarAutoplay();
      });
    }

    iniciarAutoplay();
  }

  /* ========================================================================
     3. CHATBOT VIRTUAL INTERATIVO (ASSISTENTE JULIANA NAILS)
     ======================================================================== */
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const quickBtns = document.querySelectorAll('.quick-btn');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('oculto');
    });

    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.add('oculto');
      });
    }
  }

  function adicionarMensagem(texto, remetente) {
    const div = document.createElement('div');
    div.classList.add('msg', remetente);
    div.innerHTML = texto;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function responderBot(perguntaTexto) {
    const texto = perguntaTexto.toLowerCase();
    let resposta = 'Para um atendimento personalizado, preencha nosso formulário acima ou clique em <strong>Agendar Horário</strong>! 🌸';

    if (texto.includes('valor') || texto.includes('preço') || texto.includes('quanto')) {
      resposta = '💎 <strong>Nossos Valores:</strong><br>• Fibra de Vidro: R$ 220,00<br>• Manutenção: R$ 150,00<br>• Esmaltação em Gel: R$ 130,00<br>• Nail Art Exclusiva: R$ 180,00';
    } else if (texto.includes('endere') || texto.includes('onde') || texto.includes('local') || texto.includes('maps')) {
      resposta = '📍 Estamos na <strong>Av. das Américas, 4200 — Lounge 104 / Estúdio 302</strong> (Barra da Tijuca). Temos manobrista no local!';
    } else if (texto.includes('hora') || texto.includes('funciona') || texto.includes('aberto')) {
      resposta = '🕒 Atendemos de <strong>Segunda a Sábado, das 09:00 às 19:00</strong>, exclusivamente com hora marcada.';
    } else if (texto.includes('agendar') || texto.includes('marcar') || texto.includes('horario')) {
      resposta = '📅 Você pode reservar agora mesmo preenchendo o formulário na seção <strong>Agendar</strong> desta página!';
    }

    setTimeout(() => adicionarMensagem(resposta, 'bot'), 400);
  }

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const label = btn.textContent;
      const chave = btn.getAttribute('data-pergunta');
      adicionarMensagem(label, 'user');
      responderBot(chave);
    });
  });

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pergunta = chatbotInput.value.trim();
      if (!pergunta) return;
      adicionarMensagem(pergunta, 'user');
      chatbotInput.value = '';
      responderBot(pergunta);
    });
  }

  /* ========================================================================
     4. FORMULÁRIO DE AGENDAMENTO -> REDIRECIONAMENTO WHATSAPP
     ======================================================================== */
  const formAgendamento = document.getElementById('formAgendamento');
  if (formAgendamento) {
    formAgendamento.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const data = document.getElementById('data').value;
      const servico = document.getElementById('servico').value;
      const periodo = document.querySelector('input[name="periodo"]:checked').value;
      const obs = document.getElementById('observacoes').value;

      const mensagem = `Olá Juliana Ogeda! Gostaria de confirmar meu pré-agendamento:%0A%0A` +
        `• *Cliente:* ${encodeURIComponent(nome)}%0A` +
        `• *WhatsApp:* ${encodeURIComponent(telefone)}%0A` +
        `• *Procedimento:* ${encodeURIComponent(servico)}%0A` +
        `• *Data:* ${encodeURIComponent(data)}%0A` +
        `• *Período:* ${encodeURIComponent(periodo)}%0A` +
        `• *Obs:* ${encodeURIComponent(obs || 'Nenhuma')}`;

      window.open(`https://api.whatsapp.com/send?phone=5521999999999&text=${mensagem}`, '_blank', 'noopener,noreferrer');
    });
  }

  /* ========================================================================
     5. DOWNLOAD DO CATÁLOGO DE PROCEDIMENTOS & PAINEL DER (FASE 4)
     ======================================================================== */
  const btnDownload = document.getElementById('btnDownloadCatalogo');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const conteudoCatalogo =
        'CATÁLOGO OFICIAL - JULIANA OGEDA NAIL DESIGNER\n' +
        'Endereço: Av. das Américas, 4200 - Lounge 104 / Estúdio 302\n' +
        '-----------------------------------------------------------\n' +
        '1. Fibra de Vidro (Primeira Aplicação): R$ 220,00 (120 min)\n' +
        '2. Manutenção Fibra de Vidro: R$ 150,00 (90 min)\n' +
        '3. Esmaltação em Gel + Blindagem: R$ 130,00 (75 min)\n' +
        '4. Nail Art Exclusiva Encapsulada: R$ 180,00 (90 min)\n' +
        '5. Spa dos Pés Relaxante: R$ 110,00 (60 min)\n' +
        '6. Combo VIP Completo: R$ 360,00\n';

      const blob = new Blob([conteudoCatalogo], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Catalogo-Juliana-Ogeda-Nails.txt';
      link.click();
    });
  }

  const btnToggleDocs = document.getElementById('btnToggleDocs');
  const painelDocs = document.getElementById('painelDocumentacao');
  if (btnToggleDocs && painelDocs) {
    btnToggleDocs.addEventListener('click', () => {
      painelDocs.classList.toggle('oculto');
    });
  }
});
