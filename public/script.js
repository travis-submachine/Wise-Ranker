document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("sortable-list");
    let draggingItem = null;

    // Fetch ranking items from Rails API
    async function fetchRankingItems() {
        try {
            const response = await fetch("/ranking_items");
            const items = await response.json();
            list.innerHTML = ""; // Clear existing list
            items.forEach(item => {
                const li = document.createElement("li");
                li.classList.add("sortable-item");
                li.setAttribute("draggable", "true");
                li.dataset.id = item.id;
                li.innerText = item.name;
                list.appendChild(li);
            });
            addDragEvents(); // Reapply drag events after loading items
        } catch (error) {
            console.error("Error fetching ranking items:", error);
        }
    }

    function addDragEvents() {
        document.querySelectorAll(".sortable-item").forEach(item => {
            item.addEventListener("dragstart", (event) => {
                draggingItem = event.target;
                event.target.classList.add("dragging");
            });

            item.addEventListener("dragover", (event) => {
                event.preventDefault();
                const afterElement = getDragAfterElement(list, event.clientY);
                if (afterElement == null) {
                    list.appendChild(draggingItem);
                } else {
                    list.insertBefore(draggingItem, afterElement);
                }
            });

            item.addEventListener("dragend", () => {
                draggingItem.classList.remove("dragging");
                draggingItem = null;
                saveOrder();
            });
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(".sortable-item:not(.dragging)")];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    async function saveOrder() {
        const order = [...list.children].map(item => item.dataset.id);
        try {
            const response = await fetch("/ranking_items", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order })
            });
            const data = await response.json();
            console.log("Order saved:", data);
        } catch (error) {
            console.error("Error saving order:", error);
        }
    }

    // Load ranking items on page load
    fetchRankingItems();
});
