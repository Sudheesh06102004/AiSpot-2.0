/* ============================================================
   AiSpot - script.js
   This file has 3 parts:
   1. DATA        - the list of categories and tools
   2. STATE       - what the user has currently selected
   3. FUNCTIONS   - code that draws the page and reacts to clicks
   ============================================================ */


/* ---------------- 1. DATA ---------------- */

// Every category shown in the left sidebar
const categories = [
  { id: 'chatbots',     name: 'Chatbots' },
  { id: 'video',        name: 'Video Editing' },
  { id: 'photo',        name: 'Photo Editing' },
  { id: 'writing',      name: 'Writing & Copy' },
  { id: 'image-gen',    name: 'Image Generation' },
  { id: 'voice',        name: 'Voice & Audio' },
  { id: 'code',         name: 'Code & Dev' },
  { id: 'productivity', name: 'Productivity' }
];

// Every tool in the directory
const tools = [
  { id: 't1',  name: 'Claude',         category: 'chatbots',     description: 'A general-purpose chat assistant for writing, analysis, coding, and everyday questions.', url: 'https://claude.ai',                       color: '#FF6B35' },
  { id: 't2',  name: 'ChatGPT',        category: 'chatbots',     description: 'A widely used conversational assistant for answering questions and drafting text.',        url: 'https://chat.openai.com',                  color: '#7C6CFF' },
  { id: 't3',  name: 'Perplexity',     category: 'chatbots',     description: 'A search-style chat assistant that answers questions with cited sources.',                 url: 'https://perplexity.ai',                    color: '#3AA1B0' },
  { id: 't4',  name: 'Runway',         category: 'video',        description: 'Generate and edit video with AI, including text-to-video and green-screen tools.',        url: 'https://runwayml.com',                     color: '#FF6B35' },
  { id: 't5',  name: 'CapCut',         category: 'video',        description: 'An easy video editor with AI captions and templates for short-form content.',             url: 'https://capcut.com',                       color: '#7C6CFF' },
  { id: 't6',  name: 'Descript',       category: 'video',        description: 'Edit video and podcasts by editing the transcript instead of a timeline.',                url: 'https://descript.com',                     color: '#3AA1B0' },
  { id: 't7',  name: 'Photoroom',      category: 'photo',        description: 'Remove backgrounds and create clean product photos in a couple of taps.',                 url: 'https://photoroom.com',                    color: '#FF6B35' },
  { id: 't8',  name: 'Remini',         category: 'photo',        description: 'Sharpen blurry or old photos and restore facial detail with AI upscaling.',                url: 'https://remini.ai',                        color: '#7C6CFF' },
  { id: 't9',  name: 'Luminar Neo',    category: 'photo',        description: 'A desktop photo editor with AI sky replacement and portrait retouching.',                  url: 'https://skylum.com/luminar',               color: '#3AA1B0' },
  { id: 't10', name: 'Jasper',         category: 'writing',      description: 'Generate marketing copy, blog drafts, and ad variations for your brand.',                 url: 'https://jasper.ai',                        color: '#FF6B35' },
  { id: 't11', name: 'Grammarly',      category: 'writing',      description: 'Checks grammar, clarity, and tone as you write, with rewrite suggestions.',                url: 'https://grammarly.com',                    color: '#7C6CFF' },
  { id: 't12', name: 'Notion AI',      category: 'writing',      description: 'Draft, summarize, and edit text directly inside your Notion pages.',                      url: 'https://notion.so',                        color: '#3AA1B0' },
  { id: 't13', name: 'Midjourney',     category: 'image-gen',    description: 'Generate detailed, stylized images from a simple text prompt.',                           url: 'https://midjourney.com',                   color: '#FF6B35' },
  { id: 't14', name: 'Ideogram',       category: 'image-gen',    description: 'A text-to-image generator known for rendering clean, readable text.',                     url: 'https://ideogram.ai',                      color: '#7C6CFF' },
  { id: 't15', name: 'Leonardo AI',    category: 'image-gen',    description: 'Generate images with fine-tuned models for consistent characters.',                       url: 'https://leonardo.ai',                      color: '#3AA1B0' },
  { id: 't16', name: 'ElevenLabs',     category: 'voice',        description: 'Turn text into realistic speech, or clone a voice for narration.',                       url: 'https://elevenlabs.io',                    color: '#FF6B35' },
  { id: 't17', name: 'Suno',           category: 'voice',        description: 'Generate full songs, including vocals and music, from a text prompt.',                    url: 'https://suno.com',                         color: '#7C6CFF' },
  { id: 't18', name: 'Otter.ai',       category: 'voice',        description: 'Transcribes meetings in real time and summarizes them into notes.',                       url: 'https://otter.ai',                         color: '#3AA1B0' },
  { id: 't19', name: 'GitHub Copilot', category: 'code',         description: 'Suggests code completions and whole functions as you type.',                             url: 'https://github.com/features/copilot',      color: '#FF6B35' },
  { id: 't20', name: 'Cursor',         category: 'code',         description: 'A code editor built around AI chat and codebase-aware suggestions.',                     url: 'https://cursor.sh',                        color: '#7C6CFF' },
  { id: 't21', name: 'Replit AI',      category: 'code',         description: 'Write, run, and deploy small apps with AI help in the browser.',                          url: 'https://replit.com',                       color: '#3AA1B0' },
  { id: 't22', name: 'Motion',         category: 'productivity', description: 'Automatically schedules your tasks and meetings into your calendar.',                    url: 'https://usemotion.com',                    color: '#FF6B35' },
  { id: 't23', name: 'Reclaim.ai',     category: 'productivity', description: 'Protects focus time and reschedules habits automatically around meetings.',               url: 'https://reclaim.ai',                       color: '#7C6CFF' },
  { id: 't24', name: 'Mem',            category: 'productivity', description: 'A notes app that automatically connects related notes as you write.',                    url: 'https://mem.ai',                           color: '#3AA1B0' }
];


