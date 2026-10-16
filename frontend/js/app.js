
const issueForm = document.getElementById("issue-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");

const formMessage = document.getElementById("form-message");
const issueCount = document.getElementById("issue-count");
const issuesList = document.getElementById("issues-list");

// Store issues in an array
let issues = [
    {
        id: "ISS-101",
        title: "Unable to access Wi-Fi",
        description: "Connection fails in the teaching lab.",
        priority: "High",
        status: "Open"
    }
];

// Display all issues on the page
function renderIssues() {
    // Update total number of issues
    issueCount.textContent = issues.length;

    // Clear the old issue cards
    issuesList.innerHTML = "";

    // Loop through every issue
    issues.forEach(function (issue) {
        // Create the issue card
        const card = document.createElement("article");
        card.className = "issue-card";

        // Create the title
        const title = document.createElement("h3");
        title.textContent = issue.title;

        // Create the description
        const description = document.createElement("p");
        description.textContent = issue.description;

        // Create the priority
        const priority = document.createElement("p");
        const priorityLabel = document.createElement("strong");
        priorityLabel.textContent = "Priority: ";
        priority.appendChild(priorityLabel);
        priority.appendChild(
            document.createTextNode(issue.priority)
        );

        // Create the status
        const status = document.createElement("p");
        const statusLabel = document.createElement("strong");
        statusLabel.textContent = "Status: ";
        status.appendChild(statusLabel);
        status.appendChild(
            document.createTextNode(issue.status)
        );

        // Create the status button
        const button = document.createElement("button");

        if (issue.status === "Open") {
            button.textContent = "Close Issue";
        } else {
            button.textContent = "Reopen Issue";
        }

        // Change the issue status when clicked
        button.addEventListener("click", function () {
            if (issue.status === "Open") {
                issue.status = "Closed";
            } else {
                issue.status = "Open";
            }

            renderIssues();
        });

        // Add all elements to the card
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(priority);
        card.appendChild(status);
        card.appendChild(button);

        // Add the card to the page
        issuesList.appendChild(card);
    });
}

// Handle the form submission
issueForm.addEventListener("submit", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Read the form values
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = priorityInput.value;

    // Validate the input values
    if (!title || !description || !priority) {
        formMessage.textContent =
            "Please complete all required fields.";
        return;
    }

    // Create a new issue
    const newIssue = {
        id: "ISS-" + Date.now(),
        title: title,
        description: description,
        priority: priority,
        status: "Open"
    };

    // Add the new issue to the array
    issues.push(newIssue);

    // Reset the form
    issueForm.reset();

    // Show a success message
    formMessage.textContent = "Issue added successfully!";

    // Display the updated issues
    renderIssues();
});

// Display the initial issues when the page loads
renderIssues();
