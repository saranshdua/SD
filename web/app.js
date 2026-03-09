(function () {

  /* ── Category data ── */
  const CATEGORIES = [
    {
      emoji: '🗺️',
      name: 'Journeys',
      desc: 'Program structure & progression',
      questions: [
        'What journeys exist in Fabulous?',
        'How long is each journey?',
        'What\'s the first journey everyone starts with?',
      ],
    },
    {
      emoji: '🧠',
      name: 'Behavioral Science',
      desc: 'Frameworks behind habit formation',
      questions: [
        'What behavioral frameworks does Fabulous use?',
        'How does the habit loop work?',
        'What is keystone habit stacking?',
      ],
    },
    {
      emoji: '🚪',
      name: 'Onboarding',
      desc: 'How new users get started',
      questions: [
        'What questions does Fabulous ask during onboarding?',
        'How does the commitment contract work?',
        'How long does onboarding take?',
      ],
    },
    {
      emoji: '🏆',
      name: 'Engagement & Rewards',
      desc: 'Streaks, animations, notifications',
      questions: [
        'How do streaks work?',
        'What celebration mechanics exist?',
        'How are notifications designed?',
      ],
    },
    {
      emoji: '💰',
      name: 'Pricing',
      desc: 'Free vs Premium, conversion',
      questions: [
        'What does Premium cost?',
        'When does the paywall appear?',
        'What\'s included in the free version?',
      ],
    },
    {
      emoji: '🎨',
      name: 'Design System',
      desc: 'Colors, typography, UI patterns',
      questions: [
        'What colors does Fabulous use?',
        'What is the visual style of the app?',
        'What are the key UI patterns?',
      ],
    },
    {
      emoji: '👥',
      name: 'Community',
      desc: 'Circles, challenges, A-Team',
      questions: [
        'What are Circles?',
        'How does the A-Team work?',
        'What challenges exist?',
      ],
    },
    {
      emoji: '⚠️',
      name: 'Dark Patterns',
      desc: 'What to avoid when building',
      questions: [
        'What dark patterns does Fabulous use?',
        'Which dark patterns are most severe?',
        'How do you build a habit app ethically?',
      ],
    },
  ];

  /* ── DOM refs ── */
  const form       = document.getElementById('ask-form');
  const questionEl = document.getElementById('question');
  const submitBtn  = document.getElementById('submit-btn');
  const answerWrap = document.getElementById('answer-wrap');
  const answerBody = document.getElementById('answer-body');
  const errorWrap  = document.getElementById('error-wrap');
  const errorBody  = document.getElementById('error-body');
  const loading    = document.getElementById('loading');
  const grid       = document.getElementById('category-grid');

  if (!form || !questionEl || !grid) return;

  /* ── Render category cards ── */
  let activeCard = null;

  CATEGORIES.forEach(function (cat) {
    // Card
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML =
      '<div class="cat-header">' +
        '<span class="cat-emoji">' + cat.emoji + '</span>' +
        '<span class="cat-name">'  + cat.name  + '</span>' +
      '</div>' +
      '<div class="cat-desc">' + cat.desc + '</div>';

    // Suggestions container
    const sugs = document.createElement('div');
    sugs.className = 'suggestions';

    cat.questions.forEach(function (q) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = q;
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        questionEl.value = q;
        questionEl.focus();
        // Scroll ask box into view
        questionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      sugs.appendChild(chip);
    });

    card.appendChild(sugs);

    // Toggle on card click
    card.addEventListener('click', function () {
      const isOpen = sugs.classList.contains('open');
      // Close previously active
      if (activeCard && activeCard !== card) {
        activeCard.classList.remove('active');
        activeCard.querySelector('.suggestions').classList.remove('open');
      }
      sugs.classList.toggle('open', !isOpen);
      card.classList.toggle('active', !isOpen);
      activeCard = !isOpen ? card : null;
    });

    grid.appendChild(card);
  });

  /* ── Ask form ── */
  function setLoading(on) {
    loading.hidden = !on;
    submitBtn.disabled = on;
    if (on) {
      answerWrap.hidden = true;
      errorWrap.hidden  = true;
    }
  }

  function showError(msg) {
    errorBody.textContent = msg;
    errorWrap.hidden  = false;
    answerWrap.hidden = true;
  }

  function showAnswer(text) {
    errorWrap.hidden = true;
    answerBody.innerHTML = typeof marked !== 'undefined'
      ? marked.parse(text || '')
      : (text || '').replace(/\n/g, '<br>');
    answerWrap.hidden = false;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const question = questionEl.value.trim();
    if (!question) return;

    setLoading(true);
    try {
      const res  = await fetch(window.location.origin + '/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json().catch(function () {
        return { error: 'Invalid response from server.' };
      });

      if (!res.ok) {
        showError(data.error || 'Something went wrong.');
        return;
      }
      showAnswer(data.answer || '');
    } catch (err) {
      showError(err.message || 'Network error. Run "vercel dev" so /api/ask is available.');
    } finally {
      setLoading(false);
    }
  });

})();
