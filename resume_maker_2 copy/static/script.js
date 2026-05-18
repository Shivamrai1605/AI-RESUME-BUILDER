/* =========================================
   SABHI INPUT FIELDS KA OBJECT
========================================= */

const fields = {

  name:{
    preview:'preview-name',
    fallback:'Shivam Rai'
  },

  role:{
    preview:'preview-role',
    fallback:'Frontend Developer'
  },

  email:{
    preview:'preview-email',
    fallback:'shivam@gmail.com'
  },

  phone:{
    preview:'preview-phone',
    fallback:'+91 9876543210'
  },

  linkedin:{
    preview:'preview-linkedin',
    fallback:'linkedin.com/in/shivam'
  },

  github:{
    preview:'preview-github',
    fallback:'github.com/shivam'
  },

  leetcode:{
    preview:'preview-leetcode',
    fallback:'leetcode.com/shivam'
  },

  summary:{
    preview:'preview-summary',
    fallback:'Professional Summary'
  },

  education:{
    preview:'preview-education',
    fallback:'Education'
  },

  projects:{
    preview:'preview-projects',
    fallback:'Projects'
  }

};

/* =========================================
   LIVE PREVIEW UPDATE
========================================= */

Object.entries(fields).forEach(([id, config]) => {

  const input =
  document.getElementById(id);

  /* AGAR INPUT EXIST NA KRE */

  if(!input){
    return;
  }

  /* INPUT TYPE KARTE HI UPDATE */

  input.addEventListener('input', () => {

    document.getElementById(config.preview)
    .innerText =

    input.value.trim() || config.fallback;

  });

});

/* =========================================
   SKILLS LIVE UPDATE
========================================= */

document.getElementById('skills')
.addEventListener('input', function(){

  /* SKILLS CONTAINER */

  const container =
  document.getElementById('preview-skills');

  /* PURANE SKILLS REMOVE */

  container.innerHTML = '';

  /* COMMA SE SPLIT */

  const skills =
  this.value.split(',');

  /* EK EK SKILL ADD */

  skills.forEach(skill => {

    skill = skill.trim();

    if(skill){

      /* NAYA SKILL TAG */

      const tag =
      document.createElement('div');

      tag.className = 'skill-tag';

      tag.innerText = skill;

      /* PAGE PE ADD */

      container.appendChild(tag);

    }

  });

});

/* =========================================
   TEMPLATE SWITCH FUNCTION
========================================= */

function setTemplate(type){

  /* RESUME BOX */

  const resume =
  document.getElementById('resume');

  /* TEMPLATE CHANGE */

  resume.className =
  'resume tpl-' + type;

  /* ACTIVE BUTTON REMOVE */

  document.querySelectorAll('.template-btn')
  .forEach(button => {

    button.classList.remove('active');

  });

  /* CURRENT BUTTON ACTIVE */

  document.getElementById('btn-' + type)
  .classList.add('active');

}

/* =========================================
   PDF DOWNLOAD FUNCTION
========================================= */

function downloadResume(){

  html2pdf().set({

    margin:0.2,

    filename:'resume.pdf',

    image:{
      type:'jpeg',
      quality:1
    },

    html2canvas:{
      scale:2
    },

    jsPDF:{
      unit:'in',
      format:'a4',
      orientation:'portrait'
    }

  }).from(document.getElementById('resume'))
  .save();

}

/* =========================================
   AI SUMMARY GENERATION
========================================= */

async function generateSummary(event){

  /* USER INPUTS */

  const role =
  document.getElementById('role').value;

  const skills =
  document.getElementById('skills').value;

  const projects =
  document.getElementById('projects').value;

  /* BUTTON SELECT */

const button =
document.getElementById('generate-btn');

  /* LOADING STATE */

  button.innerText =
  'Generating...';

  button.disabled = true;

  try{

    /* BACKEND REQUEST */

    const response = await fetch('/generate-summary', {

      method:'POST',

      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({

        role:role,

        skills:skills,

        projects:projects

      })

    });

    /* JSON RESPONSE */

    const data =
    await response.json();

    /* SUMMARY UPDATE */

    document.getElementById('summary').value =
    data.summary;

    /* LIVE PREVIEW UPDATE */

    document.getElementById('preview-summary')
    .innerText =
    data.summary;

    /* SUCCESS BUTTON */

    button.innerText =
    '✨ Generated Successfully';

    /* 2 SECOND BAAD RESET */

    setTimeout(() => {

      button.innerText =
      '✨ Generate with AI';

      button.disabled = false;

    }, 2000);

  }

  catch(error){

    console.log(error);

    /* ERROR MESSAGE */

    button.innerText =
    'AI Generation Failed';

    /* RESET BUTTON */

    setTimeout(() => {

      button.innerText =
      '✨ Generate with AI';

      button.disabled = false;

    }, 2000);

  }

}

/* =========================================
   PAGE LOAD ANIMATION
========================================= */

window.addEventListener('load', () => {

  document.body.style.opacity = '1';

  /* =========================================
   AI BUTTON CLICK EVENT
========================================= */

document
.getElementById('generate-btn')
.addEventListener('click', generateSummary);

});