/* ---------------- 2. STATE ---------------- */
// This object remembers what the user has picked right now
let currentCategory = 'all';   // which category is selected ('all' = show everything)
let currentSearch = '';        // what's typed in the search box
let savedToolIds = [];         // list of tool ids the user has starred


/* ---------------- 3. FUNCTIONS ---------------- */

// Get the display name for a category id
function getCategoryName(categoryId) {
  const found = categories.find(function (c) { return c.id === categoryId; });
  return found ? found.name : categoryId;
}

// Return only the tools that match the current category + search text
function getFilteredTools() {
  return tools.filter(function (tool) {
    const matchesCategory = currentCategory === 'all' || tool.category === currentCategory;
    const matchesSearch = tool.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

// Build the sidebar list of categories (desktop) + chip bar (mobile)
function renderCategoryList() {
  const container = document.getElementById('categoryList');
  const mobileContainer = document.getElementById('categoryListMobile');

  let sidebarHtml = '<button class="category-btn text-left px-3 py-2 rounded-lg text-sm ' +
             (currentCategory === 'all' ? 'active' : '') + '" data-category="all">All tools</button>';
  let chipHtml = '<button class="category-chip px-3 py-2 rounded-full text-sm ' +
             (currentCategory === 'all' ? 'active' : '') + '" data-category="all">All tools</button>';

  categories.forEach(function (category) {
    const isActive = currentCategory === category.id ? 'active' : '';
    sidebarHtml += '<button class="category-btn text-left px-3 py-2 rounded-lg text-sm ' + isActive +
            '" data-category="' + category.id + '">' + category.name + '</button>';
    chipHtml += '<button class="category-chip px-3 py-2 rounded-full text-sm ' + isActive +
            '" data-category="' + category.id + '">' + category.name + '</button>';
  });

  container.innerHTML = sidebarHtml;
  mobileContainer.innerHTML = chipHtml;

  // Make each category button clickable (both desktop and mobile copies)
  [container, mobileContainer].forEach(function (list) {
    list.querySelectorAll('[data-category]').forEach(function (button) {
      button.addEventListener('click', function () {
        currentCategory = button.dataset.category;
        renderCategoryList();
        renderToolGrid();
      });
    });
  });
}

// Build one tool card's HTML
function buildToolCardHtml(tool) {
  const initials = tool.name.substring(0, 2).toUpperCase();
  const isSaved = savedToolIds.includes(tool.id);

  return (
    '<button class="tool-card text-left bg-slate-800 border border-slate-700 rounded-xl p-3 sm:p-4 hover:border-orange-500" data-id="' + tool.id + '">' +
      '<div class="flex items-center gap-3 mb-3">' +
        '<div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-slate-900" style="background:' + tool.color + '">' + initials + '</div>' +
        '<div>' +
          '<h3 class="font-semibold">' + tool.name + '</h3>' +
          '<p class="text-xs text-slate-400">' + getCategoryName(tool.category) + '</p>' +
        '</div>' +
      '</div>' +
      '<p class="text-sm text-slate-400 mb-3">' + tool.description + '</p>' +
      '<span class="save-icon text-lg ' + (isSaved ? 'text-orange-400' : 'text-slate-500') + '" data-save-id="' + tool.id + '">' + (isSaved ? '★' : '☆') + '</span>' +
    '</button>'
  );
}

// Draw the main tool grid on the Home page
function renderToolGrid() {
  const grid = document.getElementById('toolGrid');
  const title = document.getElementById('gridTitle');
  const matchingTools = getFilteredTools();

  title.textContent = currentCategory === 'all' ? 'All tools' : getCategoryName(currentCategory);

  if (matchingTools.length === 0) {
    grid.innerHTML = '<p class="text-slate-400 col-span-full">No tools match your search.</p>';
  } else {
    grid.innerHTML = matchingTools.map(buildToolCardHtml).join('');
  }

  attachCardClickEvents(grid);
}

// Draw the Saved page grid
function renderSavedGrid() {
  const grid = document.getElementById('savedGrid');
  const savedTools = tools.filter(function (tool) { return savedToolIds.includes(tool.id); });

  if (savedTools.length === 0) {
    grid.innerHTML = '<p class="text-slate-400 col-span-full">No saved tools yet. Star a tool to keep it here.</p>';
  } else {
    grid.innerHTML = savedTools.map(buildToolCardHtml).join('');
  }

  attachCardClickEvents(grid);
}

// Add click behaviour to a grid's cards (open detail / toggle save)
function attachCardClickEvents(grid) {
  // Clicking anywhere on the card opens the detail popup
  grid.querySelectorAll('.tool-card').forEach(function (card) {
    card.addEventListener('click', function (event) {
      if (event.target.dataset.saveId) return; // ignore clicks on the star icon
      openToolDetail(card.dataset.id);
    });
  });

  // Clicking the star icon saves/unsaves the tool
  grid.querySelectorAll('.save-icon').forEach(function (star) {
    star.addEventListener('click', function (event) {
      event.stopPropagation();
      toggleSaveTool(star.dataset.saveId);
      renderToolGrid();
      renderSavedGrid();
    });
  });
}

// Add or remove a tool from the saved list
function toggleSaveTool(toolId) {
  if (savedToolIds.includes(toolId)) {
    savedToolIds = savedToolIds.filter(function (id) { return id !== toolId; });
  } else {
    savedToolIds.push(toolId);
  }
}

// Show the detail popup for one tool
function openToolDetail(toolId) {
  const tool = tools.find(function (t) { return t.id === toolId; });
  if (!tool) return;

  document.getElementById('detailBadge').style.background = tool.color;
  document.getElementById('detailBadge').textContent = tool.name.substring(0, 2).toUpperCase();
  document.getElementById('detailName').textContent = tool.name;
  document.getElementById('detailCategory').textContent = getCategoryName(tool.category);
  document.getElementById('detailDescription').textContent = tool.description;
  document.getElementById('detailVisitLink').href = tool.url;

  updateDetailSaveButton(tool.id);
  document.getElementById('detailOverlay').classList.remove('hidden');
}

// Update the save button text/color inside the detail popup
function updateDetailSaveButton(toolId) {
  const button = document.getElementById('detailSaveBtn');
  const isSaved = savedToolIds.includes(toolId);
  button.textContent = isSaved ? '★ Saved' : '☆ Save';
  button.dataset.id = toolId;
}

// Switch between Home / Saved / About / Contact pages
function showPage(pageName) {
  const allPages = ['home', 'saved', 'about', 'contact'];
  allPages.forEach(function (name) {
    document.getElementById('page-' + name).classList.toggle('hidden', name !== pageName);
  });

  // Highlight the matching nav button
  document.querySelectorAll('.nav-btn').forEach(function (button) {
    button.classList.toggle('active', button.dataset.page === pageName);
  });

  if (pageName === 'saved') renderSavedGrid();
}


/* ---------------- EVENT LISTENERS (things that react to clicks/typing) ---------------- */

// Nav bar buttons (desktop row + mobile dropdown, both share .nav-btn)
document.querySelectorAll('.nav-btn').forEach(function (button) {
  button.addEventListener('click', function () {
    showPage(button.dataset.page);
    closeMobileMenu();
  });
});

// Hamburger toggle
document.getElementById('menuToggleBtn').addEventListener('click', function () {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.add('hidden');
}

// Search box typing (desktop input)
document.getElementById('searchBox').addEventListener('input', function (event) {
  currentSearch = event.target.value;
  document.getElementById('searchBoxMobile').value = event.target.value;
  showPage('home');
  renderToolGrid();
});

// Search box typing (mobile dropdown input)
document.getElementById('searchBoxMobile').addEventListener('input', function (event) {
  currentSearch = event.target.value;
  document.getElementById('searchBox').value = event.target.value;
  showPage('home');
  renderToolGrid();
});

// Close the detail popup
document.getElementById('closeDetailBtn').addEventListener('click', function () {
  document.getElementById('detailOverlay').classList.add('hidden');
});

// Save button inside the detail popup
document.getElementById('detailSaveBtn').addEventListener('click', function (event) {
  const toolId = event.target.dataset.id;
  toggleSaveTool(toolId);
  updateDetailSaveButton(toolId);
  renderToolGrid();
  renderSavedGrid();
});

// Contact form submit (just shows a confirmation, no real email sending)
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const button = event.target.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Sent ✓';
  setTimeout(function () {
    button.textContent = originalText;
    event.target.reset();
  }, 1500);
});


/* ---------------- STARTUP ---------------- */
// Runs once when the page first loads
renderCategoryList();
renderToolGrid();
showPage('home');
