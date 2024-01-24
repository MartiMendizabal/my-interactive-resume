document.addEventListener("DOMContentLoaded", function() {

    const skillsContainer = document.getElementById("skillsContainer");

    // Load data from JSON file
    fetch(new URL("../files/skills.json", import.meta.url))
        .then(response => response.json())
        .then(data => {
            const skillsList = data.skills;
            // Create skill bubbles
            skillsList.forEach(skill => {
                const bubblesContainer = document.createElement("div");
                bubblesContainer.classList.add("d-grid", "gap-2")
                const skillBubble = document.createElement("button");
                skillBubble.classList.add("btn", "btn-outline-primary", "btn-block");
                skillBubble.textContent = skill.name;
                skillBubble.addEventListener("click", () => {
                    showSkillModal(skill);
                });
                bubblesContainer.appendChild(skillBubble);
                skillsContainer.appendChild(bubblesContainer);
                
            });
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));
});


function showSkillModal(skill) {
    const skillModal = document.createElement("div");
    skillModal.classList.add("modal", "fade");
    skillModal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${skill.name}</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${renderSkillDescription(skill.description)} 
          </div>
        </div>
      </div>
    `;
  
    // Show modal
    const modal = new bootstrap.Modal(skillModal);
    modal.show();
};

function renderSkillDescription(description) {
  return description.map(item => {
    if (item.type === "text") {
      return `<p>${item.content}</p>`;
    } else {
      return `<a href="${item.url}" target="_blank">${item.content}</a>`;
    }
  }).join('');
}